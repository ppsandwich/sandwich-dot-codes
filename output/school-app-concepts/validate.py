"""Validate the deliverable inventory without modifying generated images."""
import csv
import hashlib
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).parent
apps = json.loads((root / 'concepts.json').read_text())
records, issues, hashes = [], [], {}
assert len(apps) == 12
assert all(len(a['directions']) == 5 for a in apps)
assert len({d['tagline'] for a in apps for d in a['directions']}) == 60
with (root / 'taglines.csv').open() as f:
    assert len(list(csv.DictReader(f))) == 60
for a in apps:
    for d in a['directions']:
        for kind in ['screenshot', 'logo']:
            relative = d['folder'] + '/' + kind + '.png'
            p = root / relative
            if not p.exists():
                issues.append('Missing: ' + relative)
                continue
            with Image.open(p) as im:
                im.verify()
            with Image.open(p) as im:
                width, height = im.size
                alpha = im.getchannel('A').getextrema() if im.mode == 'RGBA' else None
                if kind == 'screenshot' and abs(width / height - 4 / 3) > .02:
                    issues.append('Unexpected screen aspect ratio: ' + relative)
                if kind == 'logo' and (not alpha or alpha[0] != 0 or alpha[1] != 255):
                    issues.append('Check logo transparency: ' + relative)
                digest = hashlib.sha256(p.read_bytes()).hexdigest()
                if digest in hashes:
                    issues.append('Duplicate image: ' + relative + ' and ' + hashes[digest])
                hashes[digest] = relative
                records.append(dict(app=a['name'], direction=d['number'], direction_name=d['title'],
                    type=kind, path=relative, width=width, height=height, mode=im.mode,
                    alpha_range=alpha, bytes=p.stat().st_size, sha256=digest,
                    generator='Built-in image_gen', prompt_reference=f'prompts.json: {a["name"]} / {d["title"]} / {kind}_prompt'))
manifest = dict(expected_assets=120, actual_assets=len(records), apps=12, directions=60,
                taglines=60, issues=issues, assets=records)
(root / 'generation' / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
print(f'{len(records)}/120 images; 60/60 taglines; {len(issues)} inventory issues')
for issue in issues:
    print(issue)
if len(records) == 120 and not issues:
    print('PASS: complete inventory, valid images, correct proportions, transparent logos, no duplicates')

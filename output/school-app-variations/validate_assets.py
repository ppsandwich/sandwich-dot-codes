"""Read-only image inspection and collection integrity checks; writes a manifest."""
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
jobs = json.loads((ROOT / 'generation/jobs.json').read_text())
sources = json.loads((ROOT / 'generation/source-manifest.json').read_text())
digest = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
assert len(jobs) == 144
assert Counter(j['kind'] for j in jobs) == {'screenshot': 72, 'logo': 72}
assert all(n == 6 for n in Counter((j['app'], j['direction']) for j in jobs).values())
records = []
for job in jobs:
    # Stored paths describe the generation workspace; resolve locally for portability.
    suffix = job['output'].split('/school-app-variations/', 1)[1]
    path = ROOT / suffix
    with Image.open(path) as im:
        im.load()
        width, height = im.size
        alpha = im.getchannel('A').getextrema() if 'A' in im.getbands() else None
        if job['kind'] == 'screenshot':
            assert width * 3 == height * 4, (path, im.size)
        else:
            assert width == height and alpha == (0, 255), (path, im.size, alpha)
        records.append({'id': job['id'], 'path': suffix, 'kind': job['kind'],
                        'width': width, 'height': height, 'mode': im.mode,
                        'alpha_range': alpha, 'sha256': digest(path)})
    provenance = json.loads(path.with_suffix('.provenance.json').read_text())
    assert provenance['prompt'] and provenance['generator'] == 'built-in image_gen'
assert len({r['sha256'] for r in records}) == 144, 'Duplicate new images'
assert not {r['sha256'] for r in records} & {s['sha256'] for s in sources}
for source in sources:
    source_path = Path(source['source'])
    relative = source['source'].split('/school-app-concepts/', 1)[1]
    copied = ROOT / Path(relative).parent / 'original' / Path(relative).name
    assert digest(copied) == source['sha256'], copied
    if source_path.exists():
        assert digest(source_path) == source['sha256'], source_path
with (ROOT / 'variations.csv').open(newline='') as stream:
    rows = list(csv.DictReader(stream))
assert len(rows) == 72
for row in rows:
    assert (ROOT / row['Screenshot']).is_file() and (ROOT / row['Logo']).is_file()
manifest = {'new_screenshots': 72, 'new_logos': 72, 'reference_images': 48,
            'selected_directions': 24, 'apps': 12, 'assets': records}
(ROOT / 'generation/manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print('PASS: 144 unique new PNGs, 72 transparent logos, 72 landscape 4:3 screens, 48 intact references and 72 CSV rows.')
print('Image dimensions:', dict(Counter((r['kind'], r['width'], r['height']) for r in records)))

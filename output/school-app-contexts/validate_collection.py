"""Validate delivered assets and coverage without modifying images."""
import csv
import hashlib
import json
import struct
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
jobs = json.loads((ROOT / 'contexts.json').read_text())
assert len(jobs) == 51
assert len({j['id'] for j in jobs}) == 51
assert len({j['slug'] for j in jobs}) == 12
groups = Counter((j['slug'], j['direction'], j['variation']) for j in jobs)
assert len(groups) == 17 and set(groups.values()) == {3}
review = {r['id']: r for r in json.loads((ROOT / 'visual-review.json').read_text())['screens']}
hashes = set()
for j in jobs:
    p = ROOT / j['path']
    data = p.read_bytes()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', p
    width, height = struct.unpack('>II', data[16:24])
    assert width * 3 == height * 4, (p, width, height)
    digest = hashlib.sha256(data).hexdigest()
    assert digest not in hashes, p
    hashes.add(digest)
    assert review[j['id']]['sha256'] == digest
    assert review[j['id']]['status'] == 'reviewed'
    provenance = json.loads(p.with_suffix('.provenance.json').read_text())
    assert provenance['generator'] == 'built-in image_gen'
    assert provenance['prompt'] and provenance['references']
    assert all(j[key] for key in ['goal', 'evidence', 'lesson'])
    for key in ['source', 'logo']:
        copy = ROOT / 'references' / j[key]
        original = ROOT.parent / 'school-app-variations' / j[key]
        assert copy.is_file()
        if original.exists():
            assert copy.read_bytes() == original.read_bytes(), copy
with (ROOT / 'contexts.csv').open() as f:
    rows = list(csv.DictReader(f))
assert len(rows) == 51 and {r['path'] for r in rows} == {j['path'] for j in jobs}
page = (ROOT / 'index.html').read_text()
assert all(j['path'] in page for j in jobs)
assert all(j['title'] in (ROOT / 'teaching-notes.md').read_text() for j in jobs)
print('PASS: 51 unique 4:3 screenshots; 17 selections; 12 apps; reference integrity; provenance; review hashes; CSV and gallery coverage.')

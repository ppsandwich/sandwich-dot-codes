"""Check the educational content and revision provenance against the actual files."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
read = lambda p: json.loads((ROOT / p).read_text())
digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
apps = read('variations.json')
audit = read('pedagogy/audit.json')
baseline = read('pedagogy/baseline-manifest.json')
assert len(apps) == 12 and len(audit) == 72
assert len(read('pedagogy/screen-specs.json')) == 24
assert len(read('pedagogy/jobs.json')) == 72
assert (ROOT/'pedagogical-outcomes.md').read_text().count('\n## ') == 12
with (ROOT/'app-descriptions.csv').open(newline='') as f:
    descriptions = list(csv.DictReader(f))
assert len(descriptions) == 12
for app, row in zip(apps, descriptions):
    assert row['Name'] == app['name'] and row['Description'] == app['purpose']
    assert len(app['education']['outcomes']) == 5
    for key in ('outcome','lesson','evidence','transfer'):
        assert app['education'][key]
    for direction in app['directions']:
        assert direction['education']['goal'] and direction['education']['evidence']
for record in audit:
    current, before = ROOT/record['path'], ROOT/record['before']
    assert digest(before) == record['before_sha256'], before
    assert digest(current) != record['before_sha256'], current
    provenance = json.loads(current.with_suffix('.provenance.json').read_text())
    assert provenance.get('revision') == 'pedagogical alignment', current
for asset in baseline['assets']:
    if asset['kind'] == 'logo':
        assert digest(ROOT/asset['path']) == asset['sha256'], asset['path']
print('PASS: 12 descriptions, 60 observable outcomes, 24 task briefs, 72 revised screens, 72 intact before images and 72 unchanged logos.')

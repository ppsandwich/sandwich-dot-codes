"""Package the gallery, documentation, assets and review history."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent
target = ROOT / 'school-app-variations.zip'
files = sorted(p for p in ROOT.rglob('*') if p.is_file()
               and p.suffix != '.zip' and '__pycache__' not in p.parts)
with ZipFile(target, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
    for path in files:
        archive.write(path, path.relative_to(ROOT))
with ZipFile(target) as archive:
    assert archive.testzip() is None
    assert 'pedagogical-outcomes.md' in archive.namelist()
    assert 'app-descriptions.csv' in archive.namelist()
print(f'Packaged {len(files)} files; {target.stat().st_size / 1024**2:.1f} MiB; archive CRC checks passed.')

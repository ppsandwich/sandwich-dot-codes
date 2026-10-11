"""Package the complete offline collection; preserve PNG bytes."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parent
archive = root / 'school-app-contexts.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED, compresslevel=1) as z:
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.suffix != '.zip' and '__pycache__' not in p.parts:
            z.write(p, p.relative_to(root))
with ZipFile(archive) as z:
    assert z.testzip() is None
    print(f'Created and CRC-checked {archive.name}: {len(z.namelist())} files, {archive.stat().st_size / 1024**2:.1f} MiB')

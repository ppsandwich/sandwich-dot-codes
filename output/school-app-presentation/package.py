"""Create and check the offline presentation download."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parent
path = root / 'school-app-presentation.zip'
with ZipFile(path, 'w', ZIP_DEFLATED, compresslevel=1) as z:
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.suffix != '.zip' and '__pycache__' not in p.parts:
            z.write(p, p.relative_to(root))
with ZipFile(path) as z:
    assert z.testzip() is None
print(f'Packaged and CRC-checked {path.name} ({path.stat().st_size / 1024**2:.1f} MiB).')

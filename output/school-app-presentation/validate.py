"""Check deck completeness, local links and unchanged selected image assets."""
import json
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'school-app-contexts'
apps = json.loads((ROOT / 'content.json').read_text())
jobs = json.loads((SOURCE / 'contexts.json').read_text())
assert len(apps) == 12 and len({a['slug'] for a in apps}) == 12
assert len(jobs) == 24
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.slides, self.screens = [], 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'article' and a.get('class') == 'slide':
            self.slides.append(a['id'])
        if tag == 'button' and a.get('class') == 'screen':
            self.screens += 1
        for key in ['src', 'href', 'data-image']:
            value = a.get(key, '')
            if value and not value.startswith(('https:', '#')):
                assert (ROOT / value).is_file(), value
page = Page()
page.feed((ROOT / 'index.html').read_text())
assert page.slides == [a['slug'] for a in apps]
assert page.screens == 24
for a in apps:
    assert all(a[k] for k in ['summary','description','purpose','application','buyer','peer','value','validation','route','sources'])
    assert len(a['lesson']) == 3
    selected = [j for j in jobs if j['slug'] == a['slug']]
    assert len(selected) == 2
    folder = ROOT / 'assets' / a['slug']
    assert (folder / 'icon.png').read_bytes() == (SOURCE / 'references' / selected[0]['logo']).read_bytes()
    for j in selected:
        assert (folder / f"screen-{j['context']:02}.png").read_bytes() == (SOURCE / j['path']).read_bytes()
    assert len(list(folder.glob('screen-*.png'))) == 2
    for s in a['sources']:
        assert s['url'].startswith('https://') and s['fact'] and s['name']
print('PASS: 12 complete slides, 24 retained screenshots, 12 icons, local links and cited research. All image bytes match the selected collection.')

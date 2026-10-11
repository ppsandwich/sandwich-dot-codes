"""Build an offline investor presentation from curated copy and selected assets."""
import csv
import html
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONTEXTS = ROOT.parent / 'school-app-contexts'
apps = json.loads((ROOT / 'content.json').read_text())
contexts = json.loads((CONTEXTS / 'contexts.json').read_text())
metadata = {a['Name']: a for a in csv.DictReader((ROOT.parent / 'school-app-variations/app-descriptions.csv').open())}
e = lambda s: html.escape(str(s), quote=True)
slides, menu, research = [], [], []
notes = ['# School apps: investor presentation research', '', 'Reviewed 11 October 2026. Official product sources describe comparable offerings. Product advantages, buyer routes and lesson timings below are proposals, not validated product-market fit. No revenue, traction, pricing or efficacy claims are made for these concepts.', '', '## Adoption questions shared across the collection', '', 'Start with teacher-led pilots within an existing lesson. Check preparation and review time, repeat use, willingness to pay and transfer to unfamiliar tasks. School purchasing and system approval vary; a teacher trial does not establish a procurement pathway. Before school use, validate accessibility with diverse learners, private classroom access, minimal data collection and deletion controls, device availability and adult supervision. Outdoor tasks also need school safety procedures. These are requirements to test, not implemented capabilities evidenced by the screenshots.', '']
for i, a in enumerate(apps):
    screens = [j for j in contexts if j['slug'] == a['slug']]
    assert len(screens) == 2
    a['name'] = screens[0]['app']
    meta = metadata[a['name']]
    a['years'], a['area'] = meta['Year level'], meta['Area']
    asset_dir = ROOT / 'assets' / a['slug']
    asset_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(CONTEXTS / 'references' / screens[0]['logo'], asset_dir / 'icon.png')
    figures = []
    for j in screens:
        filename = f"screen-{j['context']:02}.png"
        shutil.copy2(CONTEXTS / j['path'], asset_dir / filename)
        figures.append(f'''<figure><button class="screen" data-image="assets/{a['slug']}/{filename}" data-caption="{e(j['title'])}" aria-label="Enlarge {e(j['title'])}"><img src="assets/{a['slug']}/{filename}" width="1448" height="1086" loading="{'eager' if i == 0 else 'lazy'}" decoding="async" alt="{e(j['title']+'. '+j['goal'])}"></button><figcaption><span>0{j['context']}</span>{e(j['title'])}<span class="enlarge" aria-hidden="true">↗</span></figcaption></figure>''')
    sources = ' · '.join(f'<a href="{e(s["url"])}" target="_blank" rel="noopener">{e(s["name"])} ↗</a>' for s in a['sources'])
    steps = ''.join(f'<li><span>{n+1:02}</span>{e(step)}</li>' for n, step in enumerate(a['lesson']))
    slides.append(f'''<article class="slide" id="{a['slug']}" aria-labelledby="title-{i}" {'hidden' if i else ''}>
<header class="app-heading"><h1 class="brand-logo" id="title-{i}" tabindex="-1"><img class="app-icon" src="assets/{a['slug']}/icon.png" width="240" height="240" alt=""><span class="sr-only">{e(a['name'])}</span></h1><div class="intro"><p class="meta">{e(a['years'])}<span> / </span>{e(a['area'])}</p><div class="story"><p>{e(a['description'])}</p></div></div><div class="slide-number" aria-hidden="true">{i+1:02}<span> / 12</span></div></header>
<div class="showcase"><aside class="purpose"><section><h3>The learning goal</h3><p>{e(a['purpose'])}</p></section><section><h3>Use it for</h3><p>{e(a['application'])}</p></section><div class="audience"><span>Who it’s for</span><p>{e(a['buyer'])}</p></div></aside><div class="screens">{''.join(figures)}</div></div>
<section class="market" aria-label="Product-market fit hypothesis"><div><h3>Similar options</h3><p>{e(a['peer'])}</p><p class="source-links">{sources}</p></div><div class="value"><h3>Why choose this?</h3><p>{e(a['value'])}</p></div><div class="lesson"><h3>In a lesson</h3><ol>{steps}</ol></div></section>
</article>''')
    menu.append(f'<a href="#{a["slug"]}" class="app-jump" aria-label="{e(a['name'])}"><span>{i+1:02}</span><img src="assets/{a["slug"]}/icon.png" width="160" height="160" loading="lazy" alt=""><span aria-hidden="true">↗</span></a>')
    source_details = ''.join(f'<li><a href="{e(s["url"])}" target="_blank" rel="noopener">{e(s["name"])} ↗</a><p>{e(s["fact"])}</p></li>' for s in a['sources'])
    research.append(f'<section class="research-app" data-slug="{a["slug"]}" hidden><h3 class="research-brand"><img src="assets/{a['slug']}/icon.png" width="160" height="160" alt="{e(a['name'])}"></h3><h4>What comparable products offer</h4><ul>{source_details}</ul><h4>Proposed route to customers</h4><p>{e(a["route"])}</p><h4>What we still need to learn</h4><p>{e(a["validation"])}</p></section>')
    notes += [f'## {a["name"]}', '', f'**Audience:** {a["buyer"]}. {a["years"]}. {a["area"]}.', '', f'**Proposed value:** {a["value"]}', '', f'**Proposed buyer route:** {a["route"]}', '', f'**Validation question:** {a["validation"]}', '', f'**Suggested lesson:** {" → ".join(a["lesson"])}.', '']
    for s in a['sources']:
        notes += [f'- [{s["name"]}]({s["url"]}): {s["fact"]}']
    notes += ['']
page = (ROOT / 'template.html').read_text().replace('__SLIDES__', '\n'.join(slides)).replace('__MENU__', '\n'.join(menu)).replace('__RESEARCH__', '\n'.join(research))
(ROOT / 'index.html').write_text(page)
(ROOT / 'research.md').write_text('\n'.join(notes)+'\n')
print('Built 12 app slides with 24 retained screenshots, 12 icons and cited research.')

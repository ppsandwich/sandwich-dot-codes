"""Build the context gallery and teaching notes; no image generation or editing."""
import csv
import hashlib
import html
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'school-app-variations'
jobs = json.loads((ROOT / 'contexts.json').read_text())
esc = lambda value: html.escape(str(value), quote=True)
groups = {}
for job in jobs:
    key = (job['slug'], job['direction'], job['variation'])
    groups.setdefault(key, []).append(job)
    reference = ROOT / 'references' / job['source']
    reference.parent.mkdir(parents=True, exist_ok=True)
    if not reference.exists():
        shutil.copy2(SOURCE / job['source'], reference)
    logo = ROOT / 'references' / job['logo']
    if not logo.exists():
        shutil.copy2(SOURCE / job['logo'], logo)
shutil.copy2(SOURCE / 'pedagogical-outcomes.md', ROOT / 'app-outcomes.md')
# Rewrite companion links for this self-contained collection.
p = ROOT / 'app-outcomes.md'
s = p.read_text()
s = s.replace('Companion files: [revised descriptions](app-descriptions.csv), [visual comparison gallery](index.html) and [screen alignment review](pedagogy/alignment-review.md).',
              'Companion files: [context gallery](index.html), [context teaching notes](teaching-notes.md) and [screen index](contexts.csv).')
p.write_text(s)

screen_count = len(jobs)
design_count = len(groups)
app_count = len({j['slug'] for j in jobs})

notes = ['# Teaching notes for the additional app contexts', '',
         f'{screen_count} retained screenshots across {design_count} selected designs and {app_count} apps. Original screen numbers are preserved. Each screen includes an outcome, assessment evidence and lesson use.', '',
         'Each screenshot is a static design concept. The controls show proposed app behaviour. Outcomes describe what to assess, not proven learning effects. Use the task after relevant teaching, record prompts and support, and check transfer to an unfamiliar example. Context numbers identify tasks; they are not a fixed year-level progression.', '',
         'For Classroom Words, introduce every displayed sound–letter relationship first. The article “a” is assumed to be a previously taught familiar word. Capital letters represent the same taught correspondences. Oral directions can be teacher-supported. For other apps, adjust reading load and scaffolding without supplying the reasoning being assessed.', '',
         '[Open the gallery](index.html) · [Broader app outcomes and lesson plans](app-outcomes.md)', '']
sections = []
for (slug, direction, variant), items in groups.items():
    first = items[0]
    label = f"{first['app']} · {direction}{variant} · {first['variation_name']}"
    notes.extend([f"## {label}", '', f"Selected direction: {first['direction_name']}. Treatment: {first['treatment']}.", ''])
    cards = []
    for j in items:
        notes.extend([f"### {j['context']}. {j['title']}", '',
                      f"**Outcome:** {j['goal']}", '', f"**Evidence:** {j['evidence']}", '',
                      f"**Lesson use:** {j['lesson']}", '', f"[Open screenshot]({j['path']})", ''])
        cards.append(f'''<article class="context" data-id="{esc(j['id'])}">
<div class="number">0{j['context']}</div><h3>{esc(j['title'])}</h3>
<button class="picture" data-src="{esc(j['path'])}" data-caption="{esc(label+' · '+str(j['context'])+' · '+j['title'])}" aria-label="Enlarge {esc(j['title'])}">
<img src="{esc(j['path'])}" width="1448" height="1086" loading="lazy" alt="{esc(j['app']+': '+j['title']+'. '+j['goal'])}"></button>
<p class="goal"><strong>Learning outcome</strong><br>{esc(j['goal'])}</p>
<details class="teaching"><summary>Assessment and lesson use</summary><p><strong>Look for:</strong> {esc(j['evidence'])}</p><p><strong>Use in a lesson:</strong> {esc(j['lesson'])}</p></details>
<a class="download" href="{esc(j['path'])}" download>Download screenshot ↓</a></article>''')
    sections.append(f'''<section class="selection" data-app="{esc(slug)}" aria-labelledby="{esc(slug+'-'+str(direction))}">
<header class="selection-heading"><img src="references/{esc(first['logo'])}" alt="" width="90" height="90"><div><p class="eyebrow">Direction {direction} / Variation {variant} / {esc(first['treatment'])}</p><h2 id="{esc(slug+'-'+str(direction))}">{esc(first['app'])}</h2><p>{esc(first['direction_name'])} · {esc(first['variation_name'])}</p></div></header>
<details class="reference"><summary>View the selected reference</summary><button class="picture" data-src="references/{esc(first['source'])}" data-caption="{esc(label+' · Selected reference')}" aria-label="Enlarge selected reference for {esc(label)}"><img src="references/{esc(first['source'])}" alt="{esc(label+' selected reference')}" width="1448" height="1086" loading="lazy"></button></details>
<div class="contexts">{''.join(cards)}</div></section>''')

(ROOT / 'teaching-notes.md').write_text('\n'.join(notes) + '\n')
with (ROOT / 'contexts.csv').open('w', newline='') as f:
    fields = ['app','direction','direction_name','variation','variation_name','treatment','context','title','goal','evidence','lesson','path','source']
    writer = csv.DictWriter(f, fields)
    writer.writeheader()
    writer.writerows({k:j[k] for k in fields} for j in jobs)
options = f'<option value="all">All {app_count} apps</option>' + ''.join(f'<option value="{esc(slug)}">{esc(name)}</option>' for slug,name in dict((j['slug'],j['app']) for j in jobs).items())
page = '''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>School apps — selected contexts</title><style>
:root{--paper:#f5f0e5;--surface:#fffdf8;--ink:#24362f;--muted:#566258;--line:#c9cebf;--green:#2c5545;--clay:#9c4931}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 'Trebuchet MS',Calibri,sans-serif}a{color:var(--green);text-underline-offset:4px}button,select{font:inherit;min-height:44px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:9px 15px;cursor:pointer}button:hover{background:#e7ebdf}:focus-visible{outline:3px solid var(--clay);outline-offset:4px}[hidden]{display:none!important}.wrap{width:min(1680px,calc(100% - 64px));margin:auto}.skip{position:absolute;top:-100px;padding:12px;background:white}.skip:focus{top:0}.masthead{padding:24px 0;border-bottom:1px solid var(--line);font-size:13px;letter-spacing:.12em;text-transform:uppercase}.intro{display:grid;grid-template-columns:1.2fr .8fr;gap:60px;padding:52px 0 38px;align-items:end}h1{font:500 clamp(40px,4.4vw,70px)/1.08 Georgia,serif;letter-spacing:-.035em;margin:0}h1 em{color:var(--clay);font-weight:400}.intro p{max-width:650px;color:var(--muted)}.resources{display:flex;flex-wrap:wrap;gap:12px 24px;font-size:14px;margin-bottom:26px}.counts{display:flex;gap:30px;border-top:3px solid var(--green);padding-top:18px}.counts strong{font:36px Georgia,serif;display:block}.counts span{font-size:13px}.controls{display:flex;align-items:end;gap:24px;flex-wrap:wrap;padding:16px 0;border-block:1px solid var(--line)}.controls label{display:block;font-size:13px;margin-bottom:5px}.controls select{min-width:250px}.controls p{margin:0 0 10px;color:var(--muted)}.selection{margin:42px 0 70px}.selection-heading{display:flex;gap:22px;align-items:center;border-bottom:2px solid var(--ink);padding-bottom:16px}.selection-heading img{object-fit:contain;width:85px;height:85px}.selection-heading h2{font:34px/1.15 Georgia,serif;margin:0}.selection-heading p{margin:5px 0;color:var(--muted)}.eyebrow{font-size:12px}.reference{margin:18px 0 30px;padding:12px 18px;background:#e7ebdf}.reference summary,.teaching summary{cursor:pointer;min-height:44px;align-content:center}.reference .picture{max-width:700px;margin:12px 0}.contexts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}.context{min-width:0}.number{font:italic 26px Georgia,serif;color:var(--clay)}h3{font:24px/1.25 Georgia,serif;margin:6px 0 18px;min-height:60px}.picture{display:block;padding:0;overflow:hidden;width:100%;aspect-ratio:4/3;border-radius:8px;min-height:0}.picture img{display:block;width:100%;height:100%;object-fit:contain}.goal{margin:20px 0 12px}.goal strong{color:var(--green)}.teaching{font-size:14px;border-block:1px solid var(--line);margin:14px 0}.teaching p{margin:12px 0}.download{display:inline-block;padding:10px 0;font-size:14px}.footer{border-top:1px solid var(--line);padding:28px 0;font-size:14px;color:var(--muted);display:flex;gap:40px;justify-content:space-between}.footer p{max-width:850px;margin:0}.footer a{white-space:nowrap}dialog{padding:18px;border:1px solid var(--line);border-radius:12px;background:var(--paper);color:var(--ink);max-width:96vw;width:min(1450px,96vw);max-height:95dvh}dialog::backdrop{background:#14261ee6}.dialog-head{display:flex;justify-content:space-between;align-items:center;gap:18px;margin-bottom:12px}.dialog-head h2{font-size:17px;margin:0}.dialog-img{display:block;max-width:100%;max-height:74dvh;margin:auto;object-fit:contain}.dialog-foot{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-top:12px}.dialog-foot div{display:flex;gap:8px}button:disabled{opacity:.45;cursor:default}@media(max-width:1050px){.wrap{width:calc(100% - 40px)}.intro{gap:28px}.contexts{gap:18px}h3{font-size:22px;min-height:84px}}@media(max-width:760px){.wrap{width:calc(100% - 32px)}.intro{grid-template-columns:1fr;gap:22px;padding-top:32px}.intro h1{font-size:44px}.contexts{grid-template-columns:1fr;gap:32px}h3{min-height:0}.context{border-bottom:1px solid var(--line);padding-bottom:22px}.selection-heading h2{font-size:29px}.selection-heading img{width:62px;height:62px}.selection-heading{gap:14px}.controls{display:block}.controls select{width:100%}.controls p{margin-top:12px}.footer{display:block}.footer p{margin-bottom:20px}.dialog-foot{flex-wrap:wrap}dialog{padding:12px}.dialog-img{max-height:65dvh}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
</style></head><body><a href="#gallery" class="skip">Skip to screenshots</a><div class="wrap"><header class="masthead">School apps / Additional learning contexts</header>
<section class="intro"><div><h1>Same app.<br><em>A new challenge.</em></h1><p>Selected learning contexts for each app. Original screen numbers are preserved. Every screen sets a focused task and leaves the student’s response open.</p></div><div class="counts"><div><strong>__APP_COUNT__</strong><span>apps</span></div><div><strong>__DESIGN_COUNT__</strong><span>selected designs</span></div><div><strong>__SCREEN_COUNT__</strong><span>retained screenshots</span></div></div></section>
<nav class="resources" aria-label="Collection resources"><a href="teaching-notes.md">Teaching notes ↗</a><a href="app-outcomes.md">Detailed app outcomes ↗</a><a href="contexts.csv" download>Screen index ↓</a><a href="school-app-contexts.zip" download>Download collection ↓</a></nav>
<div class="controls"><div><label for="app-filter">Choose an app</label><select id="app-filter">__OPTIONS__</select></div><p id="results" role="status" aria-live="polite">__SCREEN_COUNT__ screenshots · __DESIGN_COUNT__ selected designs · __APP_COUNT__ apps</p></div>
<main id="gallery">__SECTIONS__</main><footer class="footer"><p>AI-generated concept artwork for iPad, web and desktop. Recording, simulation and assessment controls depict proposed behaviour. The educational outcomes require teaching and assessment; these images do not demonstrate learning effects.</p><a href="teaching-notes.md">Read the assessment notes ↗</a></footer></div>
<dialog id="viewer" aria-labelledby="viewer-title"><div class="dialog-head"><h2 id="viewer-title"></h2><button id="close">Close ✕</button></div><img class="dialog-img" id="viewer-image" alt=""><div class="dialog-foot"><div><button id="previous">← Previous</button><button id="next">Next →</button></div><a id="viewer-download" download>Download PNG ↓</a></div></dialog>
<script>
const q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
q('#app-filter').addEventListener('change',()=>{const chosen=q('#app-filter').value;all('.selection').forEach(s=>s.hidden=chosen!=='all'&&s.dataset.app!==chosen);const visible=all('.selection').filter(s=>!s.hidden);q('#results').textContent=visible.reduce((n,s)=>n+s.querySelectorAll('.context').length,0)+' screenshots · '+visible.length+' selected design'+(visible.length===1?'':'s')+' · '+new Set(visible.map(s=>s.dataset.app)).size+' app'+(new Set(visible.map(s=>s.dataset.app)).size===1?'':'s');});
let pictures=[],current=0,trigger;
function show(){const p=pictures[current];q('#viewer-image').src=p.dataset.src;q('#viewer-image').alt=p.dataset.caption;q('#viewer-title').textContent=p.dataset.caption;q('#viewer-download').href=p.dataset.src;q('#viewer-download').download=p.dataset.src.replaceAll('/','-');q('#previous').disabled=current===0;q('#next').disabled=current===pictures.length-1;}
q('#gallery').addEventListener('click',e=>{const b=e.target.closest('[data-src]');if(!b)return;trigger=b;pictures=[...b.closest('.selection').querySelectorAll('[data-src]')];current=pictures.indexOf(b);show();q('#viewer').showModal();});
q('#previous').onclick=()=>{if(current>0){current--;show();}};q('#next').onclick=()=>{if(current<pictures.length-1){current++;show();}};q('#close').onclick=()=>q('#viewer').close();q('#viewer').addEventListener('close',()=>trigger?.focus());q('#viewer').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){q('#previous').click();e.preventDefault();}if(e.key==='ArrowRight'){q('#next').click();e.preventDefault();}});
</script></body></html>'''
(ROOT / 'index.html').write_text(page.replace('__SCREEN_COUNT__',str(screen_count)).replace('__DESIGN_COUNT__',str(design_count)).replace('__APP_COUNT__',str(app_count)).replace('__OPTIONS__',options).replace('__SECTIONS__','\n'.join(sections)))
print(f'Built {screen_count}-screen gallery, CSV and teaching notes for {design_count} selected designs.')


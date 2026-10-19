import json, re, glob, csv
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).parent
names = dict(zip(['amazon-devices','automotive','baby','beauty','popular','fashion','computers','electronics','garden','hpc','home','home-improvement','industrial','kitchen','fashion-luggage','movies-tv','mi','grocery','pets','sporting','office-products','toys','videogames'], ['Amazon Devices','Automotive','Baby','Beauty','CDs & Vinyl','Clothing, Shoes & Accessories','Computers & Accessories','Electronics','Garden','Health, Household & Personal Care','Home','Home Improvement','Industrial & Scientific','Kitchen & Dining','Luggage & Travel Gear','Movies & TV','Musical Instruments','Pantry Food & Drinks','Pet Supplies','Sports & Outdoors','Stationery & Office Products','Toys & Games','Video Games']))
names.update({'lighting':'Lighting','software':'Software'})
files = sorted(glob.glob(str(ROOT.parent/'amazon-au-used-2026-10-12/source*.json')) + glob.glob(str(ROOT/'source-*.json')))
data = [json.load(open(f)) for f in files]
manual = {a for d in data for a in d.get('manual_book_exclusions',[])}
manual.update('B07D18J656 B00YDK8LEU B002YBA2LA B002XPLE32 B00LUKNN0I B002YB3X8E B001OTCPBS B00BT2RHTU B07PBGK88R B007YXQGK4 B006J1TYMY B002YB42LQ B0161H19UK B0082ONBKC B00WFDM0IA B000CEBH92 B09SYFMSVR B00WGP45JO B0018R4QCW B077SWJC3D B003AGQUAA B00065Q0YY B000EGGR0W B089VTQ5YQ B00GYGRH8W B000ZG6QCK B009ZK3A6M B07X3VT6JH B01MAXSWJR B0FDH5652M B07VQH329Z B0058M7NUU B003AGSMJ2 B006LWHM66 B00ZQC8VG2 B003GHOHC6 B002XVWOMG B00433LO9G B07LFJQLMQ B00545RZ0Y'.split())
manual.update('B000Q6QAHA B002QV4L56 B01FKTF7NU B0026XFHM0 B01HJXE5QU B003MCIE74 B0017JEOAA B001P9JIAI B007WY12WC B005D2OLZU B07BGD9YNT B07JK2HXQN B002RAR3NS B07373KNZ5 B07BGDW651'.split())
def book(c):
    t=c.get('text',''); a=c['asin']
    title=c.get('title','')
    stationery=bool(re.search(r'notebook|notepad|blank book|sketchbook|calendar|planner|journal|exercise book|grid book',title,re.I))
    if re.search(r'Unknown Binding',t,re.I) and not (stationery or re.search(r'\bDVD\b|Blu.?ray|\bVHS\b|Audio CD|Starring:|Directed by:',t,re.I)):return True
    if re.search(r'Paperback|Hardcover|Hardback|Spiral.bound|Audiobook|Sheet music',title,re.I) and not stationery:return True
    if re.search(r'(?:service|repair|parts|owners?|user) manual|\breading fundamentals\b',title,re.I):return True
    return a in manual or bool(re.search(r'(?:Paperback|Hardcover|Hardback|Board book|Library Binding|Pocket Book|Sheet music|Plastic Comb|Vinyl Bound|Leather Bound|Loose Leaf)\s*(?:Price, product page|See options|Currently unavailable|Great On Kindle|No featured offers|Ages:|\d|by )|Other formats?:[^$]*(?:Kindle|Audiobook|Paperback|Hardcover)',t,re.I)) or bool(re.fullmatch(r'\d{9}[\dX]',a) and not re.search(r'\b(?:DVD|VHS|Calendar|DVD-ROM)\b',t))
def price(s):
    m=re.search(r'\$([\d,]+\.\d{2})',s or '')
    return float(m[1].replace(',','')) if m else None
rows={}; cats={}; pages=[]
for d in data:
    pages += d['pages'] + d.get('title_enrichment',[])
for p in pages:
    q=parse_qs(urlparse(p['url']).query); dep=p.get('department') or q.get('i',[''])[0]
    if dep in names:
        for c in p.get('cards',[]): cats[c['asin']]=names[dep]
for p in sorted(pages,key=lambda p:p.get('checked','')):
    q=parse_qs(urlparse(p['url']).query); dep=p.get('department') or q.get('i',[''])[0]
    for c in p.get('cards',[]):
        if not c.get('title') or c.get('sponsored') or book(c):continue
        used=price(c.get('secondary')); new=price(c.get('primary'))
        if not used or not new or 'used' not in (c.get('secondary') or '').lower() or c.get('text','').count('Price, product page')>1:continue
        cat=names.get(dep) or cats.get(c['asin'])
        if not cat:continue
        rows[c['asin']]={'item':c['title'],'used_price_shown_aud':used,'new_price_aud':new,'category':cat,'asin':c['asin'],'product_url':'https://www.amazon.com.au/dp/'+c['asin'],'listing_offer_label':c.get('secondary'),'source_search_url':p['url'],'checked_at_utc':p.get('checked'),'text':c.get('text','')}
out=sorted(rows.values(),key=lambda r:(r['used_price_shown_aud'],r['item'],r['asin']))
(ROOT/'eligible.json').write_text(json.dumps(out,ensure_ascii=False))
(ROOT/'eligible-asins.json').write_text(json.dumps(list(rows)))
from collections import Counter
print(json.dumps({'eligible':len(out),'pages':len(pages),'categories':dict(Counter(r['category'] for r in out))},indent=2))

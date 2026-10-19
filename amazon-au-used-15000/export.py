"""Run consolidate.py first, then generate the CSV and native Sheets input."""
import csv
import json
from pathlib import Path

root = Path(__file__).parent
rows = json.loads((root / 'eligible.json').read_text())
assert len({r['asin'] for r in rows}) == len(rows)
assert all(r['used_price_shown_aud'] > 0 and r['new_price_aud'] > 0 for r in rows)
prices = [r['used_price_shown_aud'] for r in rows]
assert prices == sorted(prices)
header = ['Item', 'Used price shown (AUD)', 'New price (AUD)', 'Category', 'Ratio',
          'Product URL', 'ASIN', 'Listing offer label', 'Source search URL', 'Checked at (UTC)']
data = [header] + [[r['item'], r['used_price_shown_aud'], r['new_price_aud'], r['category'],
                   f'=C{i}/B{i}-1', r['product_url'], r['asin'], r['listing_offer_label'],
                   r['source_search_url'], r['checked_at_utc']] for i, r in enumerate(rows, 2)]
with (root / 'amazon-au-used-complete.csv').open('w', encoding='utf-8-sig', newline='') as f:
    csv.writer(f).writerows(data)
(root / 'sheet-data.json').write_text(json.dumps(data))
print(f'Exported {len(rows):,} unique items; {sum(p < 20 for p in prices):,} below A$20.')

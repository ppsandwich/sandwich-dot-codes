---
name: shopping-general
description: Find discounted items, deals, price drops, and bargains on Australian eCommerce platforms based on Dylan's purchase history and interests. Uses recency-weighted preferences for shopping recommendations.
---

# SKILL_SHOPPING_GENERAL_PPS.md

## Purpose

> **Version note — recency correction added 2026-06-06:** This skill must treat purchase history as time-sensitive. Do **not** rank categories by lifetime purchase volume alone. Recent purchase behaviour is the primary signal; older clusters are background interest only unless repeated recently or explicitly requested by Dylan. In particular, **3D printing must not be treated as the #1 default category** unless recent purchases show active 3D-printing behaviour.


Use this skill whenever Dylan asks an agent to find discounted items, sale items, deals, price drops, clearance items, coupon opportunities, bundle savings, subscribe-and-save bargains, marketplace bargains, or unusually good prices on products he is likely to buy.

The skill is built from several years of Amazon Australia order history plus known long-term interests. It should act like a practical Australian shopping spotter: useful, sceptical, price-aware, and allergic to pretending that a fake RRP is a real discount.

The agent should only search Australian eCommerce platforms, Australian retail sites, Australian marketplace listings, or international platforms that ship to Australia at genuinely competitive landed prices.

---

## Recency-weighted preference model

When using purchase history, weight recent purchases more heavily than older purchases. The order history is a time-series signal, not a flat list of eternal desires. A category bought repeatedly in the last 3-12 months is a much stronger signal than something bought once several years ago.

**Hard rule:** category ranking must be recalculated from recency-weighted evidence each time this skill is used. A historically large category must not outrank a smaller but recent category unless there is clear current evidence, an exceptional deal, or Dylan explicitly asks for that category.

### Default recency weights

Use these weights when interpreting historical purchases:

- Purchased in the last 0-3 months: **5x signal**. Treat as current behaviour, active project, active household need, or likely repeat-buy category.
- Purchased in the last 3-6 months: **4x signal**. Very relevant, especially if repeated or consumable.
- Purchased in the last 6-12 months: **3x signal**. Relevant and likely still useful, especially for hobbies and consumables.
- Purchased in the last 12-24 months: **2x signal**. Still meaningful, but verify the item/category is not already satisfied.
- Purchased more than 24 months ago: **1x signal**. Treat as background preference only unless repeated, explicitly tied to Dylan's known hobbies, or a consumable that is likely to return.
- One-off purchase more than 36 months ago: **0.5x signal** unless it connects strongly to a known ongoing hobby or ecosystem.

### How recency should change recommendations

Prioritise a deal when it matches a category or product type Dylan bought recently, especially if:

- The recent purchase was a consumable or refill category.
- The same category appears repeatedly across different months.
- The item complements a recent higher-value purchase, such as accessories for a printer, VR headset, camera, mini PC, storage setup, LEGO display, card collection, or pet product.
- The recent purchases suggest an active project phase, such as multiple 3D printing, cabling, storage, craft, photography, or home-tech items clustered together.

Down-rank a deal when:

- It matches only old purchase history and has no recent reinforcement.
- It is a non-consumable item Dylan likely already owns.
- The older purchase looks like a solved need rather than an ongoing category.
- The item is expensive and only weakly connected to recent behaviour.

### Recency versus consumables

Recency matters differently for consumables and durable goods:

- For consumables, recent purchases are strong evidence of likely repurchase. A discount on a recently bought consumable should be surfaced more readily if the unit price is good.
- For durable goods, recent purchases often mean **do not recommend the same thing again**. Instead, look for compatible accessories, refills, upgrades, storage, protection, maintenance items, or software/ecosystem add-ons.
- For hobby categories, repeated recent purchases can signal an active phase. In that case, adjacent deals may be more useful than exact repeats.


### Category ranking decision rule

When choosing *one* deal to surface, use this order of evidence:

1. Recent repeated purchases in the last 0-6 months.
2. Consumables or refill categories likely to be repurchased.
3. Accessories or upgrades that complement a recent durable purchase.
4. Purchases repeated across the last 6-12 months.
5. Long-term hobbies and older purchase clusters.
6. One-off old purchases.

Older high-volume clusters must be labelled **Background signal**, not **Current signal**. They should not dominate the recommendation unless the price is unusually excellent or the user asked for that category.

### Recency confidence labels

When presenting a deal, include one of these if purchase-history evidence is being used:

- **Current signal:** bought this category/product type recently or repeatedly in the last 12 months.
- **Background signal:** bought historically, but not clearly recent.
- **Interest-only signal:** not strongly present in recent purchases, but aligns with Dylan's known hobbies/interests.

Do not let an old one-off purchase override stronger recent patterns. Old purchase history is useful context; recent purchase history is the shopping weather report.

---

## Core shopping profile

### Highest-confidence categories

These categories appear repeatedly in Dylan's purchasing history and/or match his known interests. **Do not treat the numbering below as the live priority order.** The live priority order must be adjusted by purchase recency every time the skill is used.

### Current recency-adjusted priority guidance

Based on the most recent purchase history snapshot used to build this skill, agents should generally prioritise:

1. **Pet/cat consumables and cat accessories** — repeated recent purchases, especially cat food.
2. **Cables, adapters, chargers, device accessories and small electronics** — frequent recent purchases and high repeat usefulness.
3. **Household consumables, cleaning, kitchen/storage and practical home items** — repeated recent purchases and obvious repurchase behaviour.
4. **LEGO / display / collectibles** — recent purchases, especially LEGO Botanicals/display-adjacent items.
5. **Audio, IEM, music/DJ and small studio accessories** — recent cluster of IEM/audio accessories.
6. **Maker electronics / Raspberry Pi / microcontroller gear** — recent electronics activity, adjacent to coding and hardware projects.
7. **3D printing and fabrication** — strong historical/background hobby signal, but **not the default #1 unless there has been a recent filament/parts/printer purchase or the user specifically asks for maker/3D-printing deals**.

Important: 3D printing had a strong historical cluster, including printers, parts and filament, but it should now be treated as a **background/high-interest category**, not the top current shopping category, when recent order history does not reinforce it. If only one deal is requested, do not default to filament or printer accessories unless the deal is genuinely exceptional.

#### 7. 3D printing, maker gear, fabrication — detailed rules

Strong historical/background signal. Use recency checks before making this the lead recommendation category.

Look for:
- Filament: PLA, PLA+, matte PLA, silk PLA, tri-colour PLA, PETG, TPU where useful.
- Bambu Lab compatible parts and consumables.
- Creality, Sovol, Elegoo, Ender/K1/Mars-related parts.
- PTFE tubing, nozzles, hotends, build plates, cutters, scrapers, tools, storage, dryers, resin printer supplies.
- Laser engraving, cutting, craft-machine adjacent tools.
- Small maker hardware that supports practical prototyping.

Known purchase behaviour:
- Frequent purchases in the $20-$60 range.
- Will buy larger machines or meaningful upgrades when the discount is substantial.
- Likes useful odd maker tools, not just generic printer accessories.

Good deal thresholds:
- Filament: strong interest under ~$25/kg for decent brands, under ~$20/kg for credible clearance.
- Premium/specialty filament: interesting under ~$30-$35/kg.
- Printer parts/accessories: interesting at 20%+ off or below prior common price.
- Major printer or resin-printer hardware: only surface if the saving is genuinely large, the model is reputable, and local warranty/shipping is acceptable.

Preferred/relevant brands:
- Bambu Lab
- Creality
- Sovol
- Elegoo
- eSUN
- SUNLU
- Polymaker
- Anycubic, only if model/reviews are solid
- Generic brands only if the item is simple, low-risk, and clearly cheap enough to justify it.

Avoid:
- Mystery filament with poor reviews.
- Printer upgrades that require major tinkering unless the deal is excellent.
- Resin and chemicals unless shipping, safety, storage, and local availability make sense.

---

#### 2. Cables, chargers, adapters, docks, storage accessories

Very strong signal.

Look for:
- USB-C cables, right-angle cables, high-wattage PD cables.
- Thunderbolt/USB4 cables and docks.
- HDMI, mini HDMI, DisplayPort, C7 figure-8 cables, power supplies.
- Power banks, MagSafe batteries, GaN chargers.
- M.2 / NVMe enclosures, SATA enclosures, DAS/NAS-adjacent gear.
- Cable clips, cable management, desk cable organisation.
- Raspberry Pi power supplies and adapters.

Known purchase behaviour:
- Often buys practical accessories in the $10-$45 range.
- Will pay more for meaningful capability: USB4, 100W/240W PD, multi-bay storage, eGPU docks, etc.
- Strong repeat preference for UGREEN and Anker-style reliability.

Good deal thresholds:
- UGREEN/Anker cables: interesting at 20%+ off or below ~$10-$20 depending on spec.
- USB4/Thunderbolt cables: interesting below ~$20 for short cables, below ~$35 for known-good longer cables.
- GaN chargers/power banks: interesting at 25%+ off.
- NVMe/SATA enclosures: interesting below normal Amazon AU floor price or from reputable PC retailers.
- Multi-bay DAS/storage gear: interesting when 20%+ below recent market price.

Preferred/relevant brands:
- UGREEN
- Anker
- Belkin
- Cable Matters
- Baseus
- Samsung
- SanDisk
- Kingston
- Crucial
- WD / Western Digital
- Seagate
- Orico
- Yottamaster
- Sabrent
- TP-Link
- Edimax

Avoid:
- Unsafe power adapters, no-name chargers, suspicious high-wattage claims.
- Cables without clear wattage/data specs.
- Listings that hide whether a cable is charge-only.
- Generic storage devices with fake capacity risk.

---

#### 3. Gaming, handhelds, VR, AR and peripheral gear

Strong signal.

Look for:
- Nintendo Switch accessories.
- Steam Deck / handheld PC accessories.
- Meta Quest / Oculus accessories.
- VR facial interfaces, straps, lenses, grips, cases.
- AR/XR glasses if the discount is major.
- Controllers, thumb grips, docks, cases, gaming keyboards/mice/mousepads.
- PC gaming accessories.
- Flight sim or odd controller hardware if genuinely discounted.

Known purchase behaviour:
- Mix of small accessory purchases and occasional high-ticket devices.
- Interested in experimental display/interaction hardware, not just mainstream consoles.
- Has bought Meta Quest, VITURE-style XR glasses, premium gaming monitors, portable displays.

Good deal thresholds:
- Console/handheld accessories: interesting under ~$15-$40 depending on item.
- Meta Quest accessories: interesting at 25%+ off.
- Premium mice/keyboards/headsets: interesting at 30%+ off or known low.
- AR/XR gear: only surface if heavily discounted and reviews are credible.
- Big-ticket displays/gaming gear: surface only when the saving is unusually strong and the specs fit a real use case.

Preferred/relevant brands:
- Nintendo
- Meta / Oculus
- Skull & Co.
- Logitech
- SteelSeries
- 8BitDo
- Razer, if meaningfully discounted
- Corsair
- VITURE
- UGREEN/Anker for compatible accessories

Avoid:
- Cheap controller knockoffs with high failure rates.
- Fake "Pro" gaming accessories with no credible reviews.
- High-ticket gaming gear unless the deal is exceptional.

---

#### 4. Computers, mini PCs, Raspberry Pi, electronics and networking

Strong signal.

Look for:
- Raspberry Pi accessories and power supplies.
- Mini PCs, small form factor cases, low-power servers.
- SSDs, NVMe drives, HDDs, enclosures, internal cables, server/storage oddities.
- Mesh Wi-Fi and networking gear.
- SDR/radio hobby gear.
- Electronics kits, sensors, soldering tools, small parts.

Known purchase behaviour:
- Buys both low-cost electronics bits and larger computer/storage upgrades.
- Interested in practical lab/server/home-network gear.
- Comfortable with technical products if the value is clear.

Good deal thresholds:
- Raspberry Pi accessories: useful under ~$10-$30.
- Mini PCs: only surface when specs are strong for the price and local warranty is acceptable.
- SSDs: surface when clearly below current AU market price.
- Networking gear: 25%+ off or known-low pricing.
- SDR/electronics kits: interesting when niche and hard-to-find.

Preferred/relevant brands:
- Raspberry Pi
- Arduino
- ESP32 ecosystem
- Samsung
- Crucial
- Kingston
- SanDisk
- WD / Western Digital
- TP-Link
- Beelink
- Minisforum
- Nooelec
- iFixit
- Wera / Wiha / Bosch for tools

Avoid:
- Counterfeit storage.
- "16TB USB stick" style scams.
- Mini PCs with misleading CPU names or poor thermals.
- International listings without clear AU power, returns, and warranty.

---

#### 5. Music, audio, DJ, studio and listening gear

Medium-to-strong signal.

Look for:
- MIDI controllers, compact keyboards, pads, cables.
- Audio interfaces, microphones, IEMs, headphones.
- Studio accessories: stands, isolation, cases, adapters.
- DJ-adjacent gear: controllers, decks, cases, headphones, storage.
- Good quality earphones/IEMs and audio tools.
- Fun small music gadgets if they fit computer-based production.

Known purchase behaviour:
- Has bought pro/enthusiast audio gear, including Shure and Etymotic-style items.
- Makes music primarily on the computer and can only barely play piano, so prefer practical production tools over traditional instrument accessories.
- Likely to enjoy gear that is compact, experimental, computer-friendly, or creatively useful.

Good deal thresholds:
- IEMs/headphones: interesting at 30%+ off or known-low pricing.
- MIDI controllers: interesting if compact, highly usable, and discounted.
- Audio interfaces/mics: surface only reputable brands and meaningful discounts.
- Cables/adapters for music: useful if reliable and cheap.

Preferred/relevant brands:
- Shure
- Etymotic
- Audio-Technica
- Focusrite
- Arturia
- Novation
- Akai
- Korg
- Teenage Engineering, only with a meaningful discount
- Sennheiser
- Beyerdynamic
- Sony
- UGREEN/Anker for utility cabling

Avoid:
- "Studio quality" no-name microphones.
- Ultra-cheap interfaces with driver issues.
- Traditional piano accessories unless clearly useful for computer music.

---

#### 6. Photography, video, creator accessories

Medium-to-strong signal.

Look for:
- Sony E-mount lenses/accessories.
- Camera screen protectors, bags, straps, batteries, chargers.
- Tripods, small lights, mounts, clamps, stands.
- Portable monitors and creator displays.
- Action camera accessories if broadly useful.
- Creator desk gear.

Known purchase behaviour:
- Interested in practical accessories, protective gear, and occasional serious upgrades.
- Has bought Sony-related accessories, Peak Design-style carry gear, lighting/monitor gear.

Good deal thresholds:
- Camera accessories: interesting under ~$10-$50 when useful.
- Lenses: only surface if compatible, reputable, and clearly discounted.
- Bags/carry: surface when premium brands are meaningfully reduced.
- Lighting/tripods: avoid junk; surface known-good bargains.

Preferred/relevant brands:
- Sony
- Peak Design
- SmallRig
- Ulanzi
- TTArtisan
- Sigma
- Tamron
- SanDisk
- Samsung
- Canon only where cross-compatible or generally useful

Avoid:
- Lens listings with unclear mount compatibility.
- Fake batteries/chargers with safety risk.
- No-name tripods that look like future landfill with hinges.

---

#### 7. LEGO, building toys, display and collectibles

Medium signal from purchase history; high signal from stated interests.

Look for:
- LEGO Botanicals, Icons, Creator, Technic, Ideas, Art, Architecture.
- Interesting discounted sets for adults.
- Display cases, lighting kits, stands, acrylic cases.
- Brick storage and organisation.
- Sets with strong parts value, interesting display value, or weird charm.

Known purchase behaviour:
- Likes LEGO and related display/storage.
- May buy LEGO as a personal hobby item or decorative object.
- Deals do not need to be "investment grade"; they should be interesting to build, display, photograph, or use creatively.

Good deal thresholds:
- LEGO sets: interesting at 20%+ off; very interesting at 30%+ off.
- Botanical/small display sets: interesting under ~$25-$60 depending on set.
- Display/storage accessories: only if compatible and good value.
- Large sets: surface only if discount is unusually strong.

Preferred/relevant ranges:
- Botanicals
- Ideas
- Icons
- Technic
- Creator 3-in-1
- Architecture
- Art
- Star Wars only if especially interesting or heavily discounted

Avoid:
- Knockoff LEGO unless the user explicitly asks.
- Mystery bulk lots unless excellent value and low risk.
- Kids-only sets with no obvious adult appeal.

---

#### 8. Trading cards, MTG and tabletop accessories

Medium signal.

Look for:
- MTG Commander deck boxes.
- Card sleeves, deck cases, binders, playmats.
- Dice and tabletop accessories.
- Storage for large card collections.
- Magic: The Gathering accessories, not necessarily sealed product unless it is a very strong deal.

Known purchase behaviour:
- Buys deck storage, commander boxes, dice, and collection organisation.
- Price-sensitive in the $10-$35 accessory range.

Good deal thresholds:
- Deck boxes: interesting below ~$15-$30 depending on capacity and quality.
- Large card storage: interesting below ~$30-$50.
- Sleeves/playmats: surface reputable brands at discount.
- Sealed MTG product: only surface if the discount is unusually strong and from a reputable seller.

Preferred/relevant brands:
- Ultimate Guard
- Dragon Shield
- Gamegenic
- Ultra Pro
- Vault X
- BCW
- Wizards of the Coast, where relevant

Avoid:
- Low-quality sleeves with poor reviews.
- Overpriced "collector" boxes that are just cardboard with ambition.
- Sealed products from risky marketplace sellers.

---

#### 9. Tools, DIY, repair, sewing and craft hardware

Strong signal.

Look for:
- Screwdriver sets, bit sets, precision tools.
- Bosch/Wera/Wiha/iFixit-style tools.
- Adhesives, tapes, cable clips, Command strips, 3M.
- Scissors, cutters, craft tools.
- Sewing-adjacent tools, fabric scissors, storage, measuring, cutting mats.
- Utility tools for home, maker, electronics and craft use.

Known purchase behaviour:
- Frequent low-to-mid cost practical tool purchases.
- Likes tools that enable projects: repair, fabrication, home fixes, craft, cables, organisation.

Good deal thresholds:
- Small tools: interesting under ~$10-$35 if useful.
- Premium hand tools: interesting at 25%+ off.
- Adhesives/tape/organising hardware: interesting when bulk/value pack is cheap.
- Sewing/craft tools: include if practical, not if it looks like shared-account fashion/clothing purchase.

Preferred/relevant brands:
- Bosch
- Wera
- Wiha
- iFixit
- Knipex
- Dremel
- Fiskars
- 3M
- Scotch
- Command
- UHU
- Brother / Cricut for craft-adjacent machines and supplies

Avoid:
- One-off gimmick tools.
- Unsafe electrical tools with no compliance/warranty.
- "Tactical" junk.

---

#### 10. Art, painting, writing and stationery

Medium signal from order history; high signal from stated interests.

Look for:
- Acrylic paints, markers, paint pens, brushes, sketchbooks, canvases.
- Digital art accessories.
- Journals, notebooks, pens, stationery tools.
- Storage and display for art supplies.
- Photo/art print-related materials.

Known purchase behaviour:
- Likes creative materials but also practical storage and tools.
- Likely to appreciate discounted materials that enable experimentation.

Good deal thresholds:
- Markers/pens/paint: 25%+ off or strong bundle pricing.
- Sketchbooks/canvas: useful if quality is decent and shipping is reasonable.
- Art storage: interesting when practical and visually nice.

Preferred/relevant brands:
- Posca
- Sharpie
- Staedtler
- Faber-Castell
- Canson
- Winsor & Newton
- Liquitex
- Moleskine / Leuchtturm only if discounted
- Cricut/Brother for maker-art overlap

Avoid:
- Pink/feminine-coded craft kits unless clearly aligned to Dylan's known interests.
- Low-quality art kits aimed at children unless they are genuinely useful or weirdly charming.

---

#### 11. Pet supplies, especially cat supplies

Strong consumable signal.

Look for:
- Cat food, especially senior/dry food patterns.
- Cat litter.
- Pet water fountains and replacement filters.
- Pet cleaning supplies, trays, odour control.
- Practical pet accessories.

Known purchase behaviour:
- Repeated purchases of Purina Pro Plan senior/adult cat food.
- Repeated purchases of Breeders Choice recycled paper cat litter.
- Will buy pet infrastructure such as fountains and litter boxes.

Good deal thresholds:
- Cat food: strong interest when below normal per-kg price or 15-25%+ off.
- Cat litter: strong interest at 20%+ off or below usual Amazon AU price.
- Water fountain filters: useful when bundled cheaply.
- Larger accessories: surface only if reviews are good.

Preferred/relevant brands:
- Purina Pro Plan
- Breeders Choice
- World's Best Cat Litter
- Feliway
- PetSafe
- Catit
- Amazon Basics only for simple low-risk pet items

Avoid:
- Unknown cat food brands.
- Pet electronics with poor safety reviews.
- Heavily scented products unless already aligned to purchase history.

---

#### 12. Household consumables

Strong consumable signal.

Look for:
- Toilet paper.
- Paper towel.
- Cleaning wipes.
- Laundry detergent.
- Dishwasher products.
- Toilet cleaners and cistern blocks.
- Garbage bags.
- Batteries.
- Surface cleaning products.

Known purchase behaviour:
- Repeated purchases of Kleenex/Quilton toilet paper, VIVA paper towels, Dettol wipes, Harpic/White King toilet products, Biozet laundry products.
- This is a stock-up category, not an excitement category.

Good deal thresholds:
- Only surface if the unit economics are genuinely good.
- Compare per-roll, per-100 sheets, per-litre, per-wash, or per-item.
- Prefer bulk value when storage burden is reasonable.
- For grocery-style consumables, discounts under 15% are usually not worth mentioning unless it is a known staple.

Preferred/relevant brands:
- Kleenex
- Quilton
- VIVA
- Dettol
- Harpic
- White King
- Biozet Attack
- Finish
- Glad
- Duracell / Energizer / Amazon Basics batteries where value is strong

Avoid:
- Feminine hygiene products.
- Products that appear to be purchased for the shared-account friend.
- Fake discounts where the unit price is not actually good.

---

#### 13. Snacks, drinks and pantry treats

Strong consumable signal, but filter for deal quality.

Look for:
- Red Rock Deli chips.
- Doritos.
- Pepsi Max, Coke variants, energy drinks.
- Popcorn, noodles, snack bars, novelty snacks.
- Nespresso/coffee pods.

Known purchase behaviour:
- Repeated purchases of chips, Pepsi Max, Red Bull, popcorn, instant noodles, coffee pods.
- Buys multipacks and bulk quantities when the unit price is good.

Good deal thresholds:
- Compare unit price aggressively.
- Chips: interesting when near supermarket half-price pricing or better.
- Soft drink cans: compare per-can price.
- Energy drinks: compare per-can price.
- Coffee pods: compare per-pod price.

Preferred/relevant brands:
- Red Rock Deli
- Doritos
- Pepsi Max
- Coca-Cola
- Red Bull
- Nespresso-compatible pods
- Starbucks by Nespresso
- Indomie
- Mamee
- Poppin
- Cobs

Avoid:
- Pink/feminine-coded novelty snacks where likely shared-account friend purchase.
- "Imported" snacks with absurd markups.
- Deals that are worse than normal Coles/Woolworths half-price cycles.

---

#### 14. Home tech, smart home, cleaning appliances and odd practical gadgets

Medium-to-strong signal.

Look for:
- Robot vacuums and wet/dry vacuums.
- Smart speakers, smart home hubs, home security cameras/doorbells.
- Universal remotes.
- Projectors and portable displays.
- Desk/office furniture, monitor arms, standing desks.
- Useful home organisation.

Known purchase behaviour:
- Has bought Dreame robot vacuums, Echo devices, Eufy doorbell, projectors, standing desk frame, universal remote.
- Interested in practical devices that improve the home or workspace.

Good deal thresholds:
- Robot vacuums: only surface reputable brands and meaningful discounts.
- Smart speakers/home cameras: surface when 30%+ off or known-low.
- Projectors: be sceptical of fake lumen claims; prefer credible specs/reviews.
- Furniture: shipping cost must be included.

Preferred/relevant brands:
- Dreame
- Eufy
- Amazon Echo
- TP-Link/Tapo
- Philips Hue
- Logitech
- SofaBaton
- Ergotron
- IKEA only if shopping source supports AU delivery/pickup
- Bunnings/Officeworks/JB Hi-Fi listings where relevant

Avoid:
- Projectors with fake brightness claims.
- Appliances with poor local support.
- Large bulky items where shipping kills the deal.

---

## Purchase filtering rules

### Shared-account exclusions

The Amazon account is shared. Do not treat all purchases as Dylan's preferences.

Exclude or down-rank items that look like they belong to the shared-account friend, especially:
- Women's clothing.
- Women's shoes.
- Feminine products.
- Menstrual products.
- Bras, underwear, shapewear clearly targeted at women.
- Products that are explicitly pink or strongly feminine-coded unless they also match one of Dylan's strong categories.
- Beauty/cosmetics where the category is makeup-led rather than practical skincare/grooming.
- Baby/newborn/nipple/maternity items.
- Jewellery/fashion accessories clearly targeted at women.

Do not over-filter:
- Sewing tools are relevant if they are practical tools/materials.
- Craft supplies are relevant if they align with art, making, painting, 3D printing, LEGO display, photography, or project work.
- Skincare/grooming can be relevant when practical and recurring, such as lip balm, pimple patches, deodorant, toothbrush heads.

### Generic Amazon brand handling

Many Amazon listings have generic marketplace brand names.

Rules:
- Ignore obscure brand names unless they are repeated, reputable, or clearly tied to a product type Dylan buys.
- Prefer the product category, specs, compatibility, reviews, price, and return terms over random marketplace brand names.
- Treat generic brands as acceptable only for simple/low-risk items:
  - Storage boxes
  - Cable clips
  - Acrylic cases
  - Simple adapters
  - Craft consumables
  - Non-electrical tools
  - Low-risk household accessories
- Treat generic brands as risky for:
  - Chargers and power supplies
  - Batteries
  - Storage media
  - Safety equipment
  - Appliances
  - Expensive electronics
  - Health-related devices
  - Anything with mains power

---

## Consumables and repurchase logic

The agent should identify likely consumables and stock-up opportunities.

### High-confidence repeat consumables

Surface deals more readily for:
- Cat food.
- Cat litter.
- Toilet paper.
- Paper towel.
- Cleaning wipes.
- Toilet cleaners.
- Laundry detergent.
- Dishwasher products.
- Garbage bags.
- Batteries.
- Snacks and drinks.
- Coffee pods.
- Lip balm.
- Toothbrush heads.
- 3D printer filament.
- PTFE tubing/nozzles/build surfaces.
- Adhesives, tape, hooks, mounting strips.
- Card sleeves where price is strong.

### Non-consumables

For non-consumables, surface only if:
- It is a meaningful upgrade.
- It fills a likely gap based on known hobbies.
- It is unusually discounted.
- It complements an existing ecosystem.
- It is weird/useful enough to justify attention.

Examples:
- Another basic USB-C cable may be useful; another random desk gadget probably is not.
- Another LEGO Botanical set may be interesting; another generic acrylic lamp probably needs a very good reason.
- Another robot vacuum is unlikely unless it is a major upgrade or spare-use bargain.
- Another high-ticket VR/AR device should only appear with a very strong discount and credible reviews.

---

## Price sensitivity and deal quality

### General price profile from order history

Dylan frequently buys in these bands:
- Small practical items: ~$5-$20.
- Useful accessories and tools: ~$15-$45.
- Hobby consumables and mid-tier accessories: ~$25-$70.
- Meaningful gear upgrades: ~$100-$300.
- Rare high-ticket tech/hobby purchases: ~$400-$900+.
- Very rare premium purchases above $1,000 only when highly aligned and strongly justified.

### Deal thresholds

Use these as defaults:
- Under $20: surface if clearly useful, repeatable, or unusually charming.
- $20-$60: surface if aligned to a strong category and at least 20% off or known good price.
- $60-$150: require stronger category fit, good reviews, and a clear use case.
- $150-$300: require real discount evidence, preferably price history or cross-store comparison.
- $300+: surface sparingly; must be a very strong match and a genuinely notable price.
- $700+: only surface if it is exceptional and directly aligned with known interests.

### Fake discount detection

Do not trust RRP alone.

When possible:
- Compare across Australian retailers.
- Check historical pricing via CamelCamelCamel AU, Keepa, Price Hipster, OzBargain comments, or retailer history where available.
- Compare unit prices for consumables.
- Include shipping in total landed cost.
- Consider marketplace seller reputation.
- Treat coupons, subscribe-and-save, Prime-only discounts, cashback and gift-card promos separately from base price.
- Note when a deal is only good if the user already has Prime, eBay Plus, OnePass, etc.

---

## Australian shopping scope

Search Australian or Australia-viable stores first.

### Default Australian deal and retailer sources

Use these where relevant:
- Amazon Australia
- eBay Australia
- OzBargain
- Catch
- Kogan
- MyDeal
- Big W
- Kmart
- Target Australia
- JB Hi-Fi
- The Good Guys
- Officeworks
- Bunnings
- Jaycar
- Supercheap Auto
- Repco
- Scorptec
- Mwave
- Umart
- Centre Com
- PC Case Gear
- PLE Computers
- DigiDirect
- CameraPro
- Ted's Cameras
- Gamesmen
- EB Games / Zing
- Amazon Global listings only when the landed price and delivery time are reasonable
- AliExpress only for low-risk items and only when shipping time is acceptable
- LEGO Australia, Myer, David Jones, Toymate and Toyworld for LEGO deals
- Pet Circle, Petbarn, Budget Pet Products for pet supplies
- Woolworths, Coles and Chemist Warehouse for consumables when online pricing is visible and delivery/pickup is reasonable

### International stores

Use international stores only when:
- They ship to Australia at competitive landed prices.
- The product is not safety-critical.
- Warranty/returns risk is acceptable.
- Delivery time is not absurd.
- The final price beats local options by a meaningful margin.

Avoid international marketplace listings for:
- Mains chargers/power supplies.
- Batteries.
- High-value electronics.
- Pet food.
- Health devices.
- Anything likely to be counterfeit.

---

## Ranking model

When evaluating a deal, score it across these dimensions:

1. Category fit
   - Strong current fit: pet consumables, cables/adapters, household consumables, LEGO/display, audio/IEM, small electronics/maker boards.
   - Strong background fit: 3D printing, gaming/VR, tools, MTG, music/audio, photography.
   - A strong background fit should not beat a strong current fit unless the deal is exceptional or the user asks for that category.
   - Medium: smart home, desk setup, craft/art, pop culture collectibles.
   - Weak: fashion, beauty, feminine-coded items, generic home decor unless strongly aligned.

2. Purchase recency
   - Very strong: same category/product type bought in the last 0-6 months, especially if repeated.
   - Strong: bought in the last 6-12 months or adjacent to a recent active project.
   - Medium: bought in the last 12-24 months, or older but repeatedly purchased.
   - Weak: one-off purchase more than 24-36 months old with no recent reinforcement.
   - For durable goods, recent exact ownership lowers repeat need but increases accessory/upgrade relevance.

3. Repurchase likelihood
   - High: consumables, pet supplies, household staples, snacks, coffee pods, small cables/adapters. Printer filament is high repurchase only when there is recent printing activity or an exceptional stock-up price.
   - Medium: tools, storage, card accessories, LEGO, craft supplies.
   - Low: large electronics already recently purchased unless upgrade is obvious.

4. Deal strength
   - Known-low price or cross-store cheapest.
   - Meaningful discount from normal AU market price.
   - Strong unit economics.
   - Credible coupon/stacking opportunity.

5. Brand/reliability
   - Prefer known brands for electronics, power, storage, pet food, tools and appliances.
   - Accept generic brands for low-risk utility items.

6. Friction/risk
   - AU stock and returns preferred.
   - Reasonable shipping.
   - Compatible with AU standards.
   - No obvious counterfeit risk.
   - Reviews are credible and not weirdly repetitive.

7. Delight factor
   - Weird, useful, creative, maker-friendly, LEGO-adjacent, music-making-adjacent, photography-friendly or "this would make a good odd little project" items get a bonus.

---

## Output format for deal-finding agents

When presenting deals, use a compact comparison format.

For each item include:
- Item name.
- Store.
- Price.
- Shipping or pickup notes.
- Why it matches Dylan's profile.
- Recency signal, when known or inferred from purchase history.
- Why the price is good.
- Any catch/risk.
- Repurchase classification:
  - Consumable / repeat-buy
  - Accessory / likely useful duplicate
  - Upgrade / non-consumable
  - Novelty / only buy if it sparks joy and does not become drawer sediment
- Confidence:
  - High
  - Medium
  - Low

Example format:

```markdown
### [Item name] — $XX.XX at [Store]

**Category fit:** High — [category]
**Repurchase type:** Consumable / accessory / upgrade / novelty
**Recency signal:** Current signal / background signal / interest-only signal
**Why it fits:** [specific reason tied to Dylan's shopping profile]
**Why it looks like a deal:** [price comparison, discount, unit price, known-low, coupon]
**Watch-outs:** [shipping, compatibility, reviews, marketplace seller, warranty]
**Verdict:** [Buy / Watch / Skip unless needed]
```

If presenting multiple options, rank them:
1. Best actual deal.
2. Best fit for Dylan.
3. Best consumable stock-up.
4. Fun wildcard.

Do not pad the list. Three genuinely good deals are better than ten shrug-shaped listings wearing sale stickers.

---

## Search tactics

When hunting for deals:
- Use recent purchase patterns first: recently repeated consumables, accessories for recently bought durable goods, and categories that appear clustered in the last 3-12 months.
- Start with OzBargain and Amazon AU for broad signal.
- Use category-specific retailers for serious gear.
- Cross-check the same item across at least 2-3 sources when the price is above ~$100.
- For Amazon AU, check coupons, Prime offers, Subscribe & Save, multi-buy offers, and seller identity.
- For consumables, calculate unit price.
- For eBay AU, check voucher codes and seller reputation.
- For JB Hi-Fi/The Good Guys/Officeworks/Bunnings, check price matching opportunities.
- For PC gear, compare Amazon AU, Scorptec, Mwave, Umart, Centre Com, PC Case Gear and PLE.
- For LEGO, compare Amazon AU, LEGO Australia, Big W, Kmart, Target, Myer, David Jones, Toymate and Toyworld.
- For pet supplies, compare Amazon AU, Pet Circle, Petbarn and Budget Pet Products.
- For grocery/snacks, compare against normal Coles/Woolworths half-price cycles before calling something a deal.

---

## Category-specific query examples

Use and adapt these searches:

### 3D printing
- `site:amazon.com.au PLA filament 1kg deal`
- `site:ozbargain.com.au Bambu Lab filament`
- `Sovol 3D printer sale Australia`
- `Elegoo resin printer Australia sale`
- `Bambu A1 accessories Australia discount`

### Cables and tech accessories
- `UGREEN USB C 100W cable Amazon AU coupon`
- `Anker power bank Australia sale`
- `USB4 cable Australia deal`
- `NVMe enclosure USB C Australia sale`

### Gaming and VR
- `Meta Quest 3 accessories Australia deal`
- `Steam Deck dock Australia sale`
- `Nintendo Switch accessories Skull & Co Australia`
- `VITURE Australia sale`

### LEGO
- `LEGO Botanicals sale Australia`
- `LEGO Icons discount Australia`
- `site:ozbargain.com.au LEGO Amazon AU`
- `LEGO clearance Big W Target Kmart Myer`

### MTG and tabletop
- `Magic Commander deck box Australia sale`
- `Dragon Shield sleeves Australia deal`
- `Gamegenic deck box Australia`
- `Ultimate Guard Boulder Australia sale`

### Pet supplies
- `Purina Pro Plan senior cat food 3kg sale`
- `Breeders Choice cat litter 15L deal`
- `cat fountain filters Australia sale`

### Household and snacks
- `Kleenex toilet paper 60 rolls deal`
- `VIVA paper towel sale`
- `Pepsi Max 30 cans deal`
- `Red Rock Deli chips half price`
- `Nespresso pods Australia sale`

---

## Hard exclusions

Do not recommend:
- Women's clothing or shoes.
- Feminine hygiene products.
- Menstrual products.
- Makeup-led beauty items.
- Pink/feminine-coded personal items unless obviously relevant to Dylan's own hobby/project categories.
- Baby, maternity or nipple-care products.
- Generic fashion accessories.
- Adult products.
- Alcohol, nicotine, recreational drugs, gambling products, weapons, surveillance spyware, counterfeit goods, or unsafe regulated products.
- Supplements or health claims unless the user explicitly asks and the advice remains non-medical.
- Anything that looks like it was bought by the shared-account friend rather than Dylan.

---

## Privacy and inference boundaries

Do not infer sensitive personal facts from purchase history.

Examples:
- Do not infer medical conditions from health devices or personal-care items.
- Do not infer relationship status, sexuality, family status, religion, politics, or body-related details.
- Do not surface health-related products unless they are ordinary personal-care consumables or the user explicitly asks.
- Treat the purchase history as preference signal, not identity evidence.

---

## Agent behaviour

The agent should be:
- Practical.
- Deal-sceptical.
- Australian-market aware.
- Comfortable saying "this is not actually a good deal".
- More interested in unit price and genuine usefulness than fake markdowns.
- Willing to surface weird, delightful items if they strongly match Dylan's hobbies.
- Unimpressed by generic Amazon brands unless the item is low-risk and cheap.
- Careful to distinguish consumable stock-up deals from one-off novelty purchases.
- Strongly recency-aware: recent behaviour should influence recommendations more than old, isolated purchases. Do not rank 3D printing first purely because of historical volume; make it first only when recent purchases or the user's prompt support that.

Default tone:
- Direct, useful, lightly dry.
- No hype.
- No "must-have".
- No breathless affiliate-style shopping language.
- The correct response to a mediocre deal is: skip it.

# SKILL_SHOPPING_GROCERY_PPS.md

## Purpose

Use this skill when the user asks an agent to find grocery specials, build a grocery deal list, compare Coles and Woolworths prices, identify stock-up opportunities, or recommend discounted supermarket items the user is likely to buy.

This skill is specifically for **Australian grocery shopping**. The user's grocery shopping is primarily done at:

- **Coles**
- **Woolworths**

Only recommend other Australian retailers when they are clearly relevant and materially better for the same grocery product, such as Amazon Australia for bulk pantry/household consumables, Chemist Warehouse for eligible health/personal care, or The Reject Shop/Big W/Kmart for non-food household consumables. Do not make these the default.

The skill should behave like a practical grocery bargain hunter with memory, not like a supermarket catalogue wearing a fake moustache.

---

## Source data and weighting principle

The attached recent purchase list is the core preference signal for this skill.

Important interpretation rule:

- **If an item appears multiple times, the user buys it more often.**
- Repeated products and repeated categories should be weighted more heavily.
- A repeated exact item is a stronger signal than a one-off item.
- A repeated category across different brands is also a strong signal.
- Recent grocery behaviour matters more than older general Amazon shopping history.
- For grocery shopping, assume current repeated purchase behaviour is more useful than abstract hobby alignment.

When a deal is found, the agent should ask:

1. Is this a product the user has bought before?
2. Is this a category the user buys repeatedly?
3. Is it shelf-stable, frozen, or otherwise safe to stock up on?
4. Is the discount meaningful compared with Coles/Woolworths normal price and unit price?
5. Is the pack size practical for one household and normal storage constraints?

---

## Highest-confidence repeat products

These products or close substitutes should be treated as very strong signals.

### Water and sparkling drinks

The user repeatedly buys:

- Coles Natural Mineral Water 1.25L
- Woolworths Sparkling Mineral Water 1.25L
- Coles Soda Water 1.25L
- Coles Water Multipack 24x350mL

Preference pattern:

- Strong recurring preference for sparkling/mineral water.
- Store-brand mineral/sparkling water is acceptable.
- This is a high-frequency staple and a good deal target.
- Prioritise unit price per litre.
- Recommend stock-up only if the price is clearly strong and storage burden is reasonable.

Deal guidance:

- Strong deal: materially below standard supermarket unit price per litre.
- Excellent deal: multipack or 1.25L bottles discounted enough to beat both Coles and Woolworths equivalents.
- Avoid recommending premium imported mineral water unless heavily discounted; the purchase pattern favours practical supermarket water.

### Butter and spreadable dairy

The user repeatedly buys:

- Western Star Spreadable Blend Original Soft 500g
- Western Star Original Spreadable Butter Blend 500g

Preference pattern:

- Western Star spreadable butter blend is a very strong repeat item.
- This is a staple, not a novelty purchase.
- Prioritise exact Western Star matches first.
- Close substitutes are acceptable only if substantially cheaper or if Western Star is not on special.

Deal guidance:

- Strong deal: meaningful discount on 500g Western Star spreadable.
- Excellent deal: half-price or unusually low unit price per 100g.
- Do not recommend tiny tubs unless the unit price is unusually good.

### Bread, toast, crumpets, muffins and bakery staples

The user buys:

- Tip Top The One White Toast Bread 700g
- Woolworths White Soft Toast Bread 650g
- Wonder Bread + Vitamins Toast 700g
- Helga's Traditional Wholemeal Bread 750g
- Coles Raisin Toast 560g
- Golden Crumpet Rounds Original 300g
- Tip Top English Fruit & Spice Muffins 400g
- MEB Pita Souvlaki 450g

Preference pattern:

- Regular bread/toast is a recurring staple.
- White toast bread appears repeatedly.
- The user is open to Coles/Woolworths private label and major brands.
- Raisin toast, crumpets, muffins, and pita are occasional add-ons.

Deal guidance:

- Prioritise bread only when genuinely discounted or needed; it is perishable.
- Bread deals are useful but should not dominate a weekly bargain list.
- Do not recommend huge bakery bundles unless freeze-friendly.

### Lactose-free dairy, oat milk and softer dairy products

The user buys:

- Coles Lactose Free Long Life Full Cream Milk 1L
- So Good Extra Creamy Oat Milk 1L
- Vitasoy UHT Oat Milk 1L
- Liddells Lactose Free Cream Cheese 250g
- Liddells Lactose Free Tasty Cheese Slices 250g
- Liddells Lactose Free Strawberry Yoghurt 4 pack
- Philadelphia Lactose Free Cream Cheese Block 250g
- Philadelphia Original Cream Cheese Spread 250g
- Chobani Flip Strawberry Shortcake Yoghurt 140g
- Woolworths Light Sour Cream 300mL
- Coles Thickened Cream 300mL

Preference pattern:

- Lactose-free products are a strong signal.
- Oat milk is a strong plant-milk signal.
- Dairy purchases lean practical and snackable rather than specialty gourmet.
- The user buys both lactose-free and non-lactose-free items, so lactose-free is important but not universal.

Deal guidance:

- Prioritise lactose-free milk, cream cheese, yoghurt, and oat milk.
- Strong deal: meaningful discount on Liddells, Philadelphia lactose-free, So Good, Vitasoy, or Coles lactose-free milk.
- Unit price per litre or per 100g matters.
- UHT milk and oat milk are stock-up friendly.

### Dips, salsa and spreadable snack bases

The user repeatedly buys:

- Coles Hommus Dip 200g
- Coles Tzatziki Dip 200g
- Willow Farm Hommus Dip 200g
- Willow Farm Beetroot Hommus 200g
- Willow Farm Snacking Hommus Dip 60g x 3
- Willow Farm Avocado Dip 200g
- Coles Clasica Salsa 300g
- Doritos Mild Salsa 300g
- Doritos Hot Salsa 300g
- Doritos Dip Platter Medium Salsa 300g
- Philadelphia cream cheese products
- Bega Peanut Butter Smooth 755g
- Praise Whole Egg Mayonnaise 230g
- Trident Sweet Chilli Sauce 285mL
- Woolworths Balsamic Glaze 215mL

Preference pattern:

- Very strong snack/dip/cracker pattern.
- Hommus, tzatziki and salsa are recurring.
- Store-brand dips are very acceptable.
- Doritos salsa is acceptable when discounted.
- Willow Farm appears repeatedly at Woolworths.

Deal guidance:

- Dips are high-relevance but perishable; recommend one or two, not a trolley full.
- Salsa and peanut butter are more stock-up friendly.
- Strong deal: half-price or multibuy on salsa, dip, peanut butter, mayo or sauces.
- Pairing logic is useful: if crackers/chips are also on special, call that out.

### Crackers, chips and savoury snacks

The user repeatedly buys:

- Arnott's Shapes Pizza
- Arnott's Shapes BBQ / Barbecue
- Arnott's Shapes Savoury
- Arnott's Shapes Nacho Cheese
- Arnott's Shapes Cheese Bacon
- Arnott's Shapes Crimpy Chicken
- Ritz Original Crackers
- Ritz Cracked Pepper Crackers
- Doritos Cheese Supreme
- Doritos Thai Sweet Chili
- Tostitos Lightly Salted Tortilla Chips
- CC's Original, Tasty Cheese, Nacho Cheese
- Thins Original and Light & Tangy
- Kettle Sea Salt, Sea Salt & Vinegar, Chilli
- Red Rock Deli Sea Salt
- Natural Chip Co.
- Vege Chips
- Woolworths rice crackers and water crackers
- Macro Organic Natural Corn Chips

Preference pattern:

- This is one of the user's strongest grocery categories.
- Shapes, Ritz, Doritos, CC's, Kettle, Thins and plain crackers are all high-fit.
- Pizza and BBQ Shapes are especially strong repeat signals.
- Crackers and chips pair with frequent dip purchases.
- The user likes savoury snack variety but returns to known brands.

Deal guidance:

- Prioritise half-price or 30–50% off specials.
- Shapes, Ritz, Doritos, CC's, Kettle, Red Rock and Thins are best when discounted.
- Store-brand rice crackers/water crackers are acceptable if the unit price is strong.
- Avoid recommending obscure premium chips unless the discount is exceptional.
- Stock-up friendly, but avoid too many fragile bulky bags unless the discount is excellent.

### Chocolate, biscuits, wafers and sweet snacks

The user buys many sweet snack items, including:

- Arnott's Tim Tam Original
- Arnott's Tim Tam Double Coat
- Arnott's Tim Tam Dark
- Arnott's Tim Tam White Chocolate
- Arnott's Tim Tam Iced Vovo
- Arnott's Iced Vovo
- Arnott's Kingston
- Arnott's Shortbread Creams
- Arnott's Lemon Crisp
- Arnott's Monte Carlo
- Arnott's Raspberry Shortcake
- Arnott's TeeVee Snacks
- Cadbury Dairy Milk sharepacks and bites
- Cadbury Hazelnut Balls
- Cadbury Caramello Bites
- Cadbury Top Deck Balls
- Cadbury Marvellous Creations Bites
- M&M's Milk, Peanut and Crispy
- Maltesers
- Menz Violet Crumble
- Mr Kipling Raspberry & Creme Whirls
- Mr Kipling Lemon Slices
- Loacker wafers and Tortina
- Woolworths Vanilla Creme Wafer Biscuits

Preference pattern:

- This is a very strong category, but should be treated as a treat/special category rather than a core grocery staple.
- Tim Tams, Arnott's cream biscuits, Cadbury, M&M's and wafer biscuits are especially relevant.
- The user likes variety in sweet snacks.
- Woolworths/Coles private-label wafers are acceptable.

Deal guidance:

- Only recommend branded chocolate/biscuits when on meaningful special.
- Half-price is the ideal trigger for Cadbury, M&M's, Tim Tam, Arnott's and premium wafer products.
- For sweet snacks, avoid "small discount pretending to be a bargain" recommendations.
- Mention if multiple favourites are on special in the same week.

### Frozen meals, pizza, ice cream and frozen snacks

The user buys:

- 400 Gradi pizzas
- Latina Lasagne with Angus Beef & Vegetables
- On The Menu Ricotta & Spinach Agnolotti
- Haldirams Cocktail Samosa
- Haldirams Onion Bhaji
- Haldirams Spinach Pakora
- Peters Maxibon Original
- Peters Maxibon Vanilla Slice
- Kinder Bueno Classic Cones
- Norco Cape Byron ice cream tubs
- Bulla ice cream sticks
- Proud & Punch frozen dessert sticks

Preference pattern:

- Frozen convenience and frozen desserts are relevant.
- 400 Gradi pizza is a strong brand signal.
- Maxibon, Kinder Bueno cones and Norco ice cream are good dessert signals.
- Haldirams frozen Indian snacks are relevant and should be watched for specials.

Deal guidance:

- Strong deal: half-price or substantial discount on premium frozen pizza, Maxibon, Kinder Bueno, Norco, Proud & Punch or Haldirams.
- Frozen products are stock-up friendly only if freezer space is assumed available.
- Do not recommend too many bulky frozen items at once unless the user asks for a freezer stock-up.

### Fresh produce and roasting vegetables

The user buys many fresh vegetables, especially:

- Sweet potatoes
- Carrots
- Zucchini
- Parsnips
- Pumpkin, including butternut and Kent
- Brown/red onions
- Broccoli
- Broccolini
- Brussels sprouts
- Spinach
- Silverbeet
- Cauliflower
- Garlic
- Asparagus
- Baby potatoes / red potatoes

Preference pattern:

- Strong pattern for practical vegetables, especially roast vegetables.
- Root vegetables and brassicas are a clear preference.
- Fresh produce is important but less suitable for "deal hunting" unless prices are clearly good.
- Coles and Woolworths private-label produce are both acceptable.

Deal guidance:

- Prioritise good seasonal specials, per-kg value and quality.
- Do not over-recommend large amounts of perishable produce.
- Call out when a deal supports an obvious meal pattern, e.g. roast vegetable tray, salmon + greens, dip/snack board.
- Avoid novelty produce unless heavily discounted or directly useful.

### Protein, seafood, meat and tofu

The user buys:

- Ocean Chef Atlantic Salmon Portions Skin On 1kg
- Woolworths Salmon Portions Skin On 280g x 2
- Woolworths Beef Porterhouse Steak with Herb & Garlic Butter 400g
- Coles Nature's Kitchen Firm Tofu 300g
- Sirena Italian Style Tuna Slices 125g
- Don Artusi Calabrese
- Don Artusi Smokehouse Leg Ham

Preference pattern:

- Salmon is the strongest protein signal.
- Frozen salmon portions are highly relevant.
- Tofu is relevant.
- Deli meats and tuna are occasional.
- Beef steak appears as an occasional treat/convenience item.

Deal guidance:

- Prioritise salmon when discounted, especially frozen portions with a strong unit price per kg.
- Tofu is useful when discounted but low urgency.
- Avoid recommending expensive fresh meat unless the discount is very strong.
- Compare unit price per kg carefully.

### Pantry, baking, breakfast and hot drinks

The user buys:

- La Espanola Extra Virgin Olive Oil
- CSR Caster Sugar
- Coles Sweetened Condensed Milk
- Kellogg's Crunchy Nut Corn Flakes
- Vittoria Freeze Dried Instant Decaf
- Higher Living Restful Nights Tea
- Woolworths Salted Cashews
- Woolworths Salted Mixed Nuts with Macadamia and Pistachio
- Woolworths Slivered Almonds

Preference pattern:

- Pantry staples are relevant but not as dominant as snacks, dairy, water and dips.
- Nuts are relevant.
- Decaf instant coffee and herbal/restful tea are specific signals.
- Baking staples appear occasionally.

Deal guidance:

- Olive oil, coffee, cereal, nuts and baking products are stock-up friendly.
- Strong deal: half-price cereal, coffee, nuts, tea or oils; meaningful unit-price discount on olive oil.
- Avoid recommending niche health-food pantry items without a clear match.

### Household grocery-adjacent consumables

The user buys:

- Quilton White 3 Ply Toilet Paper 24 pack
- Fab Fresh Blossoms Laundry Liquid 2L
- Ziploc Snack Bags
- Coles Baking Paper
- Coles Aluminium Foil
- Coles Cling Wrap
- Glad Garbage Bags, ForceFlex bags, kitchen tidy bags
- McLintocks Vanilla Fresh Fridge & Kitchen Wipe Trigger Spray
- Coles Ultra Quick Thick Eraser Block

Preference pattern:

- Household consumables are definitely in-scope.
- Toilet paper, laundry liquid, bags/wrap/foil and kitchen cleaning products should be tracked.
- These are practical stock-up categories when discounted.
- Brand matters less than unit price/pack format, except Quilton and Glad are known preference signals.

Deal guidance:

- Prioritise half-price or strong unit-price deals.
- Toilet paper: compare price per 100 sheets, not just pack price.
- Garbage bags: compare price per bag and strength/size.
- Laundry liquid: compare price per litre/wash.
- Foil, baking paper and cling wrap: compare price per metre.
- Do not recommend huge bulk packs unless the unit price is clearly good.

---

## Category priority ranking

Use this default category ranking when searching for weekly Coles/Woolworths specials.

### Tier 1: Highest relevance

1. Sparkling/mineral water and soda water
2. Western Star spreadable butter and practical dairy staples
3. Bread/toast and recurring bakery staples
4. Dips, hommus, tzatziki and salsa
5. Crackers, chips and savoury snacks
6. Lactose-free dairy and oat milk

### Tier 2: Strong relevance

7. Tim Tams, Arnott's biscuits, Cadbury/M&M's and wafer treats
8. Frozen pizza, frozen snacks and ice cream
9. Salmon, tofu and practical protein
10. Roast vegetables and fresh produce staples
11. Household consumables such as toilet paper, laundry, bags, foil and cleaning sprays

### Tier 3: Relevant but secondary

12. Pantry staples, baking items, cereal, nuts, oils, decaf coffee and tea
13. Deli meats and occasional chilled convenience foods
14. Premium treats only when heavily discounted

---

## Brand preference model

### Strong preferred brands

Treat these brands as high-fit when discounted:

- Western Star
- Arnott's
- Tim Tam
- Shapes
- Ritz
- Cadbury
- M&M's
- Maltesers
- Doritos
- CC's
- Kettle
- Thins
- Red Rock Deli
- Natural Chip Co.
- Willow Farm
- Philadelphia
- Liddells
- So Good
- Vitasoy
- 400 Gradi
- Haldirams
- Maxibon
- Kinder Bueno
- Norco
- Quilton
- Glad
- Ocean Chef
- Sirena
- Bega
- Kellogg's
- Vittoria
- La Espanola

### Store brands are acceptable

The user frequently buys Coles and Woolworths private-label products. Store brands should not be treated as inferior by default.

Store-brand products are especially acceptable for:

- Mineral/sparkling water
- Bread
- Fresh produce
- Dips
- Household consumables
- Crackers/rice crackers
- Dairy basics
- Baking and pantry staples

### Generic/private label vs branded rule

- For staples, compare unit price and suitability first.
- For treats, known branded products matter more.
- For household consumables, unit price and function matter more than brand.
- For lactose-free/oat products, known brand plus discount is a stronger signal.

---

## Deal quality rules

### Default rule

A grocery item is worth recommending only when one or more of these are true:

- It is a repeated exact product from the purchase list.
- It belongs to a repeated high-confidence category.
- It is a close substitute with clearly better unit price.
- It is a meaningful discount at Coles or Woolworths.
- It is stock-up friendly and below usual unit price.
- It combines naturally with another current special the user is likely to buy.

### Discount thresholds

Use these as guidance, but always check current Coles/Woolworths pricing:

- **Excellent deal:** 40–50% off, half-price, or unusually low unit price.
- **Strong deal:** 25–39% off on a high-fit product.
- **Useful deal:** 15–24% off on a staple the user buys frequently.
- **Weak deal:** less than 15% off, unless the product is a regular staple and the user likely needs it.
- **Ignore:** a fake-looking discount, inflated "was" price, or a product the user has no clear signal for.

### Unit price comparison is mandatory

Always compare unit prices where possible:

- Water: price per litre
- Butter/dairy/dips/snacks: price per 100g
- Milk/oat milk: price per litre
- Salmon/meat/produce: price per kg
- Toilet paper: price per 100 sheets
- Laundry liquid: price per litre or wash
- Garbage bags: price per bag
- Foil/baking paper/cling wrap: price per metre

Do not recommend an item purely because the shelf price is lower if the unit price is worse.

---

## Stock-up logic

### Safe to stock up

Recommend multiples when the deal is excellent and the item is:

- Shelf-stable
- Frozen
- Regularly consumed
- Not excessively bulky
- Clearly cheaper than usual

Good stock-up categories:

- Sparkling/mineral water, within storage reason
- UHT lactose-free milk
- Oat milk
- Crackers and chips
- Chocolate and biscuits
- Salsa and shelf-stable dips/sauces
- Peanut butter
- Coffee and tea
- Cereal
- Nuts
- Toilet paper
- Laundry liquid
- Garbage bags
- Foil, cling wrap and baking paper
- Frozen salmon, pizza, ice cream and Haldirams snacks, if freezer space permits

### Do not over-stock

Be cautious with:

- Fresh bread
- Fresh dips
- Fresh produce
- Cream, yoghurt and soft dairy
- Fresh meat
- Short-dated chilled convenience meals

For perishable items, recommend one or two unless the user explicitly asks for a larger grocery plan.

---

## Matching and substitution rules

### Exact match priority

An exact product from the purchase list should be ranked highly when discounted.

Example:

- Western Star Spreadable Blend Original Soft 500g
- Woolworths Sparkling Mineral Water 1.25L
- Arnott's Shapes Pizza 190g
- Ritz Original Crackers 227g
- Willow Farm Snacking Hommus 60g x 3
- Ocean Chef Atlantic Salmon Portions 1kg

### Close substitute priority

A close substitute is acceptable when:

- Same product type
- Similar size
- Same dietary fit, where relevant
- Better unit price
- Available at Coles or Woolworths

Examples:

- Coles Natural Mineral Water ↔ Woolworths Sparkling Mineral Water
- Coles Hommus ↔ Willow Farm Hommus
- Doritos Salsa ↔ Coles/Woolworths salsa
- Tip Top/Wonder/Woolworths white toast bread
- Vitasoy oat milk ↔ So Good oat milk, depending on price
- Coles/Woolworths fresh roast vegetables, depending on seasonal price

### Do not overgeneralise

Do not assume the user wants all products in a broad category.

Examples:

- Buying oat milk does not mean recommend every plant-based milk.
- Buying frozen pizza does not mean recommend every frozen meal.
- Buying salmon does not mean recommend all seafood.
- Buying Tim Tams does not mean recommend every biscuit.
- Buying household consumables does not mean recommend random cleaning gadgets.

---

## Store-specific behaviour

### Coles

Prioritise Coles when:

- The exact item is Coles-only or Coles private-label.
- The user has bought the item at Coles.
- Coles has a better unit price or half-price special.
- Flybuys/personalised offers are relevant, if the user provides them.

Likely Coles-fit examples:

- Coles Natural Mineral Water
- Coles Soda Water
- Coles Lactose Free Long Life Milk
- Coles Hommus/Tzatziki
- Coles fresh vegetables
- Coles household wrap/foil/baking paper/garbage products
- Coles Nature's Kitchen tofu
- On The Menu / Latina / 400 Gradi where ranged

### Woolworths

Prioritise Woolworths when:

- The exact item is Woolworths-only or Woolworths private-label.
- The user has bought the item at Woolworths.
- Woolworths has a better unit price or half-price special.
- Everyday Rewards/personalised offers are relevant, if the user provides them.

Likely Woolworths-fit examples:

- Woolworths Sparkling Mineral Water
- Woolworths White Soft Toast Bread
- Willow Farm dips
- Woolworths fresh produce
- Woolworths nuts
- Woolworths Vanilla Creme Wafer Biscuits
- Ocean Chef salmon portions
- Quilton, Fab, Glad, Arnott's and other national brands when on special

---

## Output format for deal recommendations

When recommending deals, use this structure.

### Single best deal

```markdown
## Best grocery deal found

**Item:** [Product name]
**Store:** Coles / Woolworths
**Current price:** $X
**Was/typical price:** $Y, if available
**Discount:** X% off, if available
**Unit price:** $X per unit
**Why it fits:** [Connect directly to purchase history/frequency]
**Stock-up recommendation:** Buy 1 / buy 2 / stock up / skip unless needed
**Caveats:** [Perishability, freezer space, pack size, dietary mismatch, etc.]
**Verdict:** Buy / maybe / skip
```

### Multi-item grocery deal list

For multiple recommendations, group items by use case:

1. **Staples worth buying now**
2. **Snack specials**
3. **Freezer deals**
4. **Household consumables**
5. **Fresh items only if needed this week**

Avoid a giant undifferentiated list. The user wants useful deals, not a supermarket confetti cannon.

---

## Ranking formula

When choosing what to recommend, score each candidate deal approximately as follows:

- **Purchase frequency match:** 0–35 points
- **Exact product or close substitute:** 0–20 points
- **Deal strength / discount depth:** 0–20 points
- **Unit price competitiveness:** 0–15 points
- **Stock-up practicality:** 0–10 points
- **Penalty for perishability or poor fit:** 0 to -20 points

### Frequency scoring

- Exact repeated item: +30 to +35
- Repeated category and known brand: +20 to +30
- Repeated category but new brand: +12 to +20
- One-off item from purchase list: +5 to +12
- No purchase signal: 0 to +5 only if the deal is exceptional and adjacent to known preferences

### Perishability adjustment

- Shelf-stable: no penalty
- Frozen: small penalty unless freezer space is a concern
- Short-dated chilled: moderate penalty
- Fresh produce: only recommend when likely useful this week
- Bread: recommend cautiously unless freeze-friendly

---

## Negative guidance

Do not recommend:

- Random premium grocery products just because they are discounted.
- Health-food products with no signal unless clearly adjacent to oat milk, nuts, tea, or lactose-free patterns.
- Large amounts of perishable fresh food.
- Unusually large bulk buys from non-supermarket retailers unless the unit price is clearly excellent.
- Items that only look cheap because of a smaller pack size.
- Alcohol, nicotine, supplements, prescription items or restricted goods unless explicitly asked and policy-permitted.
- Pink/feminine-coded personal items from the shared Amazon account logic; this grocery skill is based on the supplied recent grocery list, not the entire Amazon account.

---

## Practical search strategy for agents

When using this skill:

1. Search current Coles specials for exact repeat items.
2. Search current Woolworths specials for exact repeat items.
3. Compare Coles and Woolworths unit prices.
4. Check high-frequency categories:
   - water
   - Western Star butter
   - bread
   - dips/hommus/salsa
   - Shapes/Ritz/chips
   - Tim Tams/Arnott's/Cadbury/M&M's
   - lactose-free/oat dairy
   - frozen pizza/ice cream
   - salmon
   - toilet paper/laundry/garbage bags
5. Ignore weak specials unless they are a staple.
6. Prefer one excellent recommendation over a long list of okay discounts.
7. Always explain why the deal fits the user's actual purchase behaviour.

---

## Quick preference summary

The user's grocery profile:

- Practical staple buyer with recurring water, bread, butter, dairy and household consumables.
- Strong snack pattern: crackers, chips, dips, salsa, Tim Tams, Arnott's, Cadbury and wafers.
- Strong lactose-free and oat milk signal.
- Likes roast vegetables and practical fresh produce.
- Buys frozen convenience foods and frozen desserts, especially pizza, Maxibon/Kinder/Norco-style treats and Haldirams snacks.
- Salmon is the strongest protein signal.
- Store brands are accepted when value is good.
- Best recommendations are usually Coles/Woolworths specials on known repeat products, especially when the unit price is clearly strong.

The agent should optimise for: **repeat behaviour + current discount + unit price + stock-up practicality**.

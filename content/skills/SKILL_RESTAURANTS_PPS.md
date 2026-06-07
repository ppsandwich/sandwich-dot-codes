# SKILL_RESTAURANTS_PPS.md

## Purpose

Use this skill whenever selecting, ranking, comparing, or explaining nearby places for Dylan to eat.

This skill is **not** a fast-food-only recommendation rulebook. Dylan supplied a ranked list of Australian fast-food and casual chain restaurants as evidence of his broader eating preferences. Treat that ranking as a taste signal: it helps infer what kinds of food, formats, flavours, value cues, and dining experiences are likely to work for him.

The goal is to recommend places that Dylan is likely to genuinely enjoy, not just places that are popular, highly rated, or conveniently nearby. A 4.7-star café serving polite beige toast may still be the wrong answer. Dinner should not feel like a meeting that accidentally came with chips.

## Core decision principles

When choosing places for Dylan, optimise for:

1. **Flavour first.** Prioritise places with bold, satisfying, well-seasoned food over places that mostly look nice in photos.
2. **Practical proximity.** Dylan would rarely drive more than **15 minutes** for a normal meal.
3. **Occasion awareness.** Longer travel can make sense if he is meeting someone there, it is a special occasion, or the place is clearly worth the trip.
4. **Substantial meals.** Favour meals that feel like dinner: protein, carbs, sauce, crunch, char, spice, cheese, gravy, rice, bread, potatoes, noodles, or something similarly useful.
5. **Casual comfort over ceremony.** Dylan’s preferences lean toward casual, generous, high-flavour food rather than formal dining, precious plating, or places where the menu appears to have been written by a fog machine.
6. **Use rankings as evidence, not limits.** The chain ranking should inform the agent’s taste model, but the agent should freely recommend independents, pubs, bakeries, charcoal chicken shops, pizza shops, burger shops, Lebanese places, Korean chicken, Mexican-ish places, noodle shops, cafés, food trucks, restaurants, and takeaway spots.
7. **Avoid truffle completely.** Dylan hates truffles. Do not recommend places or dishes where truffle or truffle oil is a feature.

## Distance and travel rules

For ordinary meals:

- Prioritise places within **0–15 minutes’ drive**.
- A slightly weaker place 8 minutes away will often beat a theoretically better place 28 minutes away.
- Do not recommend a faraway place unless the extra travel has a clear payoff.

For special cases:

- For meeting friends, special occasions, unusually strong craving matches, excellent reputation, or hard-to-find cuisine, recommendations can stretch beyond 15 minutes.
- When stretching the radius, explain why it is worth the extra travel.
- If the user asks for “nearby” or gives no location, use their current location if available. Dylan lives in **Croydon, Victoria**, so Croydon and nearby eastern suburbs are likely relevant when no better location is supplied.

## Chain ranking evidence

Dylan provided the following ranking of Australian fast food / casual restaurant chains. Interpret these as taste evidence.

### S-tier examples

- Crust Pizza
- Grill'd
- Nando's
- Spudbar
### A-tier examples

- Betty's Burgers
- Chicken Treat
- El Jannah
- Guzman y Gomez
- McDonald's Australia
- Nene Chicken
- Noodle Box
- Oporto
- Salsa's Fresh Mex Grill
- Schnitz
### B-tier examples

- Bakers Delight
- Domino's
- Hungry Jack's
- KFC
- Mad Mex (Australia)
- Pizza Capers
- Red Rooster
- Zambrero
### C-tier examples

- Baskin-Robbins Australia
- Brumby's Bakeries
- Bucking Bull
- Carl's Jr
- Donut King
- Hudsons Coffee
- Krispy Kreme
- Starbucks
- Subway
### D-tier examples

- Breadtop
- Cold Rock Ice Creamery
- Gloria Jean's Coffees
- Hog's Breath Cafe
- La Porchetta
- Michel's Patisserie
- Pancake Parlour
- Pizza Hut
- Taco Bell
- Taco Bill
- The Coffee Club
- Wendy's Milk Bar

## What the ranking implies

### Strong positive signals

The S and A tiers suggest Dylan is drawn to:

- **Char, flame, smoke, and grill flavour:** Nando’s, Grill’d, Oporto, El Jannah, Chicken Treat.
- **Chicken with proper seasoning:** peri-peri, charcoal chicken, Korean fried chicken, schnitzel, Portuguese-style chicken, Lebanese garlic-heavy chicken.
- **Burgers when they are a bit more considered:** Grill’d and Betty’s perform well; this suggests burgers are welcome when they feel fresh, structured, saucy, and not like a sad patty in a warm filing cabinet.
- **Mexican-ish comfort food:** Guzman y Gomez and Salsa’s rank well; Mad Mex and Zambrero are still acceptable. Burritos, bowls, nachos, tacos, grilled meats, salsa, beans, rice, and hot sauce are good directions.
- **Loaded carbs:** Spudbar, Crust, Noodle Box, Schnitz, GYG, Noodle Box, pizza, potatoes, noodles, rice, flatbread, wraps, burgers, and chips all point to a preference for filling, meal-like formats.
- **Big sauces and condiments:** peri-peri, garlic sauce, burger sauce, chilli sauce, gravy, aioli, salsa, yoghurt, tahini, cheese, hot honey, peppercorn, red wine jus, curry sauces.
- **Casual chains that feel purposeful:** The best-ranked chains generally have a clear reason to exist: flame-grilled chicken, better burgers, loaded potatoes, Lebanese chicken, Korean chicken, burritos, schnitzel.

### Moderate positive signals

B-tier chains suggest Dylan can enjoy mainstream fast food when it meets the immediate need:

- Pizza can work, especially if toppings are generous and the base is decent.
- Fried chicken can work, but quality and seasoning matter.
- Bakery options can work when they are practical and savoury.
- Mexican-style chains remain viable, though not all are equal.
- Familiar fast food is acceptable when convenience, consistency, or craving fit the moment.

### Weak or negative signals

C and D tiers suggest caution with:

- **Dessert-first chains:** ice cream, doughnuts, and sweet chains are not usually meal recommendations.
- **Generic coffee chains and bland cafés:** avoid defaulting to coffeehouse food unless the request is specifically café-related.
- **Old-fashioned family restaurant chains:** Hog’s Breath, Pancake Parlour, La Porchetta, Taco Bill, and similar places are poor defaults unless there is a very specific nostalgic or group-dining reason.
- **Underwhelming pizza or faux-Mex:** Pizza Hut, Taco Bell, and Taco Bill ranking low suggests Dylan dislikes versions that feel thin, generic, or not worth the meal.
- **Bakery/patisserie chains as meals:** Breadtop, Michel’s, Brumby’s, and similar are not strong dinner options unless the user specifically wants a snack or bakery item.

## Cross-reference with home-cooking preferences

Dylan’s recipe preferences reinforce the restaurant model. He likes:

- Big savoury comfort food.
- Strong sauces, glazes, gravies, curries, spice mixes, cheese, chutneys, salsas, yoghurt sauces, tahini, garlic sauces, and crunchy toppings.
- Chicken, beef, lamb, pork, sausage, salmon, barramundi, white fish, and substantial vegetarian meals when they have proper seasoning and texture.
- Rice, pasta, gnocchi, mash, potatoes, flatbread, nachos, tacos, noodles, pilaf, pizza, bread, pastry, and gratins.
- Spanish, Italian, Greek, Mexican-ish, Korean-ish, Indian-ish, Thai-ish, Middle Eastern-ish, French bistro-ish, pub-style, and barbecue flavour directions.
- Sweet-savoury when balanced with salt, acid, chilli, herbs, char, or umami.
- Tangy/fresh finishes that cut richness: lemon, yoghurt, salsa, cucumber, onion salad, avocado, tahini, herbs, gremolata, feta.
- Crispy or textural contrast: schnitzel, crispy pork, crispy fish, fried chicken, nachos, filo, gratins, crumbed meat, toasted bread.

Use this as a flavour matrix when evaluating restaurants. The best recommendations will often sit at the intersection of **comfort + flavour hook + practical distance**.

## Restaurant types to prioritise

When choosing nearby places, look first for:

- Charcoal chicken shops, especially with garlic sauce, chips, salads, and flatbread.
- Lebanese and Middle Eastern casual places.
- Korean fried chicken or Korean casual dining.
- Portuguese chicken, peri-peri chicken, and grilled chicken.
- Better burger shops with strong sauces and proper chips.
- Mexican-ish or Tex-Mex places with burritos, bowls, nachos, tacos, grilled meats, beans, rice, salsa, and hot sauce.
- Pizza shops with generous toppings, good cheese, and non-sad bases.
- Pub meals when they offer schnitzel, parma, steak, burgers, pies, gravy, mash, or solid specials.
- Thai, Malaysian, Vietnamese, Indonesian, or noodle/rice places with strong sauces and proper seasoning.
- Indian, Pakistani, Sri Lankan, or Nepalese places with curries, tandoori, biryani, naan, and rice.
- Greek or souvlaki places with grilled meat, chips, pita, garlic/lemon/yoghurt flavours.
- Pasta, ragu, gnocchi, risotto, and Italian comfort food when the place looks strong rather than generic.
- Fish and chips or seafood places when freshness, crunch, lemon, tartare, and potato are likely to land.
- Loaded potatoes, baked potatoes, jacket potatoes, or similar carb-forward comfort meals.
- Bakeries only when the savoury options are substantial: pies, sausage rolls, focaccia, toasties, schnitzel rolls, banh mi-style rolls, or hot pastries.

## Places and dishes to avoid or de-prioritise

Avoid recommending by default:

- Truffle dishes or venues that use truffle as a major selling point.
- Places that are mostly about visual presentation.
- Generic chain cafés unless the user specifically wants coffee or café food.
- Dessert chains as meal suggestions.
- Bland “healthy bowl” places unless they have strong sauces, char, spice, protein, and satisfying carbs.
- Restaurants where the main appeal is being fancy, clean, minimalist, or Instagrammable.
- Under-seasoned roast vegetable bowls, plain sandwiches, plain salads, plain grilled protein, or anything that sounds like a spreadsheet has become lunch.
- Long-drive recommendations for ordinary meals.
- Places that appear to have poor recent reviews around food quality, consistency, hygiene, or service wait times.

## How to evaluate options

When comparing restaurants, score each option across these factors:

### 1. Taste match

High score if the venue has:

- Chargrilled, fried, roasted, saucy, cheesy, spicy, smoky, tangy, garlicky, or crispy food.
- Strong protein-and-carb meal formats.
- Food similar in spirit to S/A-tier chain preferences, even if independent.

Low score if it is:

- Bland, light, mostly sweet, mostly coffee, mostly visual, overly precious, or generic.

### 2. Convenience

High score if:

- Within 15 minutes’ drive for an ordinary meal.
- Open now or at the intended meal time.
- Easy parking or pickup.
- Menu is easy to parse.
- Good takeaway suitability if relevant.

Low score if:

- Too far away for a normal meal.
- Hard to park.
- Limited hours.
- Requires booking for casual eating.
- Has a fussy ordering experience.

### 3. Meal usefulness

High score if:

- Dylan can get a full, satisfying meal there.
- There are multiple likely-good options.
- Leftovers or takeaway hold up well.
- The food is not dependent on perfect plating.

Low score if:

- It is snack-only, dessert-only, or coffee-focused.

### 4. Reliability

High score if:

- Recent reviews are consistently good.
- The menu has a clear identity.
- Photos and reviews suggest generous, well-seasoned food.
- The place seems good at a specific thing.

Low score if:

- Recent reviews mention blandness, shrinking portions, inconsistent quality, cold food, excessive waits, or poor value.

## Recommendation format

When recommending places, be practical and opinionated. Do not just list nearby restaurants.

For each recommendation, include:

- **Place name**
- **Why it fits Dylan’s preferences**
- **What to order**, ideally 1–3 specific dishes or dish types
- **Distance/travel note**, especially if beyond 15 minutes
- **Confidence level**, based on how well it matches the preference matrix

Useful phrasing:

- “Best match if you want…”
- “Worth it because…”
- “Probably skip unless…”
- “Good lazy-dinner option.”
- “Stronger flavour match than it looks.”
- “This is more of a convenience pick than a cravings pick.”

## Ranking guidance

When asked to choose between options:

- Prefer S/A-style flavour matches over generic high ratings.
- Prefer strong independent equivalents over weaker chains.
- Prefer practical nearby options unless the user says the occasion justifies a longer drive.
- Recommend one clear winner when possible.
- If options are close, rank them by: flavour fit, likely satisfaction, travel time, reliability, and occasion fit.

## Using web/current information

When making real restaurant recommendations, use current information where possible:

- Check whether the place is still open.
- Check current hours.
- Check distance/travel time from the user’s location.
- Check recent reviews or menus if available.
- Do not rely only on old memory of restaurants or chains.
- If location is uncertain, ask for or infer the relevant suburb, but default to Croydon VIC only when that is the best available context.

## What good recommendations feel like

A strong recommendation for Dylan might be:

- “Nearby charcoal chicken with garlic sauce and chips.”
- “Korean fried chicken with proper crunch and a spicy-sweet glaze.”
- “A burger place where the sauce and chips are doing actual work.”
- “A Thai place with rich curry, noodles, or stir-fry rather than a polite salad situation.”
- “A pub parma or schnitzel that looks like it understands gravy as a public good.”
- “A pizza shop with generous toppings and enough cheese to make the box structurally relevant.”
- “A Middle Eastern grill plate with chicken, garlic, pickles, chips, bread, and something sharp on the side.”

A weak recommendation would be:

- “A photogenic café with tiny portions.”
- “A dessert chain for dinner.”
- “A generic coffee chain toastie.”
- “A health bowl with steamed vegetables and no sauce.”
- “A restaurant 35 minutes away for a normal Tuesday meal.”
- “Anything involving truffle.”

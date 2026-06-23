# SKILL_BARGAIN-HUNTING.md

## Purpose

Use this skill when an agent needs to evaluate whether a product listed online could reasonably be purchased and resold for profit.

This skill is designed for automated or semi-automated bargain-hunting workflows that search online marketplaces, classifieds, auction sites, clearance sales, and retailer listings, then alert Dylan when a product appears meaningfully underpriced.

The goal is not to find anything that is merely cheap. The goal is to identify listings where the expected resale outcome is favourable after accounting for:

- market variability
- available benchmark data
- total landed cost
- resale platform fees
- postage, packaging, fuel, storage, and time costs
- risk of scams, faults, counterfeits, missing parts, poor condition, or misleading listings
- resale liquidity and buyer demand
- time-to-sale
- price negotiation and return/refund risk
- the chance that the item is a trap wearing a discount sticker

The agent should behave like a sceptical resale analyst, not a motivational arbitrage goblin.

---

## When To Use This Skill

Use this skill when the user asks about:

- bargain hunting
- online marketplace flips
- resale opportunities
- whether an item is underpriced
- whether a product could be bought and sold for profit
- automated alerts for deals
- marketplace scanning workflows
- eBay / Facebook Marketplace / Gumtree / Amazon / clearance resale analysis
- sourcing products to resell
- evaluating liquidation, clearance, open-box, or second-hand listings
- comparing purchase price against resale value

This skill can also be used as a scoring layer inside automated workflows where an agent searches listings and decides whether to alert Dylan.

---

## Core Principle

A product is only a bargain if it survives the full resale equation.

A low asking price is not enough.

The agent must estimate:

```text
Expected Profit = Expected Resale Proceeds - Total Landed Cost - Resale Costs - Risk Adjustment - Time/Friction Cost
```

Where:

```text
Expected Resale Proceeds = Realistic Resale Price × Probability of Sale
```

The agent should prefer conservative estimates. If the profit only exists under optimistic assumptions, mark it as speculative or skip it.

---

## Default Geography and Market Assumptions

Unless the user says otherwise, assume Dylan is in **Melbourne, Victoria, Australia**.

Default market context:

- Australian resale market first.
- Melbourne pickup/local resale is often relevant.
- Shipping within Australia may be viable depending on item size and value.
- International resale should be treated as higher friction unless clearly justified.
- Currency should be AUD unless stated otherwise.

Common Australian sourcing and resale channels may include:

- Facebook Marketplace
- Gumtree
- eBay Australia
- Cash Converters
- Amazon Australia clearance / warehouse-style listings where available
- Retailer clearance pages
- JB Hi-Fi, Officeworks, Bunnings, Big W, Kmart, Target, Myer, David Jones, Catch, Kogan, The Gamesmen, EB Games, LEGO retailers, camera/music/computer retailers
- Specialist marketplaces for collectibles, music gear, photography, electronics, LEGO, trading cards, and hobby gear

The agent must verify current fees, shipping costs, platform policies, and buyer-protection rules before relying on them. These change. Do not hardcode old fee assumptions as permanent truth.

---

## Hard Safety and Legality Boundaries

Do not recommend buying or reselling:

- stolen goods
- counterfeit goods
- weapons or restricted weapons
- firearms, ammunition, explosives, fireworks, knives, tasers, or regulated self-defence items
- alcohol, nicotine, vapes, recreational drugs, CBD/THC products, or controlled substances
- prescription medicines or restricted medical products
- unsafe electrical goods without compliance markings
- recalled products
- hazardous chemicals or dangerous goods
- wildlife, ivory, protected species products, or environmental contraband
- surveillance spyware or malicious software
- adult sexual products
- gambling devices or services
- extremist or terrorist merchandise
- items that clearly violate marketplace policies

If a listing appears suspicious, stolen, counterfeit, unsafe, or illegal, the agent should reject it. Profitability does not matter if the item is a legal or ethical landmine.

---

## Research Requirement

Before recommending a product as a resale opportunity, the agent must research the market thoroughly enough to form a defensible view.

The agent should collect evidence across these categories where available:

1. **Sold prices**
   - Completed sales are much stronger evidence than active listings.
   - Prefer recent sold listings from the same country or region.
   - eBay sold/completed listings are often useful.
   - Auction results, specialist marketplaces, and forum sale posts may help for collectibles and niche gear.

2. **Active asking prices**
   - Active listings show competition, not value.
   - Treat active prices as ceiling evidence unless items are demonstrably selling.
   - A dozen optimistic sellers all asking too much does not create a market. It creates a choir of wishful thinking.

3. **Retail replacement price**
   - Useful for new, sealed, current-model, or warranty-backed goods.
   - Less useful for used, obsolete, or condition-sensitive items.

4. **Demand and liquidity**
   - Number of active listings.
   - Number of sold listings.
   - Sell-through rate.
   - Time-on-market where visible.
   - Search popularity, forum activity, social demand, or collector interest.

5. **Condition benchmarks**
   - Compare like with like: new, sealed, open-box, used, damaged, parts-only, missing accessories, refurbished, grey import, warranty status.

6. **Authenticity and scam risk**
   - Check for known counterfeit-prone categories.
   - Review seller credibility and listing details.
   - Look for mismatched photos, stock images, vague descriptions, too-low pricing, off-platform payment requests, and urgency pressure.

7. **Resale costs and friction**
   - Platform fees.
   - Payment processing fees.
   - Shipping.
   - Packaging.
   - Insurance/tracking/signature.
   - Fuel or travel time for pickup.
   - Cleaning/testing/refurbishment.
   - Storage burden.
   - Returns, disputes, and chargeback risk.

8. **Current policy and fee checks**
   - If using a platform such as eBay, Amazon, Gumtree, or Facebook Marketplace, verify current relevant fees and policies before calculating expected profit.

If the agent cannot find enough benchmark data, it must say so and lower confidence.

---

## Evidence Quality Levels

Use this hierarchy when judging data quality.

### Level A — Strong Evidence

Strong evidence includes:

- 5+ recent sold listings for the same model/SKU in the same market.
- Similar condition and included accessories.
- Clear photos and descriptions.
- Recent sale dates, ideally within 90 days.
- Stable price range.
- Evidence of demand and sell-through.

Use Level A evidence for high-confidence alerts.

### Level B — Moderate Evidence

Moderate evidence includes:

- 2–4 recent sold listings.
- Some condition variation.
- Similar but not identical model.
- Active listings supported by a few sales.
- Market appears real but not deeply liquid.

Use Level B evidence for watchlist or medium-confidence alerts.

### Level C — Weak Evidence

Weak evidence includes:

- Active listings only.
- Old sold listings.
- Different country or region.
- Similar model but not exact.
- Small niche market with uncertain liquidity.
- Prices vary wildly.

Use Level C evidence only for speculative opportunities.

### Level D — Insufficient Evidence

Insufficient evidence includes:

- No recent sold listings.
- No comparable model data.
- Highly customised, damaged, incomplete, or obscure item.
- Listing photos or description too poor to judge.

Do not recommend as a buy unless the price is extremely low, downside is capped, and the agent clearly labels it as speculative.

---

## Product Category Risk Model

Different categories have different resale behaviour. The agent must adjust risk and confidence by category.

### Lower-Risk / Easier-to-Benchmark Categories

These categories are often easier to benchmark when model numbers are clear:

- mainstream consumer electronics
- gaming consoles and accessories
- current or recent Apple/Samsung/Google devices
- LEGO sets with known set numbers
- sealed trading card accessories or reputable sealed product
- cameras and lenses with exact model names
- audio gear with clear model names
- computer components with clear specs
- tools from reputable brands
- popular small appliances with model numbers

Still verify condition, authenticity, warranty, and demand.

### Higher-Risk / Condition-Sensitive Categories

Be more cautious with:

- laptops, phones, tablets, and consoles with battery/lock issues
- headphones and earbuds due to hygiene, battery wear, and counterfeits
- cameras with shutter count, fungus, scratches, or sensor damage
- lenses with dust, haze, fungus, scratches, decentering, or sticky aperture blades
- 3D printers due to wear, tinkering, missing parts, and calibration issues
- musical instruments and DJ gear due to wear, faults, and missing cables/software licences
- appliances due to size, faults, transport risk, and safety compliance
- furniture due to transport, storage, condition, and slow resale
- collectibles with grading/authenticity issues
- designer goods due to counterfeit risk

### Very High-Risk / Usually Skip

Usually skip unless there is exceptional evidence and low downside:

- luxury fashion and designer bags
- sneakers and hype streetwear
- perfumes and cosmetics
- supplements or health products
- unknown-brand electronics
- high-value storage media from marketplace sellers
- items with missing serial numbers
- anything sold as “untested” but priced as working
- locked phones, activation-locked devices, carrier-locked devices, or devices with unknown IMEI status
- items requiring expensive specialist testing before resale

---

## Total Landed Cost

The agent must calculate total landed cost, not just purchase price.

Include:

```text
Total Landed Cost = Asking Price
                  + Purchase Platform Fees
                  + Buyer Premiums
                  + Payment Fees
                  + Shipping
                  + Insurance
                  + Packaging
                  + Pickup Fuel / Travel Cost
                  + Required Accessories / Parts
                  + Cleaning / Testing / Repair Costs
                  + Currency Conversion Fees
                  + Import Duties / GST, if relevant
```

For local pickup:

- Include realistic travel time and fuel cost.
- Consider whether the seller’s location is practical from Melbourne eastern suburbs if no other location is given.
- A cheap item two hours away is often not cheap. It is just far away with confidence.

For shipped items:

- Include shipping cost.
- Include insurance/signature for fragile or high-value items.
- Consider damage-in-transit risk.
- Consider whether the seller packs items reliably.

---

## Resale Cost Model

When estimating resale profit, include likely resale costs.

Potential resale costs:

- marketplace seller fees
- payment processing fees
- promoted listing fees, if needed
- postage to buyer
- packaging materials
- insurance or signature delivery
- return postage risk
- refund/chargeback risk
- cleaning/testing time
- photography/listing time
- storage time
- price negotiation margin
- tax/accounting implications, if applicable

The agent should verify current platform fee structures before using exact percentages.

If exact fees are unknown, use conservative estimates and label them as estimates.

---

## Expected Profit Calculation

Use conservative calculation by default.

### Step 1: Estimate Realistic Resale Price

Prefer the lower-middle of recent sold comps, not the highest comp.

Default:

```text
Realistic Resale Price = 25th to 50th percentile of recent comparable sold prices
```

Use a higher estimate only when:

- the item is clearly better condition
- includes valuable accessories
- is new/sealed
- has warranty
- has unusually strong demand
- has local scarcity

### Step 2: Estimate Resale Proceeds

```text
Net Resale Proceeds = Realistic Resale Price - Seller Fees - Payment Fees - Outbound Shipping Subsidy - Other Resale Costs
```

If buyer pays shipping separately, still account for packaging and shipping risk.

### Step 3: Estimate Profit Before Risk

```text
Gross Expected Profit = Net Resale Proceeds - Total Landed Cost
```

### Step 4: Apply Risk Adjustment

Risk adjustment should reflect probability of fault, scam, counterfeit, return, non-sale, price drop, or unexpected cost.

```text
Risk-Adjusted Profit = Gross Expected Profit - Risk Buffer
```

Risk buffer should increase when:

- item is untested
- listing has poor photos
- seller has low credibility
- category is counterfeit-prone
- condition is unclear
- benchmark data is weak
- item is fragile, bulky, or expensive to ship
- resale market is slow
- item may need repair, parts, batteries, cleaning, or specialist knowledge

### Step 5: Compare Against Minimum Profit Threshold

Do not alert Dylan for tiny theoretical profit.

Default thresholds:

| Total Landed Cost | Minimum Risk-Adjusted Profit | Minimum Margin |
|---:|---:|---:|
| Under $50 | At least $20 | At least 40% |
| $50–$150 | At least $35 | At least 30% |
| $150–$500 | At least $75 | At least 25% |
| $500–$1,000 | At least $150 | At least 20% |
| $1,000+ | At least $250 | At least 18% |

Use the stricter of dollar profit and percentage margin.

If the item is high-friction, bulky, fragile, counterfeit-prone, or slow-moving, require a higher margin.

---

## Confidence Scoring

Every opportunity should receive a confidence score.

Use:

```text
Confidence = Evidence Quality + Listing Quality + Demand + Condition Certainty + Cost Certainty - Risk Factors
```

### Confidence Labels

#### High Confidence

Use only when:

- exact model is identified
- multiple recent sold comps exist
- condition is clear
- seller appears credible
- total landed cost is known
- resale costs are known or easy to estimate
- demand is strong
- risk-adjusted profit exceeds threshold comfortably

#### Medium Confidence

Use when:

- model is probably correct
- some sold comps exist
- condition is mostly clear
- demand appears reasonable
- profit exceeds threshold but not dramatically
- some costs or risks remain uncertain

#### Low Confidence

Use when:

- model or condition is uncertain
- evidence is weak
- market is volatile
- risk-adjusted profit barely clears threshold
- scam/fault/counterfeit risk is meaningful

Low confidence items should usually be watchlist-only, not urgent-buy alerts.

#### Reject

Use when:

- likely profit is too low
- evidence is insufficient
- risk is too high
- item is illegal/unsafe/restricted
- listing looks like a scam
- item is too hard to resell
- total landed cost removes the bargain

---

## Bargain Score

For automated workflows, calculate a 0–100 Bargain Score.

Suggested scoring:

| Factor | Points |
|---|---:|
| Expected risk-adjusted profit | 0–25 |
| Margin after all costs | 0–20 |
| Evidence quality / benchmark confidence | 0–15 |
| Demand / liquidity | 0–15 |
| Listing quality and condition certainty | 0–10 |
| Seller credibility and scam resistance | 0–10 |
| Ease of resale / shipping / storage | 0–5 |

### Score Interpretation

| Score | Label | Action |
|---:|---|---|
| 85–100 | Strong Buy Candidate | Alert immediately if no major unresolved risks |
| 70–84 | Good Candidate | Alert with caveats |
| 55–69 | Watchlist | Alert only if user wants broader opportunities |
| 40–54 | Speculative | Do not alert by default |
| 0–39 | Reject | Ignore |

### Automatic Rejection Overrides

Set score to 0 or Reject if:

- item is prohibited or unsafe
- likely stolen or counterfeit
- seller demands off-platform payment for shipped item
- seller refuses basic verification for high-value item
- model cannot be identified
- item is activation locked, account locked, or IMEI/serial status unknown where relevant
- total landed cost is unknown and cannot be estimated
- expected profit is negative after conservative costs

---

## Listing Quality Checklist

Assess every listing for:

### Product Identification

- Exact model/SKU/set number visible?
- Brand and variant clear?
- Serial number shown or available where relevant?
- Accessories included?
- Warranty or proof of purchase available?
- Region/version compatible with Australian buyers?

### Condition

- New/sealed/open-box/used/refurbished/parts-only?
- Clear photos of all sides?
- Damage disclosed?
- Missing parts disclosed?
- Battery health known where relevant?
- Tested and working?
- Smoke/pet/water exposure relevant?

### Seller Credibility

- Account age and history?
- Reviews/feedback?
- Realistic location?
- Normal communication?
- Willing to answer questions?
- Willing to provide proof of operation?
- Avoids pressure tactics?

### Listing Red Flags

Reject or heavily penalise if:

- price is far below market with no explanation
- stock photos only
- vague description
- mismatched photos
- seller refuses inspection/pickup for local item
- seller demands deposit to hold a common item
- seller requests PayID, bank transfer, crypto, gift cards, or off-platform payment before inspection/shipping
- urgency pressure
- profile is brand new
- seller name/details look unnatural
- “not a scam” style reassurance
- location is vague or changes
- high-value item with no proof of purchase or serial verification

---

## Condition Adjustment Guide

Adjust benchmark values based on condition.

| Condition | Resale Value Adjustment |
|---|---:|
| New sealed, local warranty | 90–100% of current market resale value |
| Open box, complete | 80–90% |
| Used excellent, complete | 70–85% |
| Used good, minor wear | 60–75% |
| Used fair, visible wear | 45–65% |
| Missing accessories | subtract replacement cost + friction penalty |
| Untested | 20–50%, category dependent |
| For parts / damaged | parts-market only; do not compare to working comps |
| Refurbished | depends heavily on refurbisher credibility and warranty |

Do not compare a scratched, untested, charger-missing item to a mint boxed sold listing and call it profit. That is how drawers become museums of regret.

---

## Demand and Liquidity

Profit is not real until someone buys the item.

Assess expected interest using:

- recent sold listings
- ratio of sold listings to active listings
- number of watchers/views if available
- popularity of model/category
- seasonality
- local scarcity
- collector demand
- upcoming product releases or replacements
- whether the item is easy to ship nationally
- whether buyers prefer warranty/new for the category

### Liquidity Labels

#### Fast-Moving

Likely sale within days to 2 weeks if priced fairly.

Examples may include current consoles, popular LEGO sets, Apple devices, popular camera lenses, desirable audio gear, popular tools, and high-demand computer parts.

#### Moderate

Likely sale within 2–6 weeks.

Examples may include niche music gear, older electronics, mid-range cameras, non-current LEGO, hobby tools, and some collectibles.

#### Slow

May take months or require the right buyer.

Examples may include bulky furniture, obscure collectibles, older appliances, niche industrial tools, unusual musical instruments, and incomplete sets.

Slow items require much higher margins.

---

## Market Variability and Volatility

The agent must consider whether the market is stable.

Increase caution when:

- prices vary widely between sold listings
- new model has recently launched
- category is hype-driven
- retailer clearance is widespread
- supply is increasing quickly
- item depends on trends or collector sentiment
- condition heavily affects price
- benchmark data is old
- active listings are piling up without sales

Use a volatility label:

- **Stable:** comps cluster tightly; demand consistent.
- **Variable:** comps differ meaningfully; condition or timing matters.
- **Volatile:** prices swing widely; high risk of mispricing.
- **Unknown:** not enough data.

High volatility requires higher margin and lower confidence.

---

## Category-Specific Checks

### Electronics

Check:

- exact model
- working condition
- battery health
- charger and accessories
- warranty/proof of purchase
- region compatibility
- serial/IMEI/activation lock where applicable
- screen damage
- ports/buttons/speakers/cameras

Reject if locked, activation-locked, account-bound, unknown IMEI status, water-damaged, or suspiciously cheap without verification.

### LEGO

Check:

- set number
- sealed or used
- box condition
- complete pieces
- minifigures included
- instructions included
- retired/current status
- whether price is based on sold comps, not collector fantasy listings

For used LEGO, missing minifigures can destroy resale value.

### Trading Cards and Collectibles

Check:

- authenticity
- grading status
- condition
- edition/version
- sealed product integrity
- seller reputation
- recent sold comps
- counterfeit risk

Do not treat active listings as value. Collectibles are where optimism goes to cosplay as accounting.

### Cameras and Lenses

Check:

- exact mount/model
- shutter count
- fungus/haze/dust/scratches
- autofocus
- aperture blades
- sensor condition
- included caps/hoods/batteries/chargers
- grey import/warranty status

Require clear photos and preferably sample images or in-person test.

### Music and DJ Gear

Check:

- exact model
- working condition
- knobs/faders/buttons/jacks
- software licence transferability
- power supply
- cables
- cosmetic wear
- known model faults

Missing software licences or power supplies can remove profit quickly.

### Computers and Components

Check:

- exact CPU/GPU/RAM/storage specs
- warranty status
- benchmarks/current replacement alternatives
- mining use for GPUs
- SMART data for drives where possible
- counterfeit or fake-capacity risk
- thermal/power issues

Avoid used storage media for resale unless the value is obvious and risk is understood.

### Tools

Check:

- brand/model
- battery platform
- included batteries/chargers
- wear and safety
- replacement battery cost
- local warranty
- whether the tool is stolen-looking or missing identifiers

Tool batteries are often where the bargain goes to die.

### Furniture and Bulky Goods

Usually require higher margin because of:

- pickup effort
- transport cost
- storage
- slower resale
- condition ambiguity
- buyer flakiness

Only alert when:

- item is a known desirable brand/model
- price is clearly under market
- pickup is practical
- resale demand is strong
- condition is clear

---

## Alert Thresholds

An automated workflow should only alert Dylan when the listing clears the right threshold.

### Immediate Alert

Use when:

- Bargain Score 85+
- High or medium confidence
- risk-adjusted profit exceeds threshold comfortably
- listing is time-sensitive
- seller/contact method appears safe
- action required soon

### Standard Alert

Use when:

- Bargain Score 70–84
- profit looks real but caveats exist
- item is worth review

### Watchlist Alert

Use when:

- Bargain Score 55–69
- opportunity is interesting but uncertain
- user may want to manually inspect

### Do Not Alert

Default for:

- Score below 55
- insufficient evidence
- thin margin
- high friction
- high scam risk
- prohibited categories
- unclear condition

Do not spam the user with mediocre flips. A workflow that sends twelve “maybe” listings a day is just a notification machine with poor boundaries.

---

## Output Format for Evaluating One Listing

Use this structure when assessing a product.

```markdown
## Resale Opportunity Assessment

**Item:** [Product name / model]
**Source listing:** [Marketplace / retailer]
**Asking price:** $X
**Estimated total landed cost:** $X
**Estimated realistic resale price:** $X
**Estimated net resale proceeds:** $X
**Estimated risk-adjusted profit:** $X
**Estimated margin:** X%

**Bargain score:** X/100
**Confidence:** High / Medium / Low / Reject
**Liquidity:** Fast-moving / Moderate / Slow / Unknown
**Market volatility:** Stable / Variable / Volatile / Unknown
**Evidence quality:** Level A / B / C / D

### Verdict
Buy candidate / Review manually / Watchlist / Skip / Reject

### Why it might be profitable
- [Evidence from sold comps]
- [Price gap]
- [Demand signal]

### Costs included
- Purchase price: $X
- Shipping/pickup: $X
- Platform/payment fees: $X
- Packaging/insurance: $X
- Repairs/accessories: $X
- Risk buffer: $X

### Key risks
- [Condition risk]
- [Scam/counterfeit risk]
- [Slow resale risk]
- [Fee/shipping risk]

### Questions before buying
- [Ask seller for proof/testing/serial/accessories/etc.]

### Final note
[Plain-English recommendation]
```

---

## Output Format for Automated Alerts

Automated alerts should be compact and decision-oriented.

```markdown
### [Score]/100 — [Item Name]

**Verdict:** [Strong buy candidate / Good candidate / Watchlist]
**Expected profit:** ~$X after costs and risk buffer
**Buy price:** $X landed
**Realistic resale:** ~$X
**Confidence:** [High/Medium/Low]
**Liquidity:** [Fast/Moderate/Slow]
**Main reason:** [One sentence]
**Main risk:** [One sentence]
**Action:** [Message seller / inspect / ask question / skip unless negotiable]
```

If the item requires seller questions, include the exact questions to ask.

---

## Seller Question Templates

Use these before recommending purchase when details are missing.

### General

- Is the item still available?
- Are you the original owner?
- Do you have proof of purchase?
- Is everything in the photos included?
- Are there any faults, damage, missing parts, or issues not shown in the listing?
- Can you send a photo/video of it working?

### Electronics

- Is it activation locked, account locked, or carrier locked?
- What is the battery health?
- Are all ports, buttons, cameras, speakers, and screens working?
- Can you send the serial number or IMEI for verification where appropriate?
- Is the charger included?

### Cameras / Lenses

- Any fungus, haze, scratches, dust, or focus issues?
- What is the shutter count?
- Are caps, hood, battery, charger, and box included?
- Can you send a sample photo?

### LEGO / Collectibles

- Is the set complete?
- Are all minifigures included?
- Are instructions and box included?
- Is it genuine LEGO?
- Any discolouration, smoke smell, bite marks, or broken parts?

### Music / DJ Gear

- Do all knobs, faders, pads, keys, buttons, jacks, and screens work?
- Is the power supply included?
- Is any required software licence transferable?
- Can you send a short video of it working?

---

## Negotiation Guidance

If a listing is promising but margin is thin, calculate a maximum buy price.

```text
Maximum Buy Price = Net Resale Proceeds - Risk Buffer - Minimum Required Profit - Non-Price Costs
```

When recommending negotiation, state:

- current asking price
- maximum sensible buy price
- suggested offer
- walk-away price

Example:

```markdown
**Current ask:** $220
**Maximum sensible buy price:** $165
**Suggested offer:** $150
**Walk away above:** $170
```

Do not suggest aggressive negotiation where the listing is already clearly underpriced and likely to sell quickly. In that case, speed and verification matter more than extracting the last $10.

---

## Workflow Rules for Automated Search Agents

When building a recurring marketplace-search workflow, the agent should:

1. Search target categories and sources.
2. Extract structured listing data:
   - title
   - price
   - location
   - shipping/pickup options
   - seller details
   - description
   - photos
   - condition
   - model identifiers
   - time listed
3. Normalise product model/SKU.
4. Reject prohibited or obviously risky listings.
5. Estimate total landed cost.
6. Gather sold-comparison evidence.
7. Estimate realistic resale price.
8. Estimate fees and resale costs.
9. Apply risk buffer.
10. Calculate Bargain Score.
11. Alert only if threshold is met.
12. Include missing information and questions in the alert.
13. Avoid duplicate alerts for the same listing unless price changes materially.
14. Track stale listings and de-rank items that remain unsold too long.
15. Log why listings were rejected so the workflow can be tuned.

### Deduplication

Deduplicate by:

- marketplace URL
- listing ID
- title + price + seller + location
- image similarity where available
- product model + seller

### Staleness

De-rank listings that have been active too long unless:

- price dropped
- demand is slow but real
- item is niche and high-margin
- seller appears willing to negotiate

A great bargain usually does not sit untouched for three weeks unless it is obscure, inconvenient, or haunted by missing details.

---

## Data Fields for Structured Workflow Output

Recommended schema:

```ts
interface BargainCandidate {
  id: string;
  source: string;
  sourceUrl: string;
  title: string;
  normalizedProductName: string;
  brand?: string;
  model?: string;
  category: string;
  askingPriceCents: number;
  estimatedLandedCostCents: number;
  estimatedResalePriceCents: number;
  estimatedNetResaleProceedsCents: number;
  estimatedRiskAdjustedProfitCents: number;
  estimatedMarginPercent: number;
  bargainScore: number;
  confidence: "high" | "medium" | "low" | "reject";
  liquidity: "fast" | "moderate" | "slow" | "unknown";
  volatility: "stable" | "variable" | "volatile" | "unknown";
  evidenceQuality: "A" | "B" | "C" | "D";
  condition: "new" | "sealed" | "open_box" | "used_excellent" | "used_good" | "used_fair" | "damaged" | "parts_only" | "unknown";
  sellerRisk: "low" | "medium" | "high";
  counterfeitRisk: "low" | "medium" | "high";
  faultRisk: "low" | "medium" | "high";
  shippingRisk: "low" | "medium" | "high";
  resaleFriction: "low" | "medium" | "high";
  keyReasons: string[];
  keyRisks: string[];
  questionsForSeller: string[];
  recommendedAction: "alert_now" | "review_manually" | "watchlist" | "skip" | "reject";
  createdAt: string;
  lastSeenAt: string;
}
```

---

## Quality Checklist

Before recommending an item, confirm:

- Is the exact product identified?
- Are sold comps available?
- Are comps recent and local enough?
- Is condition comparable?
- Is total landed cost calculated?
- Are resale fees and shipping costs included?
- Is demand strong enough to sell in a reasonable time?
- Is the profit still worthwhile after risk buffer?
- Is the seller credible?
- Is counterfeit/fault/scam risk acceptable?
- Is the item legal and allowed by marketplace policies?
- Is the alert worth Dylan’s attention?

If the answer to the last question is “maybe, if he is bored”, do not alert by default.

---

## Final Verdict Language

Use plain, direct verdicts.

### Buy Candidate

Use when the opportunity is strong, evidence-backed, and action-worthy.

> This is a credible buy candidate. The margin survives conservative resale costs, demand appears real, and the main remaining risk is verification of condition.

### Review Manually

Use when the opportunity is promising but missing key details.

> This is worth a manual look, but not an automatic buy. The price gap is real, but condition and included accessories need confirmation.

### Watchlist

Use when price is interesting but not enough.

> Watchlist only. It may become viable if the seller drops the price or confirms better condition than the listing currently shows.

### Skip

Use when profit is too thin or friction is too high.

> Skip. The headline price looks cheap, but fees, shipping, and slow resale remove the profit.

### Reject

Use when risk is unacceptable.

> Reject. The listing has too many scam/counterfeit/condition risks to treat as a resale opportunity.

---

## Default Agent Behaviour

The agent should be:

- conservative
- evidence-led
- sceptical of active listing prices
- careful with fees and shipping
- alert only when the opportunity is worth attention
- comfortable rejecting apparently cheap items
- explicit about uncertainty
- aware that resale profit is often destroyed by boring details

The best bargain alert should feel like:

> This item is underpriced, the market evidence is strong, the costs are understood, the risks are known, and the remaining upside is still worth acting on.

Anything weaker should be labelled accordingly.

---
name: prd-creation-dylan-pps
description: Create production-ready, AI-agent-friendly product requirements documents using Dylan’s preferred PRD structure. Use this skill whenever drafting, revising, reviewing, or finalising PRDs for apps, games, web tools, creative utilities, prototypes, or portfolio projects.
---

# SKILL_PRD_CREATION.md

## Purpose

Use this skill whenever Dylan asks an agent to create, revise, review, expand, tighten, or finalise a Product Requirements Document (PRD).

This includes requests such as:

- “Create a PRD for…”
- “Turn this idea into a PRD”
- “Make this buildable”
- “Write this for an AI coding agent”
- “Review the PRD and identify gaps”
- “Make the PRD production-ready”
- “Add implementation details”
- “Give me the final PRD as Markdown”
- “Can an AI agent build from this?”

The goal is to produce PRDs that are clear enough for an AI coding agent to build from, detailed enough to avoid hidden assumptions, and practical enough to become a real project rather than a vibes document wearing a lanyard.

A good PRD should:

- Define the product clearly.
- Explain the user problem and product goal.
- Describe the intended experience.
- Specify the core logic and data models.
- Give an implementation path.
- Identify open questions.
- State whether the PRD is ready for build.
- Include acceptance criteria.
- Avoid vague language that forces the builder to invent major product decisions.

The final document should feel like a product manager has done the thinking before handing it to an AI coding agent. The agent should still need to code, test, and make reasonable implementation choices. It should not need to guess what the product is.

---

## Reference PRD Pattern

Dylan’s preferred PRDs usually have these traits:

- A clear **Product Summary** or **Overview** near the top.
- Explicit **Goals**, often split into player/user goals and product goals.
- Clear **Non-Goals** so the builder knows what not to make.
- Defined **Target Platform**, deployment constraints, and technical defaults.
- Concrete **Core Features** or **Core Game Design**.
- Detailed **logic, rules, data models, state models, and algorithms** where relevant.
- Specific **UI and UX requirements**, including mobile and responsive behaviour.
- Clear **content tone** and visual direction.
- Accessibility, performance, privacy, safety, and error handling.
- LocalStorage, routing, file structure, and deployment details where useful.
- Acceptance criteria grouped by product area.
- Suggested implementation phases.
- Agent notes that call out the most important implementation principles.

Common reference sections include:

1. Product Summary / Overview
2. Goals
3. Non-Goals
4. Target Audience / Player Goals
5. Target Platform and Deployment
6. Recommended Tech Stack
7. Core Product or Game Design
8. User Flow / Core Loop
9. Data Models and Content Models
10. UI Requirements
11. Responsive Behaviour
12. Accessibility
13. Error Handling
14. Performance Requirements
15. Privacy, Security, and Safety
16. LocalStorage / Persistence
17. Routes and API Endpoints
18. File Structure
19. Acceptance Criteria
20. Suggested Implementation Phases
21. Open Questions / Build Readiness
22. Agent Notes

Do not include every section blindly. Include the sections required to make the product buildable. A tiny utility does not need a 40-page governance appendix. A complex game with many interacting systems probably does.

---

## Core Principles

### 1. Research before writing

Before drafting the PRD, research the subject thoroughly enough to avoid building from stale assumptions.

Research may include:

- Comparable products or games.
- Relevant UX patterns.
- Current technical constraints.
- APIs, libraries, browser capabilities, platform rules, or deployment limits.
- Legal, privacy, consumer, safety, or content risks.
- Domain-specific mechanics, rules, terminology, or data.
- Accessibility patterns.
- Current events or topical context if the project is based on a current issue.

For any fact that may have changed recently, verify it with current sources before writing. Do not rely on memory for:

- API availability or pricing.
- Library status.
- Browser/platform support.
- Legal or regulatory details.
- Public datasets.
- Current product capabilities.
- Model/provider details.
- App store/platform rules.
- News-driven or topical claims.

If research cannot be completed, say so clearly and mark the PRD as requiring validation.

### 2. Build from the idea, not around it

A PRD should preserve the user’s idea while turning it into a buildable system.

Do not replace a distinctive idea with a generic SaaS product. Do not inflate a small project into a platform. Do not add accounts, dashboards, teams, billing, admin panels, social graphs, or analytics unless they are actually needed.

Prefer:

- One clear workflow.
- One strong core mechanic.
- A finished v1.
- Minimal backend.
- Clear constraints.
- Explicit data structures.
- A demoable product.

Avoid:

- “Future marketplace” gravity.
- Enterprise admin fog.
- Multi-sided systems unless explicitly requested.
- Features that exist only because PRDs often have them.
- Open-ended AI assistants where a deterministic tool would work better.

### 3. Make it AI-agent-friendly

The PRD should be written for a builder that needs explicit instructions.

Include:

- Concrete requirements.
- Data models.
- State models.
- Algorithms or pseudo-code where useful.
- Component breakdowns.
- File structure.
- Edge cases.
- Error states.
- Acceptance criteria.
- Implementation phases.
- Constraints and non-goals.

Avoid:

- “Make it intuitive.”
- “Use best practices.”
- “Add a nice UI.”
- “Make it scalable.”
- “Use AI where helpful.”
- “Allow users to manage things.”
- “Support everything.”

These phrases are not requirements. They are fog with keyboard shortcuts.

### 4. Call out uncertainty

A strong PRD is honest about what is known, assumed, unresolved, and risky.

Use explicit sections for:

- Open Questions
- Assumptions
- Build Readiness
- Risks
- Validation Needed
- Decisions Made
- Decisions Deferred

Do not hide gaps by writing confidently around them.

If the PRD contains unresolved decisions that could materially affect implementation, mark it as **Not Ready for Build** or **Ready with Gaps**.

### 5. Separate v1 from later ideas

A good PRD protects the MVP from feature creep.

For each major feature, decide whether it is:

- **v1 required**
- **v1 optional**
- **future**
- **explicit non-goal**

Future ideas can be useful, but they should not contaminate v1. The v1 scope should be buildable as a small, polished product.

### 6. Prefer production-ready detail

“Production-ready” does not mean enterprise-sized. It means the app is specified well enough to ship a stable, polished version.

Include production-minded requirements for:

- Empty states.
- Loading states.
- Error states.
- Invalid input.
- Missing assets.
- Mobile layout.
- Keyboard support.
- Local persistence.
- Data validation.
- Performance constraints.
- Security and privacy boundaries.
- Accessibility.
- Deployment assumptions.
- Browser support.
- Testing or balance checks where relevant.

### 7. Preserve Dylan’s product taste

When writing PRDs for Dylan’s projects, assume:

- Web app first unless requested otherwise.
- Vercel-friendly where practical.
- Minimal backend.
- Minimal database, preferably none for v1.
- Local-first where possible.
- No unnecessary auth.
- Strong visual identity.
- Mobile-friendly.
- Practical, slightly dry, not corporate.
- Premium/handcrafted UI where relevant.
- Explicit export/share/download behaviour where useful.
- A project should feel like a finished artefact, not a SaaS skeleton waiting for a pricing page.

---

## PRD Creation Process

When creating a PRD, follow this process.

### Step 1: Clarify the product shape

Identify:

- Product name.
- Type of product.
- Target platform.
- Main user or player.
- Core problem.
- Core interaction.
- Main output or win condition.
- What v1 must do.
- What must be excluded.
- Known constraints.
- Deployment target.

If the user has already supplied enough information, do not ask unnecessary questions. Make sensible assumptions and list them.

If a missing answer would materially change the product, include it as an open question rather than blocking progress.

### Step 2: Research the domain

Research before writing when the product depends on:

- Current technology.
- Public APIs.
- Platform rules.
- Recent news or topical issues.
- Product benchmarks.
- Legal or regulatory details.
- Security/privacy risks.
- Existing game mechanics or genre conventions.
- Real-world domain rules.
- Data availability.

Use research to inform the PRD, not to bury the document in citations. The PRD should be practical, not a literature review with buttons.

### Step 3: Define the MVP

Before listing features, decide the minimum complete product.

A strong MVP should answer:

- What can the user do in the first 60 seconds?
- What is the core loop?
- What is the moment of value?
- What makes the product distinct?
- What data or content is needed?
- What can be built without a backend?
- What can be cut without damaging the concept?
- What must not be cut?

### Step 4: Write the PRD

Use the standard structure below, adapting it to the project type.

### Step 5: Review as a builder

After drafting, read the PRD as if you are an AI coding agent about to build it.

Identify:

- Missing data models.
- Missing state transitions.
- Unclear win/loss conditions.
- Undefined content requirements.
- Ambiguous UI states.
- Hidden backend assumptions.
- Missing mobile requirements.
- Missing acceptance criteria.
- Any feature that says what but not how.
- Any “magic” requirement that requires external services or unknown data.

Then amend the PRD to remove ambiguity where possible.

### Step 6: Report build readiness

At the end of the PRD, include a build readiness status:

- **Ready for Build**
- **Ready with Minor Gaps**
- **Not Ready for Build**

Explain why.

If there are gaps, list exactly what must be decided before build starts.

---

## Standard PRD Structure

Use this as the default structure.

```markdown
# PRD: [Product Name]

## 1. Product Summary

**Product name:** [Name]  
**Type:** [Web app / browser game / mobile-first tool / creative utility / etc.]  
**Deployment target:** [Vercel / Expo / static web / etc.]  
**Core concept:** [One clear paragraph]

[Short explanation of what the product does, what the user/player does, and what makes it distinct.]

---

## 2. Goals

### 2.1 User / Player Goals

The user/player should be able to:

- [Goal]
- [Goal]
- [Goal]

### 2.2 Product Goals

The app should:

- [Goal]
- [Goal]
- [Goal]

---

## 3. Non-Goals

The app should not:

- [Non-goal]
- [Non-goal]
- [Non-goal]

---

## 4. Target Audience

[Who this is for.]

Include:
- primary audience;
- secondary audience if relevant;
- what they already understand;
- what should not be assumed.

---

## 5. Target Platform and Constraints

### 5.1 Runtime

- [Browser / iOS / Android / etc.]

### 5.2 Deployment

- [Hosting target]
- [Backend assumptions]
- [API endpoint limits]
- [Database constraints]

### 5.3 Supported Devices

- [Mobile-first / desktop-first / responsive]
- [Minimum viewport if applicable]

---

## 6. Recommended Tech Stack

[Recommended stack and rationale.]

Include:
- framework;
- language;
- styling;
- state management;
- persistence;
- data storage;
- APIs;
- deployment;
- major libraries.

Also include an **Avoid** list if useful.

---

## 7. Core Product / Game Design

[Explain the main mechanics, workflow, or product system.]

For games, include:
- core loop;
- win/loss conditions;
- difficulty;
- scoring;
- progression;
- randomness;
- balancing rules.

For tools, include:
- input;
- processing;
- output;
- editing/refinement;
- saving/exporting;
- error states.

---

## 8. User Flow

Describe the full end-to-end flow.

Use numbered steps.

Example:
1. User opens the app.
2. User enters/uploads/selects [input].
3. App validates [input].
4. User triggers [action].
5. App generates/displays [output].
6. User can edit/save/export/share.
7. App persists [state] locally.

---

## 9. Feature Requirements

Break features into clear subsections.

For each major feature include:
- purpose;
- behaviour;
- rules;
- UI requirements;
- edge cases;
- v1/future status.

---

## 10. Data Models

Define TypeScript-style interfaces where useful.

Example:

```ts
interface ExampleEntity {
  id: string;
  name: string;
  status: "active" | "archived";
}
```

Include:
- app state;
- user-created data;
- content models;
- settings;
- game entities;
- generated outputs.

---

## 11. Algorithms and Logic

Include pseudo-code or formulas for:

- scoring;
- validation;
- random generation;
- matching;
- filtering;
- game rules;
- calculations;
- AI prompts or AI selection logic where relevant.

Do not leave core product logic implied.

---

## 12. Content Requirements

If the product needs content, specify:

- content types;
- minimum v1 content counts;
- tone;
- examples;
- asset naming rules;
- where files live;
- how missing content is handled.

---

## 13. UI Requirements

Include:
- layout;
- main screens;
- components;
- controls;
- states;
- copy tone;
- visual direction;
- mobile behaviour;
- desktop behaviour.

Use Dylan’s premium, handcrafted, non-generic UI preferences where relevant.

---

## 14. Accessibility

Specify:

- keyboard support;
- screen reader behaviour;
- focus states;
- contrast;
- reduced motion;
- touch target sizes;
- ARIA/live-region needs;
- what hidden information must not be exposed.

---

## 15. Responsive Behaviour

Specify:
- mobile layout;
- tablet layout;
- desktop layout;
- minimum supported viewport;
- interactions that must not rely on hover/right-click.

---

## 16. Persistence and Storage

Specify:
- LocalStorage keys;
- stored data;
- what must not be stored;
- reset behaviour;
- privacy implications.

---

## 17. Routes and API Endpoints

Specify:
- page routes;
- required API endpoints;
- optional future endpoints;
- endpoint limits;
- whether app should remain static-first.

---

## 18. File Structure

Provide a recommended file structure.

Use this when it will help an AI coding agent.

---

## 19. Error Handling and Edge Cases

Include:
- invalid input;
- missing assets;
- failed API calls;
- empty data;
- unavailable browser features;
- impossible game states;
- reset/recovery behaviour.

---

## 20. Performance Requirements

Include measurable targets where useful:
- load time;
- bundle size;
- generation time;
- analysis time;
- image size;
- browser compatibility.

---

## 21. Privacy, Security, and Safety

Include:
- local-first rules;
- sensitive data handling;
- external data/API constraints;
- content safety;
- legal/regulatory cautions;
- abuse prevention;
- fictionalisation rules if dealing with real-world people/platforms.

---

## 22. Analytics

State whether analytics are required.

Default:
- no analytics for v1 unless explicitly useful.
- if analytics are later added, prefer privacy-friendly event-level metrics.

---

## 23. Acceptance Criteria

Group criteria by area.

Example:

### 23.1 Core Functionality

- [Requirement]
- [Requirement]

### 23.2 UI

- [Requirement]
- [Requirement]

### 23.3 Technical

- [Requirement]
- [Requirement]

### 23.4 Accessibility

- [Requirement]
- [Requirement]

Acceptance criteria must be testable.

---

## 24. Suggested Implementation Phases

Break the build into phases.

Example:
1. Static shell
2. Data models
3. Core logic
4. UI integration
5. Persistence
6. Accessibility and polish
7. Balance/testing

---

## 25. Open Questions

List unresolved questions.

For each question, include:
- why it matters;
- recommended default if Dylan does not decide;
- whether it blocks build.

---

## 26. Assumptions

List assumptions the PRD has made.

Example:
- v1 has no authentication.
- all data is local.
- app deploys to Vercel.
- no paid APIs are used.

---

## 27. Build Readiness

**Status:** Ready for Build / Ready with Minor Gaps / Not Ready for Build

Explain:
- what is ready;
- what remains uncertain;
- what should be decided before coding;
- what can be safely deferred.

---

## 28. Agent Notes

Call out the most important implementation principles.

Example:
> The central design rule is: [rule]

> Do not implement [dangerous/tempting wrong thing].

> The best version of this product should feel like [clear product feel].
```

---

## PRD Variants by Product Type

### Browser Game PRD

For games, emphasise:

- Core loop.
- Player goal.
- Win/loss conditions.
- Difficulty/progression.
- Scoring.
- Round structure.
- State model.
- Content pools.
- Random generation.
- Balancing.
- Tutorial.
- Replay.
- Mobile/touch controls.
- Accessibility for controls.
- Asset handling.
- Game-over and win states.

Include data models for:

- game state;
- player state;
- board/map/level;
- entities;
- items/cards/actions;
- score;
- progression.

Include acceptance criteria for:

- game rules;
- UI;
- balancing;
- replay;
- deployment.

### Creative Tool PRD

For creative tools, emphasise:

- Input.
- Transformation logic.
- Preview.
- Editing controls.
- Re-roll/regenerate.
- Export/download.
- Presets or examples.
- Local persistence.
- No-account flow.
- Output quality.
- Error handling for invalid inputs.

Include:
- output format;
- generation constraints;
- deterministic vs AI-assisted behaviour;
- file formats;
- preview/audio/image behaviour;
- export naming.

### Data / Analysis Tool PRD

For analysis tools, emphasise:

- Input contract.
- Preprocessing.
- Analysis methods.
- Scoring.
- Output contract.
- Annotations/highlights.
- Report export.
- Explanation quality.
- Edge cases.
- Performance targets.
- Data privacy.

Include:
- algorithm descriptions;
- weights/scores if relevant;
- confidence and uncertainty handling;
- sample outputs.

### AI-Assisted Product PRD

For AI-assisted products, specify:

- Why AI is required.
- What model/API is used.
- User-configured API keys if relevant.
- Prompt structure.
- Data sent to model.
- Privacy implications.
- Fallback behaviour.
- Rate/cost controls.
- Quality checks.
- Safety limits.
- Deterministic logic around AI output.
- How the app handles hallucinations or malformed output.

Do not simply say “use AI”. Say exactly where AI sits in the workflow and what happens if it fails.

### Mobile-First App PRD

For mobile-first products, emphasise:

- Minimum viewport.
- Thumb-friendly layout.
- Sticky controls.
- No hover/right-click dependency.
- Touch target sizes.
- Bottom sheets/drawers.
- Offline/local storage.
- Notification behaviour if needed.

### Cross-Platform App PRD

For web/iOS/Android apps, specify:

- Expo/React Native or Flutter rationale.
- Local notifications.
- Local storage.
- Native permissions.
- App store considerations.
- Platform-specific limitations.
- Offline behaviour.
- Whether web parity is required.

---

## Research Requirements

When a PRD depends on current or niche information, the agent must research before finalising.

### Research checklist

Research should answer:

- What similar products exist?
- What do they do well or poorly?
- What user expectations does the category create?
- What terminology should be used?
- What APIs or libraries are suitable now?
- What platform constraints apply?
- What legal/privacy/safety risks exist?
- What content or data is needed?
- What implementation approaches are practical?
- What should be avoided?

### Research output inside the PRD

Include a concise section when research materially affects requirements:

```markdown
## Research Notes

- [Finding] → [PRD implication]
- [Finding] → [PRD implication]
```

Do not include research notes if they do not change the product requirements.

### When research is impossible

If research cannot be performed:

```markdown
## Research Limitation

This PRD has not been externally validated against current sources. Before build, validate:
- [specific item]
- [specific item]
```

Then mark build readiness accordingly.

---

## Open Questions Rules

Open questions should not be vague.

Bad:

- “What should the app look like?”
- “Should we add more features?”
- “How should scoring work?”

Better:

- “Should v1 support shareable results, or should results remain local-only? This affects whether the app needs a backend route.”
- “Should board seeds be exposed to users? This affects replayability and local high-score comparisons.”
- “Should AI generation be optional behind a user-provided API key? This affects privacy, cost, and onboarding.”

Each open question should include:

- **Question**
- **Why it matters**
- **Recommended default**
- **Build impact**
- **Blocks build?** Yes / No

Example:

```markdown
### Q1. Should v1 include shareable result URLs?

**Why it matters:** Shareable URLs require either encoded client-side state or a backend persistence endpoint.  
**Recommended default:** No for v1; use screenshot/download/export only.  
**Build impact:** Avoids backend and keeps Vercel deployment simple.  
**Blocks build?** No.
```

---

## Build Readiness Rules

At the end of every PRD, state one of these.

### Ready for Build

Use when:

- Core concept is clear.
- v1 scope is explicit.
- Data models are defined.
- Core logic is defined.
- UI requirements are sufficient.
- Open questions are minor or non-blocking.
- Acceptance criteria are testable.
- Deployment assumptions are clear.

### Ready with Minor Gaps

Use when:

- Most product decisions are clear.
- There are unresolved choices, but sensible defaults exist.
- Build can start if defaults are accepted.
- Gaps are listed clearly.

### Not Ready for Build

Use when:

- Core mechanic is unresolved.
- Major platform/tech choices are undecided.
- Required data source is unknown.
- Legal/privacy/safety constraints need validation.
- The MVP is not clearly scoped.
- Acceptance criteria cannot be written without major assumptions.

Do not mark a PRD as ready just to be polite. A polite lie at this stage becomes a confused repo later.

---

## Acceptance Criteria Rules

Acceptance criteria must be:

- Testable.
- Specific.
- Grouped by area.
- Written as observable outcomes.
- Free of vague quality words unless those words are defined elsewhere.

Good:

- Player can start a new run from the home screen.
- The game selects a random NPC and displays their budget, needs, preferences, and restrictions.
- The app stores high score in LocalStorage under `cost-of-living:high-scores`.
- The board always renders as a 9 x 9 grid.
- Pressing Escape closes the modal.
- Missing image files show a placeholder and do not crash the app.

Bad:

- App should be intuitive.
- UI should look nice.
- Game should be fun.
- System should be robust.
- App should handle errors gracefully.

If the PRD says a feature exists, acceptance criteria should prove it.

---

## Data Model Rules

Use TypeScript-style interfaces by default, especially for AI coding agents.

Include:

- `id` fields.
- Explicit enums for states.
- Required vs optional fields.
- Units in field names where needed (`priceCents`, `timeRemainingSeconds`).
- String literal unions for statuses and modes.
- Comments only when they clarify behaviour.

Good:

```ts
export interface GameState {
  status: "idle" | "playing" | "won" | "lost";
  startedAt: number | null;
  endedAt: number | null;
}
```

Avoid:

```ts
interface Data {
  stuff: any;
  details: object;
}
```

State models should make impossible states harder to create.

---

## UI and Visual Direction Rules

PRDs should describe the interface well enough that the builder does not default to generic SaaS minimalism.

Include:

- Overall feel.
- Layout by screen size.
- Main components.
- Control behaviour.
- Empty/loading/error states.
- Microcopy examples.
- Accessibility requirements.
- Visual constraints.
- What to avoid.

For Dylan’s projects, prefer:

- premium but approachable;
- handcrafted;
- organic;
- tactile;
- clear;
- playful without becoming childish;
- Australian without clichés;
- visually distinctive without hurting usability.

Avoid:

- generic dashboards;
- purple AI gradients;
- unstyled component libraries;
- “modern clean UI” as the only direction;
- corporate copy;
- unnecessary onboarding screens.

---

## Technical Defaults

Unless the user says otherwise, use these defaults for Dylan’s web projects:

- Next.js App Router.
- TypeScript.
- Tailwind CSS with custom design tokens.
- Vercel deployment.
- Static-first.
- Client-side state for v1 where practical.
- LocalStorage for persistence.
- No authentication by default.
- No database by default.
- No paid APIs by default.
- No more API endpoints than necessary.
- Mobile-friendly or mobile-first depending on product.
- Browser support: modern Chrome, Safari, Firefox, Edge.
- Accessibility: WCAG 2.1 AA as the target.

Override these defaults when the product requires it, but explain why.

---

## Privacy and Safety Defaults

Default to:

- Local-first storage.
- No user accounts.
- No collection of personal data.
- No real people’s names, photos, addresses, phone numbers, or private data unless explicitly required and safe.
- Fictionalised content for games about real-world platforms.
- No scraping of real platforms unless specifically researched and permitted.
- No dark-pattern implementation in real commercial workflows.
- No medical, financial, legal, or safety advice without strong disclaimers and scope limits.
- No analytics unless there is a clear reason.
- If analytics are used, prefer privacy-friendly event-level metrics.

For sensitive domains, include a safety section and build-readiness warning if validation is needed.

---

## Tone and Copy Rules

PRDs should be clear, direct, and practical.

They may include Dylan-style dry copy examples for the product itself, especially games and portfolio projects. But the requirements must remain unambiguous.

Good PRD tone:

- “The player wins when…”
- “The app must not…”
- “The recommended implementation is…”
- “This value is player-entered and does not affect game logic.”
- “Use LocalStorage only for v1.”

Avoid:

- Corporate product fluff.
- Motivational intros.
- Overlong market justification.
- “Delightful experience” without defining the behaviour.
- Hype words like revolutionary, seamless, next-generation, unlock, empower.

A PRD is not a pitch deck. It is the map you hand to the person building the bridge.

---

## Review and Amendment Loop

When asked to improve or finalise a PRD:

1. Read the PRD as a builder.
2. Identify missing assumptions.
3. List the most important gaps.
4. Amend the PRD directly.
5. Re-check whether any ambiguity remains.
6. Update the build-readiness status.

Common gaps to look for:

- Unclear v1 scope.
- Missing non-goals.
- Missing data models.
- Missing state model.
- Undefined scoring or algorithms.
- Undefined content requirements.
- Unclear UI on mobile.
- Missing error handling.
- Missing acceptance criteria.
- Hidden dependency on paid APIs or backend.
- Open questions not marked as blocking/non-blocking.
- Features that cannot be built from the spec.

If the user asks to keep iterating until the PRD is sufficient, continue until the PRD can honestly be marked Ready for Build or Ready with only minor non-blocking gaps.

---

## Final Output Requirements

When delivering a PRD, include:

1. The PRD in Markdown.
2. A short build-readiness note.
3. Any blocking open questions.
4. A downloadable `.md` file if requested.

When delivering only the skill file, provide:

- the created file link;
- a brief note on what it contains;
- no unnecessary paste of the full content unless asked.

---

## Quality Checklist

Before finalising any PRD, verify:

- Is the product summary clear in one read?
- Are goals and non-goals explicit?
- Is v1 scope protected from feature creep?
- Is the target platform clear?
- Is the recommended stack justified?
- Are core mechanics/workflows specified?
- Are win/loss/scoring rules defined for games?
- Are inputs, outputs, and validation defined for tools?
- Are data models explicit?
- Are state transitions clear?
- Are UI requirements specific enough?
- Are mobile/responsive requirements covered?
- Are accessibility requirements included?
- Are error states included?
- Are privacy and safety boundaries included?
- Are performance expectations reasonable?
- Are file structure and implementation phases useful?
- Are acceptance criteria testable?
- Are open questions specific?
- Is build readiness stated honestly?
- Could an AI coding agent start building without inventing major product decisions?

If not, revise the PRD before presenting it as final.

---

## Final Instruction

A strong PRD should turn a good idea into a buildable object.

It should reduce ambiguity, protect the core concept, expose risks, and make implementation boring in the best possible way.

The best outcome is not a long document. The best outcome is a document that lets a builder make the right thing without needing to read Dylan’s mind, inspect the moon, or guess what the buttons do.

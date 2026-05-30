# Melodestiny — Product Requirements Document

**Version:** 1.0
**Status:** Draft
**Last Updated:** 2026-05-30

---

## 1. Overview

Melodestiny is a web-based song lyric analysis tool that scores pop songs on structural and lyrical quality using 14 algorithmic techniques derived from the playbooks of the world's most successful pop songwriters. The user inputs a song title and lyrics, presses an analysis button, and receives a weighted score out of 100 with a detailed breakdown, highlighted lyrics showing technique application and improvement opportunities, and a downloadable marked-up copy of the lyrics.

---

## 2. Design Philosophy

### 2.1 Visual Aesthetic

The UI must feel **organic, hand-crafted, antique, yet minimalistic**. Think: a well-loved leather journal in a Victorian songwriter's study. Not cluttered, not loud — warm, textured, and intentional.

**Style References:**
- [Antique Artwork Collectibles App](https://dribbble.com/shots/17018577)
- [Attic E-commerce Antiques](https://dribbble.com/shots/17022927)
- [Vintage Vault Collection App](https://dribbble.com/shots/24801736)
- [Online Antiques Auction App](https://dribbble.com/shots/19700434)

**Design Tokens:**

| Token | Value | Notes |
|---|---|---|
| `--color-parchment` | `#F5F0E8` | Main background, warm off-white |
| `--color-ink` | `#2C2418` | Primary text, dark warm brown |
| `--color-sepia` | `#8B7355` | Secondary text, muted brown |
| `--color-gold` | `#C4A265` | Accent, scores, highlights |
| `--color-rust` | `#A0522D` | Warnings, improvement flags |
| `--color-sage` | `#7A8B6F` | Positive indicators, passing scores |
| `--color-cream` | `#FBF8F1` | Card backgrounds |
| `--color-charcoal` | `#3A3228` | Dark mode background |
| `--font-display` | `'Playfair Display', serif` | Headings, titles |
| `--font-body` | `'Lora', serif` | Body text, lyrics |
| `--font-mono` | `'IBM Plex Mono', monospace` | Scores, technical labels |
| `--radius-sm` | `4px` | Subtle, not perfectly round |
| `--radius-md` | `8px` | Cards |
| `--shadow-card` | `0 2px 8px rgba(44,36,24,0.08)` | Soft, warm shadow |
| `--border-subtle` | `1px solid rgba(139,115,85,0.15)` | Faint borders |

**UI Principles:**
- Textured backgrounds (subtle paper grain via CSS noise or SVG pattern)
- Serif typography throughout — no sans-serif
- Muted earth tones only — no bright colors
- Generous whitespace — let content breathe
- Thin, hand-drawn-style dividers (SVG or border-image)
- Score displayed as a wax-seal-style circular badge
- Animations: gentle fades, no bouncy easing — `ease-out` only
- Icons: thin line-art style, like etched illustrations

### 2.2 Mobile-First

- Designed for 375px width first, scales up to desktop
- Touch targets minimum 44x44px
- Single-column layout on mobile
- Bottom-sheet pattern for analysis results (slides up from bottom)
- Sticky analyze button at bottom of viewport

---

## 3. Architecture

### 3.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Analysis Engine** | Rust → WebAssembly (WASM) | Performance, portability, runs in browser |
| **Frontend Framework** | Next.js (App Router) | SSR/SSG, Vercel-optimized, React ecosystem |
| **Styling** | Tailwind CSS + CSS Variables | Rapid iteration, design token system |
| **Hosting** | Vercel Hobby Plan (serverless) | Free tier, edge functions, WASM support |
| **Future Native** | Tauri (iOS/Android) | Rust core shared with WASM, native wrappers |

### 3.2 Architecture Diagram

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
│  ┌─────────────────────────────────────────┐ │
│  │          Next.js Frontend               │ │
│  │  (React, Tailwind, UI Components)       │ │
│  └──────────────┬──────────────────────────┘ │
│                 │                             │
│  ┌──────────────▼──────────────────────────┐ │
│  │        WASM Analysis Engine             │ │
│  │  (Rust compiled to WebAssembly)         │ │
│  │  - 14 algorithmic techniques            │ │
│  │  - Scoring & weighting                  │ │
│  │  - Lyric markup generation              │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

Future:
┌─────────────────────────────────────────────┐
│           Tauri Native Shell                 │
│  ┌─────────────────────────────────────────┐ │
│  │     Shared Rust Core (same crate)       │ │
│  │     + Native UI (WebView or Svelte)     │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 3.3 Vercel Hobby Plan Constraints

- **Serverless function timeout:** 10s (max)
- **Serverless function size:** 50MB (max)
- **WASM bundle size target:** < 2MB gzipped
- **Edge function payload:** < 4MB
- **Strategy:** Analysis runs entirely client-side via WASM. No serverless function needed for analysis. Serverless functions only used for optional features (e.g., saving results, sharing links).

---

## 4. User Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Landing    │────▶│  Input Form  │────▶│  Analyzing   │
│   Screen     │     │  Title+Lyrics│     │  (loading)   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                          ┌───────▼───────┐
                                          │    Results     │
                                          │    Screen      │
                                          │                │
                                          │  ┌──────────┐  │
                                          │  │ Score    │  │
                                          │  │ Badge    │  │
                                          │  └──────────┘  │
                                          │  ┌──────────┐  │
                                          │  │ Breakdown│  │
                                          │  │ Table    │  │
                                          │  └──────────┘  │
                                          │  ┌──────────┐  │
                                          │  │ Highlight│  │
                                          │  │ Lyrics   │  │
                                          │  └──────────┘  │
                                          │  ┌──────────┐  │
                                          │  │ Download │  │
                                          │  │ Button   │  │
                                          │  └──────────┘  │
                                          └───────────────┘
```

### 4.1 Input Screen

- **Song Title** — Single-line text input, placeholder: "e.g., Blank Space"
- **Lyrics** — Multi-line textarea, placeholder: "Paste your lyrics here...", minimum height 200px, auto-expanding
- **Analyze Button** — Full-width, gold accent, serif text "Analyze", disabled until both fields have content
- **Character counter** — Subtle, bottom-right of textarea

### 4.2 Analyzing State

- Full-screen overlay with parchment texture
- Animated quill pen or ink drop SVG
- Text: "Examining your lyrics..."
- Duration: typically < 500ms (WASM is fast)

### 4.3 Results Screen

Scrollable single page with the following sections in order:

1. **Score Badge** — Wax-seal-style circular badge, number out of 100
2. **Score Breakdown** — Table of all 14 techniques with individual scores, weights, and contribution to total
3. **Highlighted Lyrics** — Full lyrics with inline annotations
4. **Download Button** — Exports marked-up lyrics as `.md` or `.html`

---

## 5. Analysis Engine (Rust/WASM)

### 5.1 Input Contract

```rust
pub struct AnalysisInput {
    pub title: String,
    pub lyrics: String,
}
```

### 5.2 Output Contract

```rust
pub struct AnalysisOutput {
    pub total_score: f64,           // 0-100
    pub techniques: Vec<TechniqueResult>,
    pub highlighted_lyrics: Vec<LyricLine>,
    pub markup_download: String,    // Markdown or HTML
}

pub struct TechniqueResult {
    pub id: String,
    pub name: String,
    pub author: String,
    pub description: String,
    pub raw_score: f64,             // 0-1.0
    pub weight: f64,                // contribution weight
    pub weighted_score: f64,        // raw_score * weight * 100
    pub feedback: String,           // human-readable explanation
    pub flags: Vec<LyricFlag>,      // specific locations in lyrics
}

pub struct LyricLine {
    pub line_number: usize,
    pub text: String,
    pub annotations: Vec<Annotation>,
}

pub struct LyricFlag {
    pub line_number: usize,
    pub start_char: usize,
    pub end_char: usize,
    pub flag_type: FlagType,        // Positive, Neutral, Negative
    pub technique_id: String,
    pub message: String,
}

pub struct Annotation {
    pub start_char: usize,
    pub end_char: usize,
    pub annotation_type: AnnotationType, // Highlight, Warning, Note
    pub message: String,
    pub technique_id: String,
}

pub enum FlagType {
    Positive,
    Neutral,
    Negative,
}

pub enum AnnotationType {
    Highlight,  // Good application of technique
    Warning,    // Improvement opportunity
    Note,       // Informational
}
```

### 5.3 WASM Binding

Expose a single function to JavaScript:

```rust
#[wasm_bindgen]
pub fn analyze(title: &str, lyrics: &str) -> JsValue {
    // Returns serialized AnalysisOutput
}
```

The WASM module should be loaded asynchronously and cached after first load.

---

## 6. The 14 Algorithmic Techniques

Each technique produces a raw score from 0.0 to 1.0. Weights are normalized so they sum to 1.0. The final score is: `sum(raw_score_i * weight_i) * 100`.

### 6.1 Technique Definitions

#### T01 — Melodic Math (Lyrical Rhythm)
- **Author:** Max Martin
- **Weight:** 0.10
- **Description:** Every syllable has a rhythmic home. Treat the words like a drum pattern.
- **Algorithm:**
  1. Split lyrics into lines
  2. Count syllables per line using a syllable counting algorithm (vowel-group method)
  3. Calculate the standard deviation of syllable counts within each section (verse, chorus, etc.)
  4. Lower deviation = higher score (more consistent rhythm)
  5. Flag lines that deviate > 1.5 standard deviations from their section mean
- **Scoring:** `1.0 - min(1.0, avg_section_std_dev / 3.0)`
- **Flags:** Lines with syllable count > 1.5σ from section mean → Negative flag: "This line has {n} syllables, but your {section} averages {m}. Consider adjusting for rhythmic consistency."

#### T02 — Chorus-First Structural Check
- **Author:** Max Martin
- **Weight:** 0.08
- **Description:** The chorus IS the song. It should appear early and be the most repeated element.
- **Algorithm:**
  1. Detect sections (verse, chorus, bridge) using pattern matching on common labels or structural repetition
  2. Measure position of first chorus as percentage of total song length
  3. Count total occurrences of chorus sections
  4. Score higher if chorus appears within first 35% of song and is the most repeated section
- **Scoring:**
  - Chorus position ≤ 35%: +0.5
  - Chorus count ≥ 2: +0.3
  - Chorus is most repeated section: +0.2
- **Flags:** If chorus appears after 50% of song → Negative flag: "Your chorus doesn't appear until {n}% through the song. Max Martin's playbook says the chorus should arrive early — it IS the song."

#### T03 — Repetition Detection & Variation
- **Author:** Max Martin / Jack Antonoff
- **Weight:** 0.09
- **Description:** Repeat hooks relentlessly but change ONE element each time.
- **Algorithm:**
  1. Identify the most repeated phrase (3+ words) in the lyrics
  2. Count total occurrences
  3. For each occurrence, record surrounding context (2 lines before/after)
  4. Measure variation: how many words differ between consecutive occurrences of the hook phrase
  5. Ideal: hook repeats 3-6 times with small contextual variation
- **Scoring:**
  - Hook repeats 3-6 times: +0.5
  - Some variation between occurrences: +0.3
  - Hook exists at all: +0.2
- **Flags:** If hook repeats < 2 times → Negative flag: "Your hook phrase '{phrase}' only appears {n} time(s). Repetition is how humans encode memory — repeat it more." If hook repeats > 8 times with no variation → Neutral flag: "Your hook repeats {n} times. Consider varying the surrounding context each time to keep it fresh."

#### T04 — Repetition as Mantra
- **Author:** Jack Antonoff
- **Weight:** 0.06
- **Description:** Repeat a phrase until it transforms from words into feeling.
- **Algorithm:**
  1. Find all repeated phrases (2+ words, 3+ occurrences)
  2. Calculate "mantra density" = total repeated phrase occurrences / total lines
  3. Ideal mantra density: 0.3-0.6 (30-60% of lines contain repeated phrases)
- **Scoring:** `1.0 - abs(mantra_density - 0.45) / 0.45`
- **Flags:** If mantra density < 0.15 → Negative flag: "Your lyrics have very little repetition. Jack Antonoff builds catharsis through obsessive restatement — consider repeating key phrases more." If mantra density > 0.7 → Neutral flag: "Heavy repetition detected. Make sure it feels intentional, not lazy."

#### T05 — Hook/Title Structural Placement
- **Author:** Diane Warren
- **Weight:** 0.10
- **Description:** The title phrase should appear in the chorus, ideally at the start or end.
- **Algorithm:**
  1. Extract the title phrase
  2. Search for exact or fuzzy matches in the lyrics
  3. For each match, record: section (verse/chorus/bridge), position within section (start/middle/end)
  4. Score based on: title in chorus (+0.4), title at start or end of chorus (+0.3), title appears multiple times (+0.2), title in final chorus (+0.1)
- **Scoring:** Sum of the above, capped at 1.0
- **Flags:** If title not found in lyrics → Negative flag: "Your title '{title}' doesn't appear anywhere in the lyrics. Diane Warren's rule: the hook IS the title." If title only in verse, not chorus → Negative flag: "Your title appears in the verse but not the chorus. Move it to the chorus — that's where it matters most."

#### T06 — Singability Metrics
- **Author:** Max Martin
- **Weight:** 0.07
- **Description:** If you can't sing it a cappella walking down the street, rewrite it.
- **Algorithm:**
  1. For each line, calculate:
     - Syllable count
     - Consonant cluster density (consecutive consonants / total characters)
     - Average syllable length (characters per syllable)
  2. Flag lines with high consonant cluster density (> 0.6) or very long syllables (> 4 chars/syllable)
  3. Score: higher when fewer lines are flagged
- **Scoring:** `1.0 - (flagged_lines / total_lines)`
- **Flags:** Flagged lines → Negative flag: "This line has dense consonant clusters that are hard to sing. Try replacing hard consonant combinations with more open vowel sounds."

#### T07 — Line Length Consistency
- **Author:** Max Martin
- **Weight:** 0.06
- **Description:** Parallel lines within a section should have similar syllable counts.
- **Algorithm:**
  1. Group lines by section (verse 1, verse 2, chorus, etc.)
  2. Within each section, calculate syllable count per line
  3. Calculate coefficient of variation (CV) for each section
  4. Ideal CV: < 0.25 (lines within a section are similar length)
- **Scoring:** `1.0 - min(1.0, avg_cv / 0.5)`
- **Flags:** Sections with CV > 0.4 → Negative flag: "Your {section} has inconsistent line lengths (ranging from {min} to {max} syllables). This disrupts the rhythmic flow."

#### T08 — Title Brevity
- **Author:** Diane Warren
- **Weight:** 0.04
- **Description:** The best titles are 2-4 words.
- **Algorithm:**
  1. Count words in title
  2. Score: 2-4 words = 1.0, 1 word = 0.7, 5 words = 0.5, 6+ words = 0.3
- **Scoring:** Lookup table based on word count
- **Flags:** If title > 5 words → Neutral flag: "Your title is {n} words long. Diane Warren's best titles are 2-4 words. Can you shorten it?"

#### T09 — Rhyme Scheme Consistency
- **Author:** Max Martin / Diane Warren
- **Weight:** 0.08
- **Description:** Pop hits use predictable rhyme patterns (AABB, ABAB, ABCB) within sections.
- **Algorithm:**
  1. For each section, extract the last word of each line
  2. Compute phonetic similarity between line endings using a rhyme detection algorithm (matching final stressed vowel and subsequent sounds)
  3. Detect pattern: AABB (consecutive pairs rhyme), ABAB (alternating), ABCB (2nd and 4th rhyme), or free (no pattern)
  4. Score: consistent pattern within section = high, mixed patterns = medium, no pattern = low
  5. Use a phonetic approximation: compare last 2-3 characters of each word (simplistic but effective for English pop)
- **Scoring:** `percentage_of_lines_that_fit_detected_pattern`
- **Flags:** Lines that don't fit the detected pattern → Neutral flag: "This line doesn't rhyme with the expected line in your {scheme} pattern. Consider adjusting the ending word."

#### T10 — Section Length Parity
- **Author:** Max Martin
- **Weight:** 0.05
- **Description:** Verses and choruses should be similar in length for rhythmic predictability.
- **Algorithm:**
  1. Count lines/syllables in each verse and each chorus
  2. Calculate ratio of avg verse length to avg chorus length
  3. Ideal ratio: 0.8-1.2 (verse and chorus are within 20% of each other)
- **Scoring:** `1.0 - min(1.0, abs(ratio - 1.0) / 0.5)`
- **Flags:** If ratio < 0.6 or > 1.5 → Neutral flag: "Your verses are {n}x the length of your choruses. Consider balancing them for better flow."

#### T11 — Vocabulary Simplicity
- **Author:** Diane Warren / Julia Michaels
- **Weight:** 0.06
- **Description:** Hit songwriters use simple, common English words.
- **Algorithm:**
  1. Tokenize lyrics into individual words
  2. Score each word against a frequency list (top 1000 = very common, top 5000 = common, 5000+ = uncommon)
  3. Calculate percentage of words in top 5000
  4. Penalize words with > 4 syllables
- **Scoring:** `(percentage_in_top_5000 * 0.7) + (percentage_with_<=4_syllables * 0.3)`
- **Flags:** Uncommon words → Neutral flag: "'{word}' is uncommon in pop lyrics. Diane Warren's hits use zero obscure words. Consider a simpler synonym."
- **Note:** Word frequency list should be bundled as a static asset (~50KB for top 5000 words).

#### T12 — Direct Address Pronoun Density
- **Author:** Diane Warren / Julia Michaels
- **Weight:** 0.07
- **Description:** "I" and "you" create direct emotional connection.
- **Algorithm:**
  1. Count occurrences of first-person pronouns: I, me, my, mine, myself, we, us, our
  2. Count occurrences of second-person pronouns: you, your, yours, yourself
  3. Calculate pronoun density = (I_count + you_count) / total_words
  4. Ideal density: 0.08-0.18 (8-18% of words are I/you pronouns)
- **Scoring:** `1.0 - min(1.0, abs(density - 0.13) / 0.13)`
- **Flags:** If density < 0.05 → Neutral flag: "Low 'I' and 'you' usage. Direct address creates emotional immediacy — consider speaking directly to someone." If density > 0.25 → Neutral flag: "Very high pronoun density. Make sure you're also including concrete imagery and detail."

#### T13 — Post-Chorus Hook Fragment Detection
- **Author:** Pharrell Williams / Ed Sheeran
- **Weight:** 0.05
- **Description:** Modern pop repeats short hook fragments after the chorus ends.
- **Algorithm:**
  1. Detect chorus boundaries
  2. In the 1-3 lines immediately following each chorus, check for repeated short phrases (2-5 words)
  3. Check if these phrases contain vocables (oh, ah, eh, na, la, hey) or fragments of the chorus hook
  4. Score: post-chorus fragments found = high, none found = neutral (not required)
- **Scoring:** `if post_chorus_fragments_found { 1.0 } else { 0.5 }`
- **Flags:** If no post-chorus detected → Note flag: "Consider adding a short repeated hook fragment after your chorus (like 'ella, ella' or 'oh-I-oh-I'). This is a modern pop staple."

#### T14 — Bridge Vocabulary Novelty
- **Author:** Jack Antonoff / Max Martin
- **Weight:** 0.04
- **Description:** The bridge should introduce new lyrical content to create contrast.
- **Algorithm:**
  1. Build word set from all verses and choruses (excluding bridge)
  2. Build word set from bridge
  3. Calculate novelty = (bridge_words_not_in_other_sections) / (total_bridge_words)
  4. Ideal novelty: > 0.4 (40%+ of bridge words are new)
- **Scoring:** `min(1.0, novelty / 0.4)`
- **Flags:** If novelty < 0.2 → Negative flag: "Your bridge reuses too many words from your verses/chorus ({n}% new). The bridge should be a contrast — introduce new imagery or perspective."

### 6.2 Weight Summary

| ID | Technique | Author | Weight |
|---|---|---|---|
| T01 | Melodic Math (Lyrical Rhythm) | Max Martin | 0.10 |
| T02 | Chorus-First Structural Check | Max Martin | 0.08 |
| T03 | Repetition Detection & Variation | Max Martin / Jack Antonoff | 0.09 |
| T04 | Repetition as Mantra | Jack Antonoff | 0.06 |
| T05 | Hook/Title Structural Placement | Diane Warren | 0.10 |
| T06 | Singability Metrics | Max Martin | 0.07 |
| T07 | Line Length Consistency | Max Martin | 0.06 |
| T08 | Title Brevity | Diane Warren | 0.04 |
| T09 | Rhyme Scheme Consistency | Max Martin / Diane Warren | 0.08 |
| T10 | Section Length Parity | Max Martin | 0.05 |
| T11 | Vocabulary Simplicity | Diane Warren / Julia Michaels | 0.06 |
| T12 | Direct Address Pronoun Density | Diane Warren / Julia Michaels | 0.07 |
| T13 | Post-Chorus Hook Fragment | Pharrell Williams / Ed Sheeran | 0.05 |
| T14 | Bridge Vocabulary Novelty | Jack Antonoff / Max Martin | 0.04 |
| | **Total** | | **1.00** |

### 6.3 Score Ranges

| Range | Label | Description |
|---|---|---|
| 90-100 | "Hit Potential" | Exceptional structural and lyrical quality |
| 75-89 | "Strong Foundation" | Solid songwriting with minor refinements possible |
| 60-74 | "Good Bones" | Core ideas are there, several areas for improvement |
| 45-59 | "Work in Progress" | Significant structural or lyrical issues |
| 0-44 | "Back to the Drawing Board" | Fundamental rethinking needed |

---

## 7. Highlighted Lyrics

### 7.1 Rendering Rules

The lyrics display must:

1. Show line numbers (left-aligned, muted color)
2. Visually distinguish sections (verse, chorus, bridge) with subtle headers
3. Inline annotations appear as:
   - **Gold underline** — Positive flag (technique applied well)
   - **Rust underline with dot** — Negative flag (improvement opportunity)
   - **Sepia dashed underline** — Neutral/note flag
4. Clicking/tapping an underlined segment shows a tooltip/popover with:
   - Technique name
   - Author attribution
   - Explanation of why it was flagged
   - Suggested improvement (if negative flag)
5. Section headers show section-level scores where applicable

### 7.2 Section Detection

Since the user provides plain text lyrics (not structured data), sections must be detected heuristically:

- **Explicit labels:** Lines matching `verse`, `chorus`, `bridge`, `pre-chorus`, `outro`, `intro` (case-insensitive, with or without numbers/colons)
- **Structural repetition:** Lines or line groups that appear identically 2+ times are likely choruses
- **Positional heuristics:** First distinct block = verse, repeated block = chorus, unique block near end = bridge
- **Fallback:** If no sections detected, treat entire lyrics as one section and apply all techniques uniformly

### 7.3 Annotation Detail Panel

When a user taps an annotation, a detail panel slides up (mobile) or appears as a popover (desktop) containing:

```
┌─────────────────────────────────────┐
│  T05 — Hook/Title Placement         │
│  Diane Warren                       │
│                                     │
│  "Your title 'Blank Space' appears  │
│   in the chorus at the start of     │
│   the line. This is ideal — the     │
│   hook IS the title."               │
│                                     │
│  ✓ Applied well                     │
└─────────────────────────────────────┘
```

---

## 8. Downloadable Markup

### 8.1 Format

The download produces a Markdown file with the following structure:

```markdown
# Song Analysis: {title}
**Score: {score}/100** — {label}

---

## Score Breakdown

| # | Technique | Author | Score | Weight | Contribution |
|---|---|---|---|---|---|
| T01 | Melodic Math | Max Martin | {score} | {weight} | {contribution} |
| ... | ... | ... | ... | ... | ... |

---

## Lyrics with Annotations

### Verse 1
1: {line text}
   <!-- T09: ✓ This line rhymes with line 3 (ABAB pattern) -->

2: {line text}
   <!-- T01: ⚠ This line has 12 syllables, but your verse averages 8. Consider shortening. -->

### Chorus
...

---

## Improvement Opportunities

### High Priority
- **T05** (Diane Warren): Your title '{title}' doesn't appear in the chorus. Move it there.
- **T01** (Max Martin): Lines 4, 7, 12 have inconsistent syllable counts.

### Medium Priority
- **T11** (Julia Michaels): 3 uncommon words detected: '{word1}', '{word2}', '{word3}'.

### Low Priority / Notes
- **T13** (Pharrell Williams): No post-chorus hook fragment detected. Consider adding one.
```

### 8.2 Filename

`{sanitized_title}_analysis.md`

---

## 9. Component Structure

### 9.1 Frontend Components

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, global styles
│   ├── page.tsx                # Landing / input screen
│   └── results/
│       └── page.tsx            # Results screen (or modal)
├── components/
│   ├── InputForm.tsx           # Title + lyrics textarea + analyze button
│   ├── ScoreBadge.tsx          # Wax-seal score display
│   ├── ScoreBreakdown.tsx      # 14-row table of technique scores
│   ├── HighlightedLyrics.tsx   # Lyrics with inline annotations
│   ├── AnnotationPopover.tsx   # Tooltip/popover for annotation details
│   ├── DownloadButton.tsx      # Triggers markup download
│   ├── SectionHeader.tsx       # Verse/Chorus/Bridge label
│   └── LoadingOverlay.tsx      # Analysis in progress
├── lib/
│   ├── wasm-loader.ts          # Loads and initializes WASM module
│   ├── types.ts                # TypeScript types matching Rust output
│   └── section-detector.ts     # Heuristic section parsing (JS-side)
├── styles/
│   └── globals.css             # Tailwind + design tokens + textures
└── public/
    ├── fonts/                  # Playfair Display, Lora, IBM Plex Mono
    └── textures/               # Paper grain SVG/PNG
```

### 9.2 Rust Crate Structure

```
melodestiny-core/
├── Cargo.toml
├── src/
│   ├── lib.rs                  # WASM entry point
│   ├── analyzer.rs             # Main analysis orchestrator
│   ├── techniques/
│   │   ├── mod.rs
│   │   ├── t01_melodic_math.rs
│   │   ├── t02_chorus_first.rs
│   │   ├── t03_repetition.rs
│   │   ├── t04_mantra.rs
│   │   ├── t05_hook_placement.rs
│   │   ├── t06_singability.rs
│   │   ├── t07_line_consistency.rs
│   │   ├── t08_title_brevity.rs
│   │   ├── t09_rhyme_scheme.rs
│   │   ├── t10_section_parity.rs
│   │   ├── t11_vocabulary.rs
│   │   ├── t12_pronoun_density.rs
│   │   ├── t13_post_chorus.rs
│   │   └── t14_bridge_novelty.rs
│   ├── syllable.rs             # Syllable counting algorithm
│   ├── rhyme.rs                # Phonetic rhyme detection
│   ├── section.rs              # Section detection
│   ├── markup.rs               # Markdown/HTML markup generation
│   └── types.rs                # Shared types
├── static/
│   └── word_freq.json          # Top 5000 English words by frequency
└── tests/
    ├── integration/
    │   └── full_analysis.rs
    └── unit/
        ├── t01.rs
        ├── ...
        └── t14.rs
```

---

## 10. Key Algorithms Detail

### 10.1 Syllable Counting

Use the vowel-group method:
1. Convert word to lowercase
2. Count groups of consecutive vowels (a, e, i, o, u, y)
3. Subtract 1 for each trailing 'e' (silent e)
4. Add 1 if word ends in 'le' or 'les' preceded by a consonant
5. Minimum 1 syllable per word

```rust
fn count_syllables(word: &str) -> usize {
    let word = word.to_lowercase();
    let vowels: Vec<char> = "aeiouy".chars().collect();
    let mut count = 0;
    let mut prev_was_vowel = false;

    for ch in word.chars() {
        let is_vowel = vowels.contains(&ch);
        if is_vowel && !prev_was_vowel {
            count += 1;
        }
        prev_was_vowel = is_vowel;
    }

    // Silent e adjustment
    if word.ends_with('e') && count > 1 {
        count -= 1;
    }

    count.max(1)
}
```

### 10.2 Rhyme Detection

Simplified phonetic matching:
1. Extract last word of each line
2. Strip common suffixes (ing, ed, tion, s)
3. Compare last 2-3 characters (vowel-consonant pattern)
4. Words rhyme if their endings match after normalization

For more accuracy, bundle a small phonetic dictionary (~2000 common words) or use the CMU Pronouncing Dictionary subset.

### 10.3 Section Detection

```rust
fn detect_sections(lyrics: &str) -> Vec<Section> {
    // 1. Check for explicit labels (verse, chorus, bridge, etc.)
    // 2. If no labels found, use structural repetition:
    //    - Find repeated line groups (2+ identical lines)
    //    - Mark repeated groups as chorus
    //    - Mark non-repeated groups as verse
    //    - Mark unique group near end as bridge
    // 3. Fallback: single section
}
```

---

## 11. Performance Requirements

| Metric | Target | Notes |
|---|---|---|
| WASM bundle size | < 2MB gzipped | Includes word frequency data |
| Analysis time | < 200ms | For lyrics up to 500 lines |
| First contentful paint | < 1.5s | On 3G connection |
| Time to interactive | < 3s | WASM loads async |
| Total page weight | < 5MB | Including fonts and textures |

---

## 12. Accessibility

- All interactive elements must be keyboard-navigable
- Annotations must be screen-reader accessible (aria-describedby)
- Color is never the only indicator — all flags also have text labels
- Score badge includes text equivalent
- Minimum contrast ratio 4.5:1 for body text
- Focus indicators on all interactive elements

---

## 13. Future Extensions (Out of Scope for v1)

- **LLM-powered techniques** — Layer 2 (12 LLM-required techniques) as a premium feature
- **Audio input** — Upload audio, transcribe to lyrics via Whisper WASM
- **Rhyme suggestions** — Suggest rhyming words for flagged lines
- **Multi-language support** — Extend syllable counter and word lists
- **Collaboration** — Share analysis links
- **History** — Save and compare past analyses
- **Tauri native app** — Wrap for iOS/Android using shared Rust core

---

## 14. Testing Strategy

### 14.1 Unit Tests (Rust)

Each technique module has a `tests/` directory with:
- Known-good lyrics (e.g., "Blank Space" by Taylor Swift) expected to score > 80
- Known-bad lyrics (e.g., random word soup) expected to score < 30
- Edge cases: empty lyrics, single word, no chorus, all chorus

### 14.2 Integration Tests (Rust)

- Full analysis pipeline on 10+ real pop songs
- Verify total score is weighted sum of individual scores
- Verify markup output is valid Markdown

### 14.3 E2E Tests (Frontend)

- Playwright or Cypress
- Input form → analyze → results render → download works
- Mobile viewport tests (375px)
- Annotation popover opens on tap

---

## 15. Deployment

### 15.1 Vercel Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "functions": {
    "app/api/**": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)\\.wasm",
      "headers": [
        { "key": "Content-Type", "value": "application/wasm" },
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 15.2 Build Pipeline

```
1. cargo build --target wasm32-unknown-unknown --release
2. wasm-bindgen --target web --out-dir ./public/wasm ./target/wasm32-unknown-unknown/release/melodestiny_core.wasm
3. npm run build (Next.js)
4. Deploy to Vercel
```

---

## 16. Glossary

| Term | Definition |
|---|---|
| **Hook** | The most memorable, catchy part of a song — usually in the chorus |
| **Pre-chorus** | A transitional section between verse and chorus that builds tension |
| **Post-chorus** | A section immediately after the chorus that repeats a hook fragment |
| **Bridge** | A contrasting section, usually appearing once after the second chorus |
| **Mantra** | A phrase repeated so many times it transcends meaning and becomes feeling |
| **Vocables** | Non-lexical syllables like "oh", "ah", "la", "na" |
| **Syllable density** | Number of syllables per line |
| **Coefficient of variation** | Standard deviation divided by mean — measures relative variability |
| **WASM** | WebAssembly — binary instruction format for stack-based virtual machines |

---

## 17. Open Questions

1. **Word frequency list source:** Use Google Books n-gram data or a curated pop lyric corpus?
2. **Rhyme dictionary:** Bundle CMU Pronouncing Dictionary subset (~2000 words) or use heuristic-only approach?
3. **Section detection fallback:** When no sections are detected, should we analyze as one section or attempt auto-partitioning by line count (e.g., every 4 lines = verse)?
4. **Download format:** Markdown only, or also offer HTML with embedded styles?
5. **Dark mode:** Include in v1 or defer?

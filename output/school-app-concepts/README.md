# School app concept collection

Twelve app concepts, each interpreted in five distinct visual directions. Each direction pairs a screenshot concept, a logo candidate and a tagline: 60 screens, 60 logos and 60 taglines in total.

Open `index.html` in a browser to compare the directions, enlarge images, download individual files and save a shortlist. The gallery works locally without a build step or external dependencies. Shortlist storage is browser-local; use **Export shortlist** to save a portable copy.

## Files

- `index.html`: the complete comparison gallery.
- `taglines.csv`: all 60 taglines, direction descriptions and asset paths.
- `taglines.md`: a readable table of the 60 taglines, grouped by app.
- `concepts.json`: structured creative briefs and educational constraints.
- `<app>/<direction>/screenshot.png`: generated iPad-first concept screen.
- `<app>/<direction>/logo.png`: generated logo lockup with an emblem and wordmark.
- `generation/prompts.json`: full screenshot and logo prompt set.
- `generation/refinements.json`: targeted image corrections made during review.
- `generation/manifest.json`: generated asset provenance and file details.
- `build_brief.py` and `build_gallery.py`: reproducible brief and gallery builders.
- `frontend-skill-source.md`: the supplied frontend skill used for the design direction.

The screenshot and logo PNG files were created with the built-in image generation tool, not the CLI/API fallback. The gallery is plain HTML, CSS and JavaScript. No application or production website code is changed.

## How to read the concepts

These are visual explorations, not screenshots of implemented or released apps. Each numbered direction is an independent design candidate. Differences include composition, illustration, typography, interaction metaphor, logo and palette, rather than only a colour change.

The supplied product names and year levels are retained. The two blank curriculum areas are labelled **Cross-curricular** for browsing only. This is an organisational label, not a proposed curriculum classification.

UI wording within generated images may need typesetting refinement during implementation. Use the structured briefs and prompt set as the authoritative record of intended interactions and content. Logo candidates are raster concepts, not final vector identity masters; the selected identity should be redrawn and checked at small icon sizes before release.

## Platform intent

- **iPad:** landscape working canvases, large touch controls, clear primary actions and generous margins. Early-years concepts reduce reading and control density.
- **Web and desktop:** retain the central task; use available width for teacher prompts, evidence, comparison or tool panels. Add keyboard equivalents and visible focus states.
- **Portrait and narrower windows:** stack the task and supporting panels, preserve a reachable primary action and avoid shrinking type to fit.

The screenshots illustrate landscape layouts; they are not separate validated web, desktop or portrait implementations. Actual accessible labels, keyboard interaction, contrast, responsive reflow and assistive-technology behaviour must be implemented and tested in a working product.

## Learning intent retained

Classroom Words follows a teacher-set phonics sequence. Think in Parts preserves student explanations. Town Together uses competing perspectives, a budget and justified choices. Wild Notebook connects observation to comparison and discussion. TinkerTest distinguishes simulations from physical measurements. Number Kitchen uses consistent quantities and metric measures. StoryChirps keeps recording in a private classroom context. Plot a Place includes map language and navigation. Clue Canopy asks for textual evidence. SwitchSide Stories allows several reasonable responses without social scoring. Instruction Impossible makes unclear writing visible. Edit Echidna focuses on one teacher-selected revision goal and student authorship.

## Rebuilding the gallery

Run `python3 build_gallery.py` from this directory after editing `concepts.json`. `build_brief.py` recreates the original metadata and CSV; it does not regenerate artwork. Image generation prompts are retained separately for future iteration.

## Verification

The inventory check confirms 60 screenshot PNGs, 60 transparent logo PNGs and 60 unique taglines, with five directions for every app. It checks image integrity, aspect ratios, transparency and duplicate file hashes. Run `python3 validate.py` with Pillow installed to repeat it.

Gallery JavaScript syntax and DOM interaction checks passed for all 60 cards, app filtering, shortlist persistence, add/remove actions, the empty shortlist state and 120 image download links. The shared browser opened the gallery, but its automated inspection repeatedly failed or timed out; full browser visual and cross-device testing was not completed.

Representative artwork was visually reviewed, with corrections recorded for a button label, council budget arithmetic, force units, pendulum results and route wording. This was a concept-art review, not a complete curriculum or accessibility audit.

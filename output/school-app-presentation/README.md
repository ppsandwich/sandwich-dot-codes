# Small apps. Clear learning.

A web presentation for investors: 12 app slides, 24 selected screenshots and 12 icons.

Open `index.html` in a browser. Use Previous/Next, the arrow keys or All apps. Click a screenshot to enlarge it. Research opens the current app’s comparable products, proposed route to customers and validation question. Each app also has a shareable URL fragment. Browser printing lays out one app per landscape page.

The deck uses the retained screens from `../school-app-contexts/`, preserving their screen numbers and image bytes. It does not reintroduce removed directions. All assets and fonts are local, so the presentation works offline. Source links open the official product websites when online.

## Content and research

- `content.json`: concise slide copy, sources and market hypotheses.
- `research.md`: dated research notes, customer routes and questions for pilots.
- `index.html`: generated presentation, ready to open or host as static files.
- `template.html`, `style.css`, `app.js`: source presentation components.
- `assets/`: selected icons, screenshots and licensed DM Sans fonts.
- `qa.json`: browser checks for navigation, assets and responsive layouts.

Comparable product features are sourced from official pages reviewed on 11 October 2026. Proposed advantages and product-market fit remain hypotheses. Lesson durations are suggested teaching sequences, not measured usage. The app screenshots depict concepts rather than working, validated products.

The visual direction is minimal and monochromatic: a near-black background, white and grey sans serif type, restrained rules and large logos in place of separate app-name headings. Logos use a CSS monochrome treatment with increased brightness for legibility; the original image files are preserved. Desktop slides keep the learning goal, screenshots and market rationale together. Tablet and mobile layouts scroll with persistent navigation. Keyboard focus, modal focus restoration and reduced-motion preferences are supported.

## Rebuild

From the repository root:

```sh
python3 output/school-app-presentation/build.py
python3 output/school-app-presentation/validate.py
python3 output/school-app-presentation/package.py
```

The builder reads app metadata from `school-app-variations` and the retained selection from `school-app-contexts`. A delivered copy needs only the files in this folder to run. No framework, installation or external script is required.

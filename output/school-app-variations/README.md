# School app variations

Three screenshot and logo variations for each of the 24 selected directions: **72 new screenshots and 72 new transparent logos** across 12 apps.

Open **[index.html](index.html)** to compare the collection. The gallery includes app filters, separate screenshot and logo views, full-size previews, the original references, and a shortlist that can be exported as CSV. Shortlists stay in the browser where they were created.

Each selected direction has three treatments, interpreted for that app:

- **A — Quiet clarity:** simpler composition and restrained visual detail.
- **B — Tactile studio:** paper, material texture and a more physical setting.
- **C — Graphic play:** stronger colour, shapes and emphasis.

The direction numbers, order and original taglines are retained. Each variation also has its own descriptive name in the gallery and CSV.

| App | Selected directions |
| --- | --- |
| Classroom Words | 3, 5 |
| Think in Parts | 4, 1 |
| Town Together | 1, 4 |
| Wild Notebook | 1, 4 |
| TinkerTest | 5, 1 |
| Number Kitchen | 2, 4 |
| StoryChirps | 4, 2 |
| Plot a Place | 4, 2 |
| Clue Canopy | 2, 4 |
| SwitchSide Stories | 2, 1 |
| Instruction Impossible | 3, 5 |
| Edit Echidna | 1, 3 |

Files follow `app/direction/a/screenshot.png` and `app/direction/a/logo.png`, with corresponding `b` and `c` folders. Each direction's `original` folder contains copies of the two original reference images. The previous collection is unchanged.

The screenshots are landscape 4:3 concept artwork for an iPad-led product, with web and desktop use in mind. They are static visual explorations. Logos are square transparent PNGs. These are raster design assets; editable UI components and vector logo masters are not included.

All images were produced with the built-in image generation tool. [generation/jobs.json](generation/jobs.json) contains the initial prompt set. Each final PNG has an adjacent `.provenance.json` file recording its generation prompt, references and output. Targeted corrections are recorded there, with earlier versions retained under `generation/revisions`. [generation/manifest.json](generation/manifest.json) records the final dimensions and SHA-256 hashes.

[variations.csv](variations.csv) is the 72-row asset index. [variations.json](variations.json) contains the detailed creative briefs. The complete download is [school-app-variations.zip](school-app-variations.zip); extract it before opening the gallery. The ZIP is excluded from Git by the local `.gitignore`.

The gallery has no external dependencies. If your browser restricts local file features, serve this folder with `python3 -m http.server 8766 --bind 127.0.0.1`, then open `http://localhost:8766/`.

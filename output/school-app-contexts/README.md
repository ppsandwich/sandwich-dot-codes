# Three more contexts for each selected app design

Open [the gallery](index.html) to browse 51 separate screenshots: three additional tasks for each of the 17 selected designs across 12 apps. Filter by app, enlarge a screen, compare it with the selected reference, or download its PNG.

- [Teaching notes](teaching-notes.md): a concrete outcome, observable evidence and lesson use for every task.
- [App outcomes](app-outcomes.md): detailed pedagogical outcomes and lesson plans for all 12 apps.
- [Screen index](contexts.csv): paths and educational metadata for all 51 screenshots.
- [Download collection](school-app-contexts.zip): an offline copy of the gallery, screenshots and notes.

Screens retain the selected visual direction and logo. They are static concept artwork, not working applications. Task numbers distinguish contexts rather than prescribe an age or difficulty progression. Teachers should select tasks after the relevant explicit teaching and adjust scaffolding to their learners.

## Files and provenance

Each screenshot lives at `app/direction/variation/01–03/screenshot.png`, with its generation provenance beside it. `references/` contains unchanged copies of the 17 selected screenshots and logos. Raster artwork was generated and corrected using the built-in image generation tool; it was not edited with Python or a command-line image processor.

`contexts.json` contains the task briefs and initial prompts. `generation/batch-01.json` and `generation/batch-02.json` preserve the initial generation requests. `generation/corrections/` preserves correction requests and the prior images. The adjacent provenance records the request that produced each final image. `visual-review.json` records the review of the final files; `gallery-qa.json` records browser checks.

## Rebuild and validate

Run these commands from the repository root:

```sh
python3 output/school-app-contexts/build_collection.py
python3 output/school-app-contexts/validate_collection.py
python3 output/school-app-contexts/build_archive.py
```

The gallery builder uses the existing `school-app-variations` collection for the app outcomes and any missing reference copies. The delivered gallery itself works offline and has no external dependencies. Validation uses Python's standard library.

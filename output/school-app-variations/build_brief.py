import csv, json, hashlib, shutil
from pathlib import Path

ROOT = Path(__file__).parent
SOURCE = ROOT.parent / 'school-app-concepts'
SELECTION = {
    'Classroom Words': [3, 5], 'Think in Parts': [4, 1], 'Town Together': [1, 4],
    'Wild Notebook': [1, 4], 'TinkerTest': [5, 1], 'Number Kitchen': [2, 4],
    'StoryChirps': [4, 2], 'Plot a Place': [4, 2], 'Clue Canopy': [2, 4],
    'SwitchSide Stories': [2, 1], 'Instruction Impossible': [3, 5], 'Edit Echidna': [1, 3]
}
PRESETS = [
    dict(id='A', name='Quiet clarity', screen='A calmer, more precise editorial interface. Broad plain surfaces, subtle fine rules, one restrained illustration, careful humanist typography. Reduce decorative scenery. Make the main task substantially larger and the supporting tools quieter.', logo='Refine the defining emblem into clean geometric construction with generous negative space, fewer parts and precise even edges. Pair it with a compact humanist sans wordmark. A single restrained accent; no gradients or texture.'),
    dict(id='B', name='Tactile studio', screen='A carefully crafted paper-and-ink interpretation. Flat cut-paper shapes, slight printed texture, illustrated task materials and expressive but highly readable type. Materiality belongs on task objects, not endless decorative backgrounds. An original asymmetrical composition.', logo='Reinterpret the defining emblem as a distinctive hand-cut paper silhouette with subtly irregular but intentional contours. Use solid ink shapes, not grain or gradients. Pair it with warm, slightly rounded lettering. A tightly composed stacked lockup.'),
    dict(id='C', name='Graphic play', screen='A confident graphic interpretation with larger geometric shapes, sharply defined colour zones, strong typographic contrast and flat illustrative geometry. Use the original palette with a different balance. Keep the learning task dominant; avoid extra mascots and visual clutter.', logo='Rebuild the defining emblem into a bold compact symbol using clever interlocking forms or negative space. Strong recognisable silhouette with two or three flat colours. Use a distinctive bold wordmark. No enclosing generic app-icon square.')
]
# Each row: original app slug/direction, then three (variant title, screen composition, logo refinement) tuples.
SPECS = {
('classroom-words',3): [
('Ticket desk', 'Horizontal letter-ticket assembly above a wide simple railway line; a narrow teacher-set strip at top and two clear audio controls below.', 'Three upright ticket forms, a single sound-wave cutout, compact horizontal wordmark.'),
('Paper platform', 'Three paper train carriages across a cream stage, with the letter bank in a station-ticket tray on the left.', 'A slightly fanned trio of ticket silhouettes forming a friendly W.'),
('Sound express', 'A bold blue header and terracotta carriage band; oversized p i n letters, clean cream footer with six letter tickets.', 'Three tickets connected into a forward-moving W, one open sound dot.')],
('classroom-words',5): [
('Listening space', 'Three generous outlined sound circles above one listen control, word choices in a slim lower row; generous mint space.', 'Three precise connected rings with one short speech tail; remove decorative rays.'),
('Sound buttons', 'Three flat paper sound discs on a cream activity mat, peach listen tab on the right and three word cards below.', 'Three hand-cut discs linked into a soft speech silhouette.'),
('Circle rhythm', 'Oversized teal and peach sound circles make a strong top row; a wide Listen bar separates the three large answer panels.', 'Alternate solid and open circles in one bold speech-shaped chain.')],
('think-in-parts',4): [
('Ink canvas', 'An expansive circuit canvas with one quiet horizontal drawing toolbar and a recording strip along the bottom; challenge prompt in a narrow right margin.', 'One continuous stroke joins a pencil line to a simple waveform.'),
('Voice journal', 'An open sketchbook: circuit drawing on the left page, spoken explanation and waveform on a narrower right page; small tools on paper tabs.', 'An organic drawn speech curve containing three uneven but controlled waveform strokes.'),
('Signal studio', 'Wide ivory circuit canvas framed by a deep green vertical tool rail and salmon recording dock; large clear labels and few controls.', 'A bold waveform cut through an open speech symbol, with a pencil-like terminal.')],
('think-in-parts',1): [
('Mechanism desk', 'A large clean lever diagram over a four-frame horizontal timeline; teacher challenge and student explanation occupy one quiet right column.', 'Three crisp folded shapes form one open speech outline.'),
('Folded explanation', 'Paper-cut lever model on an off-white sheet, four animation frames as moveable paper strips below and one folded brief card at right.', 'Three folded-paper pieces with intentional irregular angles and one separated orange corner.'),
('Parts in motion', 'Bold orange challenge rail on the left, large diagram in the centre, compact playback timeline at the bottom and a floating explanation note.', 'Interlocking triangle and quadrilateral forms create a compact speech arrow.')],
('town-together',1): [
('Council plan', 'A restrained top-down oval plan with two equally weighted proposal columns below; budget and decision action in a persistent right strip.', 'Three clean roof shapes around an open central meeting circle.'),
('Tabletop town', 'A paper town model on an oval council table; two proposal folios left and right and a budget card below the model.', 'Three irregular cut-paper roofs gathered around one shared open centre.'),
('Public choices', 'A graphic split comparison of garden and sports proposals, compact town illustration between them and a high-contrast budget bar below.', 'Three interlocking roof blocks produce a circular negative-space meeting point.')],
('town-together',4): [
('Assembly notes', 'A calm semicircular chamber diagram above three equally sized resident perspective cards; a right-hand decision notebook.', 'Five simple rounded marks arranged in a measured semicircle around a speech dot.'),
('Voices at the table', 'Paper resident portrait tokens around a large semicircular table; a folded library proposal and budget ledger below.', 'Five hand-cut meeting tokens form an open circle around a small speech centre.'),
('The hearing room', 'Aubergine chamber band across the top; three strong portrait panels under it, with peach decision and budget controls at the right.', 'Bold alternating chamber-seat forms create a distinctive open conversation arc.')],
('wild-notebook',1): [
('Observation sheet', 'One large beetle observation drawing and a calm structured field-record column; four large evidence actions at the bottom.', 'A minimal open notebook with one leaf page and an observation dot.'),
('Pressed pages', 'A stitched field-journal spread, specimen illustration on a removable paper sheet and location/count notes on the facing page.', 'A hand-cut leaf unfolds from two slightly irregular book pages.'),
('Field record', 'Large forest-green title band, cream specimen panel, crisp rust observation tabs and a clear structured notes panel.', 'A bold notebook frame contains a leaf-shaped negative space and one dot.')],
('wild-notebook',4): [
('Habitat comparison', 'Two equally sized habitat cross-sections with directly aligned count rows; a reflection prompt below and a quiet evidence toolbar.', 'Three precise ground strata form a book with one small sprout.'),
('Layers of life', 'Paper-cut garden and paved-edge sections on two separate observation sheets; specimen count labels attached to each layer.', 'Three irregular layered-paper strips open like pages beneath a sprout.'),
('Ground patterns', 'Wide split-screen soil layers in strong sand and moss blocks; student observation counts in a clean shared footer.', 'Interlocking ground bands create an open-book silhouette with a sprout cutout.')],
('tinkertest',5): [
('Evidence desk', 'Three clear workflow labels across the top; pendulum model and controls left, exact results table right, reflection along the bottom.', 'A spare pendulum arc crosses a clean graph axis to suggest a T.'),
('Experiment ledger', 'Pendulum model as a paper instrument on the left page of a lab ledger; carefully ruled five-row data table on the right.', 'A hand-cut pendulum bob and arc combine with a simple ink axis.'),
('Predict, test, explain', 'Three bold numbered workflow bands with the centre active; a large model and a contrasting ink-on-paper results table.', 'A robust T-shaped support and curved pendulum path with one highlighted test point.')],
('tinkertest',1): [
('Controlled bench', 'A clean ramp schematic on the left, one variable slider and locked controls on the right; exact three-row results table beneath.', 'A clean flask outline containing one slider track and one variable dot.'),
('Paper instrument', 'A carefully cut-paper ramp model, tactile height control and a ruled trial-record card placed alongside it.', 'A hand-cut flask silhouette with a vertical variable track in negative space.'),
('Variable board', 'Large flat ramp geometry against blue-grey; orange height control, clearly separated constants and a wide results strip.', 'A bold flask formed around a central slider with one orange adjustment dot.')],
('number-kitchen',2): [
('Recipe columns', 'A large two-column recipe comparison dominates the canvas, with exactly counted fruit illustrations and a compact ingredient tray below.', 'Two minimal spoon-page forms and a small fraction slash inside an open book.'),
('Kitchen scrapbook', 'A paper recipe spread with separate ingredient cutouts: one banana and two strawberries left, two bananas and four strawberries right.', 'A slightly irregular recipe-book silhouette with two spoon-shaped page marks.'),
('Double the batch', 'Two strong blue-and-yellow quantity panels marked For 2 and For 4, oversized exact numerals and flat fruit icons.', 'Bold folded-book geometry with two spoon cutouts and a clear fraction slash.')],
('number-kitchen',4): [
('Clear measures', 'A precise straight-sided jug at 250 mL beside a 500 mL target line; one large addition control and uncluttered answer panel.', 'A simple measuring jug outline, one half-full line and two ticks.'),
('Measuring bench', 'Two flat paper measuring cups and a transparent-style illustrated jug on a quiet tiled activity mat; large handwritten-style numerals.', 'A hand-cut measuring jug with an unmistakable half-full ink area.'),
('Fill the target', 'A broad ochre target band above a large green measurement diagram; 250 mL and 500 mL figures create the typographic hierarchy.', 'A bold jug silhouette with the half-full divide and measurement ticks cut out.')],
('storychirps',4): [
('Story frame', 'A simple cream theatre frame around three story pictures; broad sequence tray below and a quiet recording dock at right.', 'Two simple curtain wings around one open speech oval.'),
('Paper playhouse', 'A layered paper theatre with three removable scene cards, a textured reorder strip and a large clear recording button.', 'Two irregular paper curtain shapes reveal a small speech-shaped stage.'),
('On the story stage', 'A bold plum proscenium and three large cream story panels, with an orange recording band and a flat sequence tray.', 'Bold mirrored curtain shapes form bird-like wings around speech-shaped negative space.')],
('storychirps',2): [
('Story circle', 'Four simple picture cards around a small nest motif; one large central microphone control and a neat selected-order row.', 'Two restrained open speech curves nest around a tiny bird.'),
('Collected stories', 'Four cut-paper picture cards gathered around an illustrated paper nest; a tactile sequence strip spans the lower edge.', 'Two hand-cut speech shapes cradle a compact bird silhouette.'),
('Your voice, your order', 'A sage-and-ochre four-card picture grid with a strong central voice control and a clean dark-green sequence bar.', 'Two bold interlocking speech bubbles reveal a bird-shaped central space.')],
('plot-a-place',4): [
('Classroom plan', 'A spacious precise top-down classroom map with quiet furniture symbols, a compact key and a slim placement toolbar.', 'Four balanced compass points surround one open classroom square.'),
('Paper classroom', 'Furniture symbols look like flat paper pieces on a lightly gridded floor plan; a folded map key and a clear Why here note.', 'Four hand-cut compass points gather around a room-shaped centre.'),
('Place and explain', 'Bold green map header and terracotta tool rail; large geometric classroom symbols, north arrow and a clean map key.', 'A bold four-point compass contains a square room and doorway in negative space.')],
('plot-a-place',2): [
('Neighbourhood plan', 'A clean top-down neighbourhood plan occupies most of the screen; a small landmark palette and Why here explanation panel at right.', 'Three simple building blocks fit within a precise map-pin outline.'),
('Paper neighbourhood', 'A cut-paper school, park and library sit on a warm gridded map; removable landmark cards and a pinned explanation slip.', 'Three slightly irregular paper buildings cluster inside a simple location shape.'),
('Build a neighbourhood', 'Large coloured land parcels with flat landmark symbols and bold streets; a compact key and prominent Add a place control.', 'Three interlocking roof forms produce a location-pin silhouette in two colours.')],
('clue-canopy',2): [
('Evidence desk', 'Readable story text and one illustration left; two exact textual clue cards and a generous reasoning panel right.', 'Two clean speech-note shapes linked by one evidence dot.'),
('Pinned clues', 'A paper caseboard with two highlighted excerpts pinned beside the story illustration; reasoning recorded on a ruled note below.', 'Two irregular cut-paper evidence notes linked by a single small ink node.'),
('Connect the evidence', 'Strong ink and brick columns distinguish story and evidence; bold connecting lines lead into a large explanation panel.', 'Two bold interlocking speech notes produce a C with an evidence dot.')],
('clue-canopy',4): [
('Reading margin', 'An exceptionally readable story page with one highlight and a quiet linked margin note; voice, sketch and text options beneath.', 'One precise annotation bracket joins a simple magnifying lens into a C.'),
('Annotated page', 'An illustrated paper story page with a highlighted phrase and a handwritten-style marginal reason linked by a drawn line.', 'A hand-drawn bracket and rounded lens become one compact C-shaped mark.'),
('The close read', 'A bold petrol title strip, large uncluttered excerpt and strong orange highlight; a clean adjacent evidence-to-reason panel.', 'A thick C bracket surrounds a lens-shaped negative space with one orange accent.')],
('switchside-stories',2): [
('Balanced views', 'A single marker-sharing scene above two equally weighted viewpoint cards; three neutral response buttons along the bottom.', 'A clean balanced beam supports two equal-weight speech bubbles.'),
('Shared story table', 'Two paper character viewpoints sit across a gently curved seesaw motif; response cards lie on a shared conversation mat.', 'Two hand-cut speech bubbles balance on one gently curved paper beam.'),
('Try each side', 'Two strong but equally prominent colour zones frame the same shared-marker scene; three unranked response panels below.', 'Two bold opposing speech forms balance around a central fulcrum.')],
('switchside-stories',1): [
('Equal windows', 'Two spacious equal picture windows for Sam and Riley, modest speech text and one shared row of possible responses.', 'Two precise equal-size open windows become facing speech bubbles.'),
('Paper perspectives', 'Two layered paper window frames show the same playground moment from each child’s viewpoint; shared response cards underneath.', 'Two gently irregular open paper frames overlap as equal conversation shapes.'),
('Side by side', 'Green and ochre equal-width viewpoint panels with a clear central Switch view control and a neutral response strip.', 'Two strong interlocking window outlines create an open shared conversation space.')],
('instruction-impossible',3): [
('Flight plan', 'A clear overhead paper-world route beside a concise instruction editor; before and revised step are directly compared below.', 'A precise folded paper plane becomes a directional arrow with one crease.'),
('Fold and follow', 'A tactile paper bridge and character on a folded-map stage; moveable numbered instruction slips on the right.', 'A hand-cut folded plane curls around one small crease-shaped exclamation mark.'),
('Paper route', 'Bold sky-and-olive route map with a clear wrong turn into flowers; large terracotta correction panel and strong Test button.', 'A bold folded arrow with an exclamation-shaped negative-space crease.')],
('instruction-impossible',5): [
('Step editor', 'A large clean obstacle grid beside three numbered instruction rows; one ambiguous phrase highlighted with a clear revision field.', 'Three clean step shapes join into one turning arrow with an intentional gap.'),
('Workshop cards', 'Flat paper obstacles and character on a drawn grid; numbered paper instruction cards and a focused revision note.', 'Three hand-cut step blocks form a gently turning directional mark.'),
('Turn by turn', 'Cobalt grid stage and ochre numbered steps; a high-contrast revision panel makes the missing direction visually obvious.', 'Three bold interlocking blocks form a precise right-turn arrow.')],
('edit-echidna',1): [
('Focused edit', 'A large single revision goal above clean equal before-and-after columns; one short reflection row and one save action.', 'A simple echidna outline with a long snout and three pencil-like quills.'),
('Drafting desk', 'Two paper drafts sit side by side, sequencing changes marked in ink; a small echidna and one handwritten-style reflection card.', 'A hand-cut echidna profile with a long snout and three distinct pencil quills.'),
('One useful change', 'A strong teal goal banner, generous cream comparison columns and precise ochre highlights only on changed sequencing words.', 'A bold long-snouted echidna silhouette with three pencil strokes in negative space.')],
('edit-echidna',3): [
('Clear comparison', 'Before and after prose in an uncluttered split page with only added detail highlighted; a quiet explanation panel at right.', 'Two clean overlapping page forms create a long-snouted echidna profile.'),
('Paper revisions', 'Two layered draft pages on a writing desk with carefully marked additions; one reflection slip and small paper echidna.', 'Two irregular paper pages form an echidna back with one revision stroke.'),
('Details that matter', 'Large typographic before-and-after panels, coral detail highlights and an ink-coloured explanation column.', 'Two bold interlocking page shapes form an echidna, with one coral revision cutout.')]
}

apps, jobs, source_manifest = [], [], []
for source_app in json.loads((SOURCE / 'concepts.json').read_text()):
    a = {k:v for k,v in source_app.items() if k != 'directions'}
    a['directions'] = []
    for number in SELECTION[a['name']]:
        original = next(d for d in source_app['directions'] if d['number'] == number)
        d = dict(original)
        d['variants'] = []
        original_dir = ROOT / d['folder'] / 'original'
        original_dir.mkdir(parents=True, exist_ok=True)
        for kind in ['screenshot', 'logo']:
            src = SOURCE / d['folder'] / (kind + '.png')
            dest = original_dir / (kind + '.png')
            if not dest.exists(): shutil.copy2(src, dest)
            source_manifest.append(dict(app=a['name'],direction=number,kind=kind,source=str(src.resolve()),sha256=hashlib.sha256(src.read_bytes()).hexdigest()))
        for preset, spec in zip(PRESETS, SPECS[(a['slug'], number)]):
            title, layout, mark = spec
            folder = d['folder'] + '/' + preset['id'].lower()
            (ROOT / folder).mkdir(parents=True, exist_ok=True)
            v = dict(id=preset['id'],treatment=preset['name'],title=title,layout=layout,logo_refinement=mark,folder=folder)
            base = f"App: {a['name']}. Original direction {number}: {d['title']}. Audience: Australian school students, {a['years']}. Purpose: {a['purpose']}. Original palette and identity: {d['style']}."
            v['logo_prompt'] = f"Use case: logo-brand. Create ONE new variation of the supplied logo reference, not a collage. {base} Variation {preset['id']}: {title}. Reference role: original logo, preserve its central concept and recognisable family resemblance while making a visibly distinct candidate. Original emblem: {d['logo']}. Specific new construction: {mark}. Treatment: {preset['logo']} Exact wordmark text: '{a['name']}'. Keep the same spelling and original palette. Compose one emblem plus one wordmark together, centred with generous margins on a square canvas. Transparent background with real alpha; no white or coloured background. Flat, professional, memorable and readable at small sizes; no mockup, no presentation board, no lettering other than the app name, no variant labels, no tagline, no shadows, no gradients. Do not simply copy the original unchanged."
            v['screenshot_prompt'] = f"Use case: ui-mockup. Produce ONE distinct high-fidelity iPad app screenshot variation, landscape 4:3, straight-on full-bleed app display with no device frame. {base} Variation {preset['id']}: {title}. Image 1 is the original screenshot: a reference for learning task, palette, content and design ancestry, NOT a layout to duplicate. Image 2 is the matching NEW logo: incorporate its exact emblem and wordmark in the header, scaled down faithfully. New composition: {layout}. Art direction: {preset['screen']} Preserve this task and essential accurate UI content: {d['screen']}. Educational constraints: {a['guardrail']}. Original direction's tagline '{d['tagline']}' is context only; do not add it as screen decoration. Keep all mathematical values, counts, units, sequence words and simulated results correct and internally consistent. Use full-circuit connections for electrical diagrams. Keep diagrams scientifically coherent. Avoid introducing extra data, charts, claims or decorative slogans. Do not place inspirational messages on walls, stationery or backgrounds. Large reachable touch controls, readable Australian-English text, excellent spacing, age-appropriate illustration, strong contrast, safe margins. No generic SaaS dashboard, no invented navigation clutter, no photographic hands, no collage, no outside labels, no watermark. This must be an evident new composition within the selected direction, not merely a recolour. Preserve a usable task-focused layout adaptable to web and desktop."
            d['variants'].append(v)
            for kind in ['logo','screenshot']:
                refs = [str((original_dir / 'logo.png').resolve())] if kind == 'logo' else [str((original_dir/'screenshot.png').resolve()),str((ROOT/folder/'logo.png').resolve())]
                jobs.append(dict(id=f"{a['slug']}-{number:02d}-{preset['id']}-{kind}",app=a['name'],slug=a['slug'],direction=number,variant=preset['id'],title=title,kind=kind,folder=folder,prompt=v[kind+'_prompt'],references=refs,output=str((ROOT/folder/(kind+'.png')).resolve())))
        a['directions'].append(d)
    apps.append(a)
(ROOT/'generation').mkdir(exist_ok=True)
(ROOT/'variations.json').write_text(json.dumps(apps,ensure_ascii=False,indent=2))
(ROOT/'generation/jobs.json').write_text(json.dumps(jobs,ensure_ascii=False,indent=2))
(ROOT/'generation/source-manifest.json').write_text(json.dumps(source_manifest,ensure_ascii=False,indent=2))
with (ROOT/'variations.csv').open('w',newline='') as f:
    w=csv.writer(f);w.writerow(['App','Original direction','Direction name','Variation','Variation name','Treatment','Screenshot','Logo','Original tagline'])
    for a in apps:
        for d in a['directions']:
            for v in d['variants']:
                w.writerow([a['name'],d['number'],d['title'],v['id'],v['title'],v['treatment'],v['folder']+'/screenshot.png',v['folder']+'/logo.png',d['tagline']])
print(f'{len(apps)} apps, 24 selected directions, 72 variations, {len(jobs)} generation jobs')

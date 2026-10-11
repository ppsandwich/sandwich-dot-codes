"""Canonical educational briefs and revision jobs. Copies assets; never edits pixels."""
import csv
import hashlib
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEST = ROOT / 'pedagogy'
DEST.mkdir(exist_ok=True)
apps = json.loads((ROOT / 'variations.json').read_text())
doc = (ROOT / 'pedagogical-outcomes.md').read_text()
sections = re.split(r'\n## \d+\. ', doc)[1:]

# Description, short summary, observable primary outcome, transfer check.
COPY = [
('Teachers select the sound–letter relationships already taught. Students blend and segment words, then read controlled decodable text using that sequence. Teachers listen to independent attempts, note the support needed and check transfer to unfamiliar words.', 'Decode new words using taught sounds', 'Read an unfamiliar word made from taught sound–letter relationships, blending independently before using audio support.', 'Read different words on paper and spell a dictated word using the same correspondences.'),
('Students construct an explanation using drawing, voice, animation and interactive diagrams. Structured challenges require them to show a relationship, predict what happens when one part changes and revise after feedback. Teachers assess the accuracy and reasoning in the explanation.', 'Explain how parts affect a whole', 'Explain a causal relationship with a consistent diagram and narration, then justify a prediction when one component changes.', 'Explain a related example without replaying the finished presentation.'),
('Students investigate a public issue, compare proposals and stakeholder evidence, and calculate costs within a defined budget. In a simulated council or parliamentary process, they justify a recommendation, acknowledge a trade-off and respond to an objection. Each scenario identifies the decision-making body and its responsibilities.', 'Make and defend an informed civic decision', 'Recommend a feasible proposal using evidence from competing perspectives, accurate budget reasoning and an explicit trade-off.', 'Write an individual recommendation for a different community issue and identify the responsible institution.'),
('Students investigate biodiversity, weather, water and habitats through school-ground fieldwork. They record observations using agreed methods, compare data and distinguish what they observed from what they infer. Classroom discussion tests explanations against the evidence and identifies uncertainty or further observations needed.', 'Build explanations from field evidence', 'Make a comparison supported by systematically collected observations and state a limitation of the evidence.', 'Repeat sampling at another location or time using the same method and reconsider the explanation.'),
('Students identify a testable question, choose an independent variable, hold relevant conditions constant and make a prediction. They run a virtual investigation, interpret results and revise a conclusion using numerical evidence. Teachers help students distinguish simulation results from claims requiring physical investigation.', 'Design a test and reason from its results', 'Identify what changes, what is measured and what stays constant; use results to support or revise a prediction.', 'Design a physical investigation of a related question and identify limitations of the virtual model.'),
('Students solve cooking challenges involving quantities, equal sharing, fractions, measurement and money. Teachers choose one mathematical focus and level of difficulty. Students predict an amount, represent their strategy and check the result, with optional hands-on measuring and sharing to test transfer.', 'Explain and check everyday mathematics', 'Find an unknown quantity in a recipe or measuring task, represent a valid strategy and check that the result meets the target.', 'Solve a similar problem with real measuring equipment or counters, without the app scaffold.'),
('Students arrange picture sequences and record a story for a listener. Teacher prompts focus on sequencing, description or audience clarity. Students listen back, identify one point to improve and record a revised retelling. Different interpretations are welcome, with recordings retained in a private classroom collection.', 'Tell, listen and improve a clear story', 'Tell a connected oral story, identify a point a listener may not understand and improve that point in a second recording.', 'Retell a new picture sequence to a partner and check what the listener understood.'),
('Students make maps of familiar and imaginary places using symbols, a key, directions and age-appropriate scale. They write navigation challenges, test a partner’s route and revise unclear instructions or map features. They also explain how the location of a feature serves a particular need.', 'Make maps others can use', 'Create or interpret a consistent map, give a route another person can follow and justify one placement decision.', 'Use a paper map during a school walk, then revise it after testing the route.'),
('Students investigate illustrated stories by selecting relevant textual clues and explaining what those clues suggest. They distinguish observation from inference, consider another plausible explanation and revise a prediction when new evidence appears. Speech, drawing and writing reveal reasoning without requiring a single predetermined interpretation.', 'Support reading inferences with evidence', 'State a plausible inference, select a relevant text detail and explain the connection while acknowledging uncertainty.', 'Make and defend an inference from a fresh short passage without suggested answers.'),
('Through teacher-guided illustrated scenarios, students explore disagreements, joining games and working together. They identify different needs, consider possible perspectives and compare likely consequences of more than one response. Students rehearse a constructive response and reflect, with room for several reasonable answers and adult support.', 'Consider perspectives and practise responses', 'Identify two possible perspectives, compare the likely effects of two responses and explain a constructive choice.', 'Rehearse a similar situation in a supported role-play and discuss how the response affected each person.'),
('Students write directions for a character that follows explicit steps. A test reveals missing information, ambiguous language or an incorrect sequence. Students use the visible result to revise their instructions, retest them and exchange challenges so a classmate can follow the final version.', 'Write precise instructions and test them', 'Write an ordered procedure with clear actions and reference points; use a failed test to revise it so another reader can complete the task.', 'Give a partner a new physical or paper-based task using only written instructions, then revise from their feedback.'),
('Teachers assign one revision goal, such as clearer sequencing or stronger supporting detail. Students revise a short passage from their own writing, compare the versions and explain how a specific change helps the reader. The original meaning and the student’s authorship remain central.', 'Revise writing with a clear purpose', 'Make a focused change that meets a stated writing goal, preserves intended meaning and can be explained in terms of its effect on the reader.', 'Apply the same revision goal to a new piece of the student’s writing without sentence-level suggestions.')
]

# Each selected direction has a concrete student task, assessment criterion and exact screen brief.
SPECS = {}
def task(slug, number, goal, evidence, issue, brief):
    SPECS[(slug, number)] = dict(goal=goal, evidence=evidence, issue=issue, brief=brief)

task('classroom-words',3,'Blend a printed word before hearing a model.',
     'Teacher listens for correct blending of pin, records prompts and checks a different word afterwards.',
     'Audio controls and completed word-building did not distinguish independent decoding from copying a model.',
     "Keep the train-ticket identity but simplify scenery. Main heading 'Read it yourself'. Teacher-set badge 's a t p i n'. Three large coupled letter tickets p i n. No picture of a pin. Main microphone button 'Record my reading'. Secondary 'Sound help'. Small footer 'Try first. Ask for help if you need it.' Progress strip '1 Read • 2 Listen back • 3 New word'. Do not show a recorded waveform or mark correct before an attempt. No whole-word answer audio as primary action. Only student decoding stimulus is pin; adult instructions may use ordinary English. Generous space for three letters, no distracting letter bank.")
task('classroom-words',5,'Blend a word, then apply the same correspondences in a short sentence.',
     'Teacher hears the word and sentence, notes accuracy and support, then checks an unfamiliar word.',
     'Matching tap to an identical written choice could be completed without decoding.',
     "Keep mint, peach and linked circles. Heading 'Read, then read again'. Large linked circles t a p. Under them a clearly separate sentence strip 'Pat taps.' Capital P is the same taught letter. Badge 'Teacher set: s a t p i n'. Primary 'Record my reading', secondary 'Sound help'. Small progress line 'Word → Sentence → New word'. No tap/pin/sat multiple-choice cards, no picture revealing the word, no completed recording, no automatic accuracy score. Small helper 'Read to your teacher.' Adult UI may use normal English; decoding material only tap and Pat taps.")
task('think-in-parts',4,'Explain a circuit relationship and predict the effect of a change.',
     'Narration links the complete conducting path to the lamp and justifies a prediction about opening the switch.',
     'A finished explanation and labels replaced the student’s causal reasoning.',
     "Heading 'Why does the lamp light?' Keep ink-and-voice studio. Left: standard schematic rectangular series circuit. Cell symbol on left side: two unequal parallel bars. Lamp symbol on right side: circle containing X. Closed switch on top side: two contacts joined by a straight horizontal conductor, no raised blade. Wires connect both terminals of each symbol in one continuous loop. Labels 'Cell', 'Lamp', 'Closed switch'. Right: large blank 'My explanation' workspace with 'Draw links' and 'Record explanation'. Prompt 'Explain how the parts work together.' Below a separate blank prediction box 'What if the switch opens? Why?' Footer primary 'Save for feedback'. No provided causal paragraph, no completed narration, no electrical current arrows or extra branches. A subtle lamp halo is permissible only with the visibly closed switch. No realistic battery or glass bulb; use circuit symbols. No recording waveform before a response.")
task('think-in-parts',1,'Predict how changing a lever affects the effort needed and explain why.',
     'Student connects relative lever-arm lengths to effort, with a consistent diagram and explanation.',
     'A labelled diagram and supplied paragraph did not require an explanation from the student.',
     "Heading 'Move the fulcrum. Explain the change.' Paper mechanism studio. Two accurate simple horizontal lever diagrams labelled 'Before' and 'After': same load on LEFT end and downward effort arrow at RIGHT end. Before fulcrum at centre; After fulcrum closer to load at left, clearly longer right effort arm. No decorative gears. Short prompt 'Same load. Which needs less effort? Why?' Right-hand blank 'My prediction' area, tools 'Draw' and 'Record'. Blank 'My explanation' field beneath. Primary 'Share for feedback'. Labels 'Load', 'Fulcrum', 'Effort'. No completed answer or numerical mechanical advantage.")
task('town-together',1,'Choose a proposal within a budget and justify the trade-off.',
     'Recommendation cites two stakeholder needs, gives correct remaining funds and acknowledges what is forgone.',
     'The proposals showed benefits without requiring a budget calculation or reasoned recommendation.',
     "Heading 'Which proposal should council fund?' Badge 'Simulated local council'. Budget '$30,000 • one-off project funds'. Two equally weighted proposals: 'Community garden — $20,000' with quote 'We need a quiet place to meet.'; 'Sports court — $30,000' with quote 'We need space to play after school.' Neither preselected. Lower response area 'My recommendation' with two unselected choice buttons, blank 'Funds left: $ ____', blank 'My reason and trade-off' and prompt 'Use both views. What would we give up?' Primary 'Prepare council statement'. Do not show votes, winner or preferred proposal. Preserve council-table identity with restrained site illustrations.")
task('town-together',4,'Weigh access against service costs in a council decision.',
     'Student uses contrasting stakeholder evidence and project costs to justify a trial or an alternative.',
     'A unanimous positive scenario concealed competing needs and the limits of a funding decision.',
     "People’s assembly identity. Heading 'Should the library open on Sundays?' Badge 'Simulated local council'. Budget '$25,000 • one-year trial'. Proposal 'Sunday opening' table 'Staff $18,000', 'Security $5,000', 'Utilities $2,000', 'Total $25,000'. Alternative 'Keep current hours • $0 extra'. Contrasting voices: 'Student: I cannot visit on weekdays.' and 'Librarian: Sunday cover may stretch our team.' Blank fields 'My recommendation' and 'A concern we must address'. Prompt 'Use a cost and both perspectives.' Primary 'Take a position'. Small note 'Funding after the trial is undecided.' No vote tallies or unanimous approval.")
task('wild-notebook',1,'Make a field record another group can interpret.',
     'Record includes place, duration, area, observation and a separately marked tentative inference.',
     'The observation lacked a sampling method and did not separate identification uncertainty from evidence.',
     "Field journal heading 'Record what you observe'. Method strip 'Garden bed A • 1 m² • 5 minutes'. Example field record labelled 'Our observation': '3 small dark beetles seen under fallen leaves.' Small beetle sketch labelled 'Identification uncertain'. Separate blank area 'What might explain this?' with helper 'An idea, not an observation'. Blank 'What should we check next?' Tools 'Add photo', 'Sketch', 'Record voice'. Primary 'Save field record'. Small note 'Use the same method at the next site.' No invented character counter, automatic species identification, biodiversity score or causal conclusion. A quiet journal with most space for observation and reasoning.")
task('wild-notebook',4,'Compare samples fairly and limit a conclusion to the evidence.',
     'Student cites counts from both sites, distinguishes abundance from variety and states a sampling limitation.',
     'Unequal or unspecified sampling and inconsistent categories could support an invalid biodiversity conclusion.',
     "Heading 'What do these samples show?' Habitat layers identity. Method 'Each site: 1 m², 5 minutes, same morning'. One readable table with columns 'Group', 'Garden', 'Paved edge'; rows 'Ants | 12 | 6', 'Slaters | 5 | 1', 'Spiders | 4 | 1', 'Unidentified | 2 | 3'. No totals or charts needed. Two restrained labelled habitat illustrations. Blank 'My comparison' with prompt 'Use numbers from both sites.' Blank 'One limit of our evidence'. Primary 'Discuss our findings'. Small reminder 'More individuals does not always mean more kinds.' All categories exactly consistent; no leaf icons for animal counts and no prewritten conclusion.")
task('tinkertest',5,'Use a controlled simulation to test a prediction about pendulum length.',
     'Student identifies the variable and controls, cites two data points and explains whether results support the prediction.',
     'Supplied predictions and conclusions removed the investigation’s reasoning steps.',
     "Evidence-engine lab. Heading 'Does length change the swing time?' Step strip 'Predict → Test → Explain'; active Explain. Small saved student prediction 'I think a longer pendulum takes longer.' Label this explicitly 'My saved prediction'. Controls 'Mass 100 g • Release angle 10° • Gravity unchanged'. Results table 'Length (m) | One full swing (s)' rows '0.25 | 1.00', '0.50 | 1.42', '1.00 | 2.01'. Note 'Idealised simulation; one swing returns to the starting side.' Blank large response 'Do the results support my prediction? Use two results.' Primary 'Save conclusion'; secondary 'Run another length'. Small pendulum diagram at rest, one vertical bob only, no swing ghosts or arcs. Discrete length chips 0.25 m, 0.50 m, 1.00 m instead of a slider. No auto-completed conclusion or claim that virtual results prove every real case.")
task('tinkertest',1,'Relate ramp height to measured travel distance while controlling other conditions.',
     'Student names height as the changed variable and distance as the measurement, and justifies a pattern using results.',
     'Ramp geometry and measurement scale were inconsistent, and the result explanation was supplied.',
     "Workshop lab heading 'How does ramp height affect travel?' Clean schematic side-view ramp on horizontal floor with ball at top, endpoint marker beyond ramp foot. Measurement arrow starts exactly at ramp foot and ends at endpoint; label 'Travel distance'. No ruler or height ticks on drawing. Label 'Diagram not to scale'. Controls 'Same ball • Same ramp • Same surface • Release from rest'. Table 'Height (cm) | Distance (cm)' rows '10 | 28', '20 | 49', '30 | 71', caption 'Example simulation results'. Blank response 'What pattern do you see? Use two results.' Blank 'What should we test next?' Primary 'Save explanation'. No prefilled conclusion or decorative scale that contradicts data.")
task('number-kitchen',2,'Scale every ingredient by the same factor.',
     'Student finds quantities for four portions, explains doubling and checks with physical counters.',
     'The completed recipe provided the quantities the child was meant to calculate.',
     "Recipe notebook, Year 2 task. Heading 'Make enough for 4'. Left recipe 'For 2 bowls' showing exactly 1 banana and 2 strawberries with labels. Right worksheet 'For 4 bowls' with blank quantity boxes '___ bananas' and '___ strawberries'. No ingredient pictures beside the blank target quantities. Do not draw the required target quantities. Large prompt 'Show how you worked it out.' Blank drawing area with counter and pencil tools; microphone 'Tell my strategy'. Primary 'Check my recipe'. Keep bowls as portions, no fractions in this task, no completed doubling equation, no correct ticks before response. Clear touch-sized inputs and warm restrained kitchen illustration.")
task('number-kitchen',4,'Find the missing volume needed to reach a target.',
     'Student calculates the difference with units, predicts before pouring and checks the final measurement.',
     'The extra amount was already displayed, eliminating the missing-quantity problem.',
     "Measure lab, Year 3 task. Heading 'How much more makes 500 mL?' A flat front-view transparent measuring jug diagram, no perspective or elliptical water surface, with evenly spaced scale 0, 100, 200, 300, 400, 500 mL, each at correct equal heights. Water at exactly halfway between 200 and 300; nearby label 'Now: 250 mL'. Target badge 'Target: 500 mL'. Blank large input 'I will add ___ mL'. Blank workspace 'Show my strategy'. Primary 'Save prediction', secondary disabled-looking 'Pour and check' with helper 'Predict first'. Do not print the missing answer anywhere. No arbitrary cup sizes, no off-scale target marker. Child-friendly precision, no distracting cooking scene.")
task('storychirps',4,'Improve the clarity of a spoken retelling for a listener.',
     'Two recordings and a listener’s response show whether who, where and event sequence became clearer.',
     'The screen offered recording without a specific listening or revision purpose.',
     "Little story stage. Heading 'Help your listener follow the story'. Three numbered illustrations: 1 child wearing red hat in park, 2 wind lifts hat, 3 child retrieves hat from low branch. Same child and hat throughout. Goal strip 'Tell who, where and what happened.' Recording panel 'My first telling' with playback control, short waveform and duration '0:00 / 0:30'; below 'Listen back: What needs to be clearer?' with blank voice-note field. Large primary 'Record a clearer telling'. Small 'Tell it your way' and 'Private classroom collection'. No printed finished story, correctness score, automatic language judgement or public share button. Keep expressive stage identity while picture sequence and listening controls dominate.")
task('storychirps',2,'Use sequence language and revise an unclear connection in an oral story.',
     'Student connects the picture events in speech and improves one transition after listening or partner feedback.',
     'Picture ordering alone did not reveal whether the student could produce a connected oral narrative.',
     "Story nest paper picture cards. Heading 'Make the story easy to follow'. Subtitle 'Arrange the pictures to match your story.' Three reorderable numbered cards: child opens umbrella in rain; same child and umbrella beside a puddle; same child closes umbrella as sun comes out. Small optional prompt chips 'First', 'Then', 'Finally'. 'My first telling' playback and waveform. Blank reflection field 'Did I explain how the events connect?' Large 'Record my next telling'. Helper 'Listen with a partner. Choose one part to improve.' Small privacy badge 'Classroom only'. No transcribed model story or single correct plot. Keep cards large and provide voice-supported controls for early readers.")
task('plot-a-place',4,'Write and test a route using a consistent classroom map.',
     'A partner reaches the intended landmark using the student’s route; the student revises an unclear step.',
     'The design suggested a layout but did not require an authored navigation task or a peer test.',
     "Classroom compass. Heading 'Can a partner follow your route?' Accurate simple 4 by 4 square grid, columns A B C D left to right, rows 1 2 3 4 top to bottom. North arrow points up. Door symbol at A4, book symbol 'Reading corner' at D1, one desk symbol at B2. Compact key 'Door', 'Reading corner', 'Desk'; icons match map. No physical metre scale. Task 'Start at the door. Reach the reading corner.' Right blank numbered route editor 1, 2, 3. Tools 'Draw route', 'Record directions'. Primary 'Send to partner'; small next step 'Test the route, then revise'. No pre-drawn route or supplied directions. Crisp overhead map with readable coordinates.")
task('plot-a-place',2,'Justify a map placement using distance and a community need.',
     'Student uses the key and scale to compare route distances and explains how a chosen location meets a need.',
     'The neighbourhood was decorative and did not elicit spatial reasoning from the student.',
     "Little town planner. Heading 'Where should the new park go?' Flat accurate 4 by 4 square grid, columns A B C D, rows 1 2 3 4, north upwards. School symbol at A1, homes symbol at D4, candidate P at A3, candidate Q at C4. Key 'School', 'Homes', 'Possible park'. Scale text 'One move to a neighbouring square = 50 m'. Note 'Count moves between squares. No diagonals.' No graphical scale bar. Both P and Q appear in the key as possible park sites. No diagonal routes or misleading 3D perspective. Right blank choice 'My site: P / Q' neither selected; blank 'Distance from homes: ___ m'; blank 'Why this site meets a need'. Primary 'Explain my plan'. Small prompt 'Consider both school and homes.' Do not provide distances or a preferred answer. Map should occupy half the screen at least.")
task('clue-canopy',2,'Infer a possible event and explain how a text clue supports it.',
     'Student states a plausible claim, selects relevant words and explains a connection without asserting unsupported guilt.',
     'A leading question and selected clues encouraged accusation rather than evidence-based inference.',
     "Evidence board. Heading 'What might have happened?' Readable story card: 'Mia left her lunchbox on the bench. When she returned, the lid was open. Crumbs lay beside it. Leo stood nearby, holding his own sandwich.' None of text highlighted yet. Prompt 'Select a clue from the text.' Empty evidence slot 'My chosen words'. Two blank response cards 'I think… because…' and 'Another possibility…'. Tools 'Speak', 'Draw', 'Write'. Primary 'Share my reasoning'. Restrained neutral illustration of bench and closed neutral figures; do not show culprit, theft, guilty face or animals eating. No red guilt strings, points or correct answer. Text evidence must drive the inference.")
task('clue-canopy',4,'Distinguish what a text states from a reasonable inference.',
     'Student quotes a relevant clue, explains its implication and recognises that more than one explanation may fit.',
     'The supplied explanation and illustrative answer reduced the need to interpret the text.',
     "Margin detective reading page. Heading 'What can you infer?' Exact short passage: 'At lunchtime, Ava placed her umbrella beside the door. After school, the umbrella was gone. A trail of small wet patches led towards the gate.' No highlighted phrases initially. Margin tools 'Select words', 'Add a note'. Large blank response panel 'The text says…' then 'This makes me think…' then 'What else could explain it?' Primary 'Save my inference'; microphone alternative. One small neutral umbrella silhouette in margin only, no scene showing what happened, no wet patches or footprints in the artwork. Do not supply missing character, answer, automatic tick or finished sentence. Mature readable cream-and-ink page with generous annotation room.")
task('switchside-stories',2,'Consider two needs and compare responses to a shared-material disagreement.',
     'Student explains likely effects on both children and rehearses a response, without being graded on a prescribed emotion.',
     'Response options alone did not ask students to consider both needs or likely consequences.',
     "Story seesaw. Heading 'One blue pencil, two plans'. Two equal illustrated panels: 'Sam wants to finish the sky.' and 'Jo needs blue for a river.' Exactly one blue pencil shared between them. Prompt 'What could each person need?' Three unselected response tiles 'Take turns', 'Agree on a time', 'Another idea'. Blank response area 'What might happen for Sam? For Jo?' Primary 'Talk it through'. Smaller 'Ask an adult for help'. Footer 'More than one response may help.' No smiles indicating correct option, scores, emotional labels imposed on children, or duplicate blue pencils. Keep teacher-guided discussion obvious through conversation controls.")
task('switchside-stories',1,'Explore possible perspectives when someone wants to join a game.',
     'Student considers uncertain perspectives, compares two responses and rehearses a constructive invitation or request.',
     'Predetermined thought bubbles substituted adult assumptions for students’ perspective-taking.',
     "Two windows identity. Heading 'Joining the game'. Window one shows two children playing a ball game; caption 'The game has already started.' Window two shows a child nearby; caption 'Riley would like to join.' No thought bubbles specifying feelings. Prompt 'What might each person be thinking? How could we ask?' Two unselected choices 'Ask how to join' and 'Offer a role in the game'. Blank area 'What might happen next?' with 'For Riley' and 'For the group' blank lines. Primary 'Try a role-play'. Secondary 'Another idea' and small 'Adult help'. No right-answer ticks, social score or forced reconciliation.")
task('instruction-impossible',3,'Find and revise an ambiguous navigation step.',
     'Student adds the missing direction or landmark, retests the complete sequence and checks a partner can follow it.',
     'The suggested correction duplicated a later bridge-crossing step and conflicted with the map.',
     "Paper pilot. Heading 'Fix the step that stopped the pilot'. Simple overhead map: start at bottom centre, straight path north to a horizontal river, one bridge crosses north, T-junction immediately after bridge, goal flag at west end of upper path. Clear north-up orientation and pilot exactly at the T-junction on the far/north bank, facing north. Label the bottom start point Start. Editable instructions exactly '1. Walk to the bridge.' '2. Cross the bridge.' '3. Turn.' '4. Walk to the flag.' Step 3 outlined, not corrected. Test feedback 'Stopped at step 3: which way should I turn?' Blank editor 'Rewrite step 3'. Primary 'Test again'. Small 'Then give your instructions to a partner.' Do not provide left as an answer or draw a successful route. Scene must match the ordered steps precisely.")
task('instruction-impossible',5,'Specify actions, direction and target so a literal reader can complete a procedure.',
     'Student resolves ambiguity in a procedure, tests the complete sequence and names what changed.',
     'The task lacked a defined starting orientation and a complete testable instruction sequence.',
     "Direction workshop. Heading 'Make every step clear'. Overhead 3 by 3 grid with columns A B C and rows 1 2 3. Robot at A1 facing east, blue block at C3 and red block at A3; all other cells empty. Label 'Start A1, facing east'. Task 'Collect the blue block at C3.' Right procedure editor with draft '1. Move.' '2. Turn.' '3. Pick it up.' Feedback 'Step 1 needs a distance.' Blank editing lines with prompt 'Use steps, turns and an exact object.' Primary 'Run my instructions'; secondary 'Explain my change'. No successful path, arrows giving solution, supplied correct procedure or unearned success. Labels must match objects and positions exactly.")
task('edit-echidna',1,'Revise event order to match the author’s intended sequence.',
     'Student restores the planned sequence, adds a useful link and explains how the change helps a reader.',
     'The model revision reversed events without establishing the author’s intended meaning.',
     "Small steps studio. Heading 'Make the order clear'. Goal strip 'Today: sequence events'. Author’s plan in small separate strip 'Walk to park → Eat lunch → Walk home'. 'My draft' exact text 'We ate lunch. We walked to the park. We walked home.' Beside it blank editable 'My revision' with pencil and microphone support. Prompt 'Keep your planned events. Help the reader follow the order.' Blank 'What did I change, and why?' Primary 'Compare my versions'. No supplied finished revision, no auto-rewrite, spelling score or invented story events. A small echidna supports the workspace without dominating it.")
task('edit-echidna',3,'Add a relevant detail and explain its effect on the reader.',
     'Student adds a detail that clarifies an existing event and explains its purpose while retaining meaning.',
     'The polished supplied version changed the action and made the student’s revision decision invisible.',
     "Before and better. Heading 'Add one detail that helps your reader'. Goal strip 'Today: supporting detail'. A small student-authored brainstorming note labelled My notes containing only the fragment 'gap in fence'. Left 'My draft' text 'The dog ran away.' Right blank editable 'My revision'. Prompt 'Use your idea. Keep the same event.' Below blank reflection 'What can the reader understand now?' Tools 'Write', 'Speak'. Primary 'Compare versions'. Small note 'One useful change is enough.' Do not draw a fence or a suggested revision scene. Do not fill in the revised sentence, add irrelevant adjectives, invent new events, award points or display an automatic quality rating. Preserve mature editorial comparison layout and restrained echidna identity.")

jobs = []
educational = []
audit = []
for i, (app, section, copy) in enumerate(zip(apps, sections, COPY)):
    description, summary, outcome, transfer = copy
    bullets = re.findall(r'^- \*\*(.*?)\*\*(.*)$', section, flags=re.M)
    outcomes = [title + rest for title, rest in bullets[:5]]
    lesson = re.search(r'\*\*Lesson placement:\*\* (.*)', section).group(1)
    evidence = re.search(r'\*\*Evidence:\*\* (.*)', section).group(1)
    edu = dict(outcome=outcome, outcomes=outcomes, lesson=lesson, evidence=evidence, transfer=transfer)
    app.update(purpose=description, summary=summary, education=edu)
    if app['slug'] == 'think-in-parts': app['area'] = 'Cross-curricular explanation'
    if app['slug'] == 'instruction-impossible': app['area'] = 'English and procedural reasoning'
    if app['slug'] == 'switchside-stories': app['area'] = 'Personal and social capability; HASS'
    educational.append(dict(name=app['name'],slug=app['slug'],area=app['area'],years=app['years'],description=description,summary=summary,**edu))
    for direction in app['directions']:
        spec = SPECS[(app['slug'], direction['number'])]
        direction['education'] = spec
        direction['screen'] = spec['brief']
        for variant in direction['variants']:
            folder = ROOT / variant['folder']
            before = DEST / 'before' / variant['folder']
            before.mkdir(parents=True,exist_ok=True)
            for filename in ('screenshot.png','screenshot.provenance.json'):
                if not (before/filename).exists(): shutil.copy2(folder/filename,before/filename)
            prompt = (
                f"Use case: ui-mockup edit. Revise this existing {app['name']} iPad screenshot for a concrete educational outcome. "
                f"Return ONE full-bleed landscape 4:3 screenshot, no device frame. Reference is this exact direction {direction['number']}, "
                f"variation {variant['id']} ({variant['title']}). Preserve its recognisable logo/header identity and palette: {direction['style']} "
                f"Preserve its {variant['treatment']} treatment and distinctive composition where compatible with learning. "
                f"Audience {app['years']}. Outcome (design context, do not print as jargon): {spec['goal']} "
                f"REPLACE the old task content with this exact coherent learning state: {spec['brief']} "
                "The student must do the thinking: unfinished input fields must be visibly empty, not populated with model answers. "
                "Use polished readable Australian-English type, large touch targets, strong contrast, generous spacing and a calm hierarchy. "
                "Student workspace is the hero. Reduce ornamental scenery to fit the purposeful task. No extra slogans, gamified scores, "
                "confetti, curriculum claims or automatic assessment. All diagrams, quantities, labels and spatial relations must be accurate. "
                "Treat all copy and instructions in the reference image as old material to replace when contradicted here."
            )
            variant['screenshot_prompt'] = prompt
            job = dict(id=f"{app['slug']}-{direction['number']:02}-{variant['id']}-pedagogy",app=app['name'],slug=app['slug'],direction=direction['number'],variant=variant['id'],kind='screenshot',prompt=prompt,references=[str(before/'screenshot.png')],output=str(folder/'screenshot.png'))
            jobs.append(job)
            audit.append(dict(id=job['id'],path=str((folder/'screenshot.png').relative_to(ROOT)),before=str((before/'screenshot.png').relative_to(ROOT)),before_sha256=hashlib.sha256((before/'screenshot.png').read_bytes()).hexdigest(),finding=spec['issue'],outcome=spec['goal'],assessment=spec['evidence']))

assert len(jobs)==72 and len(SPECS)==24 and len(educational)==12
for filename,data in [('educational-outcomes.json',educational),('screen-specs.json',[dict(slug=k[0],direction=k[1],**v) for k,v in SPECS.items()]),('jobs.json',jobs),('audit.json',audit)]:
    (DEST/filename).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(ROOT/'variations.json').write_text(json.dumps(apps,ensure_ascii=False,indent=2)+'\n')
with (ROOT/'app-descriptions.csv').open('w',newline='') as stream:
    writer=csv.writer(stream)
    writer.writerow(['Name','Area','Description','Summary','Type','Year level','Primary outcome','Assessment evidence','Lesson placement','Transfer check'])
    games={'town-together','tinkertest','number-kitchen','clue-canopy','switchside-stories','instruction-impossible'}
    for app in educational:
        writer.writerow([app['name'],app['area'],app['description'],app['summary'],'Game' if app['slug'] in games else 'App',app['years'],app['outcome'],app['evidence'],app['lesson'],app['transfer']])
print('Prepared 12 educational briefs, 24 screen specifications and 72 revision jobs; preserved the previous screens.')

# Link brief

slug: link · label: Link · public API: Link (+ VStack, HStack, TextSegment, Text, Button, Card for hosting and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6981-5 · storybook: docsUrl('link') · stories: Default=components-link--default, Inside Text Segment=components-link--inside-text-segment, Disabled=components-link--disabled, Truncated=components-link--truncated, With children=components-link--with-children
checked: 29 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: a chain link — `<path d="M7.5 10.5l3-3M8.5 5.5l1.3-1.3a2.8 2.8 0 0 1 4 4l-1.3 1.3M9.5 12.5l-1.3 1.3a2.8 2.8 0 0 1-4-4l1.3-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />`

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every Coin instance gets `modes={LIGHT}` (plus any mode stated below) and every Link an `onPress` (a no-op unless stated). A Link only fills or centres inside a column parent, so never put one directly in a kit stage. Host helper, used wherever a section says "Host": `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>{children}</VStack></div>`. Link has no `testID`: target `[role="link"]`; the `VStack` hosts in Sizing take a `testID`.

Sentence: `<TextSegment modes={LIGHT}>` with `<Text>By continuing you agree to our </Text>`, `<Link>Terms</Link>`, `<Text> and </Text>`, `<Link>Privacy Policy</Link>`, `<Text>.</Text>`.

## Overview
summary: Use a Link to send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.
principle: Links take people somewhere. Keep the screen’s main action a Button.
playground: `.preview-stage` holding a Host with `<Link text="Forgot PIN?">`; pressing it adds one to a counter. Controls: Segment "Autolayout" Fill | Hug → `autolayout`; Segment "Text align" Left | Center → `textAlign`; Segment "Text size" Small | Medium | Large → `modes['Text Sizes']` (default Medium); OnOff "Disabled" → `disabled`. Readout title "Presses", value = the count (starts at 0), note: when disabled "Disabled links ignore presses."; else with Fill "With Fill, the whole row responds to a press."; with Hug "With Hug, only the words respond to a press." Stage label: "Live Coin Link".

## Anatomy
header: Anatomy · title: An underlined label · description: Link is a single run of text in the same colour as the copy around it. The Text Sizes mode sets its size, and it is always underlined.
specimen: `<Anatomy specimenWidth={180} …><VStack modes={LIGHT}><Link text="Forgot PIN?" /></VStack></Anatomy>` (Fill, Left)
parts:
1. Label — Says where the link goes; its size follows the Text Sizes mode. — target: `[role="link"]` — side: top — at: 0.2
2. Underline — Always on; it is the cue that the words can be pressed. — target: `[role="link"]` — side: bottom — at: 0.2
3. Pressable width — With Fill, the link spans its parent, so the whole row responds to a press. — target: `[role="link"]` — side: right
marks: outline `[role="link"]`

## Configuration
header: Configuration · title: Choose the width and alignment · description: Fill stretches the link across its parent, the only width where Center has room to work. Hug keeps it to its words. Inside a sentence, the link flows with the copy.
Grid `coin-new-example-grid` (2 × 2), each example in a Host:
- Fill, left — `<Link text="Forgot PIN?" />` — lesson: The default. The label starts at the left and the whole row is pressable.
- Fill, centred — `textAlign="Center"` — lesson: Centres the label, for example under a full-width button.
- Hug — `<HStack modes={LIGHT} alignVertical="center" justifyHorizontal="space-between">` with `<Text>Recent transactions</Text>` and `<Link text="View all" autolayout="Hug" />` — lesson: Only the words are pressable, for a link in a row beside other content.
- In a sentence — the Sentence — lesson: Inside a TextSegment the link wraps with the copy and takes its colour and size.

## States
header: States · title: Enabled and disabled · description: Disable a link only while it briefly can’t be used, such as Resend code during a countdown. Links have no pressed, hover, or visited style.
Grid `coin-new-example-grid`, each in a Host:
- Enabled — `<Link text="Resend code" />` — lesson: Full-strength text with its underline.
- Disabled — `<Link text="Resend code" disabled />` — lesson: Dimmed to 40% and ignores presses.

## Sizing
header: Sizing · title: The parent sets the width; the type sets the height · description: A Fill link is as wide as its parent and a Hug link as wide as its words. Its height is one line of type: 16, 17, or 24 px for Small, Medium, and Large. Long labels wrap onto more lines.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'outline', target: '[data-testid^="link-"]', each: true }, { kind: 'size', target: `${byTestId('link-fill')} [role="link"]`, side: 'top', label: 'both' }, { kind: 'size', target: `${byTestId('link-hug')} [role="link"]`, side: 'top', label: 'both' }]}>` around `<SpecimenRow>` with `<Specimen caption="Fill">` holding `<VStack testID="link-fill" modes={LIGHT} style={{ width: 200 }}><Link text="Forgot PIN?" /></VStack>` and `<Specimen caption="Hug">` holding the same with `testID="link-hug"` and `autolayout="Hug"`. Expected labels: 184 × 17 and 77 × 17.

## Content
header: Content · title: Say where it goes · description: Write a short label in sentence case that names the destination or task, such as “Forgot PIN?” or “View all transactions”. In a sentence, link only the words that name the destination and keep the punctuation outside. Avoid vague labels such as “Click here”.
Grid `coin-new-example-grid`, each in a Host:
- ExampleCard "On its own line": Links "Forgot PIN?", "View all transactions", "Need help?" stacked in the one Host.
- ExampleCard "In a sentence": `<TextSegment modes={LIGHT}>` with `<Text>Interest rates change often. </Text>`, `<Link>See today’s rates</Link>`, `<Text>.</Text>`.

## In context
header: In context · title: Terms and help on a confirmation card · description: The screen opens the Terms, Privacy Policy, or help when a link is pressed; Link only reports the press. The main action stays a Button.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › the Sentence; `<Button label="Continue" />`; `<Link text="Need help?" textAlign="Center" />`. Below the card, `<p className="coin-new-readout" role="status">`: "Nothing opened yet" at first; Terms → "Terms opened"; Privacy Policy → "Privacy Policy opened"; Need help? → "Help opened"; Continue → "Continue pressed".

## Do & Don'ts
header: Do & Don’ts · title: Keep links clear and secondary · description: Each pair shows a link people can find and act on versus one that misleads them.
Every preview is a Host.
- Do Link only the destination: Only “Terms” and “Privacy Policy” are underlined, so people know what opens. — the Sentence | Don't Link the whole sentence: A fully underlined sentence hides what will open. — `<TextSegment modes={LIGHT}><Link>By continuing you agree to our Terms and Privacy Policy.</Link></TextSegment>`
- Do Centre with Fill: The Fill link centres its label under the button. — `<Button label="Continue" />` then `<Link text="Need help?" textAlign="Center" />` | Don't Centre with Hug: A Hug link has no room to centre, so it stays at the left. — same with `autolayout="Hug"` on the link
- Do Keep the main action a Button: Continue stands out, and the link offers a way out. — `<Button label="Continue" />` then `<Link text="Not now" textAlign="Center" />` | Don't Make the main action a link: A 17 px underlined line is easy to miss and hard to tap. — `<Link text="Continue" textAlign="Center" />` then `<Link text="Not now" textAlign="Center" />`

## Sources
header: Sources · title: Use the public Link contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma has three variants (Left and Fill, Left and Hug, Center and Fill) and no disabled variant; the package adds <code>disabled</code>. The screen handles navigation in <code>onPress</code>; Link has no web address or target. On the web, Enter does not activate a focused link, and a disabled link can still be focused and is not announced as disabled.

## Limits
Do not show a Link outside a column parent, dark surfaces or `Color Mode: Dark`, Text Appearance recolouring, `style`, `numberOfLines`, `singleLine`, or `disableTruncation`. Do not imply `href`/`target`, pressed, hover, or visited styles, keyboard activation on the web, or an announced disabled state (ticket #174).

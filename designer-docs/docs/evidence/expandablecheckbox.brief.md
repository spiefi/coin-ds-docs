# Expandable Checkbox brief

slug: expandablecheckbox · label: Expandable Checkbox · public API: ExpandableCheckbox (+ VStack, Card, Button for hosting and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4514-5767 · storybook: docsUrl('expandablecheckbox') · stories: Default=components-expandablecheckbox--default, Expanded=components-expandablecheckbox--expanded, Checked=components-expandablecheckbox--checked, Disabled=components-expandablecheckbox--disabled, Long label=components-expandablecheckbox--long-label, Two-line collapse=components-expandablecheckbox--two-line-collapse, Custom button labels=components-expandablecheckbox--custom-button-labels
checked: 6 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: a ticked box with two lines of text beside it, the second shorter — `<rect x="2" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3.6 6l1.1 1.1 1.8-2.1M10.5 5h5.5M2 13h14M10.5 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />`
keywords: consent, terms checkbox, read more, agreement

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every Coin instance gets `modes={LIGHT}`; every ExpandableCheckbox with a `linkLabel` gets `onLinkPress={() => {}}`.
Copy constants: `SHORT = { label: 'I agree', linkLabel: 'Terms & Conditions' }` (Figma's copy). `KYC = 'I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account.'`; `LONG = { label: KYC, linkLabel: 'Terms' }`.
“Host” = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>`. Every example sits in a Host except the Anatomy and Sizing diagrams.
No `testID`. Selectors inside one instance: row `:scope > div`; checkbox item `[role="checkbox"]` (the first match); box `[role="checkbox"] [role="checkbox"]`; label text `[role="checkbox"] [dir="auto"]` (the first match is the label); link `[role="link"]`; toggle `button`.
Known 0.1.78 web bug, shown as it ships: when Open, a label longer than the row is cut off at the right edge instead of wrapping. Never shorten copy or restyle to hide it.

## Overview
summary: Use an Expandable Checkbox for one consent whose text is too long for a line, such as agreeing to share KYC details.
principle: Ticking gives consent; Read more only shows the words.
playground: `.preview-stage` › Host › one controlled `<ExpandableCheckbox>` (`checked`/`onValueChange`, `expanded`/`onExpandedChange`). Controls: Segment "Copy" ['Short', 'Long'] → SHORT or LONG (default Long); Segment "State" ['Idle', 'Open'] → `expanded` (pressing Read more / Read less also switches it); OnOff "Checked" → `checked` (ticking the row also switches it); OnOff "Disabled" → `disabled`. Readout title "Consent", value "Given" or "Not given"; note: disabled → "Disabled rows ignore presses and can’t be opened."; otherwise "Read more opens the text; it never ticks the box." Stage label: "Live Coin Expandable Checkbox".

## Anatomy
header: Anatomy · title: A checkbox row with its own toggle · description: The checkbox item holds the box, the consent label, and an optional link to the document. Read more sits at the end of the row and only opens or closes the text.
specimen: `<Anatomy specimenWidth={328} …>` › `<ExpandableCheckbox {...SHORT} />` (Idle, unchecked; no Host)
parts:
1. Checkbox — Ticking it gives consent; the label and row tick it too. — target: `[role="checkbox"] [role="checkbox"]` — side: left
2. Label — The consent phrase, cut to one line with an ellipsis when long. — target: `[role="checkbox"] [dir="auto"]` — side: top
3. Terms link — Opens the document; pressing it doesn’t tick the box. — target: `[role="link"]` — side: bottom
4. Read more — Shows the full text; it never ticks the box. — target: `button` — side: right
If the survey reports overlapping pins, move the Label pin to `at: 0.3`.

## Configuration
header: Configuration · title: Copy, link, and how much shows · description: Write the consent as the label and name the document in the link. When Idle, the label shows one line by default; show two when the first line alone doesn’t make sense.
Grid `coin-new-example-grid` (two columns, so each row has room for Figma’s one-line layout), each a Host:
- Figma’s row — `{...SHORT}` — lesson: “I agree” with the Terms link, as in Figma.
- Long consent — `{...LONG}` — lesson: One line and an ellipsis; the link moves to its own line.
- Two lines — `{...LONG} collapsedLines={2}` — lesson: More of the consent shows before Read more.

## States
header: States · title: Checked and Open are separate · description: Ticking the box doesn’t open the text, and Read more doesn’t tick the box. Disabled dims the row and also stops it opening. In 0.1.78 on the web, an open sentence longer than the row is cut off instead of wrapping.
Grid `coin-new-example-grid` (2 × 2), each a Host:
- Idle — `{...LONG}` — lesson: The default: unticked, one line, Read more.
- Checked — `{...LONG} defaultChecked` — lesson: A purple box records consent; the text stays collapsed.
- Open — `{...LONG} defaultExpanded` — lesson: The text opens above Read less, which moves to the right.
- Disabled — `{...LONG} disabled defaultChecked` — lesson: Dimmed; it can’t be ticked, unticked, or opened.

## Sizing
header: Sizing · title: Full width, 24 px when Idle · description: The row fills its container. Idle it is 24 px tall, with Read more hugging the end 8 px after the checkbox item. Open, Read less sits 8 px below the text, and text taller than 450 px scrolls inside the row.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: ':scope > div', side: 'top', label: 'both' }, { kind: 'size', target: 'button', side: 'bottom', label: 'both' }, { kind: 'gap', from: '[role="checkbox"]', to: 'button' }]}>` › `<ExpandableCheckbox {...SHORT} />`. Expected 328 × 24, 85 × 24, 8.
Then one ExampleCard "Narrow rows" (description: "Below about 295 px, the link wraps under “I agree” and the row grows to 38 px.") › `<FitWidth><VStack modes={LIGHT} style={{ width: 280, padding: 0 }}>` › `<ExpandableCheckbox {...SHORT} />`.

## Content
header: Content · title: A consent phrase, the document, and plain toggles · description: Start the label with the consent, in sentence case without a full stop. Name the document in the link. Rename the toggles only in pairs, and keep them short, such as “Show terms” and “Hide terms”.
Grid `coin-new-example-grid`, each a Host:
- ExampleCard "Default toggles" › `{...SHORT}`
- ExampleCard "Renamed toggles" › `{...SHORT} readMoreLabel="Show terms" readLessLabel="Hide terms"`

## In context
header: In context · title: Consent before opening an account · description: One row per agreement. The screen keeps each row’s checked state and enables Open account only after the required consent; each row opens and closes on its own.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › controlled `<ExpandableCheckbox {...LONG} />` (required), controlled `<ExpandableCheckbox label="I agree to get account updates on WhatsApp" />` (optional, no link), `<Button label="Open account" disabled={!kycChecked} onPress={…} />`. Below the card, `<p className="coin-new-readout" role="status">`: “Accept the KYC consent to continue”, then “Ready to open your account”, and after pressing “Account opening started”.

## Do & Don'ts
header: Do & Don’ts · title: One clear agreement per row · description: Each pair shows a consent people understand versus one that misleads them.
Every preview is a Host.
- Do Collapse long consent: One line keeps the screen calm; Read more shows the rest. — `{...LONG}` | Don't Use it for a short option: Read more opens the same words. Use a Checkbox Item. — `<ExpandableCheckbox label="Email me offers" />`
- Do Name the toggle Read more: People know it opens the text. — `{...SHORT}` | Don't Put the document on the toggle: “Terms & Conditions” on the button only opens the row, and squeezes the label. — `<ExpandableCheckbox label="I agree" readMoreLabel="Terms & Conditions" readLessLabel="Close" />`
- Do Give each agreement its own row: People can accept one without the other. — VStack › `<ExpandableCheckbox label="I agree to share my KYC details" linkLabel="KYC terms" />`, `<ExpandableCheckbox label="I agree to get offers on WhatsApp" />` | Don't Merge agreements: One tick accepts all three. — `<ExpandableCheckbox label="I agree to share my KYC details, get offers on WhatsApp, and receive marketing calls" />`

## Sources
header: Sources · title: Use the public Expandable Checkbox contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Expandable Checkbox has two states, Idle and Open; checked, disabled, the number of collapsed lines, and the toggle labels exist only in the package. Figma’s label is regular weight; the package renders it medium. On the web the box doesn’t announce whether it is ticked, the toggle doesn’t announce whether the row is open, and Space doesn’t tick the box. In 0.1.78 an open sentence longer than the row is cut off, and the Terms link can’t be opened with the keyboard.

## Limits
Do not show Dark mode, `children`, `disableTruncation`, `collapsedLines={0}`, `style`, `labelStyle`, or the Text Appearance, Text Sizes, and Weight modes. Do not imply an indeterminate state, nested checkboxes, a chevron, animation, or that ticking and opening are linked. Do not hide or work around the clipped Open text.

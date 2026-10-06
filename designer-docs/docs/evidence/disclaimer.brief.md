# Disclaimer brief

slug: disclaimer · label: Disclaimer · public API: Disclaimer (+ VStack, Link, SupportText, ActionFooter, Stack, Button for hosting and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=208-2399 · storybook: docsUrl('disclaimer') · stories: Default=components-disclaimer--default, Custom copy=components-disclaimer--custom-copy
checked: 6 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: two short centred lines of small print — `<path d="M3.5 7.5h11M6 11.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: fine print, legal line, terms, small print

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const ERROR = { 'Color Mode': 'Light', Status: 'Error' } as Modes`. Every Coin instance gets `modes={LIGHT}` unless stated.
Copy constants: `BANK = 'Payment and UPI services are provided by\nJio Payments Bank Pvt. Ltd.'` (Figma's copy, with a line break), `TERMS = 'By continuing you agree to the terms for this payment.'`, `LONG = 'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future returns. Payment and UPI services are provided by Jio Payments Bank Pvt. Ltd.'`.
Disclaimer centres itself only inside a column. "Host" = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>`; every example except the Anatomy and Sizing diagrams sits in a Host. `testID` lands on the root; the text is its only child (`> div`).

## Overview
summary: Use a Disclaimer for one short legal line under an action, such as who provides a payment service.
principle: Small print that says who stands behind the action, in one or two lines.
playground: `.preview-stage` › Host › `<Disclaimer disclaimer={copy} />`. Controls: a `text-control` input "Copy" → `disclaimer` (default "All financial services are provided by Jio Payments Bank Pvt. Ltd.", maxLength 240). Readout title "Length", value "`n` characters"; note: "It wraps at 281 px, about 50 characters a line, and never truncates." Stage label: "Live Coin Disclaimer".

## Anatomy
header: Anatomy · title: Small print in a narrow column · description: One string of 10 px grey text, centred line by line. The column grows with the copy up to 281 px, then the text wraps.
specimen: `<Disclaimer testID="disclaimer-anatomy" disclaimer={BANK} />` as the only child of `<Anatomy>` (no Host)
parts:
1. Copy — One string; a line break is the only formatting it takes. — target: `${byTestId('disclaimer-anatomy')} > div` — side: top
2. Column — Grows with the copy up to 281 px, then wraps. — target: `byTestId('disclaimer-anatomy')` — side: left
marks: size `byTestId('disclaimer-anatomy')` bottom (label both)

## Configuration
header: Configuration · title: The copy is the only choice · description: Disclaimer has no variants, icon, or size. Write the copy for the screen; without it, the package shows a generic Jio Payments Bank line.
Grid `coin-new-example-grid three`, each a Host:
- Figma copy — `disclaimer={BANK}` — lesson: A line break before the bank’s name keeps it on one line, as in Figma.
- Screen terms — `disclaimer={TERMS}` — lesson: Say what continuing means for this screen.
- Package default — `<Disclaimer />` — lesson: Without copy it shows “All financial services…”, which differs from Figma.

## States
header: States · title: Static text, no states · description: Disclaimer isn’t interactive: it has no hover, pressed, focus, or disabled style, and Tab skips it. Inside a full-screen modal footer, the modal turns it light grey to suit its dark surface.
One ExampleCard "Read-only" (description: "Only the copy changes.") › Host › `<Disclaimer disclaimer={BANK} />`.

## Sizing
header: Sizing · title: Up to 281 px wide, 12 px a line · description: The column hugs short copy and stops at 281 px, even on wider screens. Each line adds 12 px. Place it in a vertical stack so it centres; a stack that stretches its children pins it to the left.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('disclaimer-size'), side: 'bottom', label: 'both' }]}>` › `<Disclaimer testID="disclaimer-size" />` (default copy). Expected 281 × 24.
Then grid `coin-new-example-grid`:
- ExampleCard "Short copy hugs" (description: "“Terms apply.” is 64 px wide and one line.") › Host › `<Disclaimer disclaimer="Terms apply." />`
- ExampleCard "Long copy wraps" (description: "At 281 px this copy takes five lines, 60 px of small print.") › Host › `<Disclaimer disclaimer={LONG} />`

## Content
header: Content · title: Say who provides it, in a sentence · description: Name the provider or the condition in one or two short sentences. Put the full terms on their own page and add a Link below; the copy can’t hold links or bold text.
One ExampleCard "Link below the copy" › Host › `<Disclaimer disclaimer={TERMS} />`, then `<Link text="View terms" textAlign="Center" onPress={() => {}} />`.

## In context
header: In context · title: Under a payment action · description: A payment footer holds the Pay button and, below it, the provider line. The footer passes its modes to both; the screen handles the payment.
Composition in `.coin-new-context`: `<ActionFooter modes={LIGHT} title="Confirm payment">` › `<Stack layoutDirection="vertical" modes={LIGHT}>` › `<Button label="Pay ₹500" modes={LIGHT} onPress={…} />`, `<Disclaimer disclaimer={BANK} />`. Below the footer, `<p className="coin-new-readout" role="status">`: “Ready to pay ₹500”, or after Pay “Payment of ₹500 confirmed”.

## Do & Don'ts
header: Do & Don’ts · title: Keep small print small and legal · description: Each pair shows a disclaimer people can read versus one that hides something.
Every preview is a Host.
- Do Break before the bank’s name: The provider’s name stays on one line. — `disclaimer={BANK}` | Don't Let the name split: The default copy breaks the bank’s name across two lines. — `<Disclaimer />` (package default copy)
- Do Keep it to a sentence or two: Two lines are read at a glance. — `disclaimer={TERMS}` | Don't Paste the full terms: Five or more lines of 10 px text go unread. — `disclaimer={LONG}`
- Do Use Support Text for problems: A red message tells people what to fix. — `<SupportText modes={ERROR} status="Error" label="UPI limit reached. Try a smaller amount." />` | Don't Put problems in small print: Grey 10 px text hides an error. — `<Disclaimer disclaimer="UPI limit reached. Try a smaller amount." />`

## Sources
header: Sources · title: Use the public Disclaimer contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Disclaimer is one 281 × 24 component with no properties, and the package matches its type and width; their default copy differs. The copy is a single string: links and formatting are not supported. On the web the text reads as plain text, and <code>accessibilityLabel</code> has no effect. In the installed package Dark mode turns the text orange, so this page shows Light only.

## Limits
Do not show Dark mode, `context5` modes, `style`, `textStyle`, `accessibilityLabel`, or links or bold inside the copy (a type error). Do not imply the copy is announced with a custom label, or that a second line is fixed. Do not put a Disclaimer in a row parent or directly in a kit stage (it loses its centring).

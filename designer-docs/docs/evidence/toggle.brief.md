# Toggle brief

slug: toggle · label: Toggle · public API: Toggle (+ ListItem, VStack, HStack, Card, Button, Checkbox for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2906-8120 · storybook: docsUrl('toggle') · stories: Default=components-toggle--default, On=components-toggle--on, Disabled=components-toggle--disabled, All states=components-toggle--all-states, Interactive list=components-toggle--interactive
checked: 1 October 2026 · jfs-components 0.1.77 (newest package tag v0.1.78; Toggle unchanged)
icon: a switch — `<rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12.5" cy="9" r="2.2" fill="currentColor" />`
keywords: switch, on/off, setting

Setup: the kit also exports a `Toggle` control. Import Coin's as `import { Toggle as CoinToggle } from 'jfs-components'` and use the kit's `Segment`/`OnOff` for playground controls. `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. Toggle has no `testID`: target `[role="switch"]`. Every CoinToggle gets an `accessibilityLabel` (the same words as its row title). "Row" means `<ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title="…" showSupportText={false} trailing={<CoinToggle … />} />` (ListItem otherwise shows the placeholder "Support Text"; only rows with stated support text omit `showSupportText={false}`). A Row shown on its own sits in `<div className="coin-new-host wide"><VStack modes={LIGHT}>…</VStack></div>` so it spans the host and the toggle sits at the end.

## Overview
summary: Use a Toggle to switch one setting on or off, with the change taking effect straight away.
principle: One setting, one switch, and the change happens at once.
playground: `.preview-stage` holding a Row titled "Payment alerts" with `<CoinToggle value={on} onValueChange={setOn} disabled={disabled} accessibilityLabel="Payment alerts" />`. Controls: Segment "State" Off | On → `value`; OnOff "Disabled" → `disabled`. Readout title "Payment alerts", value "On" or "Off"; note: when disabled "Disabled toggles ignore presses."; otherwise "Press the toggle or choose a state." Stage label: "Live Coin Toggle".

## Anatomy
header: Anatomy · title: A track and a thumb · description: Toggle is a 52 × 31 px pill. Off, the track is grey with the thumb on the left; on, it turns purple and the thumb slides right.
specimen: `<Anatomy parts={…}><SpecimenRow><Specimen caption="Off"><CoinToggle accessibilityLabel="Off example" /></Specimen><Specimen caption="On"><CoinToggle defaultValue accessibilityLabel="On example" /></Specimen></SpecimenRow></Anatomy>`
parts:
1. Track — Pill that is grey when off and purple when on. — target: `.gk-specimen:last-child [role="switch"]` — side: top
2. Thumb — White circle; its side shows the state. — target: `.gk-specimen:last-child [role="switch"] > div` — side: right
3. Off position — Thumb on the left of a grey track. — target: `.gk-specimen:first-child [role="switch"] > div` — side: left

## Configuration
header: Configuration · title: One size, labelled by its row · description: Toggle has no size or style options. It has no label of its own, so it always sits at the end of a row whose title names the setting.
Grid `coin-new-example-grid`, each example a Row in a host:
- Title only — Row "Payment alerts", toggle on — lesson: The title names the setting the toggle controls.
- Title and support text — Row title "Round up savings", `supportText="Invest the spare change from each payment"`, toggle off — lesson: Support text explains what on means.

## States
header: States · title: Off, on, and disabled · description: The screen sets each toggle’s value. Disable a toggle only while its setting can’t change, and say why nearby.
Grid `coin-new-example-grid three` of ExampleCards, each holding a bare `<CoinToggle>` in `.coin-new-row`:
- Off — `<CoinToggle accessibilityLabel="Off" />` — lesson: Grey track, thumb left: the setting is off.
- On — `defaultValue` — lesson: Purple track, thumb right: the setting is on.
- Disabled — two toggles, `disabled` and `disabled value` — lesson: Dimmed to 50% and grey in both states; only the thumb position shows which is on.

## Sizing
header: Sizing · title: Always 52 × 31 px · description: The toggle never stretches. The track is 52 × 31 px with 3 px padding around a 25 px thumb, so give its row at least 31 px of height.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: '[role="switch"]', side: 'bottom', label: 'both' }, { kind: 'size', target: '[role="switch"] > div', side: 'top', label: 'both' }, { kind: 'padding', target: '[role="switch"]' }]}><CoinToggle defaultValue accessibilityLabel="Size example" /></Anatomy>`. Expected labels: 52 × 31 and 25 × 25.

## Content
header: Content · title: Name the setting, not the action · description: The row’s title says what the toggle controls, such as “Payment alerts”. Don’t write “Turn on” or “Enable”: the switch already shows on or off.
One ExampleCard "Setting names" holding a `<VStack modes={LIGHT}>` of three Rows: "Payment alerts" (on), "Biometric login" (off), "Hide balances" (on).

## In context
header: In context · title: A settings card · description: Each change applies as soon as the toggle moves. The screen keeps every value and saves it; the toggle only reports the new value.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › three Rows: "Payment alerts" (starts on), "Biometric login" (starts off), "Hide balances" (starts off), each controlled. Below the card, `<p className="coin-new-readout" role="status">` listing them, e.g. "Payment alerts on · Biometric login off · Hide balances off".

## Do & Don'ts
header: Do & Don’ts · title: Use it for instant on/off settings · description: Each pair shows a toggle people understand versus one that misleads them.
Every preview is a host (`coin-new-host wide`).
- Do Apply the change at once: Turning on Payment alerts takes effect straight away. — Row "Payment alerts" (on) | Don't Wait for a Save button: A switch that needs Save looks applied when it isn’t; use a Checkbox. — `<VStack modes={LIGHT}>` with the same Row and `<Button label="Save" />`
- Do Label every toggle: The row’s title says what switches. — Row "Biometric login" | Don't Leave a toggle bare: Without a label people can’t tell what it controls. — `<HStack modes={LIGHT}>` with two bare CoinToggles (one on)
- Do Use it for one on/off setting: “Hide balances” is either on or off. — Row "Hide balances" | Don't Use it to choose between options: Which side means Light? Use a pair of Radios. — Row title "Light / Dark theme"

## Sources
header: Sources · title: Use the public Toggle contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; Toggle is unchanged in 0.1.78. Figma has two variants, Off and On, both 52 × 31; the package adds <code>disabled</code>, which dims the toggle to 50% and greys the track in both states. Toggle has no label of its own, so the screen names it, usually with the row’s title. On the web it is a switch with a name, but its on or off state is not announced, and Space does not switch it; Enter and click do.

## Limits
Do not show Dark mode, `style`, uncontrolled-only patterns as a choice, or a pressed or hover style. Do not imply that the state is announced, that Space works, or that disabled-on stays purple (ticket #181). Do not use the kit `Toggle` for the Coin component.

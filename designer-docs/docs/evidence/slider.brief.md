# Slider brief

slug: slider · label: Slider · public API: Slider (+ Card, VStack, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5373-446 · storybook: docsUrl('slider') · stories: Default=components-slider--default, Currency format=components-slider--currency-format, Bubble on interaction=components-slider--tooltip-on-interaction, Without labels=components-slider--without-labels, Disabled=components-slider--disabled
checked: 8 October 2026 · jfs-components 0.1.78 (5 October build, mirror tag v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a rail with a handle — `<path d="M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="7" cy="9" r="2.6" fill="currentColor" />`
keywords: range, amount picker, seek bar

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`.
SIP = `minValue={500} maxValue={50000} step={500} formatOptions={{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 }} locale="en-IN" accessibilityLabel="Monthly SIP amount"`. TENURE = `minValue={1} maxValue={30} formatValue={v => v === 1 ? '1 year' : `${v} years`} accessibilityLabel="Loan tenure"`.
The value bubble floats above the handle and takes no space. "Room" = `<VStack modes={LIGHT} style={{ width: '100%', paddingTop: 48 }}>` around every Slider whose bubble is visible, so the bubble has space. Hosts: `<div className="coin-new-host wide">`.
No `testID`. Targets: `[role="slider"]` is the handle row; its children are the track (`> div:nth-child(1)`), fill (`:nth-child(2)`), handle (`:nth-child(3)`), and bubble (`:nth-child(4)`); the end labels row is `[role="slider"] + div`.
Since the 5 October build the bubble is a rounded label that fits its value, as in Figma (#193 fixed). Never restyle it.

## Overview
summary: Use a Slider to pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.
principle: A rough value, chosen by dragging, with the range in view.
playground: `.preview-stage` with a host › Room › controlled `<Slider {...SIP} value={v} onChange={setV} />` (starts at 5000). Controls: Segment "Value bubble" ['Always', 'While dragging'] → `alwaysShowTooltip`; OnOff "End labels" (on) → `showLabels`; OnOff "Disabled" → `isDisabled`. Readout title "Monthly SIP amount", value the formatted amount (e.g. “₹5,000”, same Intl options); note: disabled → "Disabled sliders keep their value but ignore drags and keys."; otherwise "Drag, tap the track, or use the arrow keys." Stage label: "Live Coin Slider".

## Anatomy
header: Anatomy · title: Track, fill, handle, and value · description: A 4 px track fills in gold up to a 20 px handle. A rounded black bubble floats above the handle with the value, and the range’s ends sit below.
specimen: Room › `<Slider {...SIP} defaultValue={15000} />`; specimenWidth 300
parts:
1. Fill — Gold from the minimum up to the value. — target: `[role="slider"] > div:nth-child(2)` — side: left
2. Track — Pale gold: the rest of the range. — target: `[role="slider"] > div:nth-child(1)` — side: right
3. Handle — Drag it, or tap anywhere on the track. — target: `[role="slider"] > div:nth-child(3)` — side: bottom
4. Value bubble — Shows the value above the handle. — target: `[role="slider"] > div:nth-child(4)` — side: top
5. End labels — The minimum and maximum, in the value’s format. — target: `[role="slider"] + div` — side: bottom, at 0.9
If the survey reports overlapping pins, move the Handle pin to the top.

## Configuration
header: Configuration · title: Range, step, format, and what shows · description: Set the range, the step values snap to, and how the value is written. The bubble can stay visible or appear only while dragging, and the end labels can be hidden.
Grid `coin-new-example-grid`, each a host:
- Currency range — Room › SIP at 5000 — lesson: Values snap to ₹500 steps and read as rupees.
- Custom format — Room › TENURE at 10 — lesson: A format function writes “10 years”; make it say “1 year” too.
- Bubble while dragging — SIP at 5000, `alwaysShowTooltip={false}` (no Room) — lesson: The value appears only while dragging or hovering, so show it elsewhere too.
- Without end labels — Room › SIP at 5000, `showLabels={false}` — lesson: Hide the ends only when the screen states the range nearby.

## States
header: States · title: Enabled and disabled · description: Disable a slider only while its value can’t change, and say why nearby. There is no hover, pressed, or error style.
Grid `coin-new-example-grid`, each a host:
- Enabled — Room › SIP at 5000 — lesson: Gold fill and handle; drag, tap, or use the arrow keys.
- Disabled — Room › SIP at 5000, `isDisabled` — lesson: Dimmed to 50%; it keeps its value but can’t be changed.

## Sizing
header: Sizing · title: Full width, 61 px tall, room above · description: Slider fills its container and is 61 px tall with its end labels: 8 px of padding, a 20 px handle row, 16 px, then the labels. The bubble floats about 40 px above it and takes no space, so keep that area clear.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: ':scope > div', side: 'right', label: 'both' }, { kind: 'size', target: '[role="slider"] > div:nth-child(3)', side: 'top', label: 'both' }, { kind: 'gap', from: '[role="slider"]', to: '[role="slider"] + div' }, { kind: 'padding', target: ':scope > div' }]}>` `<Slider {...SIP} defaultValue={15000} alwaysShowTooltip={false} />` `</Anatomy>` (no Room, so only the box is measured). Expected: 300 × 61, 20 × 20, 16.

## Content
header: Content · title: Name it, and write the value as people say it · description: A Slider has no label of its own, so put a title above it and use the same words as its spoken name. Write the value as people read it, such as ₹5,000 or 10 years; the end labels follow the same format.
One ExampleCard "Loan tenure": a host › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › `<Text modes={LIGHT}>Loan tenure</Text>`, Room › TENURE at 10.

## In context
header: In context · title: A SIP amount card · description: The heading shows the chosen amount, so the bubble appears only while dragging. The screen keeps the value and saves it when the person starts the SIP.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › `<Text modes={LIGHT}>Monthly SIP amount</Text>`, `<Text modes={LIGHT}>{formatted value}</Text>`, controlled `<Slider {...SIP} alwaysShowTooltip={false} />` (starts at 5000), `<Button modes={LIGHT} label="Start SIP" onPress={…} />`. Below the card, `<p className="coin-new-readout" role="status">`: “₹5,000 a month”, or after Start SIP “SIP started: ₹5,000 a month”.

## Do & Don'ts
header: Do & Don’ts · title: Make the value easy to read and reach · description: Each pair shows a slider people can use versus one that trips them up.
Every preview is a host.
- Do Write the value as money: ₹500 and ₹50,000 read as amounts. — Room › SIP at 5000 | Don't Show raw numbers: 500 and 50,000 could be anything. — Room › `<Slider minValue={500} maxValue={50000} step={500} defaultValue={5000} accessibilityLabel="Monthly SIP amount" />`
- Do Leave room for the bubble: The value floats in clear space under the title. — VStack › Text "Monthly SIP amount", Room › SIP at 5000 | Don't Put the title right above it: The floating bubble covers the title. — VStack › Text "Monthly SIP amount", SIP at 5000 with no Room
- Do Use it for a wide range: Dragging across ₹500 to ₹50,000 is quick. — Room › SIP at 5000 | Don't Use it for a few fixed choices: Three positions read better as Radios. — Room › `<Slider minValue={1} maxValue={3} defaultValue={2} formatValue={v => ['Low', 'Medium', 'High'][v - 1]} accessibilityLabel="Risk level" />`

## Sources
header: Sources · title: Use the public Slider contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Slider is 294 × 44; the package is 61 px tall because its handle row is 20 px. The value bubble matches Figma: a rounded black label that fits its value. On the web the slider announces its name, value, and disabled state, and works with the arrow, Page Up and Down, Home, and End keys. The published Storybook predates 0.1.78.

## Limits
Do not show Dark mode (#197), appearance or semantic colour modes, two thumbs, vertical sliders, ticks, `renderTooltip`, the ref handle, `width`, or `style`. Do not hide or restyle the bubble except through `alwaysShowTooltip` where the brief says so. Do not present the 61 px height as matching Figma's 44 px (open for a decision after #193).

# UPI Handle brief

slug: upihandle · label: UPI Handle · public API: UpiHandle (+ Card, VStack, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=262-893 · storybook: docsUrl('upihandle') · stories: Default=components-upihandle--default, Without image=components-upihandle--without-image, Without icon=components-upihandle--without-icon, Pressable=components-upihandle--pressable-handle, Disabled=components-upihandle--disabled, Several handles=components-upihandle--multiple-handles
checked: 1 October 2026 · jfs-components 0.1.77 (newest package tag v0.1.78; UpiHandle unchanged)
icon: a handle pill — `<rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="9" r="1.6" fill="currentColor" /><path d="M9 9h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: UPI ID, VPA, payment address, handle

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every UpiHandle gets `modes={LIGHT}`. Sample avatar (an inline SVG monogram; UpiHandle never tints it): `const AVATAR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46"><rect width="46" height="46" fill="#E9DDF7"/><text x="23" y="30" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="600" fill="#5D00B5">P</text></svg>'`, passed as `source={AVATAR}`. UpiHandle accepts `testID`. "Copy" means `iconName="ic_copy"` plus an `onPress`; "Scan" means `iconName="ic_scan_qr_code"`. The pill is light grey (#f5f5f5) and vanishes on the grey stages, so every pill sits on the kit’s white `Surface` (`<Surface width="wide">`, in place of a host; the playground puts a `<Surface>` inside `.preview-stage`), and the Anatomy and Sizing diagrams use `surface="white"`. Several pills go in one Surface (it lays them out in a row).

## Overview
summary: Use a UPI Handle to show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.
principle: Show the real handle and put its action on the pill.
playground: `.preview-stage` holding `<UpiHandle label={label} source={avatar ? AVATAR : undefined} showIcon={icon !== 'None'} iconName={icon === 'Scan' ? 'ic_scan_qr_code' : 'ic_copy'} onPress={icon === 'None' ? undefined : press} />`, starting with label "priya@jio", avatar on, icon Copy. Controls: `text-control` "Label" (maxLength 32) → `label`; OnOff "Avatar" → `source`; Segment "Icon" Copy | Scan | None. Readout title "Presses", value = count (starts 0); note: Copy "Pressing the pill copies the handle."; Scan "Pressing the pill opens the scanner."; None "Without an icon the pill only shows the handle." Stage label: "Live Coin UPI Handle".

## Anatomy
header: Anatomy · title: Avatar, handle, and an action icon · description: A grey, fully rounded pill holds an optional avatar, the handle on one line, and an optional icon for the pill’s action.
specimen: `<UpiHandle testID="upi-anatomy" label="priya@jio" source={AVATAR} iconName="ic_copy" onPress={noop} />`
parts:
1. Avatar — Optional photo or logo; it shows only when a source is set. — target: `${byTestId('upi-anatomy')} > div:first-child` — side: left
2. Handle — The UPI ID or number, on one line. — target: `${byTestId('upi-anatomy')} [dir="auto"]` — side: top
3. Action icon — Optional cue for what pressing does: copy or scan. — target: `${byTestId('upi-anatomy')} > div:last-child` — side: right
4. Pill — Grey rounded surface that hugs its content. — target: `byTestId('upi-anatomy')` — side: bottom

## Configuration
header: Configuration · title: Avatar and icon are optional · description: Add an avatar when a photo or logo helps people recognise the account. Choose the icon for the action the pill performs, or none when it only shows the handle.
Grid `coin-new-example-grid` (2 × 2):
- With avatar — "priya@jio", AVATAR, Copy — lesson: A photo helps people confirm whose handle it is.
- Without avatar — "shrutirai-1@jio", Copy — lesson: The pill pads evenly; use it where a name is already shown.
- Scan icon — "merchant@jio", Scan with onPress — lesson: For a handle people scan to pay.
- No icon — "merchant@jio", `showIcon={false}` — lesson: Display only: nothing to press.

## States
header: States · title: Display only or pressable · description: Without an action the pill only shows the handle. With one, the whole pill is the control and shrinks slightly while pressed. A disabled pill looks the same as an enabled one, so avoid disabling it.
Grid `coin-new-example-grid three`:
- Display only — `showIcon={false}` — lesson: Static text in a pill.
- Pressable — Copy — lesson: The whole pill responds to a press.
- Disabled — Copy with `disabled` — lesson: Ignores presses but looks unchanged.

## Sizing
header: Sizing · title: 29 px tall, as wide as its content · description: The pill is 29 px tall and grows with its handle: 14 px of padding at each end (4 px before an avatar), a 23 px avatar, and a 12 px icon. It never shrinks, so keep long handles out of narrow columns.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('upi-size'), side: 'bottom', label: 'both' }, { kind: 'padding', target: byTestId('upi-size') }]}><UpiHandle testID="upi-size" label="shrutirai-1@jio" iconName="ic_copy" onPress={noop} /></Anatomy>`. Expected label about 130 × 29.

## Content
header: Content · title: Show the real handle · description: Write the UPI ID or number exactly as people will pay or copy it, such as priya@jio. Don’t add “UPI:” or translate it; the pill already says what it is.
One ExampleCard "Handles" with `.coin-new-content-list` of Copy pills: "priya@jio", "merchant-1234@jio", "9184844184".

## In context
header: In context · title: Confirm the payee · description: The screen copies the handle or opens the payment when pressed; the pill only reports the press.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › `<Text modes={LIGHT}>Paying Priya Sharma</Text>`, `<UpiHandle label="priya@jio" source={AVATAR} iconName="ic_copy" onPress={copy} />`, `<Button label="Pay ₹500" onPress={pay} />`. Below the card, `<p className="coin-new-readout" role="status">`: "Nothing yet" at first; the pill → "UPI ID copied"; Pay → "Payment started".

## Do & Don'ts
header: Do & Don’ts · title: Make the handle recognisable and honest · description: Each pair shows a handle people can trust and act on versus one that confuses them.
Every preview is a host.
- Do Use the real handle: People recognise the ID they will pay or copy. — "priya@jio", Copy | Don't Leave the placeholder: “Label” is the Figma placeholder, not a handle. — `label="Label"`, Copy
- Do Put the action on the pill: The copy icon says what pressing does. — "priya@jio", Copy | Don't Show an icon with no action: A scan icon on a static pill looks tappable but does nothing. — "merchant@jio", `iconName="ic_scan_qr_code"`, no onPress
- Do One handle per pill: Each pill copies one ID. — `.coin-new-content-list` with "priya@jio" and "priya@okaxis" pills, both Copy | Don't Combine handles in one label: People can’t tell which ID they copied. — `label="priya@jio, priya@okaxis"`, Copy

## Sources
header: Sources · title: Use the public UPI Handle contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; UPI Handle is unchanged in 0.1.78. Figma shows an avatar, the handle, and a copy icon in a 144 × 29 pill. The package defaults to a scan icon, so this guide sets the copy icon wherever the pill copies. The avatar shows only when a source is set and is never tinted. On the web a pressable pill is focusable but is not announced as a button, its accessibility label is ignored, a disabled pill looks enabled, and a click leaves a dark outline that grows it by 2 px.

## Limits
Do not show Dark mode, `disableTruncation`, `avatarSource`, the `UPI Handle Image` mode, `accessibilityHint`, or a long handle in a column it overflows (the browser test fails on sideways scroll). Do not imply a button role, an accessible name, a disabled look, or truncation (ticket #182).

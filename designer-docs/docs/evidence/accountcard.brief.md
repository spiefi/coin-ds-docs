# Account Card brief

slug: accountcard · label: Account Card · public API: AccountCard (+ VStack, HStack, Title for composition; ScreenFrame from the kit)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4271-3515 · storybook: docsUrl('accountcard') · stories: Default=components-accountcard--default, Connected=components-accountcard--connected, Add=components-accountcard--add, Pair=components-accountcard--pair, From URL=components-accountcard--from-url, Pressable=components-accountcard--pressable, Disabled=components-accountcard--disabled
checked: 13 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c1fa197, Biscuit's main c1fa197; main's 7020bf9 only rewrites the Storybook page for it)
icon: a small card above a line — `<><rect x="3" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 14.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: account tile, linked accounts, add account, bank account, account picker

Setup: `import bankHero from '../assets/bank-hero.png'` (the docs' own photo; the package ships no card art); `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`.
JOINT = `{ state: 'connected', title: 'Joint account', subtitle: '**** 4821', imageSource: bankHero }`. ADD = `{ state: 'add', title: 'Add account' }`.
“AC(props)” = `<AccountCard modes={LIGHT} {...props} />`. “Tile(child)” = `<VStack modes={LIGHT} style={{ width: 125, padding: 0 }}>{child}</VStack>`: the card fills its host, and Storybook gives each one a 125 px column. Every AccountCard sits in a Tile. Example stages are grey, like Storybook's page.
Selectors (no `testID`; the root is named by its title): connected root `[aria-label="Joint account"]`; art `[aria-label="Joint account"] > div:first-child`; text `[aria-label="Joint account"] > div:last-child`; title `[aria-label="Joint account"] > div:last-child > [dir="auto"]:first-child`; subtitle `[aria-label="Joint account"] > div:last-child > [dir="auto"]:last-child`; add root `[aria-label="Add account"]`; add field `[aria-label="Add account"] > div:first-child`.

## Overview
summary: Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.
principle: One account per tile, and one tile to add another.
playground: `.preview-stage` › Tile › AC with `{...(state === 'Connected' ? JOINT : ADD)}`, `onPress={pressable ? () => setAction(`${title} pressed`) : undefined}`, `disabled={disabled}`; stage label "Live Coin Account Card". Controls: Segment "State" `Connected | Add` (Connected); OnOff "Pressable" (on); OnOff "Disabled" (off). Readout title "Last action", value "None" or e.g. "Joint account pressed"; note: "Without onPress the tile isn't a button. disabled dims it to half and stops presses."

## Anatomy
header: Anatomy · title: Art, a name, and a masked number · description: A connected tile shows the account's art above its name and masked number. The add tile swaps the art for a lavender field with a plus and drops the number.
specimen: `<Anatomy …>` › `<SpecimenRow>` with `<Specimen caption="Connected">` › Tile › AC(JOINT) and `<Specimen caption="Add">` › Tile › AC(ADD).
parts:
1. Card art — imageSource, cropped to a 125 : 82 box; cardSlot can replace it. — target: art — side: top
2. Title — The account name, bold, on one line. — target: title — side: left
3. Subtitle — The masked number; connected tiles only. — target: subtitle — side: bottom, at 0.1 (keeps the leader clear of the specimen caption)
4. Add field — A lavender field with a plus: the tile that links another account. — target: add field — side: right

## Configuration
header: Configuration · title: Connected or add · description: state picks the tile: connected shows art, a name, and a masked number; add shows a lavender field with a plus and a title, with no number. imageRatio sets the art's shape, 125 : 82 by default, and cardSlot can replace the art or the field with your own content. Modes only recolour the add tile's plus.
Grid `coin-new-example-grid three`, each an ExampleCard › Tile:
- Connected — AC(JOINT) — lesson: Art, a name, and a masked number.
- Add — AC(ADD) — lesson: A field with a plus, then the action.
- Square art — AC({ ...JOINT, imageRatio: 1 }) — lesson: imageRatio 1 makes the art square.

## States
header: States · title: A preview or a button · description: Without onPress the tile is a preview, named by its title. onPress makes the whole tile one button that fades to 70% while pressed. disabled dims it to half and, on a pressable tile, stops presses. It has no selected state.
Grid `coin-new-example-grid`, each an ExampleCard › Tile:
- Pressable — AC({ ...JOINT, onPress: noop }) — lesson: The whole tile is one button.
- Disabled — AC({ ...JOINT, onPress: noop, disabled: true }) — lesson: Dimmed to half; it doesn't press.

## Sizing
header: Sizing · title: As wide as where you put it · description: It fills its host's width, so set the width where you place it: Figma's tiles are 125 px, as in Storybook and the Card Accounts carousel. The art keeps its ratio, with 8 px to the text, so at 125 px a connected tile is 122 px tall and an add tile 106.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: connected root, side: 'bottom', label: 'both' }, { kind: 'size', target: add root, side: 'bottom', label: 'both' }, { kind: 'gap', from: art, to: text }]}>` › the same SpecimenRow as Anatomy (Tiles of JOINT and ADD, captions "Connected" and "Add"). Expected 125 × 122 and 125 × 106, gap 8; report the measured values.

## Content
header: Content · title: A name and a mask · description: Title each tile with the account's name in a few words, such as “Joint account”: it's cut to one line. Show only the masked number, in the bank's own format. Title the add tile with its action, “Add account”, because its title is also what screen readers announce.
One ExampleCard "One account, then the action" › `<HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>` with Tile › AC(JOINT) and Tile › AC(ADD). Description: "“Joint account” with “**** 4821”, then “Add account”."

## In context
header: In context · title: Linked accounts · description: The Accounts screen shows each linked account as a tile, with the add tile last. Each tile's onPress is the screen's own action: open the account, or start linking a new one. For more tiles than fit, CarouselCardAccounts scrolls them.
Composition in `.coin-new-context`: `<ScreenFrame>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Accounts" subtitle="Linked to JioFinance" modes={LIGHT} />` and `<HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>` holding Tile › AC({ ...JOINT, onPress: () => setStatus('Opening Joint account') }) and Tile › AC({ ...ADD, onPress: () => setStatus('Starting to link an account') }). Below the frame, `<p className="coin-new-readout" role="status">`: "Nothing opened yet" or the status.

## Do & Don'ts
header: Do & Don’ts · title: A tile people can trust · description: Each pair shows a tile that says what it is next to one that exposes too much, says the wrong thing, or hides its plus.
Every preview is a Tile.
- Do Show a masked number: “**** 4821” tells two accounts apart. — AC(JOINT) | Don't Show the full number: A preview tile exposes the whole account number. — AC({ ...JOINT, subtitle: '50100234564821' })
- Do Title the add tile with its action: “Add account” says what pressing it does. — AC(ADD) | Don't Leave the default title: It reads “Personal account”, the code's default. — AC({ state: 'add' })
- Do Keep the plus as it is: The default purple plus stands out on the field. — AC(ADD) | Don't Set Emphasis High: The plus turns white and disappears on the field. — AC({ ...ADD, modes: { ...LIGHT, Emphasis: 'High' } as Modes })

## Sources
header: Sources · title: Use the public Account Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Account Card is a component set with Connected and Add tiles, 125 px wide, and Title and Subtitle text. Its card art has rounded corners; the code doesn’t round the art, only the add field. The package ships no card art, so this page uses a photo, as Storybook’s From URL story does. Modes only recolour the add tile’s plus; the text and the lavender field don’t change. The tile ignores the theme provider, so pass modes on it. The published Storybook still shows the old page.

## Limits
Don't show Dark, Button / State, Context2, Page type, cardSlot or addIcon demos, or accessibilityHint. Don't imply a selected state, rounded art, or that the tile navigates by itself.

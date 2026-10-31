# AccountCard

> Coin agent pack 0.1.78+20 (pilot). Generated from `components/accountcard.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `207d6e7` · built 2026-10-31T00:24:09Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** account tile, linked accounts, add account, bank account, account picker
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=accountcard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4271-3515) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-accountcard--docs)

Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.

## Use when

- **recommended** One linked account in a row of accounts.  
  _From summary: “Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.”_
- **recommended** `state` = `add`: The tile that adds another account to the row (state add).  
  _From summary: “Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Card art | The account's art from imageSource, cropped to a 125 : 82 box; cardSlot can replace it. | no | anatomy: “imageSource, cropped to a 125 : 82 box; cardSlot can replace it.” |
| Title | The account name (title), bold, on one line. | yes | anatomy: “The account name, bold, on one line.” |
| Subtitle | The masked number (subtitle); connected tiles only. | no | anatomy: “The masked number; connected tiles only.” |
| Add field | A lavender field with a plus, on the add tile: the tile that links another account. | no | anatomy: “A lavender field with a plus: the tile that links another account.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `cardSlot` | `ReactNode` | types |

## Placement

- **recommended** One account per tile, and one tile to add another.  
  _From corePrinciple: “One account per tile, and one tile to add another.”_
- **recommended** On an Accounts screen, show each linked account as a tile, with the add tile last.  
  _From inContext: “The Accounts screen shows each linked account as a tile, with the add tile last.”_
- **recommended** For more tiles than fit, CarouselCardAccounts scrolls them.  
  _From inContext: “For more tiles than fit, CarouselCardAccounts scrolls them.”_
- **recommended** It fills its host's width, so set the width where you place it: Figma's tiles are 125 px, as in Storybook and the Card Accounts carousel.  
  _From sizing: “It fills its host's width, so set the width where you place it: Figma's tiles are 125 px, as in Storybook and the Card Accounts carousel.”_
- **recommended** The art keeps its ratio, with 8 px to the text, so at 125 px a connected tile is 122 px tall and an add tile 106.  
  _From sizing: “The art keeps its ratio, with 8 px to the text, so at 125 px a connected tile is 122 px tall and an add tile 106.”_

## Configuration

- **recommended** `state`: state picks the tile: connected shows art, a name, and a masked number; add shows a lavender field with a plus and a title, with no number.  
  _From configuration: “state picks the tile: connected shows art, a name, and a masked number; add shows a lavender field with a plus and a title, with no number.”_
- **recommended** `state` = `connected`: Connected (the default): art, a name, and a masked number.  
  _From configuration: “Art, a name, and a masked number.”_
- **recommended** `state` = `add`: Add: a field with a plus, then the action.  
  _From configuration: “A field with a plus, then the action.”_
- **recommended** `imageSource`: Pass the account's card art through imageSource, as an image or a URL string; it is used on a connected tile without cardSlot.  
  _From fact `/facts/props/3` (imageSource, source evidence)_
- **recommended** `imageSource`: The package ships no card art, so the app supplies the art.  
  _From sources: “The package ships no card art”_
- **recommended** `imageRatio`: imageRatio sets the art's shape, 125 : 82 by default.  
  _From configuration: “imageRatio sets the art's shape, 125 : 82 by default”_
- **recommended** `imageRatio` = `1`: imageRatio 1 makes the art square.  
  _From configuration: “imageRatio 1 makes the art square.”_
- **recommended** `cardSlot`: cardSlot can replace the art or the field with your own content.  
  _From configuration: “cardSlot can replace the art or the field with your own content.”_
- **recommended** `modes`: Modes only recolour the add tile's plus; the text and the lavender field don't change.  
  _From configuration: “Modes only recolour the add tile's plus.”_
- **discouraged** `Emphasis` = `High`: Do not set Emphasis High on the add tile: the plus turns white and disappears on the field.  
  _From doDont: “The plus turns white and disappears on the field.”_
- **recommended** `onPress`: Each tile's onPress is the screen's own action: open the account, or start linking a new one.  
  _From inContext: “Each tile's onPress is the screen's own action: open the account, or start linking a new one.”_
- **recommended** It has no selected state.  
  _From states: “It has no selected state.”_
- **recommended** `disableTruncation`: disableTruncation lets the title and subtitle wrap instead of being cut to one line.  
  _From fact `/facts/props/13` (disableTruncation, source evidence)_

## Content

- **recommended** `title`: Title each tile with the account's name in a few words, such as “Joint account”: it's cut to one line.  
  _From content: “Title each tile with the account's name in a few words, such as “Joint account”: it's cut to one line.”_
- **REQUIRED** `subtitle`: Show only the masked number, in the bank's own format, such as “**** 4821”.  
  _From content: “Show only the masked number, in the bank's own format.”_
- **discouraged** `subtitle`: Do not show the full account number: a preview tile exposes the whole account number.  
  _From doDont: “A preview tile exposes the whole account number.”_
- **recommended** `title`: Title the add tile with its action, “Add account”, because its title is also what screen readers announce.  
  _From content: “Title the add tile with its action, “Add account”, because its title is also what screen readers announce.”_
- **discouraged** `title`: Do not leave the add tile's default title: it reads “Personal account”, the code's default.  
  _From doDont: “It reads “Personal account”, the code's default.”_
- **REQUIRED** `title`: Set title yourself on every tile: left out, the tile shows the sample “Personal account”.  
  _From fact `/facts/props/1` (title, source types)_
- **REQUIRED** `subtitle`: Set subtitle yourself on a connected tile: left out, it shows the sample “**** 5651”.  
  _From fact `/facts/props/2` (subtitle, source evidence)_

Good: “Joint account”, “**** 4821”, “Add account”

Bad: “50100234564821”, “Personal account”

## States

| State | When | From |
| --- | --- | --- |
| Preview | Without onPress the tile is a preview, named by its title. | states: “Without onPress the tile is a preview, named by its title.” |
| Pressable | onPress makes the whole tile one button. | states: “onPress makes the whole tile one button that fades to 70% while pressed.” |
| Pressed | A pressable tile fades to 70% while pressed. | states: “onPress makes the whole tile one button that fades to 70% while pressed.” |
| Disabled | disabled dims the tile to half and, on a pressable tile, stops presses. | states: “disabled dims it to half and, on a pressable tile, stops presses.” |

## Accessibility

- **recommended** Without onPress the tile is a preview, named by its title; with onPress the whole tile is one button.  
  _From states: “Without onPress the tile is a preview, named by its title.”_
- **recommended** `title`: The add tile's title is also what screen readers announce, so title it with its action, “Add account”.  
  _From content: “Title the add tile with its action, “Add account”, because its title is also what screen readers announce.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the tile; it defaults to title.  
  _From fact `/facts/props/11` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show a masked number | Show the full number | A preview tile exposes the whole account number. |
| Title the add tile with its action | Leave the default title | It reads “Personal account”, the code's default. |
| Keep the plus as it is | Set Emphasis High | The plus turns white and disappears on the field. |

## Examples

### Linked accounts, the guide's In context: an Accounts title, then each linked account as a tile with the add tile last. Each onPress is the screen's own action (open the account, or start linking a new one). Each tile gets Figma's 125 px where it is placed; the app supplies the card art, since the package ships none.

```tsx
<VStack>
  <Title title="Accounts" subtitle="Linked to JioFinance" />
  <HStack>
    <AccountCard
      title="Joint account"
      subtitle="**** 4821"
      imageSource={require('./card.png')}
      onPress={() => {}}
      style={{ width: 125 }}
    />
    <AccountCard
      state="add"
      title="Add account"
      onPress={() => {}}
      style={{ width: 125 }}
    />
  </HStack>
</VStack>
```

_From inContext: “The Accounts screen shows each linked account as a tile, with the add tile last.”_

### Square art: imageRatio 1 on a connected tile that is a preview, not a button (no onPress).

```tsx
<AccountCard
  title="Joint account"
  subtitle="**** 4821"
  imageSource={require('./card.png')}
  imageRatio={1}
  style={{ width: 125 }}
/>
```

_From configuration: “imageRatio 1 makes the art square.”_

### A pressable tile that is disabled: dimmed to half, and it doesn't press.

```tsx
<AccountCard
  title="Joint account"
  subtitle="**** 4821"
  imageSource={require('./card.png')}
  onPress={() => {}}
  disabled
  style={{ width: 125 }}
/>
```

_From states: “Dimmed to half; it doesn't press.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `state` | `AccountCardState` | connected, add | `"connected"` |  | types | Visual variant of the card. - `'connected'` (default): renders a card preview image, a `title` and a `subtitle` below it (e.g. account name + masked number). - `'add'`: renders an empty placeholder field with a centred `+` icon and only the `title`. Use this for the "Add new account" affordance that pairs with a list of connected `AccountCard`s. Default "connected", from the component source. |
| `title` | `string` |  | `"Personal account"` |  | types | Title rendered below the image / placeholder. Default "Personal account", from the component source. |
| `subtitle` | `string` |  | `"**** 5651"` |  | evidence (2026-10-13) | An empty subtitle ('' or null) is hidden. Declared: Subtitle rendered below the title (e.g. masked account number). Only displayed when `state === 'connected'`. Default "**** 5651", from the component source. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | evidence (2026-10-13) | With no imageSource (and no cardSlot), a connected tile shows an empty art box. Declared: Card preview image. Only used when `state === 'connected'` and `cardSlot` is not provided. Accepts a URL string or any `ImageSourcePropType` (e.g. `require('./card.png')`). |
| `imageRatio` | `number` |  | `1.5244` |  | types | Aspect ratio (width / height) of the image / placeholder area. Defaults to the Figma reference ratio (`125 / 82` ≈ `1.524`). Default 1.5244 (125 / 82), from the component source. |
| `cardSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | cardSlot replaces the art or the add field in either state, and gets the tile's modes. Declared: Override the entire image / placeholder area with a custom node (e.g. a smaller `DebitCard`, a brand logo, a remote image). Receives `modes` automatically through `cloneChildrenWithModes`. |
| `addIcon` | `string` |  | `"ic_add"` |  | types | Icon name shown inside the "Add" placeholder. Defaults to `'ic_add'`. Only used when `state === 'add'`. Default "ic_add", from the component source. |
| `onPress` | `() => void` |  |  |  | types | Press handler. Applied to the whole card so the entire surface is a single touch target — particularly important for the `'add'` state, which behaves like a button. |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-13) | disabled sets the tile to 0.5 opacity with or without onPress; with onPress it also stops presses (aria-disabled on the web). Declared: Disable interaction (also dims the card). Default false, from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-13) | The tile reads modes only from its modes prop; it ignores JFSThemeProvider. Declared: Design token modes (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label (defaults to `title`). |
| `accessibilityHint` | `string` |  |  |  | evidence (2026-10-13) | On the web accessibilityHint is dropped. Declared: Accessibility hint forwarded to the underlying `Pressable`. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-13) | disableTruncation lets the title and subtitle wrap. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-13) | Emphasis High turns the add tile's plus white, 1.19:1 on the lavender field. Text, field and art never change with modes. Declared: A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection AccountCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `cardSlot` | `React.ReactNode` |  |  |  | types | Override the entire image / placeholder area with a custom node (e.g. a smaller `DebitCard`, a brand logo, a remote image). Receives `modes` automatically through `cloneChildrenWithModes`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler. Applied to the whole card so the entire surface is a single touch target — particularly important for the `'add'` state, which behaves like a button. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's connected card art has rounded corners (about 4–5 px); the code doesn't round the art, only the add field. _(evidence, 2026-10-13)_
- The package ships no card art like Figma's. _(evidence, 2026-10-13)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.

# Balance

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/balance.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T07:47:24Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** account balance, amount, total, money value, amount owed
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=balance) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1986-6203) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-balance--docs)

Use a Balance to show one money amount, such as what someone owes or holds, in large type under a short title.

## Use when

- **recommended** Show one money amount, such as what someone owes or holds, in large type under a short title.  
  _From summary: “Use a Balance to show one money amount, such as what someone owes or holds, in large type under a short title.”_

## Avoid when

- **discouraged** An amount people press, or one that needs a selected, disabled or loading look: a Balance isn't pressable and has none of those looks.  
  _From states: “A Balance isn’t pressable and has no selected, disabled, or loading look.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title: names the amount in 14 px medium text. | yes | anatomy: “Names the amount in 14 px medium text.” |
| Currency | The symbol for your currency code (currency), such as ₹ for INR. Your own Money Value in children replaces the default one. | no | anatomy: “The symbol for your currency code, such as ₹ for INR.” |
| Amount | amount, exactly as you write it, in 36 px heavy type at the default size. | yes | anatomy: “Your amount exactly as you write it, in 36 px heavy type.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Place a Balance in a screen or card that has padding and a surface: it has neither of its own.  
  _From sizing: “It has no padding or surface, so place it in a screen or card that has them.”_
- **recommended** The host sets the width: a Balance is as wide as its host and as tall as its text, 68 px at the default size.  
  _From sizing: “A Balance is as wide as its host and as tall as its text: 68 px at the default size.”_
- **recommended** In a column host, such as a screen or a VStack, a Balance takes the host's width and a long title wraps. In a row host it is as wide as its text, so a long title runs past the host on one line.  
  _From evidence: “in a column host (a screen, a VStack, Storybook's padded View) the Balance takes the host's width and a long title wraps”_
- **recommended** In the guide’s trip screen, Settle up is the screen’s own Button, not part of the Balance.  
  _From inContext: “Settle up is the screen’s own Button.”_

## Configuration

- **recommended** `currency`: Pass a currency code or symbol in currency.  
  _From configuration: “Pass a currency code or symbol and the amount as text.”_
- **recommended** `amount`: Pass the amount as text in amount.  
  _From configuration: “Pass a currency code or symbol and the amount as text.”_
- **recommended** `currency`: A currency code shows as its symbol: USD shows as $. Unknown codes print as typed.  
  _From configuration: “USD shows as $; unknown codes print as typed.”_
- **recommended** `amount`: A leading minus in amount shows before the symbol.  
  _From configuration: “A leading minus shows before the symbol.”_
- **recommended** `children`: To use a Money Value option, such as hiding the amount, pass your own MoneyValue inside the Balance (children).  
  _From configuration: “To use a Money Value option, such as hiding the amount, pass your own Money Value inside the Balance.”_
- **recommended** `Context3` = `Balance & Cards`: A Money Value in the slot always gets Context3 Balance & Cards, so it is always the 36 px size.  
  _From sources: “A Money Value in the slot always gets Context3 Balance & Cards.”_
- **recommended** `Context3`: Context3 sets the amount's size; the title stays 14 px.  
  _From sizing: “Context3 sets the amount’s size; the title stays 14 px.”_
- **recommended** `Context3` = `Balance & Cards`: Balance & Cards is the default: a 36 px amount.  
  _From sizing: “The default: a 36 px amount.”_
- **recommended** `amount`: Like the guide's trip screen, add up the amount in the screen and pass it as formatted text: the Balance only shows it.  
  _From inContext: “The trip screen adds up what you owe and passes it as formatted text; the Balance only shows it.”_
- **recommended** `amount`: When the amount changes, pass the new amount.  
  _From states: “When the amount changes, pass the new amount.”_

## Content

- **recommended** One amount, named, at a glance.  
  _From corePrinciple: “One amount, named, at a glance.”_
- **recommended** `title`: Write the title as a short name for the amount, such as “Available balance” or “Total owed to people”.  
  _From content: “Write the title as a short name for the amount, such as “Available balance” or “Total owed to people”.”_
- **recommended** `amount`: Pass the amount already formatted, with separators and decimals: the Balance shows it exactly as you write it.  
  _From content: “Pass the amount already formatted, with separators and decimals: the Balance shows it exactly as you write it.”_
- **recommended** `title`: Name the amount: “Available balance” says what the number is.  
  _From doDont: ““Available balance” says what the number is.”_
- **recommended** `title`: Keep the title short: two or three words name the amount.  
  _From doDont: “Two or three words name the amount.”_
- **discouraged** `title`: Do not leave the default title: a savings balance would still say “Total owed to people”.  
  _From doDont: “A savings balance still says “Total owed to people”.”_
- **discouraged** `title`: Do not write a sentence as the title: a long title wraps and buries the amount.  
  _From doDont: “A long title wraps and buries the amount.”_
- **discouraged** `amount`: Do not pass a raw number such as 124500.5: the Balance doesn't format, so it shows as written.  
  _From doDont: “The Balance doesn’t format, so 124500.5 shows as written.”_

Good: “Available balance”, “1,24,500.50”

Bad: “124500.5”, “Total amount you still owe to the friends on this trip after the last settlement”

## States

| State | When | From |
| --- | --- | --- |
| No states of its own | A Balance isn't pressable and has no selected, disabled, or loading look; when the amount changes, pass the new amount. | states: “A Balance isn’t pressable and has no selected, disabled, or loading look.” |
| Nothing owed | A zero amount, such as 0.00, looks like any other amount. | states: “Zero looks like any other amount.” |

## Accessibility

- **recommended** On the web the amount is announced once, with its currency, such as “₹50,000.67”.  
  _From sources: “On the web the amount is announced once, with its currency, such as “₹50,000.67”.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name the amount | Leave the default title | A savings balance still says “Total owed to people”. |
| Format the amount | Pass a raw number | The Balance doesn’t format, so 124500.5 shows as written. |
| Keep the title short | Write a sentence | A long title wraps and buries the amount. |

## Examples

### What you owe after a trip, the guide's In context: the screen adds up the amount and passes it as formatted text, the Balance shows it under the screen's Title, and Settle up is the screen's own Button.

```tsx
<VStack>
  <Title title="Goa trip" subtitle="4 friends · 12 expenses" />
  <VStack>
    <Balance title="Total owed to people" amount="2,450.00" currency="INR" />
    <Button label="Settle up" onPress={() => {}} />
  </VStack>
</VStack>
```

_From inContext: “Settle up is the screen’s own Button.”_

### A currency code: USD shows as $.

```tsx
<Balance title="Total owed to you" amount="1,250.00" currency="USD" />
```

_From configuration: “USD shows as $; unknown codes print as typed.”_

### A hidden amount: your own MoneyValue inside the Balance, with hidden on. The Balance gives it Context3 Balance & Cards.

```tsx
<Balance title="Available balance">
  <MoneyValue value="50,000.67" currency="INR" hidden />
</Balance>
```

_From configuration: “Your own Money Value, here with hidden on.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Total owed to people"` |  | evidence (2026-10-19) | An empty title still leaves an 18 px line and the 6 px gap above the amount. Declared: Title text displayed above the balance amount. Default "Total owed to people", from the component source. |
| `amount` | `string \| number` |  | `"50,000.67"` |  | evidence (2026-10-19) | Shown exactly as passed: no grouping or decimals are added. A leading minus is drawn as its own sign before the symbol. Declared: Amount to display in the balance. Default "50,000.67", from the component source. |
| `currency` | `string` |  | `"₹"` |  | evidence (2026-10-19) | ISO codes map to their symbols (INR ₹, USD $, EUR € and others); unknown codes print as typed. Declared: Currency symbol or code. Default "₹", from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design tokens. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the container. |
| `children` | `React.ReactNode` |  |  |  | types | Optional children content to render instead of the default MoneyValue. Use this slot for custom money value implementations. |
| `testID` | `string` |  |  |  | types | Native / testing id for the root. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessible name for the title-and-amount block. |
| `...Omit<React.ComponentProps<typeof View>, 'children' | 'style'>` | `Omit<React.ComponentProps<typeof View>, 'children' \| 'style'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Balance reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Balance & Cards"` |  | evidence (2026-10-19) | Sets the amount's size; the title stays 14 px. Balance's Money Value defaults to Balance & Cards, not the collection's Default: a 36 px symbol and amount at weight 900 on a 44 px line. Default gives a 14 px amount, Transaction Bubble a 26 px amount with a 28 px symbol, Amount Input a 56 px amount with a 32 px symbol. Balance's modes can change the default Money Value's Context3, but a slotted Money Value always gets Balance & Cards. Declared: A token collection Balance reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-27) | JioPlus turns the amount white, and the title with it. Declared: A token collection Balance reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-19) | Children replace the default Money Value; amount and currency are then ignored. Declared: Optional children content to render instead of the default MoneyValue. Use this slot for custom money value implementations. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Balance is one component with a Title property and a nested Money Value, whose amount and currency are overrides. In code amount and currency are props, and children takes your own Money Value. _(evidence, 2026-10-28)_
- The package draws the amount on a 44 px line where Figma's is 36 px, so a Balance is 68 px tall instead of Figma's 60. _(evidence, 2026-10-28)_
- The published Storybook docs page for Balance still doesn't load: the fix is in Biscuit's source but the hosted Storybook isn't redeployed; its stories load (#346). _(evidence, 2026-10-28)_

## Flags

_None._

# ThreadHero

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/threadhero.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T09:06:00Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** contact header, payee, person header, chat header, thread header
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=threadhero) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1699-6500) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-threadhero--docs)

Use a Thread Hero at the top of a payment or chat thread to show who the other person is: their name, banking name, and number.

## Use when

- **recommended** At the top of a payment or chat thread, to show who the other person is: their name, banking name, and number.  
  _From summary: “Use a Thread Hero at the top of a payment or chat thread to show who the other person is: their name, banking name, and number.”_

## Avoid when

- **discouraged** A person header people press, or one with a button in it: the hero has no states, doesn't press, and no part of it is a button.  
  _From states: “The hero has no states: it doesn’t press, and no part of it is a button.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | renderAvatar: an Avatar, 42 px, on top; there's none by default. | no | anatomy: “renderAvatar: an Avatar, 42 px; there’s none by default.” |
| Name | title, 16 px Semibold, close under the avatar; a long name wraps. | yes | anatomy: “title, 16 px Semibold; a long name wraps.” |
| Banking name | subtitle, 12 px grey on one line, close under the name; it ellipsizes. | no | anatomy: “subtitle, 12 px grey on one line; it ellipsizes.” |
| Caption | caption: a phone number or UPI ID, 8 px below the banking name; left out, it doesn't show. | no | anatomy: “caption: a phone number or UPI ID; left out, it doesn’t show.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `renderAvatar` | `ReactNode` | types |

## Placement

- **recommended** The hero opens the thread, so people know who they're paying before they see the payments below it.  
  _From inContext: “The hero opens the thread, so people know who they’re paying before they see the payments below it.”_
- **recommended** The thread lays the hero out with the payments; the hero only names the person.  
  _From inContext: “The thread lays it out; the hero only names the person.”_
- **recommended** The hero has no width of its own: its lines centre in the width they get. Figma draws it 360 px wide.  
  _From sizing: “The hero has no width of its own: its lines centre in the width they get, and Figma draws it 360 px wide.”_
- **recommended** With an avatar and a caption it is 110 px tall: a 42 px avatar, 2 px, a 20 px name, an 18 px banking name, then 8 px and an 18 px caption.  
  _From sizing: “With an avatar and a caption it is 110 px tall: a 42 px avatar, 2 px, a 20 px name, an 18 px banking name, then 8 px and an 18 px caption.”_
- **recommended** Without a caption it is 84 px tall; without an avatar and a caption, 40 px.  
  _From evidence: “84 tall without a caption; 40 without avatar and caption.”_

## Configuration

- **recommended** `renderAvatar`: renderAvatar takes an Avatar: the person's photo, or their initials with style Monogram.  
  _From configuration: “renderAvatar takes an Avatar: the person’s photo, or their initials with style Monogram.”_
- **recommended** `renderAvatar`: renderAvatar has no default, so without one there is no avatar and the name moves to the top.  
  _From configuration: “There’s no default, so without one the name moves to the top.”_
- **recommended** `renderAvatar`: Without a photo, pass a Monogram Avatar with the person's initials.  
  _From doDont: “A Monogram avatar with their initials.”_
- **discouraged** `renderAvatar`: Don't leave the Avatar at its default: an Avatar given no photo, and not set to style Monogram, shows a stranger's portrait.  
  _From doDont: “An Avatar with no photo shows a stranger’s portrait.”_
- **recommended** `caption`: caption shows only when you pass it.  
  _From configuration: “caption shows only when you pass it”_
- **recommended** `subtitle`: An empty subtitle hides the banking line.  
  _From configuration: “an empty subtitle hides the banking line.”_
- **recommended** `modes`: No mode changes the hero's text.  
  _From configuration: “No mode changes the hero’s text.”_
- **recommended** `Avatar Size`: The hero passes its modes to the avatar, and the avatar's own modes win, so Avatar Size can be set on the hero or on the avatar; Figma uses L, 42 px.  
  _From configuration: “The hero passes its modes to the avatar, and the avatar’s own modes win, so set Avatar Size on the hero or on the avatar; Figma uses L, 42 px.”_
- **recommended** `disableTruncation`: In a narrow column the banking name and the caption stay on one line and end in an ellipsis; disableTruncation lets them wrap too.  
  _From states: “In a narrow column the name wraps, while the banking name and the caption stay on one line and end in an ellipsis; disableTruncation lets them wrap too.”_

## Content

- **recommended** The person first, then the name their bank knows.  
  _From corePrinciple: “The person first, then the name their bank knows.”_
- **recommended** `title`: Write title as the name the user knows the person by.  
  _From content: “Write title as the name the user knows the person by.”_
- **recommended** `subtitle`: Start subtitle with “Banking name:” and give the name their bank holds, so people can check they're paying the right person.  
  _From content: “Start subtitle with Banking name: and give the name their bank holds, so people can check they’re paying the right person.”_
- **recommended** `caption`: Use caption for a phone number or UPI ID, not a sentence.  
  _From content: “Use caption for a phone number or UPI ID, not a sentence.”_
- **recommended** `caption`: Like the guide's Phone number example, write a phone number in caption as +91 and ten digits, spaced.  
  _From content: “+91 and ten digits, spaced.”_
- **recommended** `caption`: Or give the UPI ID they're paid at.  
  _From content: “Or the ID they’re paid at.”_
- **recommended** `subtitle`: After the name people know, give the banking name, labelled.  
  _From doDont: “Then the banking name, labelled.”_
- **discouraged** `title`: Don't put the phone number in title: the title is the person; the number goes in caption.  
  _From doDont: “The title is the person; the number goes in caption.”_
- **REQUIRED** `title`: Set title yourself: left out, the hero shows “Subhash Rajan”.  
  _From fact `/facts/props/0` (title, source evidence)_
- **REQUIRED** `subtitle`: Set subtitle yourself, or pass an empty one to hide the line: left out, it shows “Banking name: SHIVASHANKAR RAJAN”.  
  _From fact `/facts/props/1` (subtitle, source evidence)_

Good: “Rahul Verma”, “Banking name: RAHUL KUMAR VERMA”, “+91 98765 43210”, “rahul@okjio”

## States

| State | When | From |
| --- | --- | --- |
| Static | Always: the hero has no states; it doesn't press, and no part of it is a button. | states: “The hero has no states: it doesn’t press, and no part of it is a button.” |
| Cut | In a narrow column the name wraps; the banking name and the caption stay on one line and end in an ellipsis. | states: “The name wraps; the other two lines end in an ellipsis.” |
| Wrapped | With disableTruncation every line wraps. | states: “Every line wraps.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| The name people know | The phone as the title | The title is the person; the number goes in caption. |
| Initials without a photo | The default avatar | An Avatar with no photo shows a stranger’s portrait. |

## Examples

### The top of a payment thread, the guide's In context: the hero names the person (their initials in a Monogram Avatar, the name people know, the labelled banking name and their number) before the payments below it. The thread lays it out and shows the payments.

```tsx
<ThreadHero
  renderAvatar={<Avatar style="Monogram" monogram="RV" />}
  title="Rahul Verma"
  subtitle="Banking name: RAHUL KUMAR VERMA"
  caption="+91 98765 43210"
/>
```

_From inContext: “The hero opens the thread, so people know who they’re paying before they see the payments below it.”_

### Without a banking name: an empty subtitle hides the line (left out, the hero would show its default banking name).

```tsx
<ThreadHero
  renderAvatar={<Avatar style="Monogram" monogram="RV" />}
  title="Rahul Verma"
  subtitle=""
  caption="+91 98765 43210"
/>
```

_From configuration: “An empty subtitle hides the line.”_

### A long name, the guide's Wrapped state: the name wraps anyway, and disableTruncation lets the banking name and the UPI ID wrap too instead of ending in an ellipsis.

```tsx
<ThreadHero
  renderAvatar={<Avatar style="Monogram" monogram="VR" />}
  title="Venkatasubramanian Ramakrishnan"
  subtitle="Banking name: VENKATASUBRAMANIAN RAMAKRISHNAN"
  caption="venkatasubramanian.r@okjio"
  disableTruncation
/>
```

_From states: “disableTruncation lets them wrap too.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Subhash Rajan"` |  | evidence (2026-10-25) | The name: 16 px Semibold (600) on a 20 px line, centred; it wraps, with no line limit. Declared: Title text, e.g. "Subhash Rajan". Default "Subhash Rajan", from the component source. |
| `subtitle` | `string` |  | `"Banking name: SHIVASHANKAR RAJAN"` |  | evidence (2026-10-25) | The banking name: 12 px Medium on an 18 px line, grey, centred, one line with an ellipsis. An empty string hides it; left out, it shows the default. Declared: Subtitle text, e.g. "Banking name: SHIVASHANKAR RAJAN". Default "Banking name: SHIVASHANKAR RAJAN", from the component source. |
| `caption` | `string` |  |  |  | evidence (2026-10-25) | No default: 12 px Medium on an 18 px line, grey, one line with an ellipsis, 8 px below the banking name; hidden when not passed. Declared: Optional caption text below the details, e.g. "+91 00000 00000". |
| `renderAvatar` | `ReactNode` |  |  |  | evidence (2026-10-27) | No default avatar. The avatar gets the hero's modes and its own modes win; fragments and arrays get the hero's modes too; false shows no avatar. Declared: Slot for Avatar component. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-25) | No mode changes the hero's own text: its tokens have one mode. The hero passes its modes to the avatar. Declared: Modes for design token resolution. |
| `style` | `ViewStyle` |  |  |  | types | Optional container style. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-25) | The banking name and the caption wrap instead of ending in an ellipsis; the name wraps either way. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `string` | L, M, S, XS | `"L"` |  | evidence (2026-10-27) | Not read by the hero's own text: the hero passes its modes to the avatar, so Avatar Size on the hero sizes it (a hero at S gives a 29 px avatar), and an Avatar Size set on the avatar itself wins (an avatar at M gives 36 px whatever the hero's size). Figma's nested Avatar is 42 px. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `renderAvatar` | `ReactNode` |  |  |  | types | Slot for Avatar component |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Thread Hero has Title, Subtitle and Caption text properties, a caption switch and a nested Avatar; the package has no avatar unless you pass one in renderAvatar. _(evidence, 2026-10-28)_
- Figma's caption shows by default and its Thread Hero is 360 px wide; the package hides the caption until you pass one and has no width of its own (it hugs its text). _(evidence, 2026-10-25)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.

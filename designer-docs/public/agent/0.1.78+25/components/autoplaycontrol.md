# AutoplayControl

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/autoplaycontrol.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-31T03:15:31Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** play, pause, carousel, slideshow
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=autoplaycontrol) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7522-7658) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-autoplaycontrol--docs)

Let people pause and resume content that advances on its own, such as a slideshow.

## Use when

- **recommended** Let people pause and resume content that advances on its own, such as a slideshow.  
  _From summary: “Let people pause and resume content that advances on its own, such as a slideshow.”_
- **recommended** Moving content: canonical guidance names video, audio, and slideshow playback as its uses.  
  _From content: “Canonical guidance names video, audio, and slideshow playback as its uses.”_

## Avoid when

- **discouraged** On a white surface: the white circle disappears, leaving an unbounded glyph with no visible target.  
  _From doDont: “The white circle disappears, leaving an unbounded glyph with no visible target.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Container | A 36 × 36 circle. Width, height, radius, and the white fill come from Autoplay Control tokens. | yes | anatomy: “A 36 × 36 circle. Width, height, radius, and the white fill come from Autoplay Control tokens.” |
| Pause icon | Shown for state="pause", the default, while content advances. | no | anatomy: “Shown for state="pause", the default, while content advances.” |
| Play icon | Shown for state="play", while content is stopped. Both icons are 24 px and black. | no | anatomy: “Shown for state="play", while content is stopped. Both icons are 24 px and black.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Place it on media or a dark surface: the white circle stands out, so the target is easy to find.  
  _From doDont: “The white circle stands out, so the target is easy to find.”_
- **recommended** The control does not stretch or shrink with its host: tokens fix its size at 36 × 36 px.  
  _From sizing: “The control does not stretch or shrink with its host.”_
- **recommended** Leave room around the 36 px circle so it is easy to press.  
  _From sizing: “Leave room around the 36 px circle so it is easy to press.”_
- **recommended** Keep progress visible: Carousel’s Numbered type places the control beside NumberPagination, so people can see which slide is showing.  
  _From content: “Carousel’s Numbered type places the control beside NumberPagination, so people can see which slide is showing.”_

## Configuration

- **recommended** `state`: Show the action a press will take: pause while content plays, play while it is stopped.  
  _From corePrinciple: “Show the action a press will take: pause while content plays, play while it is stopped.”_
- **recommended** `state`: state swaps the icon between pause and play. Nothing else changes: tokens fix the circle and its colors in a single mode, and the icon is always 24 px.  
  _From configuration: “state swaps the icon between pause and play. Nothing else changes: tokens fix the circle and its colors in a single mode, and the icon is always 24 px.”_
- **recommended** `state` = `pause`: state="pause" is the default: it tells people a press will stop the slideshow, video, or audio.  
  _From configuration: “The default. It tells people a press will stop the slideshow, video, or audio.”_
- **recommended** `state` = `play`: state="play" is shown after playback stops; a press should start it again.  
  _From configuration: “Shown after playback stops. A press should start it again.”_
- **discouraged** `state` = `play`: Don't show play while slides advance: the play icon suggests the slides are already stopped, so people cannot tell how to pause them.  
  _From doDont: “The play icon suggests the slides are already stopped, so people cannot tell how to pause them.”_
- **recommended** The control has no timer: Carousel’s Numbered type owns autoplay, with a 4-second default interval.  
  _From sources: “The control has no timer: Carousel’s Numbered type owns autoplay, with a 4-second default interval.”_
- **recommended** `state`: In Carousel’s Numbered type, the Carousel owns the timer and swaps the control’s state.  
  _From inContext: “The Carousel owns the timer and swaps the control’s state.”_
- **recommended** `disabled` = `true`: disabled fades the control and ignores presses.  
  _From states: “disabled fades the control and ignores presses.”_

## Content

- **recommended** The control shows no text: its icon has to describe what a press will do, and nearby content has to show what is playing.  
  _From content: “The control shows no text. Its icon has to describe what a press will do, and nearby content has to show what is playing.”_
- **recommended** Show the action, not the status: while slides advance, show pause; when they stop, show play.  
  _From content: “While slides advance, show pause. When they stop, show play.”_

## States

| State | When | From |
| --- | --- | --- |
| Enabled | Full opacity and pressable. | states: “Full opacity and pressable.” |
| Pressed | While pressed, the control drops to 70% opacity. | states: “While pressed, the control drops to 70% opacity.” |
| Disabled | Half opacity. Presses are ignored and the control leaves the Tab order. | states: “Half opacity. Presses are ignored and the control leaves the Tab order.” |
| Hover and focus | No hover style of its own; keyboard focus shows the browser's standard focus ring. | states: “It adds no hover style of its own; keyboard focus shows the browser’s standard focus ring.” |

## Accessibility

- **recommended** `accessibilityLabel`: The control is named “Pause” or “Play” after its state; developers can set a more specific accessibilityLabel, such as “Pause slideshow”, as Storybook asks.  
  _From sources: “The control is named “Pause” or “Play” after its state; developers can set a more specific accessibilityLabel, such as “Pause slideshow”, as Storybook asks.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the control's accessible name; left unset, the name is the action for state, Pause or Play.  
  _From fact `/facts/props/5` (accessibilityLabel, source evidence)_
- **recommended** `disabled`: A disabled control ignores presses and leaves the Tab order.  
  _From states: “Presses are ignored and the control leaves the Tab order.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show pause while slides advance | Show play while slides advance | The play icon suggests the slides are already stopped, so people cannot tell how to pause them. |
| Place it on media or a dark surface | Place it on a white surface | The white circle disappears, leaving an unbounded glyph with no visible target. |

## Examples

### Content advancing, such as a slideshow the screen is playing: the control offers Pause, named “Pause slideshow”, the more specific name the Sources note gives as its example. The screen owns playback: when the control is pressed it stops the slides and passes state="play". A label that is set replaces the state's own name (Pause or Play), so the screen passes a label that matches each state. The empty onPress stands for the screen's own handler.

```tsx
<AutoplayControl state="pause" onPress={() => {}} accessibilityLabel="Pause slideshow" />
```

_From configuration: “The default. It tells people a press will stop the slideshow, video, or audio.”_

### Content stopped: the control offers Play and, with no accessibilityLabel, is named “Play” after its state. A press should start playback again; the screen then passes state="pause". The empty onPress stands for the screen's own handler.

```tsx
<AutoplayControl state="play" onPress={() => {}} />
```

_From configuration: “Shown after playback stops. A press should start it again.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `state` | `'pause' \| 'play'` | pause, play | `"pause"` |  | types | Default "pause", from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `onPress` | `() => void` |  |  |  | types |  |
| `disabled` | `boolean` |  | `false` |  | types | Default false, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-01) | Without it, the control is named Pause or Play from state; the icon is hidden from assistive technology. Declared: Accessible name. Defaults to the action for `state` (`Pause` or `Play`). |

### Modes

_No modes._

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The States description says “Pressed feedback is shown only while a pointer is down.” On the web, holding Enter or Space on the focused control shows it too: AutoplayControl drops to 70% opacity whenever its Pressable reports pressed (AutoplayControl.tsx line 72, 0.1.78-dbe0e02), and react-native-web 0.21.2's Pressable sets pressed from keyboard presses as well (PressResponder.js lines 236–243 start a press on an Enter or Space keydown and lines 209–213 end it on keyup; Pressable index.js lines 66 and 131). Confirmed in headless Chrome on the installed build on 29 October: on this guide, the focused live Pause control went from opacity 1 to 0.7 while Enter was held and back to 1 on release, and the same with Space. Every other sentence the guide renders still holds on dbe0e02, so the entry quotes the States card “While pressed, the control drops to 70% opacity.” and leaves the “only while a pointer is down” sentence out. Fix the sentence (for example “Pressed feedback is shown only while the control is being pressed, by pointer or by Enter or Space.”), publish, and re-extract the States section. Added by Claude Code in the overnight run agentpack-batch13, for Marcin to confirm. Guide fix #537.

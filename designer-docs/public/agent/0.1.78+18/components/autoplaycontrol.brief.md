# AutoplayControl (brief)

> Coin agent pack 0.1.78+18 · flagged · full entry: `components/autoplaycontrol.md` (sources, all facts, flags)

Let people pause and resume content that advances on its own, such as a slideshow.

**Use when**
- Let people pause and resume content that advances on its own, such as a slideshow.
- Moving content: canonical guidance names video, audio, and slideshow playback as its uses.

**Avoid when**
- Avoid: On a white surface: the white circle disappears, leaving an unbounded glyph with no visible target.

**Placement**
- Place it on media or a dark surface: the white circle stands out, so the target is easy to find.
- The control does not stretch or shrink with its host: tokens fix its size at 36 × 36 px.
- Leave room around the 36 px circle so it is easy to press.
- Keep progress visible: Carousel’s Numbered type places the control beside NumberPagination, so people can see which slide is showing.

**Key rules**
- `state`: Show the action a press will take: pause while content plays, play while it is stopped.
- `state`: state swaps the icon between pause and play. Nothing else changes: tokens fix the circle and its colors in a single mode, and the icon is always 24 px.
- `state` = `pause`: state="pause" is the default: it tells people a press will stop the slideshow, video, or audio.
- `state` = `play`: state="play" is shown after playback stops; a press should start it again.
- Avoid: `state` = `play`: Don't show play while slides advance: the play icon suggests the slides are already stopped, so people cannot tell how to pause them.
- The control has no timer: Carousel’s Numbered type owns autoplay, with a 4-second default interval.
- `state`: In Carousel’s Numbered type, the Carousel owns the timer and swaps the control’s state.
- `disabled` = `true`: disabled fades the control and ignores presses.

**Example:** Content advancing, such as a slideshow the screen is playing: the control offers Pause, named “Pause slideshow”, the more specific name the Sources note gives as its example. The screen owns playback: when the control is pressed it stops the slides and passes state="play". A label that is set replaces the state's own name (Pause or Play), so the screen passes a label that matches each state. The empty onPress stands for the screen's own handler.

```tsx
<AutoplayControl state="pause" onPress={() => {}} accessibilityLabel="Pause slideshow" />
```

**Props:** `state` (pause | play), `modes`, `onPress`, `disabled`, `style`, `accessibilityLabel`. (* required)

Full entry: `components/autoplaycontrol.md`. Links: `components/autoplaycontrol.links.md`.

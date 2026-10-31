# ThreadHero (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/threadhero.md` (sources, all facts, flags)

Use a Thread Hero at the top of a payment or chat thread to show who the other person is: their name, banking name, and number.

**Use when**
- At the top of a payment or chat thread, to show who the other person is: their name, banking name, and number.

**Avoid when**
- Avoid: A person header people press, or one with a button in it: the hero has no states, doesn't press, and no part of it is a button.

**Placement**
- The hero opens the thread, so people know who they're paying before they see the payments below it.
- The thread lays the hero out with the payments; the hero only names the person.
- The hero has no width of its own: its lines centre in the width they get. Figma draws it 360 px wide.
- With an avatar and a caption it is 110 px tall: a 42 px avatar, 2 px, a 20 px name, an 18 px banking name, then 8 px and an 18 px caption.

**Key rules**
- **REQUIRED** `title`: Set title yourself: left out, the hero shows “Subhash Rajan”.
- **REQUIRED** `subtitle`: Set subtitle yourself, or pass an empty one to hide the line: left out, it shows “Banking name: SHIVASHANKAR RAJAN”.
- `renderAvatar`: renderAvatar takes an Avatar: the person's photo, or their initials with style Monogram.
- `renderAvatar`: renderAvatar has no default, so without one there is no avatar and the name moves to the top.
- `renderAvatar`: Without a photo, pass a Monogram Avatar with the person's initials.
- Avoid: `renderAvatar`: Don't leave the Avatar at its default: an Avatar given no photo, and not set to style Monogram, shows a stranger's portrait.
- `caption`: caption shows only when you pass it.
- `subtitle`: An empty subtitle hides the banking line.

**Example:** The top of a payment thread, the guide's In context: the hero names the person (their initials in a Monogram Avatar, the name people know, the labelled banking name and their number) before the payments below it. The thread lays it out and shows the payments.

```tsx
<ThreadHero
  renderAvatar={<Avatar style="Monogram" monogram="RV" />}
  title="Rahul Verma"
  subtitle="Banking name: RAHUL KUMAR VERMA"
  caption="+91 98765 43210"
/>
```

**Props:** `title`, `subtitle`, `caption`, `renderAvatar`, `modes`, `style`, `disableTruncation`. (* required)

**Modes it reads:** Avatar Size.

**Gaps (report, do not work around)**
- Figma's Thread Hero has Title, Subtitle and Caption text properties, a caption switch and a nested Avatar; the package has no avatar unless you pass one in renderAvatar.
- Figma's caption shows by default and its Thread Hero is 360 px wide; the package hides the caption until you pass one and has no width of its own (it hugs its text).

Full entry: `components/threadhero.md`. Links: `components/threadhero.links.md`.

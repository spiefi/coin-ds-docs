# Toggle source evidence

Package, Figma, Storybook, and browser evidence for the Toggle guide (board ticket #79, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 1 October 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repository. The newest mirror tag is `v0.1.78`, and Toggle is unchanged in it.

- Figma: [Coin Components Library · Toggle](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2906-8120), a component set with `State=Off` and `State=On`, each 52 × 31. Off is a grey track with the white thumb on the left; On is a purple track with the thumb on the right. There is no disabled variant.
- Storybook: `components-toggle--docs`; stories `--default`, `--on`, `--disabled`, `--all-states`, `--interactive`. The docs list the `Toggle States` collection (Off, On, Disabled Off, Disabled On), which the component sets itself from `value` and `disabled`, and `Color Mode` (Light, Dark). They ask for an `accessibilityLabel` when there is no adjacent visible label, and pair the toggle with a Text label in a row.
- Package: public `Toggle` accepts `value` (controlled), `defaultValue`, `onValueChange`, `disabled`, `modes`, `style`, and `accessibilityLabel`. It has no `testID` and no rest props, so guide targets use `[role="switch"]`.

## Browser measurements (Chrome, react-native-web 0.21.2)

- The track is 52 × 31 with 3 px padding, radius 100, and a 25 × 25 white thumb with a soft shadow. Off is `rgb(199,199,204)` and On is `rgb(93,0,181)`.
- Disabled dims the whole toggle to 50%. Disabled Off and Disabled On both use a grey track, `rgb(224,224,229)`, with a `rgb(245,245,247)` thumb, so only the thumb position shows the state.
- In Dark mode, Off stays grey and On becomes lilac `rgb(201,183,255)`. The guide shows Light only.
- The web element is `role="switch"` with `aria-label` from `accessibilityLabel` and `tabindex=0`. Disabled adds `aria-disabled` and `tabindex=-1`. Tab focus shows the browser focus ring.
- Coin gap #181 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): there is no `aria-checked`, so the on or off state is not announced. Space does not switch a focused toggle; Enter and click do.

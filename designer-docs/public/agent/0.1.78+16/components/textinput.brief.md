# TextInput (brief)

> Coin agent pack 0.1.78+16 · flagged · full entry: `components/textinput.md` (sources, all facts, flags)

Use a Text Input for a single line of text, such as a search, with an icon that hints at what to type.

**Use when**
- A single line of text, such as a search, with an icon that hints at what to type.

**Avoid when**
- Avoid: The field needs a disabled or an error state: Text Input has neither.
- Avoid: The field needs a visible label: Text Input has none.

**Placement**
- Text Input fills its container's width; set the width with the container.
- `onChangeText`: Let the screen act on the text (for example filter a list) through onChangeText; Text Input only reports the text.

**Key rules**
- `leadingIconName`: Keep the search icon, or set leadingIconName to an icon that matches what people type. The leading icon cannot be removed.
- Avoid: `leadingIconName` = `ic_search`: Do not keep the search icon on a field that is not a search, such as an amount.
- `trailing`: Use trailing for a cue at the end of the field, such as a filter icon. It is empty unless you add content.
- `trailing`: Give a trailing Icon its own modes: without them it is gold; AppearanceBrand Neutral gives the grey the guide uses.
- Avoid: `placeholder`: Do not pass an array to placeholder to rotate the prompt: the changing text distracts, and screen readers hear only the first prompt.
- `accessibilityLabel`: Set accessibilityLabel when the placeholder does not say what the field is for; otherwise, on the web, the placeholder names the field.
- Keep slot icons decorative and put no focusable controls inside leading or trailing.
- A short prompt, the right icon, and room to type.

**Example:** A search field whose text the screen uses to filter a list.

```tsx
<TextInput placeholder="Search transactions" onChangeText={(text) => {}} modes={{ 'Color Mode': 'Light' }} />
```

**Props:** `placeholder`, `value`, `onChangeText`, `leadingIconName`, `leading`, `trailing`, `modes`, `style`, `inputStyle`, `onFocus`, `onBlur`, `accessibilityLabel`, `accessibilityHint`, `TextInput.Search`. (* required)

**Modes it reads:** Color Mode, InputState.

**Gaps (report, do not work around)**
- No visible label, error state or disabled state.
- editable={false} makes the field read-only with no visual change, so it cannot stand in for a disabled state.
- The field renders 42 px tall; Figma's is 44 px (open, lower priority, in #183).

Full entry: `components/textinput.md`. Links: `components/textinput.links.md`.

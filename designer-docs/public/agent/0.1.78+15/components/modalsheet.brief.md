# ModalSheet (brief)

> Coin agent pack 0.1.78+15 · flagged · full entry: `components/modalsheet.md` (sources, all facts, flags)

Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.

**Use when**
- A task that slides up over the page and goes away when it's done.

**Avoid when**
- Avoid: A new flow: it deserves its own screen; keep a sheet to one task.

**Placement**
- The sheet spans its screen, with 12 px of padding at the top, 8 px at the sides and 32 px at the bottom, and puts 12 px between the items in its slot.
- `visible`: Place the sheet in the screen it covers: with visible set, it fills its nearest positioned parent as an overlay; it is not a Modal or portal.
- In the guide, a button on Home opens the sheet over Home, and Home steps back behind it.
- `presentationProgress`: Stepping the page back with the sheet is the screen's job, not the sheet's: the guide does it through the package's page-stack hook (useModalSheetPageStackStyle) with the sheet's presentationProgress.

**Key rules**
- `visible`: Set visible to present the sheet over the page; the screen shows and hides it. Without visible, the sheet renders in place as a plain surface.
- `onRequestClose`: Wire onRequestClose to set visible to false: it reports that people asked to close the sheet (a drag down), and the screen hides it.
- `fillHeight` = `true`: By default (fillHeight true) the sheet covers the screen and the field sits at its foot.
- `fillHeight` = `false`: Fit the sheet to short content with fillHeight false; it fills the screen by default.
- `fillHeight` = `false`: A fitted sheet hugs its content and docks to the bottom.
- Avoid: `fillHeight` = `true`: Do not fill the screen for one line: the sheet covers the page and leaves it empty.
- `showOverlay` = `true`: A scrim (showOverlay) dims the page around a fitted sheet.
- `showOverlay` = `false`: Without a scrim, the page stays bright behind the sheet, as in the Storybook story.

**Example:** Asking a question from Home: the sheet fills the screen over a dimmed page, with an AppBar holding a named close IconButton, one line of Text and a HelloJioInput at its foot. The screen sets visible, and hides the sheet when a question is sent, the X or the scrim is pressed, or a drag asks to close it.

```tsx
<ModalSheet
  visible
  showOverlay
  onOverlayPress={() => {}}
  onRequestClose={() => {}}
>
  <AppBar
    type="SubPage"
    leadingSlot={<JioDot />}
    actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={() => {}} />}
  />
  <Text>Ask about your spends, bills, or investments.</Text>
  <VStack style={{ flex: 1 }} />
  <HelloJioInput onSubmit={() => {}} />
</ModalSheet>
```

**Props:** `children`, `modes`, `fillHeight`, `visible`, `showOverlay`, `onOverlayPress`, `dismissAccessibilityLabel`, `trapFocus`, `onRequestClose`, `enableDismissGesture`, `onDismissed`, `topInset`, `presentationProgress`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** Page type.

**Gaps (report, do not work around)**
- Under Page type JioPlus, an AppBar or HelloJioInput rendered inside a consumer's own component in the slot isn't recognised: the AppBar loses Page type (white on the grey sheet) and the field's pill isn't repainted, so it still matches the sheet. The #255 fix doesn't reach them; the evidence leaves this limit for Marcin to judge.
- A hidden sheet sets inert as the string "true", so React 19 logs a development warning; the sheet still works (#417, Component Bug, To do).
- The “Drag down to dismiss” hint has no web mapping, so it isn't exposed on the web.

Full entry: `components/modalsheet.md`. Links: `components/modalsheet.links.md`.

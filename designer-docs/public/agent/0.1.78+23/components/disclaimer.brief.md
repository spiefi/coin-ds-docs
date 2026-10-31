# Disclaimer (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/disclaimer.md` (sources, all facts, flags)

Use a Disclaimer for one short legal line under an action, such as who provides a payment service.

**Use when**
- One short legal line under an action, such as who provides a payment service.

**Avoid when**
- Avoid: A problem people need to fix, such as “UPI limit reached. Try a smaller amount.”: grey 10 px text hides an error. Use Support Text, whose red message tells people what to fix. Use instead: SupportText.

**Placement**
- Under a payment action: a payment footer (an ActionFooter) holds the Pay button and, below it, the provider line.
- The footer passes its modes to both; the screen handles the payment.
- The column is 281 px wide, or as wide as a narrower host, and the text centres inside it.
- Each line adds 12 px.

**Key rules**
- `disclaimer`: Disclaimer has no variants, icon, or size: the copy is the only choice.
- `disclaimer`: Write the copy for the screen; without it, the package shows a generic Jio Payments Bank line.
- `disclaimer`: Copy that doesn’t name the bank (that doesn’t contain “Jio Payments Bank Pvt. Ltd.”) gets “Jio Payments Bank Pvt. Ltd.” on a line below.
- `disclaimer`: To name the bank in the copy, put a line break before the bank’s name: it keeps the name on one line, as in Figma.
- Avoid: `disclaimer`: Leaving the copy out shows “All financial services…”, which differs from Figma, and that default copy breaks the bank’s name across two lines.
- `accessibilityLabel`: Screen readers read the copy and the added bank line as one label, or accessibilityLabel when it’s set.
- Small print that says who stands behind the action, in one or two lines.
- Name the provider or the condition in one or two short sentences.

**Example:** The provider line under a payment action, the guide's In context: an ActionFooter titled Confirm payment holds one vertical Stack with the Pay button and, below it, the Disclaimer. The copy breaks before the bank's name, so the name stays on one line and the package adds nothing. The footer passes its modes to both, so neither sets any. The empty onPress stands for the screen's own payment handling.

```tsx
<ActionFooter title="Confirm payment">
  <Stack layoutDirection="vertical">
    <Button label="Pay ₹500" onPress={() => {}} />
    <Disclaimer disclaimer={'Payment and UPI services are provided by\nJio Payments Bank Pvt. Ltd.'} />
  </Stack>
</ActionFooter>
```

**Props:** `disclaimer`, `modes`, `style`, `textStyle`, `accessibilityLabel`, `accessibilityHint`. (* required)

**Modes it reads:** Color Mode, context5.

Full entry: `components/disclaimer.md`. Links: `components/disclaimer.links.md`.

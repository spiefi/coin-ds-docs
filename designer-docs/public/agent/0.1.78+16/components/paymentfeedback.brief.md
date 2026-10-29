# PaymentFeedback (brief)

> Coin agent pack 0.1.78+16 · documented · full entry: `components/paymentfeedback.md` (sources, all facts, flags)

Use a Payment Feedback on the screen after a payment to show the amount, whether it went through, and its reference.

**Use when**
- On the screen after a payment, to show the amount, whether it went through, and its reference.

**Avoid when**
- Avoid: Before the payment has a result: Payment Feedback has no pressed, disabled or loading state, and the screen shows it once the payment has a result.

**Placement**
- It has no width of its own: it fills its container, or shrinks to its longest line when centred.
- Payment Feedback has no button of its own, so the screen adds one.
- On the guide's result screen, Pay swaps the payment screen for the result (the amount, the outcome and the reference), with Done below to leave.

**Key rules**
- **REQUIRED** `iconName`: iconName defaults to ic_confirm whatever the outcome: set it for a pending or failed payment.
- **REQUIRED** `subtitle`: subtitle defaults to “Payment successful” whatever the outcome: set it for a pending or failed payment.
- **REQUIRED** `title`: title defaults to “₹50,000”: pass the amount that was paid.
- **REQUIRED** `details`: details defaults to a sample date and transaction ID (18 March 2025, TXN121466784): pass the payment's own, or set showDetails false.
- `AppearanceSystem`: Set the outcome with AppearanceSystem in modes: positive is green, warning orange, and negative red.
- `iconName`: The icon and the words don't follow AppearanceSystem: set iconName and the status line (subtitle) to match it.
- `AppearanceSystem` = `positive`: Paid: positive with ic_confirm, the default: a check on green.
- `AppearanceSystem` = `warning`: Pending: warning with ic_info, while the bank hasn't confirmed it.

**Example:** A successful payment: the amount, the outcome, who it went to, then the date and transaction ID.

```tsx
<PaymentFeedback
  title="₹1,250"
  subtitle="Payment successful"
  body="Sent to Rahul Sharma."
  details={'13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'}
  iconName="ic_confirm"
/>
```

**Props:** `title`, `subtitle`, `body`, `details`, `showDetails`, `iconName`, `renderMedia`, `modes`, `style`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, Icon Capsule Size, Page type, Semantic Intent.

**Gaps (report, do not work around)**
- Figma's Payment Feedback shows only a successful payment; pending and failed exist only in code, through AppearanceSystem.
- It doesn't announce the result: it has no live region or alert role.

Full entry: `components/paymentfeedback.md`. Links: `components/paymentfeedback.links.md`.

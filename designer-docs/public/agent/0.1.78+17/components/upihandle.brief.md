# UpiHandle (brief)

> Coin agent pack 0.1.78+17 · documented · full entry: `components/upihandle.md` (sources, all facts, flags)

Use a UPI Handle to show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.

**Use when**
- Show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.
- Confirm the payee on a payment screen.

**Avoid when**
- Avoid: Several handles in one pill: people can't tell which ID they copied. Give each handle its own pill.

**Placement**
- `onPress`: Let the screen do the work: it copies the handle or opens the payment when the pill is pressed; the pill only reports the press, through onPress.
- Leave room for the whole ID: when space runs out, a long handle ends in an ellipsis.

**Key rules**
- `onPress`: Show the real handle and put its action on the pill itself, through onPress.
- `source`: Add an avatar (source) when a photo or logo helps people recognise the account.
- `source`: Leave source out where a name is already shown: without an avatar the pill pads evenly.
- `UPI Handle Image`: Show or hide the avatar with source alone: a source shows it and sets UPI Handle Image to True; no source hides it and sets False, overriding any UPI Handle Image value in modes. The avatar is not tinted; the source renders as-is.
- `iconName`: Choose the icon for the action the pill performs, or none when it only shows the handle.
- `iconName` = `ic_copy`: iconName defaults to ic_scan_qr_code, a scan icon: set iconName="ic_copy" wherever the pill copies.
- `iconName` = `ic_scan_qr_code`: Scan icon (ic_scan_qr_code): for a handle people scan to pay.
- `showIcon` = `false`: No icon (showIcon false): display only, nothing to press.

**Example:** Confirm the payee, the guide's In context: a Card with the payee's name in a Text, the payee's UPI Handle with an avatar and the copy icon, and the Pay Button, stacked in a VStack as the guide's code stacks them. The pill's onPress stands for the screen copying the handle, and the Button's for the screen starting the payment. The URI stands for the payee's own photo.

```tsx
<Card>
  <VStack>
    <Text>Paying Priya Sharma</Text>
    <UpiHandle
      label="priya@jio"
      source={{ uri: 'https://example.com/photos/priya-sharma.jpg' }}
      iconName="ic_copy"
      accessibilityLabel="Copy priya@jio"
      onPress={() => {}}
    />
    <Button label="Pay ₹500" onPress={() => {}} />
  </VStack>
</Card>
```

**Props:** `label`, `modes`, `showIcon`, `iconName`, `source`, `avatarSource`, `accessibilityLabel`, `accessibilityHint`, `onPress`, `onClick`, `disabled`, `style`, `disableTruncation`. (* required)

**Modes it reads:** Color Mode, context 10, Profile Card Appearance, UPI Handle Image.

**Gaps (report, do not work around)**
- The package's default icon is still ic_scan_qr_code (scan), while Figma's UPI Handle uses ic_copy.

Full entry: `components/upihandle.md`. Links: `components/upihandle.links.md`.

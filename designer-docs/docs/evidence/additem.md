# Add Item source evidence

Package, Figma, Storybook, API, and verification evidence for this guide. Split from the former `docs/SOURCE_EVIDENCE.md` on 26 September 2026; implementation notes about anatomy markup predate the guide-kit migration.

## Additem guide evidence

- `Additem` is a public export within the `FormUpload` family. It owns a fixed 44 × 44 cell and accepts `state` (`empty` or `preview`), `imageSource`, `onPress`, optional `onRemove`, injected `picker` plus `onAssetsPicked`, `modes`, and `isDisabled`.
- The package merges default inner IconCapsule modes `AppearanceBrand=Neutral`, `Emphasis=Low`, and `Icon Capsule Size=S`. `FormUpload` is the public in-context composite for labels, support text, controlled attachments, wrapping, and picker integration.
- The lower-case Additem component key `c56305b04f6636abc27759702a16af895c413b23` was identified in the read-only Coin Subcomponents file `dSlK8ueQ7wlbyUSZd4f8QO`. The available live page context exposed no matching node, so the guide links to the source file and does not guess a node ID.
- Package source renders the preview remove IconCapsule with `onTouchEnd`; IconCapsule intentionally drops its `accessibilityLabel`. In live browser QA at 390 × 844 and desktop width, the preview remained after both a mouse click and Enter on the visible remove button. The button rendered at 29 × 29 without an accessible name inside the labelled 44 × 44 preview. The guide leaves the component internals unchanged.
- Responsive browser QA at 390 × 844 confirmed all three new routes without document overflow: ActionFooter's Coin heading kept normal letter spacing, ActionTile remained 168 × 90, and Additem remained 44 × 44. Button and HStack retained their existing desktop hero typography after the shared selector was narrowed.
- Canonical story IDs verified in the published index: `components-additem--default`, `--preview`, `--preview-with-remove`, `--with-picker`, `--disabled`, and `--all-states`.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #188 fixed (Additem is the FormUpload cell). The remove control is a button placed next to the preview button rather than inside it, named "Remove" plus the cell's label ("Remove Receipt 1" in FormUpload). A mouse click and Enter both remove, and a standalone Additem's remove doesn't trigger open. Disabled cells render at 0.5 opacity once.
- From the installed source: in preview, `testID` lands on a wrapper holding the preview button, the image, and the remove button, so the anatomy's Remove affordance pin targets `[aria-label="Remove Receipt attachment preview"]` instead of the first `[role="button"]` (now the preview). The inner IconCapsule still defaults to Neutral, Low, and S.
- Guide (`src/ActionGuides.tsx`): the Sources note now gives the installed version (was 0.1.60) and says remove works with a click, a tap, or Enter; its checked date is 8 October 2026 (the other Action guides keep 19 September). The playground's Remove affordance note is no longer a warning and says the same.

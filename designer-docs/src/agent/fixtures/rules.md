# Coin agent rules

> Sample data. The pack pipeline replaces this file with the published rules for each release.

These rules apply to every component entry in the Coin agent pack. Read them before any entry.

## Use public Coin components only

- Import components from `jfs-components` and configure them only through supported props, variants, slots, and modes.
- Never detach, patch internals, recreate a Coin component, or hardcode product colors.
- When the pack has no answer, report a Coin gap instead of working around it.

## Pass modes into slots

When a slot receives a Coin child and the owner does not propagate modes, pass the owner's same `modes` object to the child.

## Read the strength of each rule

| Strength | Meaning |
| --- | --- |
| required | Follow it. Breaking it breaks the component or its meaning. |
| recommended | Follow it unless the design gives a clear reason not to. |
| discouraged | Avoid it. Use the `useInstead` component when one is named. |

## Facts and guidance

- **Facts** come from the package. Each one names its source: `types`, `runtime`, `evidence`, or `unknown`. Treat `unknown` as unverified.
- **Guidance** comes from the designer guides. Each rule quotes the guide sentence it came from.
- Allowed children are facts. Placement advice is guidance. Never treat placement advice as a limit.
- Categories help you find components. They never limit what a component can hold.

## Gaps and flags

- A **gap** is something the component cannot do yet. Do not promise it.
- A **flag** marks a reading that a check or a person questioned. Prefer the guide sentence it cites, and say that the rule is flagged.

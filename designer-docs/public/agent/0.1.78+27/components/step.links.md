# Step (links)

> Coin agent pack 0.1.78+27. Edges from graph.json, derived by code from the entries. Brief: `components/step.brief.md` · full entry: `components/step.md`

## Outgoing

- Step —useInstead→ Stepper (discouraged)
- Step —placedIn→ Stepper (recommended)
- Step —usedWith→ Stepper
- Step —usedWith→ StepLabel
- Step —usedWith→ Button

## Incoming

- Stepper —usedWith→ Step
- StepLabel —placedIn→ Step (recommended)
- StepLabel —usedWith→ Step

# Coin ticket owners

Where the tickets agents create on the DuetWorks board go (for example, Coin
gaps found while documenting a component). The board's flows are the source
of truth; this file only covers the kinds of ticket that have no flow yet.

## Kinds with a flow

File the ticket the way its flow starts: read the flow with `get_flow`, then
put the ticket in its first step's column, with that step's tag, assigned to
the people on the flow's first person or teammate step. This holds while the
flow is still a draft.

- Component bugs and developer questions (component code, props, behaviour,
  accessibility, package or Storybook issues): the **Component Fix** flow.

## Kinds without a flow yet

| Kind of ticket | Assign to |
| --- | --- |
| Token problems: missing, misnamed, or wrong-valued design tokens, variable collections, or modes | Marcin Śpiewak |
| Visual problems: the design in Figma looks wrong or inconsistent. Tag it `Design Bug`. | Vasanth Ramachandran |
| PM questions: scope, priority, planning, or process | Falguni Mota |

Look up member ids with `list_team`. When a ticket spans kinds, assign it by
its root cause. A component that reads a token under the wrong mode name is a
component bug; a token with the wrong value is a token problem. Say in the
description which part belongs to whom if more than one person needs to act.

## Every new ticket

- Link the evidence (for docs work, `designer-docs/docs/evidence/<slug>.md`)
  and the Figma and Storybook URLs.
- An agent that creates a ticket lists it in its final summary under its own
  heading ("New tickets I created"), with number, title, column, and assignee.

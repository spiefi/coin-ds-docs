# Coin ticket owners

Who owns what on the Coin Workflow board. Agents use this file to assign the
tickets they create (for example, Coin gaps found while documenting a
component). Use the board member ids when a tool needs an id.

## Members

| Name | Board id | Team role |
| --- | --- | --- |
| Marcin Śpiewak | `usr_8e0902c4-93f0-42bd-86e8-1e5a1a03dc8d` | Design Engineer, board owner |
| Mr. Biscuit | `usr_6753a027-cda8-499c-85d9-f593581018ed` | Developer |
| Anagha Ghotkar | `usr_9ba323ac-504e-4036-a434-e3a12d926afa` | Developer |
| Vasanth Ramachandran | `usr_154d473b-1591-4092-b8b6-d74c3e4ce837` | Design Engineer |
| Falguni Mota | `usr_b74e51f6-d9ac-437b-b791-784e712fe72a` | PM |

## Who gets which ticket

| Kind of ticket | Assign to |
| --- | --- |
| Component bugs and developer questions: component code, props, behaviour, accessibility, package or Storybook issues | Mr. Biscuit and Anagha Ghotkar (Biscuit always; Anagha as the second developer) |
| Token problems: missing, misnamed, or wrong-valued design tokens, variable collections, or modes | Marcin Śpiewak |
| Visual problems: the design in Figma looks wrong or inconsistent | Vasanth Ramachandran |
| PM questions: scope, priority, planning, or process | Falguni Mota |

When a ticket spans kinds, assign it by its root cause. A component that reads
a token under the wrong mode name is a component bug; a token with the wrong
value is a token problem. Say in the description which part belongs to whom
if more than one person needs to act.

## Board conventions

- Component bugs go to the Components workflow, first stage (To do), tagged
  `Component Bug`. Tag visual problems `Design Bug`.
- Link the evidence (for docs work, `designer-docs/docs/evidence/<slug>.md`)
  and the Figma and Storybook URLs.
- An agent that creates a ticket lists it in its final summary under its own
  heading ("New tickets I created"), with number, title, column, and assignee.

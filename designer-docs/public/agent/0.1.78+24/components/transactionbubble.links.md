# TransactionBubble (links)

> Coin agent pack 0.1.78+24. Edges from graph.json, derived by code from the entries. Brief: `components/transactionbubble.brief.md` · full entry: `components/transactionbubble.md`

## Outgoing

- TransactionBubble —useInstead→ TransactionDetails (discouraged)
- TransactionBubble —usedWith→ VStack
- TransactionBubble —usedWith→ Text
- TransactionBubble —usedWith→ TransactionStatus

## Incoming

- TransactionStatus —placedIn→ TransactionBubble (recommended)
- TransactionStatus —usedWith→ TransactionBubble
- StatusHero —useInstead→ TransactionBubble (discouraged)

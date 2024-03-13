# summary

This is an immitation of the classic game Yugioh Forbidden Memories using the cards from Palworld.

That was our starting point, nowaday generating new cards are not that difficult.

# game rules

- A match follows the list of phases: Drawing, Placing, Attacking
- Each player take turn to go through the phases or end their turn prematurely
- Drawing: the player draw cards from their deck to get 5 cards on their hand, no more no less
- Placing: the player select one or more cards on their hands and a position on their board. If the player selected more than 1 cards then they will be fused into one card. If the selected position already have a card, then that card will be added to the list of fusion too.
- Attacking
  - The player select a card that hasn't attacked this turn on their board and either change its stance to Defensive or use it to attack a card on the opponent's board.
  - When the player has played all their cards, their turn will end.
  - They can also end their turn manually.
- Battle
  - When two card are in a battle, each card will compare their attribute to each other, the greater one will win.
  - Normally the cards will use ATK attribute for comparison, but if the card getting was in Defensive stance then it will use its DEF attribute instead.
  - The lost card will be destroyed and removed from the board.
  - If the result is a tie then if the target card's stance is Offensive then both cards get destroyed, otherwise no effect.
- Fusion
  - When two cards are set to be fused, then based on the fusion rule a new card will be generated if they're compatible
  - Both fusing cards are consumed for the fusion
  - If the fusion failed (they're not compatible), the first card will be discarded

# transform imported data

see [transformer](raw-data/README.MD)

# runbooks

see [RUNBOOKS.MD](docs/RUNBOOKS.MD)

# battle flow

see [BATTLEFLOW.MD](docs/BATTLEFLOW.MD)

# backlog

- responsive css for mobile
- duel
  - use stage banner for guide
  - card inspection
  - can skip deployment
  - can skip animation
- player progression
  - duel reward
  - how to trigger duel
  - quests?
- deck
  - easier card moving

# completed

- ✅ add lobby page
- ✅ display card types
- ✅ sort deck
- ✅ book virtual scrolling
- ✅ book filter
- ✅ tranform raw data
- ✅ their hand is hiddden
- ✅ duel end transition
- ✅ add COM actions indicator (select offensive card)
- ✅ show card name
- ✅ end game on life reach 0
- ✅ take no damage on defensive
- ✅ improved ai attacks
- ✅ improved ai cards deployments
- ✅ add COM actions indicator (select target)
- ✅ direct damage when opponent board is empty
- ✅ add tests pages
- ✅ handle failed fusion
- ✅ add quit button
- ✅ duel start with cards in deck
- ✅ deck management
- ✅ COM basic turn
- ✅ complete turn
- ✅ display life
- ✅ stage banner
- ✅ stance indicator
- ✅ board

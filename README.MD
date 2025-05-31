# summary

This is an immitation of the classic game Yugioh Forbidden Memories using the cards from Palworld.

That was our starting point, nowaday generating new cards are not that difficult.

# game flow

- user starts with some beasts and some resources in inventory
- user create a building
- user assign beasts to building
- building generate resources
- user use resources to breed more beasts
- user breed an ultimate beast

# breeding rule

- each beast's specie has a Breeding Power stat
- when breeding 2 beasts, the offspring will have the median of Breeding Power
- the resulting value will resolve into a new beast

# transform imported data

see [transformer](raw-data/README.MD)

# runbooks

see [RUNBOOKS.MD](docs/RUNBOOKS.MD)

# backlog

- breeding
    - [ ] breeding: introduce fatigue, can't breed non-stop
    - [ ] breeding: traits inheritance
- production
    - [ ] production: can pause building
    - [ ] production: assigned beasts when working at a building will gain exp
    - [x] a building with assigned beasts will generate resources
- building
    - [ ] building: can create
    - [x] can assign beasts to a building
    - [ ] building: demolish a building will return the beasts
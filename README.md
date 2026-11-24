[![make.fun](https://make.fun/badge/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a.svg)](https://make.fun/bounty/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a)
[![Rank](https://make.fun/badge/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a/dunoil/makefun-ridiculous-real/rank.svg)](https://make.fun/bounty/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a)
[![Reward](https://make.fun/badge/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a/dunoil/makefun-ridiculous-real/reward.svg)](https://make.fun/bounty/u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a)

# Ridiculous at First Glance, Real by the Second

A make.fun entry pitching a bizarre startup idea that sounds absurd until you realise it would actually sell. The program writes one sentence to `/output/entry.txt`: an office goldfish takes over the morning standup, and the sprint ships faster than ever. The joke is the premise, and the business logic is the result, a team ritual that works because it is short, regular, and impossible to derail.

> "The office goldfish runs the morning standup now, and honestly, the sprint has never shipped faster."

Character count: 100 (gate: 1 to 200 characters, single line, not only whitespace).

## Run

Requires Node 22 or later, which runs the TypeScript file directly.

```sh
node main.ts
```

This writes the entry to `/output/entry.txt`. To write somewhere else, set `OUTPUT_PATH`:

```sh
OUTPUT_PATH=/tmp/ridiculous-real-entry.txt node main.ts
```

The program validates the entry first, writes it, reads it back, and verifies the file matches byte for byte before printing the entry, its character count, its byte count, the path, and a verified message.

# call-me-bob 🤖 03

**To-Do List #03** — Bob has a to-do list. You have Python. Let's make a deal.

A cozy, game-like site to practice Python in the browser. Help Bob sort his
seed packets, decode the owl post, paint the fence and whisper to scarecrows —
one chore at a time. No timers, no pressure: pick a chore, read Bob's note,
write your function and hit **Grade me!**. Bob's little robot helper checks
your code right in your browser and shows a full test trace.

**🌐 Live site:** https://italoalmeida0.github.io/call-me-bob-03/

**🧭 Bob's other to-do lists:** ➡️ [call-me-bob 04](https://github.com/italoalmeida0/call-me-bob-04)

## The chores

Every chore card shows **topic chips** — the classic computer-science
concepts behind the puzzle, so you know exactly what to study before (or
after) solving it.

| Day | Chore | What Bob needs | Topics to study |
|-----|-------|----------------|-----------------|
| 1 | The Seed Packet Sort | Sort labels by length, then case-insensitive alphabetically, then by vowel count — **without** `sorted()` or `.sort()` | Custom Sort, Sorting Algorithms |
| 1 | The Nesting Gift Boxes | Validate nested `()`, `[]` and `{}` brackets | Valid Parentheses, Stack |
| 2 | The Pantry Echo | Palindrome check ignoring spaces and letter case | Palindrome, Two Pointers |
| 2 | Mirror, Mirror, on the Shelf | Reverse every row of a 2D list without mutating the original | Array Reversal, List Comprehension |
| 3 | Two Shopping Notes | Characters present in both strings, no repeats, in first-string order | String Intersection, Sets |
| 3 | The Hidden Word in the Fence | Check if a word is a subsequence of another string | Subsequence Check, Two Pointers |
| 3 | The Owl Post Code | Convert a number between bases 2–36, with validation | Base Conversion, Math |
| 3 | Staircase Digits | Count adjacent digit pairs where the second is the first + 1 | String Scanning, Counting |
| 4 | Grandma's Letter Stew | Anagram check ignoring case and spaces | Anagram, Frequency Counting |
| 4 | Merging the Harvest Rows | Merge two sorted lists into one sorted list — **without** `sorted()`, `.sort()` or `heapq.merge()` | Merge Sorted Arrays, Two Pointers |
| 4 | The Scrabble Rack Swap | Check if one string is a permutation of the other | Permutation Check, Frequency Counting |
| 5 | Zigzag Fence Painting | Alternate letter case; spaces restart the rhythm | String Manipulation, Case Handling |
| 5 | The Weather Vane Spin | Rotate a list right by k positions (k may exceed the length) — **without** `deque.rotate()` | Array Rotation, Modulo Arithmetic |
| 6 | Whispers for the Scarecrow | Caesar cipher with wrap-around and negative shifts | Caesar Cipher, ASCII Math |

## How it works

- 📝 **14 chores** across 6 days of Bob's week, each with a story-driven subject
- 🐍 **Python editor** powered by CodeMirror 6 (syntax highlighting, indent guides,
  4-space indent matching [Black](https://github.com/psf/black))
- 🤖 **In-browser grading** — tests run locally via [Pyodide](https://pyodide.org)
  (WebAssembly CPython), nothing ever leaves your machine
- 🔍 **Full test trace** — every test case shows `[OK]`/`[KO]` up front, then the
  call, the expected value and your result on aligned lines with horizontal
  scroll — just like a terminal grader
- ▶️ **Run button** — run your script anytime and see `print()` output in the
  robot log, with a 15s infinite-loop guard
- 🚫 **Enforced rules** — chores that ban a function (`sorted()` in The Seed
  Packet Sort, `heapq.merge()` in Merging the Harvest Rows, `deque.rotate()`
  in The Weather Vane Spin) check your code statically AND at runtime, no
  sneaky workarounds
- ⭐ **Progress tracking** — solved chores and your code are saved in
  `localStorage`
- 📱 **Responsive** — works on desktop and mobile

## Tech stack

- [Bun](https://bun.sh) — dev server & bundler
- [SolidJS](https://www.solidjs.com) — UI
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [CodeMirror 6](https://codemirror.net) — editor
- [Pyodide](https://pyodide.org) — Python runtime for grading

## Development

```bash
bun install
bun run dev      # http://localhost:5700
```

## Build & deploy

```bash
bun run build    # outputs the static site to ./dist
bun run start    # preview the build on http://localhost:5950
```

The `dist/` folder is fully static — deploy it to GitHub Pages, Netlify,
Cloudflare Pages or any static host as-is. This repo deploys automatically
to GitHub Pages on every push to `main` via GitHub Actions.

## License

[MIT](./LICENSE) © Italo Almeida

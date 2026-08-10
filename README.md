# DESIGN ZARIYA — Ideation Document

A self-contained, animated 35-slide HTML presentation.
**Client:** Ambuja Neotia · **Agency:** Anonymous Digital (Go Bananas)

> Life is the story. Design is the zariya.

---

## Run it

Open `index.html` in any modern browser. No build step, no server, no dependencies.

A local server is only needed if your browser blocks `file://` font loading:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## Present it

| Input | Action |
|---|---|
| `←` `→` `↑` `↓` `PageUp` `PageDn` `Space` | previous / next slide |
| `Home` / `End` | first / last slide |
| Click left third / right third | previous / next (the middle is a dead zone, so a stray click never jumps the deck) |
| Swipe left / right | previous / next on touch devices |
| `N` | presenter notes — the design rationale for the slide on screen, never visible to the client |
| `F` | fullscreen |
| `#12` in the URL | deep-link straight to a slide |

## Export a PDF

Open `index.html?print` — every slide lays out sequentially at 1600 × 900 with all animation resolved — then print to PDF. Set paper to **Landscape**, margins to **None**, and enable **Background graphics**. Verified output: 35 pages, one slide per page.

---

## Structure

| Slides | Movement | Accent | Motion |
|---|---|---|---|
| 1–7 | The Foundation | rotating pastels | clean cut/fade, slight upward drift |
| 8–16 | Chapter One — **Nesties** | powder blue → dusty blush | intimate, handheld; slows into the loss at 13, warms and settles by 16 |
| 17–26 | Chapter Two — **Stories** | pale lavender, used sparingly | exploratory horizontal push; Ken Burns drift on imagery |
| 27–35 | Chapter Three — **Elements** | one accent per episode world | crisp editorial-journal cuts, sensory micro-motion |

Slides 8, 17 and 27 are hard chapter cuts — a full-bleed wash through the chapter's pastel, at a longer duration than any transition inside a chapter.

## Files

```
index.html             35 slides, all copy, every image slot
styles.css             design system, layouts, motion language, print stylesheet
script.js              navigation, choreography, presenter notes, print mode
fonts.css + fonts/     Manrope + Caveat, self-hosted so the deck also works offline
placeholder.svg        transparent stand-in inside every unfilled image slot
higgsfield-prompts.md  all 24 image prompts, locked character/environment strings, batch order
```

## Design system

Warm off-white ground (`#F6F1EA`), charcoal ink, five pastels used **one at a time**. Manrope 400/600/700/800 throughout — no serifs anywhere. Caveat SemiBold appears exactly three times in the deck, only ever on the word *Nesties*.

The client's existing terracotta wordmark treatment is quoted, not competed with: the rust tone (`#BC6A45`) appears **only** as the progress spine, as a thin rule on the three chapter dividers, and once at the close. Nowhere else.

## Imagery

Every image is an empty, correctly-cropped slot carrying its own `data-higgsfield-prompt`. Generate in Higgsfield from `higgsfield-prompts.md`, then swap `placeholder.svg` for the real file — the deck detects it and steps the placeholder aside. No layout work required.

Start with the window motif (`DZ-12-A` → `DZ-13-A` → `DZ-16-A`): the same frame at three emotional temperatures is what makes Chapter One land.

## Accessibility

`prefers-reduced-motion` is honoured — all parallax, drift, sway and slide transforms drop to plain crossfades, with every element fully legible.

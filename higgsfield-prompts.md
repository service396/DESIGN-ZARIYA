# DESIGN ZARIYA — Higgsfield Image Appendix

**Deck:** `index.html` — 35 slides, 16:9
**Client:** Ambuja Neotia · **Agency:** Anonymous Digital
**Purpose:** batch-generate every image in Higgsfield, then drop the files straight into the deck. No layout retouching required — every slot is already cropped and positioned.

**24 image slots across 12 slides.**

---

## 1. How to wire images back into the deck

Every slot in `index.html` looks like this:

```html
<div class="hs-image" data-slot="DZ-12-A" data-slide="12" data-aspect="16:9"
     data-higgsfield-prompt="…full prompt…">
  <img src="placeholder.svg" data-placeholder="1" alt="[HIGGSFIELD PLACEHOLDER — see data-higgsfield-prompt]" loading="lazy">
</div>
```

To fill it, replace the whole `<img>` line — point `src` at your generated file and **drop the `data-placeholder` attribute**:

```html
<img src="images/DZ-12-A.jpg" alt="Sulagna at the window" loading="lazy">
```

That attribute is the "still empty" marker. Once it is gone, the runtime hides the pastel placeholder block and its label automatically and lets the photograph run full-bleed inside the crop. Nothing else needs changing.

Suggested naming: `images/DZ-<slide>-<letter>.jpg` — it matches the `data-slot` value exactly.

Find every slot at once:

```bash
grep -o 'data-slot="[^"]*"' index.html
```

---

## 2. Locked assets — reuse these strings verbatim

Higgsfield consistency depends on the character and environment descriptions never drifting. Every prompt below already embeds them. If you generate variants or extra frames, paste these in unchanged.

### CHARACTER — SULAGNA

> SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair tied back, minimal makeup, quiet composed expression, simple muted cotton kurta, slight build, careful posture

Grade: **powder blue** (`#C9DCE8`). She keeps this tone from slide 11 to slide 16.

### CHARACTER — APARNA "APPS"

> APARNA 'APPS': Indian woman, 26, warm-brown skin, round expressive face, shoulder-length wavy dark hair loose and messy, small nose stud, animated expression, bold thrifted layers and an oversized shirt, relaxed sprawling posture

Grade: **dusty blush** (`#E8C9C5`), occasionally warmed with soft butter (`#F2DFAC`).

### ENVIRONMENT — THE APARTMENT

> Recurring environment: high-floor Ambuja Neotia apartment, warm off-white walls, one large floor-to-ceiling window facing open sky and distant city, minimal furniture, natural daylight

### THE WINDOW MOTIF — four stages, one composition

The same window, the same framing, four different emotional temperatures. This is the spine of Chapter One and the single most important continuity in the deck. Generate all four in one session, from the same seed / reference frame.

| Stage | Slot | Slide | Beat | What changes |
|---|---|---|---|---|
| 1 of 4 | `DZ-10-A` | 10 | First meeting | Bright, neutral light. Two energies in one frame. |
| 2 of 4 | `DZ-12-A` | 12 | The dream | Generous luminous sky, warm light, almost empty room reads as arrival. |
| 3 of 4 | `DZ-13-A` | 13 | Isolation | Identical window, overcast flat light, sky drained, more empty floor, the room reads as too large. |
| 4 of 4 | `DZ-16-A` | 16 | Belonging | Identical composition to stage 2, completed — warm sky again, both women present, the room finally inhabited. |

Slides 12 and 16 must be framed **identically**. The deck's emotional payoff is that the audience recognises the frame.

### Global negatives — append to every generation

> no text, no logos, no captions, no watermark, no AI-smooth plastic skin, no commercial posing, no Bollywood melodrama, no stock-photo smiling at camera, no glossy real-estate photography, no drone shots, no postcard framing, no recognisable landmarks, no invented signage or place names

### Location constraint (Chapter Two)

No real Kolkata location is named anywhere in this deck, and no fictional one is invented. All STORIES prompts are written as **generic representative** Indian city environments. Actual locations get chosen with the client, on recce.

---

## 3. Chapter photographic language

**NESTIES (10–16)** — contemporary Indian streaming-series stills. Natural daylight or soft evening light, real skin texture, cinematic depth, muted pastel grade, observational framing. Candid, never posed.

**STORIES (18–26)** — contemporary city documentary. Street-level perspective, environmental portraits, natural light, hands at work, doorways, windows, signage, markets. Never tourism, never nostalgia, never staged, never drone.

**ELEMENTS (29–33)** — cinematic documentary stills of Indian interiors. Natural daylight, authentic textures, human presence, close sensory detail. Never sterile, never a styled catalogue shot.

---

## 4. The full slot list

### CHAPTER ONE — NESTIES

---

#### `DZ-10-A` · Slide 10 · The Reveal · **4:5**

Cinematic two-shot inside a high-floor apartment living room at soft late-afternoon light. SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair tied back, minimal makeup, quiet composed expression, simple muted cotton kurta, careful posture — she stands near a large floor-to-ceiling window holding a cup of tea, looking out. APARNA 'APPS': Indian woman, 26, warm-brown skin, round expressive face, shoulder-length wavy dark hair loose and messy, small nose stud, animated expression, bold thrifted layers and an oversized shirt, relaxed sprawling posture — she occupies the middle of the room mid-gesture, phone and a camera bag beside her. Recurring environment: high-floor Ambuja Neotia apartment, warm off-white walls, one large window facing open sky and distant city, minimal furniture. WINDOW MOTIF STAGE 1 OF 4 — FIRST MEETING: the window is bright and neutral, neither dream nor loss; the two energies are visibly contrasted in one frame. Candid and unposed, natural daylight, real skin texture, muted pastel colour grade, cinematic depth of field, contemporary Indian streaming-series still. No text, no logos, no captions.

---

#### `DZ-11-A` · Slide 11 · Meet Sulagna · **3:4**

Environmental portrait of SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair tied back, minimal makeup, quiet composed expression, simple muted cotton kurta, slight build, careful posture. She sits at a small clean desk in a sparsely furnished apartment, laptop closed, one notebook squared to the table edge, morning daylight from the left. Observational framing, slight distance, she is not looking at camera. Powder-blue leaning colour grade, natural skin texture, cinematic depth, contemporary Indian streaming-series still. No text, no logos.

---

#### `DZ-12-A` · Slide 12 · Her Dream · **16:9** · *window motif 2/4*

Cinematic wide interior. SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair tied back, minimal makeup, quiet composed expression, simple muted cotton kurta, slight build — standing beside a large floor-to-ceiling high-rise window at soft evening light, a cup of tea in both hands, looking out at clouds and open sky above a distant city. Recurring environment: high-floor Ambuja Neotia apartment, warm off-white walls, minimal furniture, almost empty room. WINDOW MOTIF STAGE 2 OF 4 — THE DREAM: this is the motif at its most aspirational; the sky is generous and luminous, she is small in the frame but the room feels like an arrival, warm light on her face. Powder-blue colour grade, natural skin texture, observational framing, cinematic depth, contemporary Indian streaming-series still. No text, no logos.

---

#### `DZ-13-A` · Slide 13 · Three Months Later · **4:5** · *window motif 3/4*

Cinematic interior, same framing and same window as the previous dream frame. SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair loose and unbrushed, no makeup, tired withdrawn expression, plain house clothes — sitting on the floor with her back against the wall near the large floor-to-ceiling high-rise window, an untouched cup of tea beside her, laptop shut. Recurring environment: high-floor Ambuja Neotia apartment, warm off-white walls, minimal furniture. WINDOW MOTIF STAGE 3 OF 4 — ISOLATION: identical window, identical room, but overcast flat daylight, the sky drained and pale, more empty floor in frame, the space now reads as too large rather than full of promise. Cool desaturated pastel grade, natural skin texture, observational framing from a slight distance, cinematic depth, contemporary Indian streaming-series still. No text, no logos.

---

#### `DZ-14-A` · Slide 14 · Enter APPS · **3:4**

Environmental portrait of APARNA 'APPS': Indian woman, 26, warm-brown skin, round expressive face, shoulder-length wavy dark hair loose and messy, small nose stud, animated laughing expression, bold thrifted layers and an oversized shirt, relaxed sprawling posture. She has just walked into an apartment doorway with a duffel bag over one shoulder and a ring light under her arm, mid-sentence, shoes half off. Warm afternoon daylight, dusty-blush and soft-butter colour grade, natural skin texture, candid handheld framing, cinematic depth, contemporary Indian streaming-series still. No text, no logos.

---

#### `DZ-15-A` · Slide 15 · Two Worlds — Sulagna's side · **1:1**

Detail still, no faces. Sulagna's half of a shared apartment: a made bed with corners squared, one folded throw, a single row of books by height, an alarm clock, a labelled key hook, a mug on a coaster. Warm off-white walls, cool morning daylight, powder-blue colour grade, quiet minimal composition, natural textures, cinematic documentary still. No text, no logos.

---

#### `DZ-15-B` · Slide 15 · Two Worlds — Apps' side · **1:1**

Detail still, no faces. Apps' half of the same shared apartment: an unmade bed, clothes over a chair back, three half-finished coffee cups, a ring light and a tripod leaning in a corner, jewellery and cables tangled on a side table, a plant she forgot to water. Warm off-white walls, warm afternoon daylight, dusty-blush colour grade, lively cluttered composition, natural textures, cinematic documentary still. No text, no logos.

> Generate `DZ-15-A` and `DZ-15-B` as a matched pair — same room, same lens, same height. The only variables are order/chaos and the colour grade.

---

#### `DZ-16-A` · Slide 16 · The Story of Nesties · **16:9** · *window motif 4/4*

Cinematic wide interior, the exact same framing as the earlier dream frame. SULAGNA: Indian woman, 27, medium-brown skin, oval face, long straight dark hair tied back, calm open expression, simple muted cotton kurta — and APARNA 'APPS': Indian woman, 26, warm-brown skin, round expressive face, shoulder-length wavy messy dark hair, small nose stud, animated expression, bold thrifted layers — both beside the large floor-to-ceiling high-rise window at golden evening light, two cups of tea, one sitting on the floor and one leaning on the glass, mid-conversation, easy body language. Recurring environment: high-floor Ambuja Neotia apartment, now lived-in — cushions, a plant, photographs, a drying rack, small evidence of two lives. WINDOW MOTIF STAGE 4 OF 4 — BELONGING: identical composition to the dream frame, completed; the sky is warm again, the room is full but not cluttered, the space finally feels inhabited. Warm pastel colour grade balancing powder blue and dusty blush, natural skin texture, observational framing, cinematic depth, contemporary Indian streaming-series still. No text, no logos.

---

### CHAPTER TWO — STORIES

---

#### `DZ-18-A` · Slide 18 · The Thought · **3:4**

Contemporary city documentary photograph, street-level perspective, early morning. A dense Indian city street layered in depth: shuttered shopfronts, hand-painted signage, overhead cables, a cycle rickshaw, two people walking past in ordinary clothes, a tea stall just opening. Natural light, no drone, no postcard framing, no landmark, real textures of paint and rust and stone, muted natural colour, 35mm documentary still. No text overlays, no logos.

---

#### `DZ-21-A` · Slide 21 · People Make Places Matter · **3:4**

Environmental portrait, contemporary city documentary. An older Indian shopkeeper standing in the doorway of a small long-running neighbourhood shop, hands at his sides, looking directly at camera without smiling, shelves and stock visible behind him in soft focus. Natural window light, real skin texture, worn painted doorframe, muted natural colour, 35mm documentary still, generic representative location — not a recognisable landmark. No text, no logos.

---

#### `DZ-23-A` · Slide 23 · Story territories — the doorway · **4:5**

Contemporary city documentary photograph. A narrow doorway in an old building leading into a dim interior, one shaft of daylight falling across a worn threshold, a hand-painted number on the frame. Generic representative Indian city location, no recognisable landmark, no invented signage or place names. Natural light, real textures, muted natural colour, 35mm documentary still. No text overlays, no logos.

---

#### `DZ-23-B` · Slide 23 · Story territories — the workshop · **4:5**

Contemporary city documentary photograph. Interior of a small craft workshop, one artisan's hands working at a bench, tools and raw material arranged around them, dust in a shaft of daylight, face out of frame. Generic representative Indian workshop, no recognisable brand or place name. Natural light, real textures, muted natural colour, 35mm documentary still. No text overlays, no logos.

---

#### `DZ-24-A` · Slide 24 · Camera POV — hands at work · **1:1**

Documentary detail still. Close-up of a pair of working hands mid-task — measuring, folding or shaping material — natural window light, skin texture and material texture in sharp detail, background falling away. Generic representative Indian setting. Muted natural colour, 35mm documentary still. No text, no logos.

---

#### `DZ-24-B` · Slide 24 · Camera POV — old surface meets new · **1:1**

Documentary detail still. A wall where an old painted surface meets a newly finished one, layers of paint, a shadow crossing diagonally, no people. Generic representative Indian city location. Natural light, muted natural colour, 35mm documentary still. No text overlays, no invented signage, no logos.

---

#### `DZ-24-C` · Slide 24 · Camera POV — morning market prep · **1:1**

Documentary still. Early-morning market preparation — crates being stacked, produce being arranged, one vendor bending into frame, steam from a nearby stall. Generic representative Indian market, street-level perspective, no recognisable landmark. Natural light, muted natural colour, 35mm documentary still. No text, no logos.

---

#### `DZ-24-D` · Slide 24 · Camera POV — the window · **1:1**

Documentary still. A window seen from inside a room, worn frame, light falling onto the floor, a curtain moving slightly, the city softly out of focus beyond. Generic representative Indian interior. Natural light, muted natural colour, 35mm documentary still. No text, no logos.

> `DZ-24-A` through `DZ-24-D` sit in a 2×2 grid at equal size. Generate them as one set so the light and grade match across all four.

---

#### `DZ-26-A` · Slide 26 · Stories Close · **16:9**

Contemporary city documentary photograph, wide and layered. A dense Indian city seen from street level at dusk — many lit windows, rooftops, cables, a crowded lane receding into depth, dozens of anonymous lives implied but no single subject. Natural available light, no drone, no landmark, no postcard framing, muted natural colour with warm window light, 35mm documentary still. No text overlays, no logos.

> This one runs full-bleed behind white type. Keep the lower-left quadrant visually quiet so the copy stays legible.

---

### CHAPTER THREE — ELEMENTS

---

#### `DZ-29-A` · Slide 29 · Elements — property reveal · **3:4**

Cinematic documentary still of a contemporary Indian interior. A corner of a warm, lived-in room in late-morning daylight: a painted wall, one plant, a woven textile, a chair slightly turned, a person's shoulder just entering frame. Natural daylight, authentic textures, sage-leaning natural colour, close sensory detail with soft depth. Never glossy real-estate photography, never sterile or staged. No text, no logos.

---

#### `DZ-31-A` · Slide 31 · The Format — the expert · **16:9**

Cinematic documentary still. An expert at work in a real interior — a specialist gesturing towards a wall or a plant while explaining something, mid-sentence, seen slightly from the side, not addressing camera. Contemporary Indian interior, natural daylight, authentic textures, soft-butter natural colour grade, human presence, editorial documentary framing. Never glossy real-estate photography, never a posed corporate headshot. No text, no logos.

---

#### `DZ-32-A` · Slide 32 · 01 Colour · **4:5**

Cinematic documentary still. A contemporary Indian interior defined by a single strong colour — a deep azure wall with daylight raking across it, a person's hand resting on the surface, textiles and one piece of furniture picking up the same tone. Natural daylight, authentic paint and fabric texture, sensory close detail, human presence. Never glossy real-estate photography. No text, no logos.

> The deck applies a slow multiply colour-wash pulse over this slot. Generate it slightly flatter and lighter than you would otherwise — the animation supplies the saturation.

---

#### `DZ-32-B` · Slide 32 · 02 The Sounds of Serenity · **4:5**

Cinematic documentary still. A quiet contemporary Indian interior at soft light — an instrument resting against a wall, a record or speaker in the corner, a window open to distant unheard city sound, no one speaking, one person seated listening with eyes closed. Natural daylight, authentic textures, calm lavender-neutral grade, sensory framing. Never glossy real-estate photography. No text, no logos.

---

#### `DZ-32-C` · Slide 32 · 03 Breathing Spaces · **4:5**

Cinematic documentary still. Indoor plants in a contemporary Indian home — a cluster of pots near a window in bright indirect daylight, leaves catching the light, hands watering or turning a pot, soil and terracotta texture visible. Sage natural colour grade, authentic textures, human presence, sensory close detail. Never glossy real-estate photography, never a styled catalogue shot. No text, no logos.

> The deck applies a barely-perceptible sway to this slot. Leave a little headroom around the leaves so the motion never clips the crop.

---

#### `DZ-33-A` · Slide 33 · 04 Energy Flow · **16:9**

Cinematic documentary still. A contemporary Indian interior photographed to show movement and flow — an open doorway aligned with a window, light travelling across the floor, a person walking through the frame with slight motion blur, furniture placed to leave a clear path. Natural daylight, authentic textures, warm neutral grade. Never glossy real-estate photography. No text, no logos.

---

#### `DZ-33-B` · Slide 33 · 05 Less is More · **16:9**

Cinematic documentary still. A shelf or cupboard in a contemporary Indian home mid-way through being organised — some objects removed and set aside, empty space appearing, hands placing one object back deliberately. Natural daylight, authentic textures, calm butter-neutral grade, sensory detail, human presence. Never glossy real-estate photography, never a sterile before-and-after. No text, no logos.

> The deck scales this frame down and settles it on entry — the motion should read like a room exhaling. Avoid subjects right at the frame edge.

---

## 5. Batch order

1. **The window motif first** — `DZ-12-A`, then `DZ-13-A` and `DZ-16-A` from the same reference. If the framing doesn't match across these three, Chapter One loses its payoff. Everything else can be re-run cheaply; this set cannot.
2. **Characters** — `DZ-10-A`, `DZ-11-A`, `DZ-14-A`, then the `DZ-15` pair. Lock Sulagna and Apps as reference elements before generating anything else with them in it.
3. **Stories set** — `DZ-18-A`, `DZ-21-A`, the `DZ-23` pair, the `DZ-24` quartet, `DZ-26-A`. One session, one grade.
4. **Elements set** — `DZ-29-A`, `DZ-31-A`, the `DZ-32` trio, the `DZ-33` pair. One session, one grade.

## 6. Slides with no imagery, by design

1–9, 17, 19, 20, 22, 25, 27, 28, 30, 34, 35 are typographic. That restraint is the system, not an omission — the deck alternates image-led and type-led slides so neither ever becomes wallpaper. Please don't fill them.

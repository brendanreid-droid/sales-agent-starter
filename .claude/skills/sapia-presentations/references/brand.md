# Sapia.ai brand quick-reference (for slides)

## Product skin (default)

External working decks use the Talent Hub product skin. This bundled reference and `scripts/sapia_deck.js` are the portable runtime authority. The original product contract came from Flora, with ta-benchmark token precedent. Print guidance still governs voice and naming only.

Helper: `scripts/sapia_deck.js`.

### Palette (product)

| Token | Hex | Use |
|---|---|---|
| Canvas | `#F5F6F8` | All slide backgrounds |
| Card | `#FFFFFF` | Panels, metric band inner, chrome |
| Hairline | `#EAECF0` | Borders, rules (no shape shadows) |
| Ink | `#101828` | Primary text |
| Muted | `#667085` | Secondary text, chrome |
| Navy | `#245069` | Primary working colour, bars, coachlines, closing page |
| Pink | `#FFCEFF` | Count pills and ticks only |
| Pink panel | `#F8EAFA` | Cover metric band and optional `imageFrame` backplate |
| Track | `#E5E7EC` | Bar tracks |
| Green / tint | `#067647` / `#E6F1EC` | Status holding |
| Amber / tint | `#B54708` / `#F7ECE6` | Status worth a look |
| Red / tint | `#B42318` / `#F7E9E7` | Status at risk |

Viz rotation (navy-led): navy, `#9ACEDC`, `#8D58F9`, pink. No hot pink. No invented colours.

### Type (product)

| Role | Face | Weight | Notes |
|---|---|---|---|
| Headings / titles | Manrope | Semibold | Sentence case |
| Body | Manrope | Regular | AU English |
| Eyebrows, chrome, data, table headers, count digits | Geist Mono | Regular / Bold | Uppercase eyebrows with tracking |

### Anatomy (product)

- Chrome on every page: white strip, black wordmark left, mono context right, hairline under
- Full-width content (no left rail): chapter eyebrow, then title, then content
- Cover: title + lede + full-width metric band on pink tint panel
- Closing: navy, white alpha wordmark; prefer decision-style (eyebrow + next decision + detail + tagline)
- Coachline: navy rule + takeaway sentence
- Status: tinted pills, product grammar
- Product visuals: white hairline `imageFrame`, aspect-preserving contain for complete viewports, centred cover for safe removal of incomplete edge content, with an optional pink tint backplate
- Content evidence: `metricStrip` for two to four decision measures

### Logos (product)

- Black wordmark: `assets/logo_black.png`
- White wordmark on navy: `assets/logo_white_alpha.png` (real transparency)
- Do not use `logo_white.png` on navy/black (baked black box)
- Aspect ratio `665/270`

### Official sales library composition reference

The optional native source is `Sapia.ai Sales Library (April 2026).pptx`. Use it as composition evidence only if you have an authorised local copy. It is not bundled or required. The landed product helper remains the visual and QA authority for net-new decks.

| Pattern | Source slides | Rebuild with |
|---|---:|---|
| Screenshot-led proof | 18, 43, 57, 169 | `imageFrame` plus one explanatory claim |
| Compact evidence band | 43, 44, 94 | `metricStrip` |
| Pathway row | 22, 110, 151, 153 | `panel`, `countPill`, `T`, `MT` |
| Operating comparison | 117, 154 | two equal `panel` regions, `statusPill`, `tick` |
| Proof grid | 12, 90, 113 | `card`, `tick`, supplied icons |

The source deck contains legacy fonts, punctuation, naming and campaign treatments. Do not import its masters into a net-new product deck. Use current supplied or approved screenshots, never an old library capture by default.

---

## Classic print-guide skin (opt-in)

Helper: `scripts/sapia_deck_classic.js`.

Use for campaign or keynote moments only. Condensed from the official **Sapia.ai Brand Guidelines** PDF. That PDF wins over this file for classic visuals. Older Downloads markdown invents hot pink and bans black backgrounds; ignore those visual rules.

### Palette (classic)

#### Primary (guide 2.5)

| Name | Hex | Use |
|---|---|---|
| Pink | `#FFCEFF` | Covers, dividers, callout cards, pills, milestone dots, bar fills |
| Black | `#000000` | Text, hairlines, closing pages |
| White | `#FFFFFF` | Content pages, text on black |

#### Secondary (guide 2.6)

| Name | Hex |
|---|---|
| Blue | `#245069` |
| Light blue | `#9ACEDC` |
| Purple | `#37147F` |
| Light purple | `#8D58F9` |
| Grey | `#E1E1E1` |
| Light grey | `#F1F1F1` |

Classic viz rotation: pink, purple, light blue, blue on grey tracks.

### Type (classic)

Manrope only. Headings **Regular weight, sentence case, never bold, never uppercase**. Bold only for tiny sub-heads and short emphasis. Cover title ~54, divider ~44, page title ~18, body ~10.5.

### Anatomy (classic)

- Covers/dividers: full-bleed pink
- Content: white, hairline header band, left rail, content area
- Closing: black, white wordmark, tagline
- Classic white logo file may be used on black; product navy close must use alpha asset

---

## Naming and voice (both skins)

- Written name is always **Sapia.ai**, never the bare company name (logo image exempt; email exempt)
- Australian English
- Sentence case headlines
- No em dashes or en dashes (including slide master XML)
- No exclamation marks in headlines
- No hype words
- Taglines: "The hires that stay." and "Hire brilliant."
- Fictional content only in samples

---
name: sapia-presentations
description: >-
  Build on-brand Sapia.ai presentations and slide decks. Use this skill whenever you are
  creating, rebuilding, or restyling ANY external Sapia.ai deck, slides, or .pptx, even if the
  user does not say "on-brand": pitch decks, QBRs, renewal decks, kickoff decks, change
  management decks, status reports, customer one-pagers, sales or product slides. Also
  trigger on "make this a Sapia.ai deck", "put this on brand", "Sapia.ai slides", "the deck lost
  the branding", or any request to produce slides that a Sapia.ai customer or prospect will
  see. Default look is the Talent Hub product skin (Flora / ta-benchmark). Do not hand-pick
  colours, fonts, or layouts: build with the bundled helper so decks come out correct by default.
---

# Sapia.ai presentations

Default external decks use the **Talent Hub product skin**: light grey canvas, white hairline cards, Manrope semibold sentence-case headings, Geist Mono for data and chrome, navy as the working colour, pale pink only as a dose (count pills and ticks). The deck should feel like an executive decision memo from the same company customers already log into, not a campaign poster.

Authority split:

- **Print brand guide** still governs voice, naming (`Sapia.ai` only, never the bare company name), Australian English, no em/en dashes, no exclamation marks, no hype words, no invented illustration-kit fakes.
- **Product look** is fully captured in the bundled `references/brand.md` and `scripts/sapia_deck.js`. The original design provenance is Flora and ta-benchmark, but those repositories are not required at runtime.

Classic print-guide skin (full-bleed pink covers, Regular headings, black close, Manrope only) remains available as `scripts/sapia_deck_classic.js` for campaign or keynote moments. It is opt-in, not the default.

## The one rule

Do not place raw colours, fonts, or coordinates yourself. Build every slide with `scripts/sapia_deck.js`. Reach for `references/brand.md` for tokens and classic tables.

## Which skin

| Skin | Helper | When |
|---|---|---|
| **Product (default)** | `scripts/sapia_deck.js` | QBRs, renewals, kickoffs, status, change management, customer working decks |
| **Classic (opt-in)** | `scripts/sapia_deck_classic.js` | Campaign, conference keynote open, rare brand moments |

Do not mix full-bleed pink classic covers with product content pages in one deck.

## Design system (product default)

**Typography.** Manrope for prose and headings. Headings are **semibold (bold in pptxgenjs), sentence case**. Geist Mono for chapter eyebrows, header-band context, metric values, page chrome, table headers, count-pill digits. Scale guidance: cover title ~34, page title ~22, body 12 to 15, chrome 8.5, mono labels 8 to 9.

**Colour.** Canvas `#F5F6F8`, card white, hairline `#EAECF0`, ink `#101828`, muted `#667085`, navy `#245069`, pink `#FFCEFF` (pills/ticks only), track `#E5E7EC`, pink tint panel `#F8EAFA`. Status tints: green `#067647`, amber `#B54708`, red `#B42318` on ~10% tints. Viz rotation navy-led: navy, `#9ACEDC`, `#8D58F9`, pink. No hot pink. No invented colours. No shape shadows.

**Page anatomy.** Every page wears product chrome: white strip, black wordmark left, mono context right, hairline under. Content pages are full-width (no left rail): chapter eyebrow (hairline + mono uppercase), then semibold title, then content. Cover signature: title + lede, then a full-width metric band on a pale pink tint panel. Closing is **navy** with white alpha wordmark; prefer decision-style close (eyebrow + next decision + detail + tagline).

**Composition intent.** Prefer executive decision memo over component demo. Dense enough for external review. Side-by-side operating realities beat stacked spare pages. Action sequences as equal cards with owners/dates. Coachline lands the point.

## Optional official sales library reference

The optional native source is `Sapia.ai Sales Library (April 2026).pptx`. It is composition evidence, not the default template, token authority or copy authority. It contains useful sales patterns alongside legacy naming, punctuation, font and palette debt. The file is not bundled and is not required.

- Net-new external decks still use `scripts/sapia_deck.js` and the landed product tokens.
- If the user explicitly supplies an official sales deck for exact editing, preserve that deck natively for the requested edit. Do not blend its masters into a net-new product-skin deck unless the user asks for a reskin.
- Product screenshots must be current and supplied or approved. Treat captures inside the April 2026 library as historical. Never silently recycle an old capture.
- Use the library to learn composition, then rebuild with the helper. Do not copy source masters, unicode checks, icon fonts, campaign colours or non-compliant copy into a new deck.

Approved composition evidence from the April 2026 source:

| Pattern | Source slides | Product-skin treatment |
|---|---:|---|
| Screenshot-led proof | 18, 43, 57, 169 | `imageFrame` with supplied or approved product media |
| Compact evidence band | 43, 44, 94 | `metricStrip` with two to four measures |
| Pathway row | 22, 110, 151, 153 | Equal stage cards with owner, timing or status |
| Operating comparison | 117, 154 | Two equal panels under one governance frame |
| Proof grid | 12, 90, 113 | Two by two or two by three cards with real ticks or supplied icons |

Keep these source treatments source-only: full-bleed numbered pink covers, black showcase pages, the broad campaign palette, large decorative roadmaps, orbital diagrams, legacy icon fonts, emoji and unicode checks.

## Build workflow

1. Complete `references/install-and-verify.md`. Install real Manrope and Geist Mono in the render environment. Without them LibreOffice substitutes and the deck lies.
2. **Copy** (do not symlink) the helper into the work dir so Node resolution works:
   - Work dir layout that matches helper paths: `scripts/sapia_deck.js`, `assets/` as sibling of `scripts/` (helper loads `../assets/...` via `__dirname`), `build.js` at work dir root requiring `./scripts/sapia_deck.js`.
   - `npm install pptxgenjs` in the **work dir**. Never symlink `sapia_deck.js` from the skill tree into a project that only has `node_modules` at the project root: Node resolves `require("pptxgenjs")` from the helper file's directory, so a skill-tree symlink fails with `Cannot find module 'pptxgenjs'`.
3. Write the build script with helper functions only.
4. **Post-process the .pptx**: run `scripts/fix_bullets.py` so slide-master en dash bullets become real bullets, unused Office theme colours are remapped to approved product tokens and unused theme shadow styles are removed. No em/en dashes in copy or XML.
5. Render and QA (below).

```js
const S = require("./scripts/sapia_deck.js");
const p = S.newDeck({ title: "sapia_deck_northshore-qbr_v1" });

S.coverSlide(p, {
  kicker: "Quarterly business review",
  title: "Northshore Care Group x Sapia.ai.",
  lede: "Volume held. The next gain is shortlist speed on one site group.",
  right: "Friday 17 July 2026",
  metrics: [
    { label: "Interviews", value: "6,840", note: "Completed chat interviews" },
    { label: "Completion", value: "91%", note: "Above the 88% target" },
    { label: "Time to shortlist", value: "5.5 days", note: "Down from 10 days" },
  ],
});

const s = S.page(p, {
  right: "Quarterly review  ·  Northshore  ·  02",
  chapterText: "The read",
  title: "The interview is already doing the screening.",
});
S.coachline(s, {
  x: S.SAPIA.M, y: 2.05, w: S.SAPIA.contentW,
  text: "At 91% completion, managers spend time on people worth meeting.",
});

S.closingSlide(p, {
  eyebrowText: "Next conversation",
  title: "Lock the south template date before spring requisitions land.",
  detail: "Northshore Care Group  ·  Quarterly review  ·  July 2026",
  tagline: "The hires that stay.",
});

p.writeFile({ fileName: "sapia_deck_northshore-qbr_v1.pptx" });
```

## Helper functions (product)

- `newDeck({title})` 13.33 x 7.5 deck
- `coverSlide(p, {kicker, title, lede, right, metrics[{label,value,note}], foot})`
- `page(p, {right, chapterText, title})` full-width content page with chrome
- `closingSlide(p, {eyebrowText, title, detail, tagline})` decision close; or `{line, sub}` / `{tagline}` simple
- `headerBand`, `chapter`, `panel`, `logo`
- `countPill`, `statusPill({tone: green|amber|red|note})`, `tick` (locked: assets/tick_pink.png only)
- `bar`, `coachline`, `card`, `table({widths, header, rows, monoColumns})`
- `imageFrame({path, fit: contain|cover, tint, pad, altText})` for authentic supplied or approved PNG or JPEG product visuals. Source aspect ratio is preserved in both modes.
- `metricStrip({metrics[{label,value,note}], tint})` for two to four content-page measures
- `T` Manrope text, `MT` Geist Mono text
- Tokens on `SAPIA` including `viz`, `contentW`, `M`

Classic API differs (pink covers, rail, Regular titles). Read `sapia_deck_classic.js` if you deliberately opt in.

## Composition recipes

**Screenshot-led proof.** Use `imageFrame` beside one claim and only the explanation needed to read the visual. Use `fit: "contain"` when the complete product viewport matters. Use centred `cover` only when it removes incomplete edge content and preserves every control or label needed to understand the claim. At full-size review, the smallest important product label must be readable. Replace an unsuitable capture or choose a safe crop. Never redraw, extend or invent missing UI.

**Pathway row.** Build equal stage cards with `panel`, `countPill`, `T` and `MT`. Add owner, date or `statusPill` only when it helps the audience judge sequence or accountability. Size the equal cards to the longest body plus consistent internal padding. Do not stretch sparse cards to fill the slide. Keep the coachline close enough to read as the conclusion of the pathway.

**Operating comparison.** Use two equal `panel` regions with `statusPill` and `tick`. Compare global and local, current and future, or high-volume and professional hiring under one shared decision frame.

**Proof grid.** Use a two by two or two by three grid with `card`, `tick` and supplied icon assets. Each card states one inspectable capability, governance control or support commitment.

**Metric strip.** Use `metricStrip` on content pages when two to four measures answer the slide's decision question. Labels and values stay in Geist Mono. Do not use it as decoration.

## Fonts

**Manrope** and **Geist Mono** must both be installed for product renders.

Manrope: install from `@fontsource/manrope` latin subset only, convert woff2 to ttf, family name Manrope, Bold bits set on the 700 cut. On macOS check `fc-match -v 'Manrope:style=Regular'` and Bold; a bad `~/Library/Fonts/Manrope.ttf` can be ExtraLight.

Geist Mono: `GeistMono.ttf` and `GeistMono-Bold.ttf`, family "Geist Mono", bold bits on the bold cut (same pipeline as Manrope from `@fontsource/geist-mono` latin).

`pdffonts` must list **only** Manrope, Manrope-Bold, GeistMono-Regular, GeistMono-Bold. Any DejaVu or Lucida line is a fail.

Classic skin: Manrope + Manrope-Bold only.

## Guardrails

0. Written name is always **Sapia.ai**, never the bare company name (logo image exempt; email exempt).
1. Product headings are semibold sentence case. Classic headings are Regular only.
2. No hot pink. No invented colours.
3. No unapproved typefaces. Verify pdffonts every render.
4. No em dashes or en dashes anywhere, including slide master XML.
5. No redrawn squiggles or fake illustration-kit elements.
6. No gradients, text shadows, shape shadows, decorative ornaments.
7. No exclamation marks in headlines; no hype words (AI-powered, revolutionise, unlock, leverage, empower, synergy).
8. Fictional content only in samples. No real client data in sample decks.
9. Pink is a dose in product skin, not a full-bleed default.

## Voice on slides

Australian English. Sentence case headlines. Full stop when the line lands a thought. Active voice, short sentences, natural contractions. Numerals for stats. Taglines "The hires that stay." and "Hire brilliant." stay plain (white on navy in product close).

## Build and render gotchas (hard-won)

1. **No pptxgenjs shape shadows.** They crash LibreOffice PDF export ("Unspecified Application Error"). Hairlines carry the card look.
2. **Clear lock junk before convert:** `find qa -name '.~lock*' -delete`. Stale locks yield `Io Abort Code:27`.
3. **Isolated LibreOffice profile** if another soffice job ran recently: `-env:UserInstallation=file:///$HOME/.../.lo-profile`.
4. **Rezips must preserve zip entry order** (`scripts/fix_bullets.py` does). `shutil.make_archive` can upset Impress.
5. **Proof ticks are `assets/tick_pink.png` via `tick()` only.** Manrope and Geist Mono have no check glyph, which causes font substitution. Rotated-shape ticks render malformed in Impress. Text substitutes like "ok" on a pink disc were tried and rejected. Copy `assets/` with the helper so the PNG path resolves. No emoji ticks.
6. **White wordmark on navy needs alpha.** Use `assets/logo_white_alpha.png`. `logo_white.png` has a baked black background.
7. **View every page at full size.** Closing logo aspect and tick geometry hide in contact sheets. See `references/acme-pilot-review-qa-lessons.md`.
8. **Copy helper, never symlink from skill scripts**, when `pptxgenjs` lives in the work dir only (see Build workflow step 2).
9. **Parallel-agent A/B:** if the user runs two agents side by side and asks for separate versions, fork a **private sandbox** with its own helper copy, build and QA. Sharing one mutable staging helper makes two agents produce near-identical decks. Composition must diverge on purpose through narrative structure and evidence choices, not through a second skin.
10. **Do not leave backup `SKILL.md` files inside the skill tree** (e.g. `.bak-*/SKILL.md`). Hermes skill discovery treats them as duplicate skill names and `skill_view('sapia-presentations')` becomes ambiguous. Keep backups outside the skill dir.
11. **Screenshot freshness:** the April 2026 sales library is historical composition evidence. Confirm that a product capture is current or explicitly supplied before use. Never silently recycle an old library capture.
12. **Image fitting:** use `imageFrame` contain mode for complete product UI and centred cover mode only to remove incomplete edge content without losing required evidence. The helper reads PNG or JPEG source dimensions and calculates the placement itself because PptxGenJS 4.0.1 stretches media when its native contain option is given only the destination box. Run `scripts/image_frame_smoke.js` and `scripts/verify_image_frame.py` after installing or modifying the helper. Inspect the full-size render for readable product labels, complete required controls and deliberate crop boundaries.
13. **Package theme:** pptxgenjs writes unused Office colours and shadow styles into `theme1.xml`. `fix_bullets.py` remaps the colour slots and removes the unused shadow effects while preserving zip entry order. Run it before every render.
14. **Pathway density:** equal cards still follow their content. Use the longest stage body to set one shared height, then move the coachline with the row. Large empty lower halves inside cards are a composition defect, not premium whitespace.

```bash
node build.js
python3 path/to/fix_bullets.py deck.pptx
find qa -name ".~lock*" -delete
rm -f qa/deck.pdf qa/pg-*.png
soffice "-env:UserInstallation=file:///$HOME/path/.lo-profile" --headless --convert-to pdf --outdir qa deck.pptx
pdffonts qa/deck.pdf
pdftoppm -png -r 90 qa/deck.pdf qa/pg
```

## QA checklist (product)

- [ ] `pdffonts`: only Manrope, Manrope-Bold, GeistMono-Regular, GeistMono-Bold
- [ ] Canvas pages with product chrome; cover has metric band; close is navy
- [ ] Closing logo aspect correct at full size (alpha wordmark, no black box)
- [ ] Headings semibold sentence case; pink only in pills/ticks/tint panel
- [ ] Zero em/en dashes in slides and master
- [ ] Authored shapes and package theme contain approved product colours only
- [ ] Every written mention is Sapia.ai
- [ ] AU English; no bangs; no hype
- [ ] Fictional sample data only when shipping a sample
- [ ] Product screenshots are current, supplied or explicitly approved
- [ ] Every `imageFrame` crop is deliberate, keeps required UI complete and is readable at full size
- [ ] Equal pathway cards are sized to their longest body, without excessive empty lower halves
- [ ] Every `metricStrip` value is readable at full size

## Design iteration

1. Show rendered pages (PDF + per-page PNGs), not just the pptx. Walk slide by slide.
2. Live skill stays untouched until **explicit** sign-off to land ("update the skill" / "land it").
3. Fictional content only in samples.
4. "Rebuild your version" means a distinct composition thesis in a private sandbox, not densifying another agent's sample on a shared helper.
5. Locked product default after 2026-07-19 land: full-width executive-memo grammar plus the decision-style closing. See `references/product-skin-landed.md`.
6. Reusable agent handoff prompt: `references/codex-week-prompt.md`.

## File naming

`sapia_<asset>_<context>_<version>.<ext>`, lowercase, no spaces. Bump version on rebuilds; never overwrite a shipped file.

# Product skin land (2026-07-19)

## Decision

Default external Sapia.ai decks use the Talent Hub product skin.

- Composition base: full-width executive memo (no left rail, chapter eyebrows, cover metric band, horizontal pathway cards, side-by-side operating realities, equal action cards).
- Closing: decision-style (`eyebrowText` + `title` + `detail` + `tagline`) on navy with alpha wordmark.
- Classic print-guide helper kept as `scripts/sapia_deck_classic.js` (opt-in only).

The product skin was explicitly signed off before becoming the default.

## Files

- `scripts/sapia_deck.js` product default
- `scripts/sapia_deck_classic.js` classic opt-in
- `assets/logo_white_alpha.png`
- `scripts/fix_bullets.py`

## Pitfalls proved in the land session

1. Shared staging helpers across agents produce near-identical decks. Fork private sandboxes for comparative work.
2. Unicode checkmarks trigger font substitution. Rotated-shape ticks render malformed. Text "ok" on a pink disc was rejected. Brand fonts have no check glyph. Locked: `assets/tick_pink.png` via `tick()` and copied assets beside the helper.
3. Shape shadows cause LibreOffice PDF export failure.
4. Backup `SKILL.md` files under the skill tree create ambiguous skill discovery. Keep backups outside the skill directory.
5. A symlinked helper can fail to resolve `pptxgenjs` because Node resolves from the helper `__dirname`. Copy the helper and keep `assets/` as a sibling of `scripts/`.

## Official sales library refinement (2026-07-21)

The seven-page fictional Wattlebird Retail Group sample was explicitly signed off before the refinement landed.

Decision:

- The Talent Hub product skin remains the only default system. No sales skin was added.
- The April 2026 native Sapia.ai Sales Library is composition evidence, not template, token or copy authority for net-new decks.
- `imageFrame` was added for authentic supplied or approved product screenshots and visuals, with contain or cover fitting and an optional pink tint backplate.
- `metricStrip` was added for two to four content-page measures using the existing cover-band grammar.
- Pathway row, operating comparison and proof grid remain composition recipes built from existing primitives.
- Full-bleed pink covers, black showcases, broad campaign colours, decorative roadmaps and legacy icon treatments remain source-only.
- Product captures must be current or explicitly supplied. Old library screenshots are never reused silently.
- `fix_bullets.py` also remaps unused Office theme slots to approved product colours and removes unused theme shadow effects for strict package-level acceptance.

Approved composition evidence in the April 2026 source:

- Screenshot-led proof: slides 18, 43, 57 and 169.
- Compact evidence band: slides 43, 44 and 94.
- Pathway row: slides 22, 110, 151 and 153.
- Operating comparison: slides 117 and 154.
- Proof grid: slides 12, 90 and 113.

## Image fitting correction (2026-07-21)

`imageFrame` originally passed only destination dimensions to the PptxGenJS 4.0.1 native sizing option. PptxGenJS then treated the destination box as the source dimensions, returned a zero crop and stretched square media into a landscape shape.

The helper now reads PNG and JPEG dimensions directly. Contain mode calculates a centred destination rectangle. Cover mode calculates a centred source crop. `scripts/image_frame_smoke.js` and `scripts/verify_image_frame.py` lock both behaviours at package level.

## Final sample polish (2026-07-21)

The final seven-page fictional sample was explicitly signed off after two last composition corrections:

- A screenshot with incomplete top and bottom UI was changed from contain to an inspected centred cover crop. The crop removed only incomplete edge content, preserved the evidence needed for the slide and made the important product labels larger.
- Four pathway cards were shortened to the longest body plus consistent padding. The coachline moved with the row so the cards no longer carried large empty lower halves.

These are composition rules, not a second skin or new helper API. Use contain when the complete viewport matters. Use cover only when the crop is safe, central and inspected at full size. Equal cards follow their longest content, not the available slide height.

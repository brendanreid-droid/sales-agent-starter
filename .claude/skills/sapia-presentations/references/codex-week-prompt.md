# Reusable agent prompt (Sapia.ai decks)

Paste this into any agent session that will build external Sapia.ai presentations.

```
You are building Sapia.ai customer-facing decks this week. Use the landed skill only. Do not invent a parallel skin.

Skill root:
~/.hermes/skills/productivity/sapia-presentations/

Read first, in order:
1. SKILL.md
2. references/brand.md
3. references/product-skin-landed.md
4. scripts/sapia_deck.js (API + tokens)
5. references/install-and-verify.md when setting up a new machine

Default skin = product (Talent Hub / Flora look).
Classic = scripts/sapia_deck_classic.js only if the user explicitly asks for campaign/keynote.

Non-negotiables:
- Written name is always "Sapia.ai", never the bare company name
- Australian English
- No em dashes, no en dashes (including slide master XML)
- No exclamation marks, no hype words
- No shape shadows (LibreOffice PDF crash)
- No unicode checkmarks (not in Manrope/Geist Mono; substitutes Lucida)
- Use tick() which loads assets/tick_pink.png (locked; no "ok" text, no rotated shapes, no emoji)
- Use imageFrame() for PNG or JPEG product media so contain and cover preserve source aspect ratio
- Use contain when the complete product viewport matters; use centred cover only to remove incomplete edge content without losing required UI
- Make the smallest important screenshot label readable at full size
- Navy close uses logo_white_alpha.png, not logo_white.png
- Fictional content only in samples; never put real client data in samples
- pdffonts must show ONLY: Manrope, Manrope-Bold, GeistMono-Regular, GeistMono-Bold

Build pattern every time:
1. Work dir with local pptxgenjs (npm install pptxgenjs)
2. COPY helper + assets (do not symlink scripts/sapia_deck.js from the skill; require resolves from helper __dirname and will miss node_modules)
   mkdir -p scripts assets && \
   cp ~/.hermes/skills/productivity/sapia-presentations/scripts/sapia_deck.js scripts/ && \
   cp ~/.hermes/skills/productivity/sapia-presentations/scripts/fix_bullets.py scripts/ && \
   cp -R ~/.hermes/skills/productivity/sapia-presentations/assets/. assets/
3. Build with helper API only: coverSlide, page, closingSlide (decision-style preferred), coachline, panel, card, countPill, statusPill, tick, bar, imageFrame, metricStrip, table, T, MT
4. Composition intent: executive decision memo, full-width (no left rail), chapter eyebrows, cover metric band, current supplied product visuals in imageFrame, content measures in metricStrip, equal action cards sized to their longest body, side-by-side operating realities when comparing sites. Prefer decision close:
   closingSlide(p, { eyebrowText, title, detail, tagline: "The hires that stay." })
5. Post-process: python3 scripts/fix_bullets.py deck.pptx
6. Render loop:
   find qa -name ".~lock*" -delete
   rm -f qa/*.pdf qa/pg-*.png
   soffice "-env:UserInstallation=file:///$HOME/<work>/.lo-profile" --headless --convert-to pdf --outdir qa deck.pptx
   pdffonts qa/deck.pdf
   pdftoppm -png -r 90 qa/deck.pdf qa/pg
7. View EVERY page at full size before claiming done (closing logo aspect + ticks hide in contact sheets)

File naming: sapia_<asset>_<context>_vN.pptx (bump version, never overwrite shipped)

If anything in the brief fights the skill, stop and flag it. Do not fork a second design system.
```

Run the bundled preflight and image-frame smoke test before first use on a new machine.

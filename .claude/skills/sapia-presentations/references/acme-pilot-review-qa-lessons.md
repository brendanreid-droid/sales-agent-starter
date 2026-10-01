# Acme pilot review QA lessons

Session: building `sapia_deck_acme-pilot-review_v1` from the Sapia.ai presentation skill.

## Durable lessons

- The logo helper must use the actual asset aspect ratio. Current bundled logo assets are `665 x 270`, so `SAPIA.logoAR` should be `665 / 270`. A wider hard-coded ratio such as `2.87` horizontally stretches the wordmark and is visually obvious on the black closing slide.
- Dependency bullets in the left rail need visual baseline QA. Small decorative dots can look vertically misaligned if their `y` is set near the text box top rather than the first-line baseline. Render slide-level images and inspect the bullet/text relationship at full size.
- `ppt/theme/theme1.xml` can retain default Office theme colours even when slide shapes only use the SAPIA palette. For strict package-level colour acceptance, remap theme `a:srgbClr` values to SAPIA palette values during post-processing.
- On macOS, `~/Library/Fonts/Manrope.ttf` can override `~/.fonts/Manrope.ttf`. Inspect `fc-match -v 'Manrope:style=Regular'` and `fc-match -v 'Manrope:style=Bold'`; a misleading installed file may actually be ExtraLight. Back it up and install the generated Regular and Bold TTFs into `~/Library/Fonts` when LibreOffice resolves the wrong face.

## QA emphasis for future Sapia.ai decks

- Render to PDF and page images before calling the deck done.
- Inspect the closing slide logo at full size, not only the contact sheet.
- Inspect left-rail bullets at full size when using custom bullet components.
- Keep the strict acceptance scan: `pdffonts`, visible name scan for any bare company mention, dash scan including `slideMaster1.xml`, heading bold scan, and package-level palette scan.

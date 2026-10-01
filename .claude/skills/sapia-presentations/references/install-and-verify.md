# Install and verify

This skill bundle is self-contained except for system tools, fonts and the Node dependency installed in each deck work directory. It does not include the official sales library, customer data or product screenshots.

## Install

1. Extract the bundle so the skill root directly contains `SKILL.md`, `assets/`, `references/` and `scripts/`.
2. Place that folder in the skill location used by your agent runtime. For Hermes, the default is `~/.hermes/skills/productivity/sapia-presentations/`.
3. Install Node.js, npm, Python 3, LibreOffice and Poppler. Poppler supplies `pdffonts` and `pdftoppm`.
4. Install Manrope Regular, Manrope Bold, Geist Mono Regular and Geist Mono Bold from their official releases. Font files are not bundled because installation changes the operating system.
5. Run the preflight check from the skill root:

```bash
python3 scripts/preflight.py
```

Every tool and font line must report `PASS` before building a deck.

## Verify the helper

Create a clean work directory. Copy the helper, assets and verification scripts into it. Do not symlink the helper.

```bash
mkdir -p scripts assets qa
cp /path/to/sapia-presentations/scripts/sapia_deck.js scripts/
cp /path/to/sapia-presentations/scripts/fix_bullets.py scripts/
cp /path/to/sapia-presentations/scripts/image_frame_smoke.js scripts/
cp /path/to/sapia-presentations/scripts/verify_image_frame.py scripts/
cp -R /path/to/sapia-presentations/assets/. assets/
npm install pptxgenjs
node scripts/image_frame_smoke.js sapia_deck_image-frame-smoke_v1.pptx
python3 scripts/verify_image_frame.py sapia_deck_image-frame-smoke_v1.pptx
python3 scripts/fix_bullets.py sapia_deck_image-frame-smoke_v1.pptx
```

The verifier must report that both contain and cover preserve the source aspect ratio.

Render the smoke deck and inspect both pages at full size:

```bash
find qa -name ".~lock*" -delete
soffice "-env:UserInstallation=file:///$HOME/sapia-deck-smoke-profile" --headless --convert-to pdf --outdir qa sapia_deck_image-frame-smoke_v1.pptx
pdffonts qa/sapia_deck_image-frame-smoke_v1.pdf
pdftoppm -png -r 90 qa/sapia_deck_image-frame-smoke_v1.pdf qa/pg
```

The font report may contain only Manrope, Manrope-Bold, GeistMono-Regular and GeistMono-Bold variants.

## Optional sales library

`Sapia.ai Sales Library (April 2026).pptx` is optional composition evidence. It is not included in the skill bundle and is not required to build a deck. Use it only if you have an authorised local copy. Never copy its masters, legacy styling or historical screenshots into a net-new product-skin deck.

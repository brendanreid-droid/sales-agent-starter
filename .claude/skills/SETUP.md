# Sapia.ai presentations skill: setup

This skill builds on-brand Sapia.ai decks (`.pptx`) through a Node helper, so decks come
out correct by default instead of being hand-styled.

Setting it up by hand is fiddly, mostly because of the fonts. **Use the prompt below and
Claude Code will do the whole thing and verify it worked.**

---

## Step 1: get the skill

If you have cloned this repo you already have it, at
`.claude/skills/sapia-presentations/`. Claude Code picks up project skills from there
automatically, so there is nothing to install. The font installer sits next to it at
`.claude/skills/install-fonts.py`.

If you want it available in every project rather than just this repo, either:

- **Claude account:** zip the `sapia-presentations` folder and upload it at
  Settings > Capabilities > Skills. It then follows you to every device.
- **This machine only:** copy the folder to `~/.claude/skills/sapia-presentations/`.

## Step 2: paste this prompt into Claude Code

Open Claude Code and paste the whole thing, adjusting the path on the first line if you are
not running it from the repo root.

> Set up my machine for the `sapia-presentations` skill and verify it end to end. The font
> installer is at `.claude/skills/install-fonts.py` in this repo.
>
> 1. Read the skill's `references/install-and-verify.md` and the "Fonts" section of its
>    `SKILL.md` so you follow its own spec rather than guessing.
> 2. Install the system tools if they are missing: Node, npm, Python 3, LibreOffice and
>    Poppler (Poppler provides `pdffonts` and `pdftoppm`). Use Homebrew. Tell me before
>    running anything that needs my password.
> 3. Run `python3 .claude/skills/install-fonts.py` to install Manrope and Geist Mono. Do NOT
>    install these from fonts.google.com instead: that gives a variable font whose family
>    reports as "Manrope ExtraLight", and decks then silently render in the wrong weight.
>    The script downloads the static cuts and repairs the name table and weight bits.
> 4. Run the skill's `scripts/preflight.py`. Every line must say PASS. Fix anything that
>    does not and re-run until it is clean.
> 5. Prove it actually works, do not stop at preflight. Make a scratch work directory, copy
>    the helper and assets in per the skill's build workflow, `npm install pptxgenjs`, build
>    a two-page test deck with `coverSlide` and `page`, run `scripts/fix_bullets.py`, then
>    render it to PDF with LibreOffice.
> 6. Run `pdffonts` on that PDF. It must list ONLY Manrope, Manrope-Bold, GeistMono-Regular
>    and GeistMono-Bold. If you see `LinuxLibertineG`, `DejaVu` or anything else, LibreOffice
>    is silently substituting: it cannot see system fonts even when preflight passes. Fix it
>    by creating a local fontconfig in the work directory: copy the four font files into
>    `fcfg/fonts/`, write `fcfg/fonts.conf` with absolute `<dir>` entries for that folder and
>    for `/Applications/LibreOffice.app/Contents/Resources/fonts/truetype` plus a
>    `<cachedir>`, then `export FONTCONFIG_FILE="$PWD/fcfg/fonts.conf"` and render again.
>    Repeat until `pdffonts` is clean.
> 7. Show me the rendered pages and tell me plainly whether every check passed, including
>    whether you needed the fontconfig workaround, so I know to use it on real decks.
>
> Do not tell me setup is complete based on preflight alone. The only proof is a rendered
> PDF whose `pdffonts` output is clean.

## Step 3: use it

Just ask for the deck. The skill triggers on "build a QBR deck for X", "make this a
Sapia.ai deck", "put this on brand" and similar. Never hand-place colours, fonts or
coordinates: everything goes through `scripts/sapia_deck.js`.

---

## Why the prompt insists on a render

Two failure modes here are silent, which is why the last step matters more than it looks.

**The font trap.** Installing Manrope from fonts.google.com gives a variable font. Converted
or installed naively, its family name is "Manrope ExtraLight", so `fc-match Manrope` misses
or resolves to the wrong weight and your decks come out too light. `install-fonts.py` takes
the static cuts from `@fontsource`, converts them, and rewrites the name table and bold bits.

**The LibreOffice trap.** On at least one Mac (LibreOffice 26.8 via Homebrew), `soffice`
renders with Linux Libertine instead of Manrope and Geist Mono **even when `preflight.py`
reports every font as PASS and `fc-match` resolves them**. LibreOffice sees only its own
bundled fonts. Nothing errors. The PDF looks plausible, so you would ship a deck believing
you had checked it. `pdffonts` is the only reliable check, and the fontconfig workaround in
step 6 is the fix.

This affects PDF previews only. The `.pptx` always carries the correct font names and
renders properly in PowerPoint, Keynote and Google Slides.

## Google Slides

Claude cannot upload a built deck to Drive: the connector only accepts file content inlined
as base64 text, and any real deck is too large to pass reliably. Build the `.pptx`, then
import it yourself: drag into Drive, right-click > Open with > Google Slides, then
File > Save as Google Slides. Conversion is faithful, and both brand fonts are on Google
Fonts (Geist Mono may need adding via "More fonts" in the Slides font picker).

## Manual fallback

If you would rather not use the prompt, from the repo root:

```bash
brew install node python3 poppler fontconfig
brew install --cask libreoffice
python3 .claude/skills/install-fonts.py
python3 .claude/skills/sapia-presentations/scripts/preflight.py   # every line must say PASS
```

Then build a test deck and check `pdffonts` on the PDF, per steps 5 and 6 above.

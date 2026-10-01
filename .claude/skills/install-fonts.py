#!/usr/bin/env python3
"""Install Manrope and Geist Mono for the Sapia.ai presentations skill.

Downloads the static latin cuts from @fontsource, converts woff2 to ttf, repairs the
name table and weight bits, and installs into ~/Library/Fonts.

The repair matters. A straight woff2 to ttf conversion of @fontsource/manrope reports
its family as "Manrope ExtraLight", so LibreOffice and fc-match either fail to find
"Manrope" or resolve it to the wrong weight, and decks render too light with no error.

Usage:  python3 install-fonts.py
"""
import os, subprocess, sys, tempfile, tarfile, shutil, glob

JOBS = [
    ("@fontsource/manrope",    "manrope-latin-400-normal.woff2",    "Manrope-Regular.ttf",   "Manrope",    "Regular"),
    ("@fontsource/manrope",    "manrope-latin-700-normal.woff2",    "Manrope-Bold.ttf",      "Manrope",    "Bold"),
    ("@fontsource/geist-mono", "geist-mono-latin-400-normal.woff2", "GeistMono-Regular.ttf", "Geist Mono", "Regular"),
    ("@fontsource/geist-mono", "geist-mono-latin-700-normal.woff2", "GeistMono-Bold.ttf",    "Geist Mono", "Bold"),
]

def main():
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        print("Installing fonttools...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "--user", "fonttools", "brotli"])
        from fontTools.ttLib import TTFont

    dest = os.path.expanduser("~/Library/Fonts")
    os.makedirs(dest, exist_ok=True)
    work = tempfile.mkdtemp(prefix="sapia-fonts-")
    try:
        for pkg in {j[0] for j in JOBS}:
            print(f"Fetching {pkg}...")
            subprocess.check_call(["npm", "pack", pkg], cwd=work,
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for tgz in glob.glob(os.path.join(work, "*.tgz")):
            with tarfile.open(tgz) as t:
                t.extractall(os.path.join(work, os.path.basename(tgz)[:-4]))

        for _, srcname, outname, family, style in JOBS:
            matches = glob.glob(os.path.join(work, "**", srcname), recursive=True)
            if not matches:
                sys.exit(f"FAIL: could not find {srcname} in the downloaded packages")
            f = TTFont(matches[0])
            f.flavor = None
            n = f["name"]
            for rec in list(n.names):
                if rec.nameID == 1:
                    n.setName(family, 1, rec.platformID, rec.platEncID, rec.langID)
                elif rec.nameID == 2:
                    n.setName(style, 2, rec.platformID, rec.platEncID, rec.langID)
                elif rec.nameID == 4:
                    n.setName(f"{family} {style}", 4, rec.platformID, rec.platEncID, rec.langID)
                elif rec.nameID == 6:
                    n.setName(f"{family.replace(' ', '')}-{style}", 6, rec.platformID, rec.platEncID, rec.langID)
            # Drop typographic family/subfamily so the basic family name is authoritative.
            n.names = [r for r in n.names if r.nameID not in (16, 17, 21, 22)]
            bold = style == "Bold"
            f["OS/2"].fsSelection = (f["OS/2"].fsSelection & ~0x60) | (0x20 if bold else 0x40)
            f["head"].macStyle = (f["head"].macStyle & ~0x3) | (0x1 if bold else 0x0)
            f["OS/2"].usWeightClass = 700 if bold else 400
            out = os.path.join(dest, outname)
            f.save(out)
            g = TTFont(out)
            print(f"  {outname:24} family={g['name'].getDebugName(1):12} "
                  f"style={g['name'].getDebugName(2):8} weight={g['OS/2'].usWeightClass}")
    finally:
        shutil.rmtree(work, ignore_errors=True)

    print("\nInstalled to ~/Library/Fonts. Verifying with fc-match:")
    ok = True
    for spec, want in [("Manrope:style=Regular", "Manrope"), ("Manrope:style=Bold", "Manrope"),
                       ("Geist Mono:style=Regular", "Geist Mono"), ("Geist Mono:style=Bold", "Geist Mono")]:
        try:
            out = subprocess.run(["fc-match", "-f", "%{family}|%{style}", spec],
                                 capture_output=True, text=True).stdout.strip()
        except FileNotFoundError:
            print("  fc-match not found (brew install fontconfig) - skipping verification")
            return
        status = "PASS" if out.split("|")[0] == want else "FAIL"
        if status == "FAIL":
            ok = False
        print(f"  {status}  {spec:26} -> {out}")
    print("\nAll four faces resolve correctly." if ok else
          "\nSomething did not resolve. Check Font Book for a conflicting older Manrope.")

if __name__ == "__main__":
    main()

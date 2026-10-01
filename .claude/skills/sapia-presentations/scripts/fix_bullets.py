#!/usr/bin/env python3
"""Post-process a pptxgenjs deck.

Replace the slide master's en dash bullet with a real bullet and remap the
unused Office theme colour slots to the approved Sapia.ai product palette.
The rezip preserves entry order because a reordered zip can upset LibreOffice.
Usage: python3 fix_bullets.py <deck.pptx>
"""
import sys
import zipfile
import re

THEME_COLOURS = {
    "44546A": "245069",
    "E7E6E6": "F5F6F8",
    "4472C4": "245069",
    "ED7D31": "9ACEDC",
    "A5A5A5": "8D58F9",
    "FFC000": "FFCEFF",
    "5B9BD5": "067647",
    "70AD47": "B54708",
    "0563C1": "245069",
    "954F72": "8D58F9",
}

src = sys.argv[1]
zin = zipfile.ZipFile(src)
items = [(n, zin.read(n)) for n in zin.namelist()]
zin.close()
out = zipfile.ZipFile(src, "w", zipfile.ZIP_DEFLATED)
fixed = 0
theme_fixed = 0
theme_shadows_removed = 0
for n, data in items:
    if n == "ppt/slideMasters/slideMaster1.xml":
        t = data.decode("utf-8")
        fixed = t.count('char="\u2013"')
        t = t.replace('char="\u2013"', 'char="&#8226;"')
        data = t.encode("utf-8")
    if n == "ppt/theme/theme1.xml":
        t = data.decode("utf-8")
        theme_fixed += t.count('lastClr="000000"')
        t = t.replace('lastClr="000000"', 'lastClr="101828"')
        for old, new in THEME_COLOURS.items():
            marker = f'val="{old}"'
            theme_fixed += t.count(marker)
            t = t.replace(marker, f'val="{new}"')
        t, theme_shadows_removed = re.subn(
            r'<a:effectLst><a:outerShdw.*?</a:outerShdw></a:effectLst>',
            '<a:effectLst/>',
            t,
        )
        data = t.encode("utf-8")
    out.writestr(n, data)
out.close()
print(f"en dash bullets fixed: {fixed}")
print(f"theme colours remapped: {theme_fixed}")
print(f"unused theme shadows removed: {theme_shadows_removed}")

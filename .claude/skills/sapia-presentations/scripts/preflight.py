#!/usr/bin/env python3
"""Check the local tools and fonts required by the Sapia.ai deck workflow."""

from __future__ import annotations

import shutil
import subprocess
import sys


REQUIRED_TOOLS = ("node", "npm", "python3", "soffice", "pdffonts", "pdftoppm", "fc-match")
REQUIRED_FONTS = (
    ("Manrope:style=Regular", "Manrope", "Regular"),
    ("Manrope:style=Bold", "Manrope", "Bold"),
    ("Geist Mono:style=Regular", "Geist Mono", "Regular"),
    ("Geist Mono:style=Bold", "Geist Mono", "Bold"),
)


def main() -> int:
    failures: list[str] = []

    for tool in REQUIRED_TOOLS:
        location = shutil.which(tool)
        if location:
            print(f"PASS tool {tool}: {location}")
        else:
            failures.append(f"missing tool: {tool}")

    if shutil.which("fc-match"):
        for query, expected_family, expected_style in REQUIRED_FONTS:
            result = subprocess.run(
                ["fc-match", "-f", "%{family}|%{style}|%{file}\n", query],
                check=False,
                capture_output=True,
                text=True,
            )
            answer = result.stdout.strip()
            if result.returncode == 0 and expected_family in answer and expected_style in answer:
                print(f"PASS font {query}: {answer}")
            else:
                failures.append(f"missing or substituted font: {query}")

    if failures:
        print("FAIL preflight", file=sys.stderr)
        for failure in failures:
            print(f"  {failure}", file=sys.stderr)
        return 1

    print("PASS: Sapia.ai presentation environment is ready")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

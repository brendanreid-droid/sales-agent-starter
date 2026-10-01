#!/usr/bin/env python3
"""Verify the aspect-preserving imageFrame regression deck."""

from __future__ import annotations

import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
}


def picture_geometry(xml_bytes: bytes, description: str) -> tuple[int, int, dict[str, int] | None]:
    root = ET.fromstring(xml_bytes)
    for picture in root.findall(".//p:pic", NS):
        props = picture.find("./p:nvPicPr/p:cNvPr", NS)
        if props is None or props.attrib.get("descr") != description:
            continue
        extent = picture.find("./p:spPr/a:xfrm/a:ext", NS)
        if extent is None:
            raise AssertionError(f"{description}: missing image extent")
        source_rect = picture.find("./p:blipFill/a:srcRect", NS)
        crop = None
        if source_rect is not None:
            crop = {name: int(source_rect.attrib.get(name, "0")) for name in ("l", "r", "t", "b")}
        return int(extent.attrib["cx"]), int(extent.attrib["cy"]), crop
    raise AssertionError(f"{description}: image not found")


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: verify_image_frame.py deck.pptx", file=sys.stderr)
        return 2

    deck = Path(sys.argv[1])
    with zipfile.ZipFile(deck) as package:
        contain = picture_geometry(package.read("ppt/slides/slide1.xml"), "image-frame-regression-contain")
        cover = picture_geometry(package.read("ppt/slides/slide2.xml"), "image-frame-regression-cover")

    contain_w, contain_h, contain_crop = contain
    assert abs(contain_w / contain_h - 1.0) < 0.001, "contain mode stretched the square source"
    assert not contain_crop or not any(contain_crop.values()), "contain mode unexpectedly cropped the source"

    cover_w, cover_h, cover_crop = cover
    assert abs(cover_w / cover_h - 1.0) < 0.001, "cover mode did not fill the square destination"
    assert cover_crop and (cover_crop["l"] > 0 or cover_crop["r"] > 0), "cover mode did not crop the wide source"
    assert cover_crop["l"] == cover_crop["r"], "cover crop is not horizontally centred"

    print("PASS: imageFrame contain and cover preserve source aspect ratio")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

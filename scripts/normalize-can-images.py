#!/usr/bin/env python3
"""
Normalise the can cut-outs in public/images/ciders.

The source files are cut-outs sitting on a SQUARE canvas: the can is
88-99% of the height but only 32-41% of the width, so roughly 60% of
every file is empty pixels. Three things followed from that:

  - `h-[N] w-auto object-contain` produced an N x N box holding a can
    ~0.42N wide. The dead space padded every layout and made the can
    look half the size of the room it was given.
  - Next sizes its srcset from the `width` prop. Every call site
    declared a can-shaped `width` (54, 300, 40) against a square file,
    so the candidates came out 2.4x too narrow and the can was drawn
    from a fraction of the pixels it needed.
  - The fill varied per file (87.6%-98.6% tall), so neighbouring tiles
    drew visibly different-sized cans.

This crops each file to its alpha bounding box and then pads it back
out horizontally to one shared aspect ratio, so every can fills its
frame top to bottom and all fifteen line up. Nothing visible is
removed - the crop is exactly the transparent margin.

Idempotent: re-running finds the same bounding box and re-pads to the
same ratio. Overwrites in place; the originals are in git history.

    python3 scripts/normalize-can-images.py [--check]
"""

import sys
from pathlib import Path

from PIL import Image

# The widest can in the set measures 0.4165. Padding is therefore
# always horizontal, and no can is ever shrunk to fit the frame.
ASPECT = 0.42
MAX_HEIGHT = 1200  # downscale only; small files keep their own pixels

ROOT = Path(__file__).resolve().parent.parent
CANS = ROOT / "public" / "images" / "ciders"


def normalise(path: Path, check: bool) -> bool:
    im = Image.open(path).convert("RGBA")
    box = im.getchannel("A").getbbox()
    if box is None:
        print(f"  {path.name}: no alpha channel, skipped")
        return False

    can = im.crop(box)
    if can.height > MAX_HEIGHT:
        can = can.resize(
            (round(can.width * MAX_HEIGHT / can.height), MAX_HEIGHT),
            Image.LANCZOS,
        )

    width = max(can.width, round(can.height * ASPECT))
    frame = Image.new("RGBA", (width, can.height), (0, 0, 0, 0))
    frame.alpha_composite(can, ((width - can.width) // 2, 0))

    changed = frame.size != im.size
    label = f"{im.size[0]}x{im.size[1]} -> {frame.size[0]}x{frame.size[1]}"
    print(f"  {path.name:30} {label}{'' if changed else '  (already normal)'}")

    if not check:
        frame.save(path, optimize=True)
    return changed


def main() -> int:
    check = "--check" in sys.argv
    files = sorted(CANS.glob("*.png"))
    if not files:
        print(f"no PNGs under {CANS}")
        return 1

    print(f"{'checking' if check else 'normalising'} {len(files)} cans")
    changed = sum(normalise(f, check) for f in files)

    if check and changed:
        print(f"{changed} file(s) are not normalised")
        return 1
    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

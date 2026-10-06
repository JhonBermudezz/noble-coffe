"""Convierte las fotos originales del IG a WebP optimizado en public/img."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "img"
OUT.mkdir(parents=True, exist_ok=True)

NAMES = {
    "11": "mesa-sombra", "13": "vaso-galleta", "16": "iced-latte",
    "17": "chemex-gorra", "18": "sandwich", "19": "postre-frutos",
    "20": "chemex-vertido", "22": "silla", "26": "bodegon",
    "29": "cafelicidad", "33": "iced-mano", "35": "buen-dia",
    "37": "cliente", "40": "chemex",
}

for src in sorted(ROOT.glob("imgi_*.jpg")):
    key = src.name.split("_")[1]
    name = NAMES.get(key)
    if not name:
        continue
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    for width in (800, 1600):
        copy = im.copy()
        copy.thumbnail((width, width * 2))
        copy.save(OUT / f"{name}-{width}.webp", "WEBP", quality=78, method=6)
    print(name, im.size)

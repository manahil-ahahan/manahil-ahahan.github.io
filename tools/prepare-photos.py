#!/usr/bin/env python3
"""تجهيز صور المنحل للنشر في الموقع.

الاستعمال (من جذر المستودع):
    python3 tools/prepare-photos.py صورة1.jpg:الاسم1 صورة2.jpg:الاسم2 ...

مثال:
    python3 tools/prepare-photos.py ~/Downloads/IMG_2041.jpg:honey-jars

لكل صورة ينتج ملفين في images/gallery:
    الاسم.jpg     نسخة كبيرة (أطول ضلع 1600px) تُفتح عند التكبير
    الاسم-sm.jpg  نسخة صغيرة (أطول ضلع 720px) للعرض في الصفحة

وفي كل نسخة:
    - تُصحَّح الاتجاهات (صور الهاتف المقلوبة).
    - تُحذف كل بيانات الهاتف الأصلية، ومنها الموقع الجغرافي (GPS).
    - تُضاف علامة "© مناحل احاحان" في الزاوية (من tools/watermark.png).
    - تُكتب معلومات الحقوق داخل الملف (EXIF Copyright / Artist).

لا ترفع الصور الأصلية إلى المستودع: النسخ المجهزة فقط.
بعد التشغيل، أضف الاسم والوصف إلى window.GALLERY في js/data.js.
يحتاج: Pillow  (pip install pillow)
"""
import os
import re
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "images", "gallery")
WATERMARK = os.path.join(ROOT, "tools", "watermark.png")
COPYRIGHT = "Copyright (c) Manahil Ahahan. All rights reserved. Do not reuse without permission."
ARTIST = "Manahil Ahahan"
SIZES = (("", 1600, 70), ("-sm", 720, 74))  # (لاحقة الاسم، أطول ضلع، جودة JPEG)


def prepare(src, name, wm0):
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")  # convert() يتخلص من EXIF الأصلي كله
    for suffix, longest, quality in SIZES:
        img = im.copy()
        img.thumbnail((longest, longest), Image.LANCZOS)
        # العلامة: ~30% من العرض للصور الطولية، ~24% للعرضية، بشفافية 80%
        w = int(img.width * (0.30 if img.width < img.height else 0.24))
        wm = wm0.resize((w, round(w * wm0.height / wm0.width)), Image.LANCZOS)
        wm.putalpha(wm.split()[3].point(lambda v: int(v * 0.8)))
        m = int(img.width * 0.025)
        img.paste(wm, (img.width - wm.width - m, img.height - wm.height - m), wm)
        exif = Image.Exif()
        exif[0x8298] = COPYRIGHT
        exif[0x013B] = ARTIST
        path = os.path.join(OUT, f"{name}{suffix}.jpg")
        img.save(path, "JPEG", quality=quality, optimize=True, progressive=True, exif=exif)
        print(f"  {os.path.relpath(path, ROOT)}  {img.width}x{img.height}  {os.path.getsize(path) // 1024}KB")


def main(args):
    if not args or any(":" not in a for a in args):
        sys.exit(__doc__)
    wm0 = Image.open(WATERMARK).convert("RGBA")
    os.makedirs(OUT, exist_ok=True)
    for arg in args:
        src, name = arg.rsplit(":", 1)
        if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", name):
            sys.exit(f"اسم غير صالح: {name!r} (استعمل حروفاً إنجليزية صغيرة وأرقاماً و- فقط)")
        print(f"{src} -> {name}")
        prepare(src, name, wm0)
    print("\nأضف إلى window.GALLERY في js/data.js:")
    for arg in args:
        print(f'  {{ name: "{arg.rsplit(":", 1)[1]}", alt: "وصف الصورة بالعربية" }},')


if __name__ == "__main__":
    main(sys.argv[1:])

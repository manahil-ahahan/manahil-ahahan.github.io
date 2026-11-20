#!/usr/bin/env bash
# تجهيز فيديو (ريل) للنشر في الموقع.
#
# الاستعمال (من جذر المستودع):
#   bash tools/prepare-video.sh الفيديو.mp4 الاسم [ثانية-صورة-الغلاف]
# مثال:
#   bash tools/prepare-video.sh ~/Downloads/reel.mp4 reel-pollen 1
#
# ينتج:
#   videos/الاسم.mp4          فيديو 720x1280 مضغوط (H.264 + AAC)، يبدأ بسرعة على الهاتف
#   videos/الاسم-poster.jpg   صورة الغلاف قبل التشغيل
# وفي الاثنين: حذف بيانات الهاتف (ومنها GPS)، علامة "© مناحل احاحان" في الزاوية،
# ومعلومات الحقوق داخل الملف.
# بعد التشغيل، أضف إلى window.REELS في js/data.js:
#   { src: "videos/الاسم.mp4", poster: "videos/الاسم-poster.jpg", title: "..." }
# يحتاج: ffmpeg
set -euo pipefail
[ $# -ge 2 ] || { sed -n '2,17p' "$0"; exit 1; }
SRC=$1; NAME=$2; AT=${3:-1}
[[ $NAME =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "اسم غير صالح: $NAME (حروف إنجليزية صغيرة وأرقام و- فقط)"; exit 1; }
ROOT=$(cd "$(dirname "$0")/.." && pwd); OUT="$ROOT/videos"; WM="$ROOT/tools/watermark.png"
CR="Copyright (c) Manahil Ahahan. All rights reserved. Do not reuse without permission."
mkdir -p "$OUT"
# العلامة: عرضها 30% من عرض الفيديو، بشفافية 80%، في الزاوية السفلية اليمنى
FILTER="[0:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v];[1:v]scale=216:-1,format=rgba,colorchannelmixer=aa=0.8[w];[v][w]overlay=W-w-18:H-h-18"
ffmpeg -v error -y -i "$SRC" -i "$WM" -filter_complex "$FILTER" \
  -map_metadata -1 -map_chapters -1 -metadata copyright="$CR" -metadata artist="Manahil Ahahan" \
  -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$NAME.mp4"
ffmpeg -v error -y -ss "$AT" -i "$OUT/$NAME.mp4" -frames:v 1 -q:v 4 "$OUT/$NAME-poster.jpg"
ls -la "$OUT/$NAME.mp4" "$OUT/$NAME-poster.jpg"

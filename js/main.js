{
  const S = window.SITE, P = window.PRODUCTS, SV = window.SERVICES, G = window.GALLERY, R = window.REELS;
  const $ = (q) => document.querySelector(q);

  /* ---------- colour helpers ---------- */
  const mix = (a, b, t) => {
    const h = (c) => c.match(/\w\w/g).map((x) => parseInt(x, 16));
    const A = h(a), B = h(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const honey = (t) => (t < 0.5 ? mix("FBE58A", "E89A0C", t * 2) : mix("E89A0C", "6E3405", (t - 0.5) * 2));

  /* ---------- drawn product pictures ---------- */
  let gid = 0;
  const icons = {
    jar(t) {
      const c = honey(t), d = mix(c.slice(1), "3B2412", 0.25), id = "j" + gid++;
      return `<svg viewBox="0 0 120 150" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${d}"/><stop offset=".45" stop-color="${c}"/><stop offset="1" stop-color="${d}"/></linearGradient></defs>
      <ellipse cx="60" cy="142" rx="44" ry="6" fill="#3B2412" opacity=".15"/>
      <rect x="22" y="40" width="76" height="100" rx="16" fill="url(#${id})"/>
      <rect x="22" y="40" width="76" height="100" rx="16" fill="none" stroke="#3B2412" stroke-opacity=".25" stroke-width="2"/>
      <rect x="31" y="52" width="9" height="70" rx="4.5" fill="#fff" opacity=".45"/>
      <path d="M14 30q46-16 92 0l-6 16q-40-9-80 0Z" fill="#c9a36a"/>
      <path d="M14 30q46-16 92 0" fill="none" stroke="#8a6a3d" stroke-width="2" stroke-dasharray="3 3"/>
      <path d="M20 44q40-8 80 0" stroke="#7a5a2e" stroke-width="3" fill="none"/>
      <path d="M58 44q-12 10-16 18M62 44q12 10 16 18" stroke="#7a5a2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <rect x="36" y="78" width="48" height="30" rx="6" fill="#fff" opacity=".9"/>
      <path d="M60 85l8 4.5v9L60 103l-8-4.5v-9Z" fill="${c}" stroke="#3B2412" stroke-width="1.5"/></svg>`;
    },
    comb(t) {
      const c = honey(t); let cells = "";
      for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) {
        const x = 22 + q * 25 + (r % 2) * 12.5, y = 34 + r * 21.6;
        cells += `<path d="M${x} ${y - 14}l12.5 7.2v14.4L${x} ${y + 14}l-12.5-7.2v-14.4Z" fill="${(q + r) % 3 ? c : "#F9DC8A"}" stroke="#B8790a" stroke-width="2.5"/>`;
      }
      return `<svg viewBox="0 0 130 140" aria-hidden="true"><ellipse cx="65" cy="128" rx="50" ry="6" fill="#3B2412" opacity=".15"/>${cells}<path d="M40 118q4 12 8 0M86 118q3 9 6 0" fill="${c}"/></svg>`;
    },
    pollen() {
      const cols = ["F2A900", "E5762B", "C9B23A", "F5D15C", "B85C1A", "8E9B3A"]; let g = "", s = 7;
      for (let i = 0; i < 46; i++) {
        s = (s * 16807) % 2147483647;
        const a = (s % 1000) / 1000, b = ((s >> 10) % 1000) / 1000;
        g += `<circle cx="${30 + a * 60}" cy="${60 + b * 26 - Math.abs(a - 0.5) * 18}" r="5.2" fill="#${cols[i % 6]}" stroke="#3B2412" stroke-opacity=".2"/>`;
      }
      return `<svg viewBox="0 0 120 130" aria-hidden="true"><ellipse cx="60" cy="118" rx="46" ry="6" fill="#3B2412" opacity=".15"/>${g}<path d="M14 78q46 6 92 0q-6 38-46 38T14 78Z" fill="#8b5a2b"/><path d="M14 78q46 6 92 0" stroke="#5b3a1b" stroke-width="3" fill="none"/><path d="M30 92q30 10 60 0" stroke="#a8743f" stroke-width="3" fill="none"/></svg>`;
    },
    jelly() {
      return `<svg viewBox="0 0 120 140" aria-hidden="true"><ellipse cx="60" cy="130" rx="34" ry="5" fill="#3B2412" opacity=".15"/><rect x="34" y="40" width="52" height="88" rx="10" fill="#FFF7E2" stroke="#d9c39a" stroke-width="2"/><rect x="34" y="70" width="52" height="58" rx="10" fill="#F6E7B8"/><rect x="40" y="76" width="6" height="40" rx="3" fill="#fff"/><rect x="30" y="24" width="60" height="20" rx="5" fill="#3B2412"/><path d="M38 30h44" stroke="#F2A900" stroke-width="3"/><path d="M60 92l7 4v8l-7 4-7-4v-8Z" fill="#F2A900"/></svg>`;
    },
    propolis() {
      return `<svg viewBox="0 0 120 130" aria-hidden="true"><ellipse cx="60" cy="116" rx="46" ry="6" fill="#3B2412" opacity=".15"/><path d="M20 108l10-30 22-8 10 22-8 18Z" fill="#5a2e0c"/><path d="M52 70l24-14 22 16-4 30-30 6Z" fill="#7b3f10"/><path d="M58 76l16-8 14 10" stroke="#b5651d" stroke-width="3" fill="none"/><path d="M28 86l14-6" stroke="#9a5418" stroke-width="3"/><path d="M84 110l12-14 10 12-8 6Z" fill="#4a2408"/></svg>`;
    },
    wax() {
      return `<svg viewBox="0 0 130 130" aria-hidden="true"><ellipse cx="65" cy="116" rx="52" ry="6" fill="#3B2412" opacity=".15"/><path d="M16 80l44-18 54 14-44 22Z" fill="#FBE29A"/><path d="M16 80v22l54 14V98Z" fill="#E9C463"/><path d="M70 98v18l44-20V76Z" fill="#D7AE4A"/><path d="M40 72l12 3M64 64l14 4M88 74l-12 5" stroke="#E9C463" stroke-width="3"/><path d="M80 40q4-12 0-22q12 10 6 22" fill="#F2A900"/><rect x="74" y="40" width="12" height="28" rx="3" fill="#FBE29A" stroke="#E9C463" stroke-width="2"/></svg>`;
    }
  };

  const svcIcons = {
    cart: '<path d="M4 6h5l5 26h28l5-18H12" /><circle cx="18" cy="40" r="3.5"/><circle cx="38" cy="40" r="3.5"/>',
    gift: '<rect x="6" y="20" width="40" height="26" rx="3"/><path d="M4 14h44v8H4zM26 14v32M26 14c-4-8-14-10-14-3s10 3 14 3c4 0 14 4 14-3s-10-5-14 3"/>',
    truck: '<path d="M4 12h28v24H4zM32 20h10l6 8v8H32z"/><circle cx="13" cy="39" r="4"/><circle cx="39" cy="39" r="4"/>',
    chat: '<path d="M6 8h40v26H22l-10 9v-9H6z"/><path d="M15 21h22M15 27h14"/>'
  };
  const svgIcon = (k) => `<svg class="ic" viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${svcIcons[k]}</svg>`;
  const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>';

  const waLink = (msg) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* ---------- photos ---------- */
  const IMG = "images/gallery/";
  const photo = (n, alt, sizes, eager) => `<img src="${IMG}${n}-sm.jpg" srcset="${IMG}${n}-sm.jpg 720w, ${IMG}${n}.jpg 1600w" sizes="${sizes}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const altOf = (n) => (G.find((g) => g.name === n) || {}).alt || "";
  if (window.HERO_PHOTO) $("#herophoto").innerHTML = photo(HERO_PHOTO.name, HERO_PHOTO.alt, "(max-width:760px) 100vw, 58vw", true);

  /* ---------- about ---------- */
  const A = window.ABOUT;
  if (A) {
    $("#about-title").textContent = A.title;
    $("#about-text").innerHTML = A.text.map((t) => `<p>${t}</p>`).join("");
    if (A.slogan) { $("#about-slogan").textContent = A.slogan; $("#about-slogan").hidden = false; }
    $("#about-points").innerHTML = A.points.map((t) => `<li>${t}</li>`).join("");
    $("#about-photos").innerHTML = A.photos.map((n, i) => `<figure class="ap${i}">${photo(n, altOf(n), i ? "(max-width:760px) 50vw, 22vw" : "(max-width:760px) 100vw, 45vw")}</figure>`).join("");
  } else $("#about").remove();

  /* ---------- products ---------- */
  const tagName = { honey: "عسل", hive: "من الخلية" };
  const card = (p) => `
      <article class="prod">
        <div class="pic${p.photo ? " real" : ""}">${p.photo ? photo(p.photo, p.name, "(max-width:680px) 50vw, 20vw") : icons[p.icon](p.tone)}</div>
        <div class="body">
          <span class="tag">${tagName[p.kind]}</span>
          <h3>${p.name}</h3>
          <p>${p.text}</p>
          <a class="btn wa sm" href="${waLink(`السلام عليكم، أريد طلب: ${p.name}`)}" target="_blank" rel="noopener">${waIcon}اطلب الآن</a>
        </div>
      </article>`;
  const groups = [["honey", "أنواع العسل", ""], ["hive", "مشتقات الخلية", "five"]];
  const drawProducts = (k) => {
    $("#grid").innerHTML = groups.filter(([g]) => k === "all" || k === g).map(([g, title, cls]) => `
      <div class="group">${k === "all" ? `<h3 class="gh">${title}</h3>` : ""}
        <div class="grid ${cls}">${P.filter((p) => p.kind === g).map(card).join("")}</div>
      </div>`).join("");
  };
  document.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((o) => o.setAttribute("aria-pressed", o === c));
    drawProducts(c.dataset.k);
  }));
  drawProducts("all");
  $("#product").innerHTML = '<option value="">اختر منتوجاً</option>' + P.map((p) => `<option>${p.name}</option>`).join("") + "<option>تشكيلة / هدية</option>";

  /* ---------- services ---------- */
  $("#svcs").innerHTML = SV.map((s) => `<div class="s">${svgIcon(s.icon)}<h3>${s.name}</h3><p>${s.text}</p></div>`).join("");

  /* ---------- social links ---------- */
  const soc = [["instagram", "إنستغرام"], ["tiktok", "تيك توك"], ["facebook", "فيسبوك"], ["youtube", "يوتيوب"]]
    .filter(([k]) => S[k]).map(([k, n]) => `<a class="btn ghost sm" href="${S[k]}" target="_blank" rel="noopener">${n}</a>`).join("");

  /* ---------- gallery + reels ---------- */
  $("#gal").innerHTML = G.map((g, i) => `<button type="button" class="gi" data-i="${i}" aria-label="تكبير: ${g.alt}">${photo(g.name, g.alt, "(max-width:600px) 50vw, 25vw")}</button>`).join("");
  {
    const lb = $("#lb"); let cur = 0;
    const show = (i) => {
      cur = (i + G.length) % G.length;
      $("#lbimg").src = IMG + G[cur].name + ".jpg"; $("#lbimg").alt = G[cur].alt; $("#lbcap").textContent = G[cur].alt;
    };
    $("#gal").addEventListener("click", (e) => { const b = e.target.closest(".gi"); if (b) { show(+b.dataset.i); lb.showModal(); } });
    $("#lbclose").onclick = () => lb.close();
    $("#lbnext").onclick = () => show(cur + 1);
    $("#lbprev").onclick = () => show(cur - 1);
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") show(cur + 1); if (e.key === "ArrowRight") show(cur - 1); });
    lb.addEventListener("close", () => { const b = $(`.gi[data-i="${cur}"]`); if (b) b.focus(); });
  }
  $("#reels-list").innerHTML = R.length
    ? R.map((v) => `<div class="reel"><video src="${v.src}" ${v.poster ? `poster="${v.poster}"` : ""} controls playsinline preload="metadata" title="${v.title || ""}"></video></div>`).join("")
    : `<div class="empty">قريباً: ريلز من داخل المنحل، من الخلية إلى الجرة.${soc ? `<div class="social">${soc}</div>` : ""}</div>`;
  if (soc) $("#footsoc").innerHTML = soc;

  /* ---------- contact ---------- */
  document.querySelectorAll(".wanum").forEach((e) => (e.textContent = S.whatsappDisplay));
  document.querySelectorAll(".walink").forEach((a) => (a.href = waLink("السلام عليكم، أريد الاستفسار عن منتوجات مناحل احاحان")));
  if (S.city) { $("#city").textContent = S.city; $("#cityrow").hidden = false; }
  if (!S.phoneIsSample) $("#sample").remove();

  $("#order").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const lines = [
      "السلام عليكم، أريد تقديم طلب:",
      `الاسم: ${f.get("name")}`,
      f.get("city") && `المدينة: ${f.get("city")}`,
      f.get("product") && `المنتوج: ${f.get("product")}`,
      f.get("qty") && `الكمية: ${f.get("qty")}`,
      f.get("msg") && `ملاحظة: ${f.get("msg")}`
    ].filter(Boolean).join("\n");
    $("#msgtext").textContent = lines;
    $("#send").href = waLink(lines);
    $("#out").classList.add("on");
    $("#send").focus();
  });
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText($("#msgtext").textContent); $("#copy").textContent = "تم النسخ ✓"; }
    catch { $("#copy").textContent = "انسخ النص يدوياً"; }
  });
  $("#year").textContent = new Date().getFullYear();
}

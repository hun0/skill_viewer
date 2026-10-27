(() => {
  const K = "hfxbm.pending", ID = "hfxbm-panel";
  const v = [...document.querySelectorAll("video")].find(x => x.videoWidth && x.offsetParent !== null) || document.querySelector("video");
  const u = new URL(location.href);
  const vid = u.searchParams.get("v") || (u.pathname.match(/\/(shorts|live|embed)\/([\w-]{11})/) || [])[2];
  if (!v || !vid) { alert("유튜브 영상 페이지에서 눌러 주세요."); return; }
  v.pause();
  const t = +v.currentTime.toFixed(3);
  let thumb = null;
  try {
    const W = 224, H = 126, c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, W, H);
    const s = Math.min(W / v.videoWidth, H / v.videoHeight), dw = v.videoWidth * s, dh = v.videoHeight * s;
    x.drawImage(v, (W - dw) / 2, (H - dh) / 2, dw, dh);
    thumb = c.toDataURL("image/jpeg", 0.72);
  } catch (e) {}
  const title = (document.querySelector("h1.ytd-watch-metadata, h1.title, #title h1") || {}).textContent || document.title.replace(/ - YouTube$/, "");
  const load = () => { try { return JSON.parse(localStorage.getItem(K) || "[]"); } catch (e) { return []; } };
  const save = a => { try { localStorage.setItem(K, JSON.stringify(a)); return true; } catch (e) { return false; } };
  const fmt = s => { const m = Math.floor(s / 60); return m + ":" + (s - m * 60).toFixed(2).padStart(5, "0"); };
  const el = (tag, css, txt) => { const e = document.createElement(tag); if (css) e.style.cssText = css; if (txt != null) e.textContent = txt; return e; };
  const btn = "font:13px system-ui,sans-serif;padding:7px 10px;border-radius:8px;border:1px solid #444;background:#222;color:#eee;cursor:pointer;";
  let p = document.getElementById(ID); if (p) p.remove();
  p = el("div", "position:fixed;top:72px;right:16px;z-index:2147483647;width:300px;background:#141416;color:#eee;border:1px solid #333;border-radius:12px;padding:12px;box-shadow:0 8px 30px rgba(0,0,0,.5);font:13px system-ui,sans-serif;display:grid;gap:8px;");
  p.id = ID;
  const head = el("div", "display:flex;justify-content:space-between;align-items:center;font-weight:600;", "스킬 북마크");
  const close = el("button", btn + "padding:2px 8px;", "×"); close.onclick = () => p.remove(); head.appendChild(close);
  const img = el("div", "width:100%;aspect-ratio:16/9;border-radius:8px;background:#000 center/cover no-repeat;border:1px solid #333;");
  if (thumb) img.style.backgroundImage = 'url("' + thumb + '")';
  const meta = el("div", "font:12px ui-monospace,Menlo,monospace;color:#e2b75c;", fmt(t) + (thumb ? "" : "  (썸네일 캡처 실패)"));
  const note = el("input", "width:100%;box-sizing:border-box;background:#0d0d0f;color:#eee;border:1px solid #333;border-radius:8px;padding:8px 10px;font:14px system-ui,sans-serif;");
  note.placeholder = "메모 (예: 궁극기 임팩트)"; note.maxLength = 200;
  const row = el("div", "display:flex;gap:6px;flex-wrap:wrap;");
  const add = el("button", btn + "background:#e2b75c;color:#111;border-color:#e2b75c;font-weight:600;", "＋ 담기");
  const copy = el("button", btn, "");
  const clear = el("button", btn + "color:#999;", "비우기");
  const info = el("div", "font-size:12px;color:#999;line-height:1.45;", "담은 북마크를 복사한 뒤 스킬 연출 라이브러리에서 Ctrl+V 하면 해당 캐릭터 줄 아래에 올라가요.");
  const refresh = () => { const n = load().length; copy.textContent = "복사 (" + n + ")"; copy.disabled = !n; };
  const doAdd = () => {
    const a = load(); a.push({ vid, t, note: note.value.trim(), thumb, title, at: Date.now() });
    if (!save(a)) { a[a.length - 1].thumb = null; save(a); }
    add.textContent = "담음 ✓"; add.disabled = true; refresh();
  };
  add.onclick = doAdd;
  note.addEventListener("keydown", e => { e.stopPropagation(); if (e.key === "Enter" && !add.disabled) doAdd(); });
  note.addEventListener("keyup", e => e.stopPropagation()); note.addEventListener("keypress", e => e.stopPropagation());
  copy.onclick = async () => {
    const items = load(); if (!items.length) return;
    const json = JSON.stringify({ v: 1, src: "youtube", items });
    const b = new TextEncoder().encode(json); let s = ""; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000));
    const code = "HFXBM1:" + btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    try { await navigator.clipboard.writeText(code); save([]); refresh(); info.textContent = items.length + "개를 복사했어요. 라이브러리 페이지에서 Ctrl+V 하세요."; info.style.color = "#cfe8c4"; }
    catch (e) { info.textContent = "복사하지 못했어요. 다시 눌러 주세요."; }
  };
  clear.onclick = () => { save([]); refresh(); };
  row.append(add, copy, clear);
  p.append(head, img, meta, note, row, info);
  document.body.appendChild(p);
  refresh(); setTimeout(() => note.focus(), 50);
})();

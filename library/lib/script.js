const DATA = /*__GAME_DATA__*/;

const COLORS = { phys:"--e-phys", fire:"--e-fire", ice:"--e-ice", light:"--e-light", wind:"--e-wind", quant:"--e-quant", imag:"--e-imag", ether:"--e-ether", dark:"--e-dark", water:"--e-water", wood:"--e-wood" };
const FALLBACK = ["--e-fire","--e-ice","--e-light","--e-wind","--e-imag","--e-dark","--e-ether","--e-phys","--e-quant","--e-wood","--e-water"];
const VIEWER_URL = "https://hun0.github.io/skill_viewer/";
const BILI_KEYS = [["궁극기","大招"],["스킬모음","全技能"],["스킬플레이","实机"]];
const BILI_KEYS_BOSS = [["보스전","boss战"],["연출","演出"]];

const GAMES = [
  { key:"hsr", tab:"스타레일", name:"붕괴: 스타레일", bili:"崩坏星穹铁道", file:"HSR", group:"ver",
    attrLabel:"속성", roleLabel:"운명의 길",
    yt: c => c.boss ? `星穹铁道 ${c.zh} boss` : `Honkai Star Rail ${c.en.replace("☆"," ")} skills ultimate showcase`,
    colors:{ "물리":"phys","화염":"fire","얼음":"ice","번개":"light","바람":"wind","양자":"quant","허수":"imag" },
    roles:["파멸","수렵","지식","화합","공허","보존","풍요","기억","환락"] },
  { key:"zzz", tab:"젠존제", name:"젠레스 존 제로", bili:"绝区零", file:"ZZZ", group:"ver",
    attrLabel:"속성", roleLabel:"특성",
    yt: c => `Zenless Zone Zero ${c.en} skills showcase`,
    colors:{ "물리":"phys","불":"fire","얼음":"ice","서리":"ice","전기":"light","에테르":"ether","바람":"wind","현묵":"dark","서슬":"quant","루멘":"imag" },
    roles:["강공","격파","이상","지원","방어","명파","단조"] },
  { key:"ww", tab:"명조", name:"명조: 워더링 웨이브", bili:"鸣潮", file:"WW", group:"ver",
    attrLabel:"속성", roleLabel:"무기",
    yt: c => `Wuthering Waves ${c.en} skills showcase`,
    colors:{ "응결":"ice","용융":"fire","전도":"light","기류":"wind","회절":"imag","인멸":"dark" } },
  { key:"nte", tab:"이환", name:"이환", bili:"异环", file:"NTE", group:"ver",
    attrLabel:"속성", roleLabel:"역할",
    yt: c => `Neverness to Everness ${c.en} skills showcase`,
    colors:{ "빛":"imag","령":"wind","주":"ether","암":"dark","혼":"quant","상":"fire" },
    roles:["딜러","버프","생존"] },
  { key:"e7", tab:"에픽세븐", name:"에픽세븐", bili:"第七史诗", file:"E7", group:"year",
    attrLabel:"속성", roleLabel:"직업",
    yt: c => `에픽세븐 ${c.ko} 스킬`,
    colors:{ "화염":"fire","냉기":"water","자연":"wood","광":"imag","암":"dark" },
    roles:["기사","전사","도적","사수","정령사","마도사"] },
  { key:"gi", tab:"원신", name:"원신", bili:"原神", file:"GI", group:"ver",
    attrLabel:"원소", roleLabel:"무기",
    yt: c => `Genshin Impact ${c.en} character demo`,
    colors:{ "불":"fire","물":"water","바람":"wind","번개":"dark","풀":"wood","얼음":"ice","바위":"imag" },
    roles:["한손검","양손검","장병기","법구","활"] },
  { key:"r99", tab:"리버스1999", name:"리버스: 1999", bili:"重返未来1999", file:"R99", group:"ver",
    attrLabel:"영감", roleLabel:"피해 유형",
    yt: c => `Reverse 1999 ${c.en} ultimate showcase`,
    colors:{ "야수":"fire","나무":"wood","천체":"water","암석":"imag","영혼":"dark","지능":"ether" },
    roles:["현실","정신"] },
  { key:"pgr", tab:"퍼니싱", name:"퍼니싱: 그레이 레이븐", bili:"战双帕弥什", file:"PGR", group:"year",
    attrLabel:"속성", roleLabel:"직업",
    yt: c => `Punishing Gray Raven ${c.en} showcase`,
    colors:{ "물리":"phys","불":"fire","얼음":"ice","번개":"light","암흑":"dark","공허":"quant" },
    roles:["공격형","아머형","보조형","선봉형","증폭형","관통형","인멸형","관측자","융합형"] },
  { key:"nikke", tab:"니케", name:"승리의 여신: 니케", bili:"胜利女神妮姬", file:"NIKKE", group:"year",
    attrLabel:"코드", roleLabel:"버스트",
    yt: c => `NIKKE ${c.en} burst showcase`,
    colors:{ "작열":"fire","수냉":"water","풍압":"wind","철갑":"imag","전격":"light" },
    roles:["버스트 I","버스트 II","버스트 III","버스트 A"] },
  { key:"ake", tab:"엔드필드", name:"명일방주: 엔드필드", bili:"明日方舟终末地", file:"AKE", group:"ver",
    attrLabel:"속성", roleLabel:"직군",
    yt: c => `Arknights Endfield ${c.en} operator combat demo`,
    colors:{ "물리":"phys","열기":"fire","냉기":"ice","전기":"light","자연":"wood" },
    roles:["가드","캐스터","서포터","디펜더","뱅가드","스트라이커"] },
  { key:"bd2", tab:"브더2", name:"브라운더스트2", bili:"棕色尘埃2", file:"BD2", group:"year",
    attrLabel:"속성", roleLabel:"코스튬",
    yt: c => `Brown Dust 2 ${c.en.replace(" - ", " ")} skill`,
    colors:{ "불":"fire","물":"water","바람":"wind","빛":"imag","어둠":"dark" },
    roles:["일반","스페셜","프레스티지"] }
].filter(g => DATA[g.key] && DATA[g.key].roster && DATA[g.key].roster.length);

GAMES.forEach(g => {
  const d = DATA[g.key];
  g.roster = d.roster; g.bosses = d.bosses || []; g.note = d.note || ""; g.src = d.src || "";
  g.attrs = [...new Set(g.roster.map(c => c.attr).filter(Boolean))];
  g.roleList = g.roles ? g.roles.filter(r => g.roster.some(c => c.role === r)) : [...new Set(g.roster.map(c => c.role).filter(Boolean))];
  let fi = 0; g.attrVar = {};
  g.attrs.forEach(a => { g.attrVar[a] = g.colors[a] ? COLORS[g.colors[a]] : FALLBACK[fi++ % FALLBACK.length]; });
  g.released = g.roster.filter(c => !c.upcoming).length;
});

const SNAP = DATA.snapshot || { links:{}, thumbs:{}, at:"" };
const SPRITES = DATA.sprites || {};
const state = { game: GAMES[0], q:"", sort:"ver-desc", onlyEmpty:false, elems:new Set(), paths:new Set(), links: SNAP.links, thumbs: SNAP.thumbs, bosses: SNAP.bosses || {}, bms: SNAP.bookmarks || {}, tags: SNAP.tags || {}, smode: "name", me: null, armed:null, mode:"loading", readonly:true };
const LS_KEY = "hsr-gameplay-links-v1";
let db = null;

const $ = s => document.querySelector(s);
const verNum = v => String(v).split(".").map(Number).reduce((a,b,i)=> a + b * (i ? 1 : 100), 0);
const sortKey = c => state.game.group === "year" ? (c.date || String(c.ver)) : verNum(c.ver);
const cmp = (a, b) => { const x = sortKey(a), y = sortKey(b); return x < y ? -1 : x > y ? 1 : 0; };

function ytInfo(url) {
  try {
    const u = new URL(url);
    let id = null;
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1).split("/")[0];
    else if (u.hostname.includes("youtube.com")) {
      id = u.searchParams.get("v");
      const m = u.pathname.match(/\/(shorts|embed|live)\/([^/?]+)/);
      if (!id && m) id = m[2];
    }
    if (!id && (u.hostname.includes("bilibili.com") || u.hostname.includes("b23.tv"))) {
      const m = u.pathname.match(/(BV[0-9A-Za-z]{10})/);
      id = m ? m[1] : (u.hostname.includes("b23.tv") ? "b23.tv" + u.pathname : null);
    }
    const t = u.searchParams.get("t");
    return { id, t, yt: !!id };
  } catch { return { id:null, t:null, yt:false }; }
}

/* ---------- mobile: open in the app ---------- */
const UA = navigator.userAgent || "";
const IS_ANDROID = /Android/i.test(UA);
const IS_IOS = /iPhone|iPad|iPod/i.test(UA);
const IS_MOBILE = IS_ANDROID || IS_IOS;
function appUrl(url) {
  if (!IS_MOBILE) return null;
  try {
    const u = new URL(url);
    const fb = `S.browser_fallback_url=${encodeURIComponent(url)};end`;
    const bv = u.pathname.match(/(BV[0-9A-Za-z]{10})/);
    if (u.hostname.includes("bilibili.com") && bv) {
      return IS_ANDROID ? `intent://video/${bv[1]}#Intent;scheme=bilibili;package=tv.danmaku.bili;${fb}` : `bilibili://video/${bv[1]}`;
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const rest = (u.hostname.includes("youtu.be") ? `www.youtube.com/watch?v=${u.pathname.slice(1)}${u.searchParams.get("t") ? "&t=" + u.searchParams.get("t") : ""}` : u.host + u.pathname + u.search);
      return IS_ANDROID ? `intent://${rest.replace(/^m\./, "www.")}#Intent;scheme=https;package=com.google.android.youtube;${fb}` : `youtube://${rest}`;
    }
  } catch {}
  return null;
}

function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => el.hidden = true, 1800);
}
function esc(s) { return String(s ?? "").replace(/[&<>"]/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[ch])); }

/* ---------- game switching ---------- */
function buildTabs() {
  const nav = $("#tabs");
  GAMES.forEach(g => {
    const a = document.createElement("a");
    a.href = "#" + g.key; a.className = "tab"; a.dataset.key = g.key; a.textContent = g.tab;
    nav.appendChild(a);
  });
}
function selectGame(key) {
  const g = GAMES.find(x => x.key === key) || GAMES[0];
  state.game = g; state.elems.clear(); state.paths.clear(); state.q = ""; $("#q").value = "";
  document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-current", t.dataset.key === g.key ? "page" : "false"));
  $("#gname").textContent = g.name;
  $("#gsub").textContent = `플레이어블 캐릭터 ${g.released}명` + (g.roster.length > g.released ? ` + 출시 예정 ${g.roster.length - g.released}명` : "") + ". 캐릭터마다 영상 링크를 붙여넣으면 저장됩니다.";
  const src = $("#gsrc"); src.innerHTML = g.src; src.hidden = !g.src;
  const gn = $("#gnote"); gn.textContent = g.note; gn.hidden = !g.note;
  $("#elemLabel").textContent = g.attrLabel; $("#pathLabel").textContent = g.roleLabel;
  buildChips(); render();
  window.scrollTo(0, 0);
  const cur = document.querySelector(`.tab[data-key="${g.key}"]`); if (cur) cur.scrollIntoView({ block: "nearest", inline: "nearest" });
}

/* ---------- filters ---------- */
function buildChips() {
  const g = state.game;
  const ec = $("#elemChips"); ec.querySelectorAll(".chip").forEach(n => n.remove());
  g.attrs.forEach(e => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.setAttribute("aria-pressed","false");
    b.innerHTML = `<span class="dot" style="background:var(${g.attrVar[e]})"></span>${esc(e)}`;
    b.onclick = () => { toggle(state.elems, e); b.setAttribute("aria-pressed", state.elems.has(e)); render(); };
    ec.appendChild(b);
  });
  const pc = $("#pathChips"); pc.querySelectorAll(".chip").forEach(n => n.remove());
  g.roleList.forEach(p => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.setAttribute("aria-pressed","false"); b.textContent = p;
    b.onclick = () => { toggle(state.paths, p); b.setAttribute("aria-pressed", state.paths.has(p)); render(); };
    pc.appendChild(b);
  });
  $("#pathChips").hidden = !g.roleList.length;
}
function toggle(set, v) { set.has(v) ? set.delete(v) : set.add(v); }

/* ---------- render ---------- */
function matches(c, q) {
  return [c.ko, c.en, c.zh, c.code].some(v => v && String(v).toLowerCase().includes(q));
}
function tagHit(c, q) { return (state.tags[c.id] || []).some(t => t.toLowerCase().includes(q)); }
function bmHit(bm, q) { return [bm.note, bm.title].some(v => v && String(v).toLowerCase().includes(q)); }
function crossSearch() { return state.smode !== "name" && !!state.q.trim(); }
function searchHit(c, q) {
  if (state.smode === "tag") return tagHit(c, q);
  if (state.smode === "bm") return (state.bms[c.id] || []).some(b => bmHit(b, q));
  return matches(c, q);
}
function filtered() {
  const q = state.q.trim().toLowerCase();
  const pool = crossSearch() ? GAMES.flatMap(g => [...g.roster, ...bossesOf(g)]) : state.game.roster;
  let list = pool.filter(c => {
    if (q && !searchHit(c, q)) return false;
    if (!crossSearch() && state.elems.size && !state.elems.has(c.attr)) return false;
    if (!crossSearch() && state.paths.size && !state.paths.has(c.role)) return false;
    if (state.onlyEmpty && (state.links[c.id] || []).length) return false;
    return true;
  });
  if (state.sort === "name") list.sort((a,b) => a.ko.localeCompare(b.ko, "ko"));
  else if (state.sort === "ver-asc") list.sort(cmp);
  else list.sort((a,b) => cmp(b,a));
  return list;
}

function render() {
  const g = state.game;
  updateFilterCount();
  const filled = g.roster.filter(c => !c.upcoming && (state.links[c.id] || []).length).length;
  $("#count").innerHTML = `<b>${filled}</b> / ${g.released} 채움`;
  $("#barFill").style.width = (g.released ? filled / g.released * 100 : 0) + "%";

  const main = $("#main");
  const focusId = document.activeElement && document.activeElement.id;
  const drafts = {};
  main.querySelectorAll("input").forEach(i => { if (i.value) drafts[i.id] = i.value; });
  main.textContent = "";

  const list = filtered();
  const q = state.q.trim().toLowerCase();
  if (crossSearch()) {
    if (!list.length) { main.innerHTML = `<p class="nores">${state.smode === "tag" ? "이 태그" : "이 메모"}가 달린 캐릭터가 없어요.</p>`; return; }
    GAMES.forEach(gg => {
      const its = list.filter(c => gameOf(c) === gg.key); if (!its.length) return;
      const sec = document.createElement("section"); sec.className = "group";
      const h = document.createElement("h2"); h.innerHTML = `<span class="ver"></span><span class="gfill">${its.length}명</span>`; h.querySelector(".ver").textContent = gg.tab;
      sec.appendChild(h);
      const box = document.createElement("div"); box.className = "list";
      its.forEach(c => box.appendChild(rowFor(c))); sec.appendChild(box); main.appendChild(sec);
    });
    return;
  }
  const bosses = (state.elems.size || state.paths.size) ? [] : bossesOf(g).filter(b =>
    (!q || searchHit(b, q) || (state.smode === "name" && ("보스".includes(q) || q.includes("보스")))) &&
    !(state.onlyEmpty && (state.links[b.id] || []).length));
  const canAddBoss = !state.readonly && state.mode === "db" && !state.elems.size && !state.paths.size;
  if (!list.length && !bosses.length && !canAddBoss) { main.innerHTML = `<p class="nores">조건에 맞는 캐릭터가 없어요.</p>`; return; }

  const groups = [];
  if (state.sort === "name") groups.push({ title:null, items:list });
  else list.forEach(c => {
    const t = String(c.ver);
    const last = groups[groups.length-1];
    if (last && last.title === t) last.items.push(c); else groups.push({ title:t, items:[c] });
  });

  groups.forEach(gr => {
    const sec = document.createElement("section"); sec.className = "group";
    if (gr.title) {
      const gf = gr.items.filter(c => (state.links[c.id]||[]).length).length;
      const up = gr.items.some(c => c.upcoming) ? '<span class="upcoming">출시 예정</span>' : "";
      const h = document.createElement("h2");
      h.innerHTML = (g.group === "year" ? `<span class="ver">${esc(gr.title)}</span>년 출시` : `버전 <span class="ver">${esc(gr.title)}</span>`) + up + `<span class="gfill">${gf}/${gr.items.length}</span>`;
      sec.appendChild(h);
    }
    const box = document.createElement("div"); box.className = "list";
    gr.items.forEach(c => box.appendChild(rowFor(c)));
    sec.appendChild(box); main.appendChild(sec);
  });

  if (bosses.length || canAddBoss) {
    const sec = document.createElement("section"); sec.className = "group";
    const gf = bosses.filter(b => (state.links[b.id]||[]).length).length;
    sec.innerHTML = `<h2><span class="ver">보스 연출</span><span class="gfill">${gf}/${bosses.length}</span></h2>`;
    if (bosses.length) {
      const box = document.createElement("div"); box.className = "list";
      bosses.forEach(b => box.appendChild(rowFor(b)));
      sec.appendChild(box);
    }
    if (canAddBoss) {
      const f = document.createElement("form"); f.className = "bossadd";
      f.innerHTML = `<input type="text" id="boss-name-${g.key}" placeholder="보스 이름 (예: 죽음의 용)" aria-label="새 보스 이름" maxlength="40" required>
        <input type="text" id="boss-zh-${g.key}" placeholder="중국어 이름 (선택, 빌리빌리 검색용)" aria-label="보스 중국어 이름" maxlength="40">
        <button class="btn primary" type="submit">보스 추가</button>`;
      f.onsubmit = e => { e.preventDefault(); addBoss(g, f); };
      sec.appendChild(f);
    }
    main.appendChild(sec);
  }

  Object.entries(drafts).forEach(([id,v]) => { const el = document.getElementById(id); if (el) el.value = v; });
  if (focusId) { const el = document.getElementById(focusId); if (el) el.focus(); }
}

function rarityHTML(c) {
  if (typeof c.rarity === "number") return `<span class="star ${c.rarity === 4 ? "four" : ""}">${"★".repeat(c.rarity)}</span>`;
  if (c.rarity) return `<span class="rank r-${esc(String(c.rarity).toLowerCase())}">${esc(c.rarity)}</span>`;
  return "";
}

function rowFor(c) {
  const g = GAMES.find(x => x.key === gameOf(c)) || state.game;
  const items = state.links[c.id] || [];
  const row = document.createElement("div");
  row.className = "char" + (items.length ? " done" : "");

  const who = document.createElement("div"); who.className = "who";
  const tags = [c.attr, c.role].filter(Boolean).map(esc).join(" · ");
  who.innerHTML = c.boss
    ? `<div class="name"></div>
    <div class="meta"><span>보스${c.dur ? " · " + esc(c.dur) : ""}</span><span class="en"></span></div>`
    : `<div class="name"></div>
    <div class="meta">${rarityHTML(c)}${c.moonlight ? '<span class="ml">월광</span>' : ""}<span>${tags}</span><span class="en"></span>${c.code ? `<span class="code">${esc(c.code)}</span>` : ""}</div>`;
  who.querySelector(".name").textContent = c.ko;
  who.querySelector(".en").textContent = c.en;
  who.prepend(thumbFor(c, c.boss ? "--danger" : (g.attrVar[c.attr] || "--muted")));
  who.appendChild(tagRow(c));

  const links = document.createElement("div"); links.className = "links";
  const ll = document.createElement("div"); ll.className = "linklist";
  if (!items.length) {
    const e = document.createElement("span"); e.className = "empty-hint";
    e.textContent = c.upcoming ? "출시 후 추가" : "아직 링크 없음"; ll.appendChild(e);
  }
  items.forEach((it, idx) => {
    const info = ytInfo(it.url);
    const chip = document.createElement("span"); chip.className = "link";
    const a = document.createElement("a"); a.href = it.url; a.target = "_blank"; a.rel = "noopener";
    const lbl = it.label || `영상 ${idx+1}`;
    a.innerHTML = `<span class="lbl"></span> <span class="vid"></span>`;
    a.querySelector(".lbl").textContent = lbl;
    a.querySelector(".vid").textContent = info.yt ? info.id + (info.t ? ` @${info.t}` : "") : (() => { try { return new URL(it.url).hostname; } catch { return "링크"; } })();
    a.title = it.url;
    const app = appUrl(it.url);
    const yv = ytId(it.url);
    if (yv) {
      const pv = document.createElement("a"); pv.className = "play"; pv.target = "_blank"; pv.rel = "noopener";
      pv.href = `${VIEWER_URL}?v=${encodeURIComponent(yv.id)}${yv.t ? "&t=" + encodeURIComponent(String(yv.t).replace(/s$/, "")) : ""}&title=${encodeURIComponent(`${c.ko} · ${lbl}`)}&c=${encodeURIComponent(c.id)}`;
      pv.textContent = "▶"; pv.title = "프레임 뷰어로 보기";
      pv.setAttribute("aria-label", `${c.ko} ${lbl} 프레임 뷰어로 보기`);
      chip.appendChild(pv);
    }
    chip.appendChild(a);
    if (app) {
      const w = document.createElement("a"); w.className = "web"; w.href = app;
      w.textContent = "앱"; w.setAttribute("aria-label", `${c.ko} ${lbl} 앱에서 열기`);
      chip.appendChild(w);
    }
    if (!state.readonly) {
      const x = document.createElement("button"); x.type = "button"; x.textContent = "×";
      x.setAttribute("aria-label", `${c.ko} ${lbl} 삭제`);
      x.onclick = () => removeLink(c, idx);
      chip.appendChild(x);
    }
    ll.appendChild(chip);
  });
  links.appendChild(ll);

  const term = (c.zh || c.en || "").replace(/[·•]/g, " ");
  if (term) {
    const bs = document.createElement("div"); bs.className = "bsearch";
    bs.innerHTML = `<span class="bs-label">빌리빌리 검색</span><span class="zh"></span>` +
      (c.boss ? BILI_KEYS_BOSS : BILI_KEYS).map(([ko, kw]) => `<a target="_blank" rel="noopener" href="https://search.bilibili.com/all?keyword=${encodeURIComponent(`${g.bili} ${term} ${kw}`)}" title="${kw}">${ko} ↗</a>`).join("");
    bs.querySelector(".zh").textContent = c.zh || "";
    links.appendChild(bs);
  }

  if (!state.readonly) {
    const f = document.createElement("form"); f.className = "addform";
    f.innerHTML = `<input type="url" id="u-${c.id}" placeholder="영상 링크 붙여넣기" aria-label="${esc(c.ko)} 영상 링크" required>
      <input type="text" id="l-${c.id}" placeholder="라벨 (선택)" aria-label="${esc(c.ko)} 링크 라벨" maxlength="20">
      <button class="btn primary" type="submit">추가</button>
      <span class="err" hidden></span>`;
    f.onsubmit = e => { e.preventDefault(); addLink(c, f); };
    links.appendChild(f);
  }

  const side = document.createElement("div"); side.className = "side";
  const ytSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(g.yt(c))}`;
  side.innerHTML = `<a class="yt" target="_blank" rel="noopener" href="${esc(ytSearch)}">유튜브에서 찾기 ↗</a>`;
  if (c.custom && !state.readonly && state.mode === "db") {
    const rm = document.createElement("button"); rm.type = "button"; rm.className = "yt rmboss"; rm.textContent = "보스 삭제";
    rm.onclick = () => {
      if (rm.dataset.armed) { removeBoss(c); return; }
      rm.dataset.armed = "1"; rm.textContent = "한 번 더 누르면 삭제";
      setTimeout(() => { if (rm.isConnected) { delete rm.dataset.armed; rm.textContent = "보스 삭제"; } }, 3000);
    };
    side.appendChild(rm);
  }
  if (items.length) {
    const d = document.createElement("button"); d.type = "button"; d.className = "dl";
    d.textContent = "다운로드 명령 복사";
    d.setAttribute("aria-label", `${c.ko} 영상 다운로드 명령어 복사`);
    d.onclick = () => copyText(dlCommand(c, items), `${c.ko}: 다운로드 명령어를 복사했어요. 터미널에 붙여넣으세요`);
    side.appendChild(d);
  }

  row.append(who, links, side);
  const bl = state.bms[c.id];
  if (bl && bl.length) row.appendChild(bmStrip(c, bl));
  return row;
}

/* ---------- custom bosses ---------- */
function bossesOf(g) {
  const custom = Object.entries(state.bosses)
    .filter(([, b]) => b && b.game === g.key)
    .sort((a, b) => String(a[1].createdAt || "").localeCompare(String(b[1].createdAt || "")))
    .map(([id, b]) => ({ id, ko: b.ko, zh: b.zh || "", en: "Boss", boss: true, custom: true, ver: "보스", dur: "" }));
  return [...g.bosses, ...custom];
}
async function addBoss(g, form) {
  const name = form.querySelector(`#boss-name-${g.key}`).value.trim();
  const zh = form.querySelector(`#boss-zh-${g.key}`).value.trim();
  if (!name || !db) return;
  const id = `boss-${g.key}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const doc = { game: g.key, ko: name, zh, createdAt: new Date().toISOString() };
  state.bosses = { ...state.bosses, [id]: doc }; render();
  try { await db.collection("bosses").doc(id).set(doc); toast(`보스 '${name}' 추가됨`); }
  catch { const n = { ...state.bosses }; delete n[id]; state.bosses = n; render(); toast("보스를 추가하지 못했어요"); }
}
async function removeBoss(c) {
  try {
    await db.collection("bosses").doc(c.id).delete();
    if ((state.links[c.id] || []).length) { try { await db.collection("links").doc(c.id).delete(); } catch {} }
    if (state.thumbs[c.id]) { const a = state.thumbs[c.id]; try { await db.collection("thumbs").doc(c.id).delete(); if (assets) await assets.delete(a); } catch {} }
    const n = { ...state.bosses }; delete n[c.id]; state.bosses = n; render();
    toast(`보스 '${c.ko}' 삭제됨`);
  } catch { toast("보스를 삭제하지 못했어요"); }
}

/* ---------- thumbnails ---------- */
let assets = null;
const IS_TOUCH = matchMedia("(pointer: coarse)").matches;
function thumbFor(c, colorVar) {
  const assetId = state.thumbs[c.id];
  const box = document.createElement(assets ? "button" : "div");
  box.className = "thumb" + (assetId ? " has" : "");
  box.style.borderLeftColor = `var(${colorVar})`;
  if (assets) { box.type = "button"; box.id = `t-${c.id}`; box.dataset.cid = c.id; box.setAttribute("aria-label", `${c.ko} 썸네일 ${assetId ? "바꾸기" : "넣기"}`); }
  if (assetId) {
    const img = document.createElement("img");
    img.src = "/_blob/" + assetId; img.alt = ""; img.loading = "lazy"; img.decoding = "async";
    img.onerror = () => { img.remove(); box.classList.remove("has"); box.insertAdjacentHTML("beforeend", `<span class="ph">${esc(c.ko.slice(0, 1))}</span>`); };
    box.appendChild(img);
  } else if (spriteFor(c)) {
    const sp = spriteFor(c), i = document.createElement("i");
    i.className = "spr"; i.style.backgroundImage = `url("${sp.file}")`;
    i.style.backgroundSize = `${sp.cols * 100}% ${sp.rows * 100}%`;
    i.style.backgroundPosition = `${sp.cols > 1 ? sp.col / (sp.cols - 1) * 100 : 0}% ${sp.rows > 1 ? sp.row / (sp.rows - 1) * 100 : 0}%`;
    box.classList.add("has", "sp"); box.appendChild(i);
    if (assets) box.insertAdjacentHTML("beforeend", '<span class="plus">+</span>');
  } else {
    box.innerHTML = `<span class="ph">${esc(c.ko.slice(0, 1))}</span>${assets ? '<span class="plus">+</span>' : ""}`;
  }
  if (!assets) return box;
  if (state.armed === c.id) box.classList.add("armed");
  box.onclick = () => {
    if (IS_TOUCH || state.armed === c.id) { pickFile(c); return; }
    state.armed = c.id;
    document.querySelectorAll(".thumb.armed").forEach(t => t.classList.remove("armed"));
    box.classList.add("armed");
    toast(`${c.ko}: Ctrl+V로 붙여넣기 · 한 번 더 누르면 파일 선택`);
  };
  box.ondragover = e => { e.preventDefault(); box.classList.add("drop"); };
  box.ondragleave = () => box.classList.remove("drop");
  box.ondrop = e => {
    e.preventDefault(); box.classList.remove("drop");
    const f = [...(e.dataTransfer.files || [])].find(f => f.type.startsWith("image/"));
    if (f) setThumb(c, f); else toast("이미지 파일을 끌어다 놓아 주세요");
  };
  if (assetId) {
    const x = document.createElement("span"); x.className = "tx"; x.textContent = "×"; x.title = "썸네일 지우기";
    x.onclick = e => { e.stopPropagation(); clearThumb(c); };
    box.appendChild(x);
  }
  return box;
}
const SPR_IDX = {};
function spriteFor(c) {
  if (c.boss) return null;
  const pre = GAMES.find(x => x.key !== "hsr" && c.id.startsWith(x.key + "-"));
  const key = pre ? pre.key : "hsr", sp = SPRITES[key];
  if (!sp) return null;
  if (!SPR_IDX[key]) { SPR_IDX[key] = new Map(); sp.ids.forEach((id, i) => { if (id) SPR_IDX[key].set(id, i); }); }
  const i = SPR_IDX[key].get(c.id);
  if (i == null) return null;
  return { file: sp.file, cols: sp.cols, rows: sp.rows, col: i % sp.cols, row: Math.floor(i / sp.cols) };
}
function findChar(id) {
  for (const g of GAMES) { const c = g.roster.find(x => x.id === id) || bossesOf(g).find(x => x.id === id); if (c) return c; }
  return null;
}
function pickFile(c) {
  const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
  inp.onchange = () => { const f = inp.files && inp.files[0]; if (f) setThumb(c, f); };
  inp.click();
}
document.addEventListener("paste", e => {
  if (!assets || !state.armed) return;
  const t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
  const item = [...(e.clipboardData ? e.clipboardData.items : [])].find(i => i.type.startsWith("image/"));
  if (!item) { toast("클립보드에 이미지가 없어요"); return; }
  e.preventDefault();
  const c = findChar(state.armed); if (c) setThumb(c, item.getAsFile());
});
async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const max = 320, s = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const cv = document.createElement("canvas");
  cv.width = Math.max(1, Math.round(bmp.width * s)); cv.height = Math.max(1, Math.round(bmp.height * s));
  cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
  const blob = await new Promise(r => cv.toBlob(r, "image/webp", 0.86));
  return blob && blob.type === "image/webp" ? blob : await new Promise(r => cv.toBlob(r, "image/jpeg", 0.88));
}
async function setThumb(c, file) {
  if (!assets || !db) return;
  const old = state.thumbs[c.id];
  try {
    toast(`${c.ko}: 썸네일 올리는 중…`);
    let blob = file;
    try { blob = await shrink(file); } catch {}
    const res = await assets.upload(blob, { type: blob.type || "image/png" });
    await db.collection("thumbs").doc(c.id).set({ asset: res.id, game: state.game.key, updatedAt: new Date().toISOString() });
    state.thumbs[c.id] = res.id; state.armed = null; render();
    toast(`${c.ko}: 썸네일 저장됨`);
    if (old && old !== res.id) { try { await assets.delete(old); } catch {} }
  } catch (e) {
    const code = e && e.code;
    toast(code === "too_large" ? "이미지가 너무 커요" : code === "unsupported_type" ? "PNG·JPG·WebP 이미지만 넣을 수 있어요" : code === "quota_or_state" ? "저장 공간이 가득 찼어요" : "썸네일을 저장하지 못했어요");
  }
}
async function clearThumb(c) {
  const old = state.thumbs[c.id]; if (!old) return;
  try {
    await db.collection("thumbs").doc(c.id).delete();
    delete state.thumbs[c.id]; render();
    try { await assets.delete(old); } catch {}
    toast(`${c.ko}: 썸네일 지움`);
  } catch { toast("썸네일을 지우지 못했어요"); }
}

/* ---------- effect tags under the thumbnail ---------- */
function allTags() { const m = new Map(); Object.values(state.tags).forEach(l => (l || []).forEach(t => m.set(t, (m.get(t) || 0) + 1))); return [...m.entries()].sort((a, b) => b[1] - a[1]).map(x => x[0]); }
function refreshTagList() { const dl = $("#tagList"); dl.textContent = ""; allTags().forEach(t => { const o = document.createElement("option"); o.value = t; dl.appendChild(o); }); }
function tagRow(c) {
  const wrap = document.createElement("div"); wrap.className = "tags";
  const tags = state.tags[c.id] || [];
  const editable = !state.readonly && state.mode === "db";
  tags.forEach(t => {
    const chip = document.createElement("span"); chip.className = "tag";
    const b = document.createElement("button"); b.type = "button"; b.className = "tag-t"; b.textContent = t; b.title = `'${t}' 태그로 모든 게임 검색`;
    b.onclick = () => searchFor("tag", t);
    chip.appendChild(b);
    if (editable) { const x = document.createElement("button"); x.type = "button"; x.className = "tag-x"; x.textContent = "×"; x.setAttribute("aria-label", `${c.ko} 태그 ${t} 지우기`); x.onclick = () => saveTags(c, tags.filter(v => v !== t)); chip.appendChild(x); }
    wrap.appendChild(chip);
  });
  if (editable && state.tagEditing === c.id) {
    const inp = document.createElement("input"); inp.type = "text"; inp.className = "tag-in"; inp.id = `tg-${c.id}`; inp.maxLength = 40; inp.setAttribute("list", "tagList"); inp.placeholder = "예: 번개, 검기"; inp.setAttribute("aria-label", `${c.ko} 태그 입력`);
    const commit = () => { const vals = inp.value.split(/[,#]/).map(v => v.trim()).filter(Boolean); state.tagEditing = null; if (vals.length) saveTags(c, [...new Set([...tags, ...vals])]); else render(); };
    inp.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); commit(); } else if (e.key === "Escape") { state.tagEditing = null; render(); } };
    inp.onblur = () => setTimeout(() => { if (!inp.isConnected || state.tagEditing !== c.id || document.activeElement && document.activeElement.id === inp.id) return; if (inp.value.trim()) commit(); else { state.tagEditing = null; render(); } }, 150);
    wrap.appendChild(inp);
    setTimeout(() => { const el = document.getElementById(inp.id); if (el && document.activeElement !== el) el.focus(); }, 0);
  } else if (editable) {
    const add = document.createElement("button"); add.type = "button"; add.className = "tag-add"; add.textContent = tags.length ? "+" : "+ 태그"; add.setAttribute("aria-label", `${c.ko} 태그 추가`);
    add.onclick = () => { state.tagEditing = c.id; render(); };
    wrap.appendChild(add);
  }
  return wrap;
}
async function saveTags(c, next) {
  if (!db) return;
  const prev = state.tags[c.id] || [];
  state.tags = { ...state.tags, [c.id]: next }; render();
  try {
    const ref = db.collection("tags").doc(c.id);
    if (next.length) await ref.set({ tags: next, game: gameOf(c), ko: c.ko, updatedAt: new Date().toISOString() });
    else await ref.delete();
  } catch { state.tags = { ...state.tags, [c.id]: prev }; render(); toast("태그를 저장하지 못했어요"); }
}
function searchFor(mode, text) {
  state.smode = mode; $("#smode").value = mode; state.q = text; $("#q").value = text; setPlaceholder(); render(); window.scrollTo(0, 0);
}
function setPlaceholder() { $("#q").placeholder = state.smode === "tag" ? "태그 검색 (모든 게임)" : state.smode === "bm" ? "북마크 메모 검색 (모든 게임)" : "이름 검색 (한글·영문·중문)"; }

/* ---------- bookmarks: frame + note cards under each character ---------- */
function fmtT(t) { t = Math.max(0, +t || 0); const m = Math.floor(t / 60), x = t - m * 60; return `${m}:${x.toFixed(2).padStart(5, "0")}`; }
function viewerHref(vid, t, title, cid) {
  return `${VIEWER_URL}?v=${encodeURIComponent(vid)}&t=${Math.max(0, Math.floor(+t || 0))}&title=${encodeURIComponent(title || "")}${cid ? "&c=" + encodeURIComponent(cid) : ""}&at=${encodeURIComponent(String(+t || 0))}`;
}
function bmStrip(c, list) {
  const wrap = document.createElement("div"); wrap.className = "bms";
  const head = document.createElement("div"); head.className = "bms-h"; head.textContent = `북마크 ${list.length}`;
  wrap.appendChild(head);
  const strip = document.createElement("div"); strip.className = "bms-list";
  [...list].sort((a, b) => (a.vid === b.vid ? a.t - b.t : String(a.at).localeCompare(String(b.at)))).forEach(bm => {
    const card = document.createElement("div"); card.className = "bm" + (state.smode === "bm" && state.q.trim() && bmHit(bm, state.q.trim().toLowerCase()) ? " hit" : "");
    const a = document.createElement("a"); a.className = "bm-th"; a.target = "_blank"; a.rel = "noopener";
    a.href = viewerHref(bm.vid, bm.t, `${c.ko} · 북마크`, c.id);
    a.setAttribute("aria-label", `${c.ko} ${fmtT(bm.t)} 북마크 프레임 뷰어로 보기`);
    if (bm.thumb && /^data:image\/(jpeg|png|webp);base64,/.test(bm.thumb)) { const img = document.createElement("img"); img.src = bm.thumb; img.alt = ""; img.loading = "lazy"; a.appendChild(img); }
    else { const ph = document.createElement("span"); ph.className = "bm-ph"; ph.textContent = "▶"; a.appendChild(ph); }
    const tc = document.createElement("span"); tc.className = "bm-t"; tc.textContent = fmtT(bm.t); a.appendChild(tc);
    const note = document.createElement("p"); note.className = "bm-n"; note.textContent = bm.note || "(메모 없음)"; note.title = bm.note || "";
    card.append(a, note);
    if (!state.readonly && state.mode === "db") {
      const x = document.createElement("button"); x.type = "button"; x.className = "bm-x"; x.textContent = "×";
      x.setAttribute("aria-label", `${fmtT(bm.t)} 북마크 삭제`);
      x.onclick = () => {
        if (x.dataset.armed) { removeBookmark(bm); return; }
        x.dataset.armed = "1"; x.textContent = "삭제?"; setTimeout(() => { if (x.isConnected) { delete x.dataset.armed; x.textContent = "×"; } }, 2500);
      };
      card.appendChild(x);
    }
    strip.appendChild(card);
  });
  wrap.appendChild(strip);
  return wrap;
}
function updateFillBtn() {
  const btn = $("#bmFillBtn"); if (!btn) return;
  const miss = [];
  Object.values(state.bms).forEach(l => l.forEach(b => { if (!b.thumb && b.vid) miss.push({ i: b.id, v: b.vid, t: +b.t || 0 }); }));
  btn.hidden = state.readonly || state.mode !== "db" || !miss.length || IS_MOBILE;
  if (!miss.length) return;
  miss.sort((a, b) => a.v === b.v ? a.t - b.t : a.v < b.v ? -1 : 1);
  const json = JSON.stringify({ v: 1, items: miss.slice(0, 300) });
  const bytes = new TextEncoder().encode(json); let bin = ""; bytes.forEach(x => { bin += String.fromCharCode(x); });
  btn.href = `${VIEWER_URL}#job=${btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`;
  btn.textContent = `썸네일 채우기 (${miss.length})`;
}
async function removeBookmark(bm) {
  if (!db) return;
  try { await db.collection("bookmarks").doc(bm.id).delete(); toast("북마크 삭제됨"); }
  catch { toast("북마크를 지우지 못했어요"); }
}
function decodeCodes(text) {
  const out = [];
  (String(text || "").match(/HFXBM1:[A-Za-z0-9_-]+/g) || []).forEach(code => {
    try {
      let b = code.slice(7).replace(/-/g, "+").replace(/_/g, "/"); while (b.length % 4) b += "=";
      const bin = atob(b), bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const obj = JSON.parse(new TextDecoder().decode(bytes));
      (obj.items || []).forEach(it => { if (it && /^[\w-]{11}$/.test(it.vid || "")) out.push({ vid: it.vid, t: Math.max(0, +it.t || 0), fps: +it.fps || null, note: String(it.note || "").slice(0, 200), thumb: typeof it.thumb === "string" && it.thumb.length < 60000 && /^data:image\/(jpeg|png|webp);base64,/.test(it.thumb) ? it.thumb : null, c: typeof it.c === "string" ? it.c : null, id: typeof it.id === "string" && /^bm-\w+$/.test(it.id) ? it.id : null, title: String(it.title || "").slice(0, 120) }); });
    } catch {}
  });
  return out;
}
function charsForVideo(vid) {
  const hits = [];
  Object.entries(state.links).forEach(([cid, items]) => { if ((items || []).some(it => { const y = ytId(it.url); return y && y.id === vid; })) { const c = findChar(cid); if (c) hits.push(c); } });
  return hits;
}
function gameOf(c) { const pre = GAMES.find(x => x.key !== "hsr" && c.id.startsWith(x.key + "-")); if (pre) return pre.key; const b = state.bosses[c.id]; return b ? b.game : "hsr"; }
async function importBookmarks(text) {
  const items = decodeCodes(text);
  if (!items.length) return false;
  if (!db || state.mode !== "db" || state.readonly) { toast("북마크를 올리려면 편집 가능한 계정으로 열어 주세요"); return true; }
  const pending = []; let filled = 0;
  const byId = {}; Object.values(state.bms).forEach(l => l.forEach(b => { byId[b.id] = b; }));
  for (const it of items.filter(x => x.id)) {
    if (!byId[it.id] || !it.thumb) continue;
    try { await db.collection("bookmarks").doc(it.id).update({ thumb: it.thumb }); filled++; } catch {}
  }
  if (items.some(x => x.id)) { toast(filled ? `썸네일 ${filled}개를 채웠어요` : "채울 북마크를 찾지 못했어요"); return true; }
  for (const it of items) {
    let c = it.c ? findChar(it.c) : null;
    if (!c) { const hits = charsForVideo(it.vid); if (hits.length === 1) c = hits[0]; else it.cands = hits; }
    if (c) await saveBookmark(c, it); else pending.push(it);
  }
  const saved = items.length - pending.length;
  if (saved) toast(`북마크 ${saved}개를 올렸어요`);
  if (pending.length) askChar(pending);
  return true;
}
async function saveBookmark(c, it) {
  const id = `bm-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const doc = { char: c.id, game: gameOf(c), vid: it.vid, t: it.t, fps: it.fps, note: it.note, thumb: it.thumb, title: it.title, by: state.me || "", at: new Date().toISOString() };
  try { await db.collection("bookmarks").doc(id).set(doc); return true; }
  catch (e) { toast(e && e.code === "quota_exceeded" ? "저장 공간이 가득 찼어요" : "북마크를 저장하지 못했어요"); return false; }
}
function askChar(list) {
  const dlg = $("#bmDlg"), body = $("#bmDlgBody"); body.textContent = "";
  let idx = 0;
  const step = () => {
    body.textContent = "";
    if (idx >= list.length) { dlg.close(); return; }
    const it = list[idx];
    const top = document.createElement("div"); top.className = "ask-top";
    if (it.thumb) { const img = document.createElement("img"); img.src = it.thumb; img.alt = ""; top.appendChild(img); }
    const info = document.createElement("div");
    const t1 = document.createElement("b"); t1.textContent = `${fmtT(it.t)} · ${it.note || "(메모 없음)"}`;
    const t2 = document.createElement("small"); t2.textContent = it.title || it.vid;
    info.append(t1, document.createElement("br"), t2); top.appendChild(info);
    const q = document.createElement("input"); q.type = "search"; q.placeholder = "캐릭터 이름 검색"; q.setAttribute("aria-label", "캐릭터 이름 검색");
    const res = document.createElement("div"); res.className = "ask-res";
    const pick = async c => { if (await saveBookmark(c, it)) toast(`${c.ko}에 북마크를 올렸어요`); idx++; step(); };
    const draw = () => {
      res.textContent = "";
      const term = q.value.trim().toLowerCase();
      let pool = (it.cands && it.cands.length && !term) ? it.cands : [];
      if (term) GAMES.forEach(g => [...g.roster, ...bossesOf(g)].forEach(c => { if (pool.length < 30 && matches(c, term)) pool.push(c); }));
      if (!pool.length && !term) { const p = document.createElement("p"); p.className = "ask-hint"; p.textContent = "이 영상이 연결된 캐릭터가 없어요. 이름으로 찾아 주세요."; res.appendChild(p); }
      pool.forEach(c => { const b = document.createElement("button"); b.type = "button"; b.className = "btn"; const g = GAMES.find(x => x.key === gameOf(c)); b.textContent = `${c.ko}${g ? " · " + g.tab : ""}`; b.onclick = () => pick(c); res.appendChild(b); });
    };
    q.oninput = draw;
    const skip = document.createElement("button"); skip.type = "button"; skip.className = "btn"; skip.textContent = "이 북마크 건너뛰기"; skip.onclick = () => { idx++; step(); };
    const cnt = document.createElement("p"); cnt.className = "ask-hint"; cnt.textContent = `어느 캐릭터의 북마크인가요? (${idx + 1}/${list.length})`;
    body.append(cnt, top, q, res, skip);
    draw(); setTimeout(() => q.focus(), 30);
  };
  step();
  if (!dlg.open) dlg.showModal();
}
document.addEventListener("paste", async e => {
  const t = e.target;
  const text = e.clipboardData ? e.clipboardData.getData("text") : "";
  if (!text || !text.includes("HFXBM1:")) return;
  if (t && t.id !== "bmPaste" && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
  e.preventDefault();
  if (t && t.id === "bmPaste") { t.value = ""; $("#bmPasteDlg").close(); }
  await importBookmarks(text);
});
$("#bmPasteBtn").onclick = () => { $("#bmPasteDlg").showModal(); setTimeout(() => $("#bmPaste").focus(), 30); };
$("#bmPaste").addEventListener("input", async e => { const v = e.target.value; if (v.includes("HFXBM1:")) { e.target.value = ""; $("#bmPasteDlg").close(); if (!(await importBookmarks(v)) ) toast("북마크 코드를 읽지 못했어요"); } });
document.querySelectorAll("dialog [data-close]").forEach(b => b.onclick = () => b.closest("dialog").close());

/* ---------- storage ---------- */
async function saveLinks(c, next) {
  const prev = state.links[c.id] || [];
  state.links[c.id] = next; render();
  try {
    if (state.mode === "db") {
      const ref = db.collection("links").doc(c.id);
      if (next.length) await ref.set({ items: next, game: state.game.key, ko: c.ko, en: c.en, ver: String(c.ver), updatedAt: new Date().toISOString() });
      else await ref.delete();
    } else {
      try { localStorage.setItem(LS_KEY, JSON.stringify(state.links)); } catch {}
    }
    return true;
  } catch (e) {
    state.links[c.id] = prev; render();
    if (e && e.code === "invalid_argument") { state.readonly = true; render(); toast("이 화면에서는 링크를 저장할 수 없어요"); }
    else if (e && e.code === "quota_exceeded") toast("저장 공간이 가득 찼어요");
    else toast("저장하지 못했어요. 잠시 후 다시 시도해 주세요");
    return false;
  }
}

async function addLink(c, form) {
  const u = form.querySelector('input[type="url"]'), l = form.querySelector('input[type="text"]'), err = form.querySelector(".err");
  const url = u.value.trim(); err.hidden = true;
  if (!/^https?:\/\//i.test(url)) { err.textContent = "http로 시작하는 주소를 넣어 주세요"; err.hidden = false; return; }
  const cur = state.links[c.id] || [];
  if (cur.some(x => x.url === url)) { err.textContent = "이미 추가된 링크예요"; err.hidden = false; return; }
  const next = [...cur.map(x => ({...x})), { url, label: l.value.trim() }];
  u.value = ""; l.value = "";
  if (await saveLinks(c, next)) toast(`${c.ko}: 링크 저장됨`);
}

async function removeLink(c, idx) {
  const next = (state.links[c.id] || []).filter((_, i) => i !== idx).map(x => ({...x}));
  if (await saveLinks(c, next)) toast(`${c.ko}: 링크 삭제됨`);
}

/* ---------- download ---------- */
const COOKIE_KEY = "hsr-dl-cookie";
function cookieBrowser() { try { const v = localStorage.getItem(COOKIE_KEY); if (v !== null) return v; } catch {} return "firefox"; }

function cleanUrl(url) {
  try {
    const u = new URL(url);
    const bv = u.pathname.match(/(BV[0-9A-Za-z]{10})/);
    if (u.hostname.includes("bilibili.com") && bv) {
      const p = u.searchParams.get("p");
      return `https://www.bilibili.com/video/${bv[1]}/` + (p && p !== "1" ? `?p=${p}` : "");
    }
    return url;
  } catch { return url; }
}
function safeName(s) { return String(s).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "").replace(/\s+/g, "_").slice(0, 60); }
function dlCommand(c, items) {
  const br = cookieBrowser();
  const cookie = br ? `--cookies-from-browser ${br} ` : "";
  return items.map((it, i) => {
    const name = `${state.game.file}_${c.ver}_${safeName(c.ko)}_${safeName(it.label || "영상" + (i + 1))}`;
    return `yt-dlp ${cookie}-f "bv*+ba/b" --merge-output-format mp4 -o "${name}.%(ext)s" "${cleanUrl(it.url)}"`;
  }).join("\n");
}
async function copyText(text, msg) {
  try { await navigator.clipboard.writeText(text); toast(msg); }
  catch {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(msg); } catch { toast("복사하지 못했어요"); }
    ta.remove();
  }
}

/* ---------- csv ---------- */
$("#copyCsv").onclick = () => {
  const g = state.game;
  const q = v => `"${String(v ?? "").replace(/"/g,'""')}"`;
  const lines = [["게임","버전","한글명","English","中文","등급",g.attrLabel,g.roleLabel,"라벨","링크"].join(",")];
  [...[...g.roster].sort(cmp), ...bossesOf(g)].forEach(c => {
    const base = [g.tab, c.ver, c.ko, c.en, c.zh, c.rarity, c.attr, c.role];
    const items = state.links[c.id] || [];
    if (!items.length) lines.push([...base, "", ""].map(q).join(","));
    items.forEach(it => lines.push([...base, it.label, it.url].map(q).join(",")));
  });
  copyText(lines.join("\n"), `${g.tab} CSV를 클립보드에 복사했어요`);
};

/* ---------- boot ---------- */
$("#q").addEventListener("input", e => { state.q = e.target.value; render(); });
$("#smode").addEventListener("change", e => { state.smode = e.target.value; setPlaceholder(); render(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
$("#onlyEmpty").onclick = e => { state.onlyEmpty = !state.onlyEmpty; e.currentTarget.setAttribute("aria-pressed", state.onlyEmpty); render(); };
$("#filterBtn").onclick = () => { const f = $("#filters"); const o = !f.classList.contains("open"); f.classList.toggle("open", o); $("#filterBtn").setAttribute("aria-expanded", o); };
document.addEventListener("click", e => { const t = $("#tools"); if (t.open && !t.contains(e.target)) t.open = false; });
$("#tools").addEventListener("click", e => { if (e.target.closest(".mi")) setTimeout(() => { $("#tools").open = false; }, 0); });
function updateFilterCount() { const n = state.elems.size + state.paths.size + (state.onlyEmpty ? 1 : 0); const b = $("#fcount"); b.textContent = n; b.hidden = !n; }
buildTabs();
const fromHash = () => (location.hash || "").replace("#", "");
window.addEventListener("hashchange", () => selectGame(fromHash()));
selectGame(fromHash());

function useSnapshot() {
  state.mode = "snapshot"; state.readonly = true;
  const n = $("#notice");
  n.textContent = `보기 전용 화면이에요 (${SNAP.at} 기준). 링크 추가·수정은 편집 권한이 있는 계정으로 로그인하면 할 수 있어요.`;
  n.hidden = false;
  render();
}

(async () => {
  try { db = window.claude && claude.use ? await claude.use("db") : null; } catch { db = null; }
  if (!db) { useSnapshot(); return; }
  try {
    const user = await claude.use("user");
    if (user && user.can) { const w = await user.can("data.write"); if (w === false) state.readonly = true; }
  } catch {}
  state.mode = "db";
  if (state.readonly && !(await (async () => { try { const u = await claude.use("user"); return u && u.can && (await u.can("data.write")) === false; } catch { return false; } })())) state.readonly = false;
  // one subscription per game keeps each query well under the 1000-document window
  const perGame = {};
  let linkErr = false;
  GAMES.forEach(g => {
    db.collection("links").where("game", "==", g.key).onSnapshot(snap => {
      const m = {};
      snap.docs.forEach(d => { const v = d.data(); if (v && Array.isArray(v.items)) m[d.id] = v.items; });
      perGame[g.key] = m;
      const base = { ...SNAP.links };
      Object.keys(perGame).forEach(k => { const gg = GAMES.find(x => x.key === k); if (gg) [...gg.roster, ...bossesOf(gg)].forEach(c => delete base[c.id]); });
      state.links = Object.assign(base, ...Object.values(perGame));
      if (state.game.key === g.key) render();
    }, () => { if (!linkErr) { linkErr = true; toast("링크를 불러오지 못했어요. 새로고침해 주세요"); } });
  });
  db.collection("bosses").onSnapshot(snap => {
    const m = {};
    snap.docs.forEach(d => { const v = d.data(); if (v && v.game && v.ko) m[d.id] = { game: v.game, ko: v.ko, zh: v.zh || "", createdAt: v.createdAt || "" }; });
    state.bosses = m; render();
  }, () => {});
  try { const u = await claude.use("user"); if (u && u.id) state.me = await u.id(); } catch {}
  db.collection("tags").onSnapshot(snap => {
    const m = {};
    snap.docs.forEach(d => { const v = d.data(); if (v && Array.isArray(v.tags) && v.tags.length) m[d.id] = v.tags.map(String); });
    state.tags = m; refreshTagList(); render();
  }, () => {});
  db.collection("bookmarks").onSnapshot(snap => {
    const m = {};
    snap.docs.forEach(d => { const v = d.data(); if (v && v.char && v.vid) (m[v.char] = m[v.char] || []).push({ id: d.id, ...v }); });
    state.bms = m; render(); updateFillBtn();
  }, () => {});
  db.collection("thumbs").onSnapshot(snap => {
    const m = {};
    snap.docs.forEach(d => { const v = d.data(); if (v && typeof v.asset === "string") m[d.id] = v.asset; });
    state.thumbs = m; render();
  }, () => {});
  $("#bmPasteBtn").hidden = state.readonly;
  try { assets = await claude.use("assets"); } catch { assets = null; }
  if (assets) render();
})();

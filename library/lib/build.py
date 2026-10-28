import json, re, os, sys
os.makedirs(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "dist"), exist_ok=True)
B = os.path.dirname(os.path.abspath(__file__))
src = open(f"{B}/hsr_source.html", encoding="utf-8").read()
css = re.search(r"<style>(.*?)</style>", src, re.S).group(1)
css = css.replace("/* Layout: one long roster grouped by patch version, like a stop list on a rail timetable; sticky filter bar on top */",
                  "/* Layout: game tabs on top, then one long roster grouped by patch or release year like a timetable; sticky filter bar */")
light = "  --e-ether: #c2448f; --e-dark: #6a4bb0; --e-water: #2c78c9; --e-wood: #4f9a36;\n"
dark  = "    --e-ether: #e77bbd; --e-dark: #a588ee; --e-water: #64a8f0; --e-wood: #7fc865;\n"
css = css.replace("  --e-wind: #239f78; --e-quant: #5156cc; --e-imag: #c4941c;\n", "  --e-wind: #239f78; --e-quant: #5156cc; --e-imag: #c4941c;\n" + light, 1)
css = css.replace("    --e-wind: #4fcf9f; --e-quant: #8a8ef5; --e-imag: #ecc24f;\n    color-scheme: dark;\n  }",
                  "    --e-wind: #4fcf9f; --e-quant: #8a8ef5; --e-imag: #ecc24f;\n" + dark + "    color-scheme: dark;\n  }", 1)
css = css.replace("  --e-wind: #4fcf9f; --e-quant: #8a8ef5; --e-imag: #ecc24f;\n  color-scheme: dark;\n}",
                  "  --e-wind: #4fcf9f; --e-quant: #8a8ef5; --e-imag: #ecc24f;\n" + dark.replace("    ", "  ", 1) + "  color-scheme: dark;\n}", 1)
assert css.count("--e-ether") == 3, css.count("--e-ether")
css = css.replace("header.top { padding-block: 28px 12px;", "header.top { padding-block: 12px 12px;")
css += open(f"{B}/extra.css", encoding="utf-8").read()

# HSR data
rows = re.findall(r'\["([a-z0-9-]+)","([^"]+)","([^"]+)",(\d),"([^"]+)","([^"]+)","([\d.]+)"\]', src)
zh = dict(re.findall(r'"([a-z0-9-]+)":"([^"]+)"', re.search(r"const ZH = \{(.*?)\};", src, re.S).group(1)))
hsr = [{"id":r[0],"ko":r[1],"en":r[2],"zh":zh.get(r[0],""),"rarity":int(r[3]),"attr":r[4],"role":r[5],"ver":r[6],**({"upcoming":True} if r[6]=="4.7" else {})} for r in rows]
bosses = [
  {"id":"boss-flame-reaver","ko":"盗火行者","zh":"盗火行者","en":"Boss","dur":"0:39"},
  {"id":"boss-dead-dragon","ko":"死龙","zh":"死龙","en":"Boss","dur":"0:32"},
  {"id":"boss-sky","ko":"至高，至阳，天空的化身","zh":"天空的化身","en":"Boss","dur":"1:40"},
  {"id":"boss-feixiao","ko":"비소 (보스전)","zh":"飞霄","en":"Boss · 飞霄","dur":"1:00"},
  {"id":"boss-31-cg","ko":"3.1 보스전 CG","zh":"3.1 Boss战","en":"Boss · CG","dur":"3:11"}]
for b in bosses: b.update({"boss":True,"ver":"보스"})
data = {"hsr": {"roster": hsr, "bosses": bosses,
  "src": '링크는 <a href="https://space.bilibili.com/47359729" target="_blank" rel="noopener">Citrus橘颜</a>의 스킬 참고 합집을 우선하고, 없으면 <a href="https://space.bilibili.com/258583859" target="_blank" rel="noopener">擒龙小师弟</a>의 「崩铁角色技能合集」입니다. 라벨이 업로더를 뜻해요.'}}
for key in ["zzz","ww","nte","e7","gi","r99","pgr","nikke","ake","bd2","hi3","dna","mgl","gbvs","kny"]:
    p = f"{B}/../games/{key}.json"
    if os.path.exists(p): data[key] = json.load(open(p, encoding="utf-8"))
import glob, datetime
snap_links = {}
for f in glob.glob(f"{B}/../snap/links/*.json"):
    d = json.load(open(f, encoding="utf-8"))
    if d.get("items"): snap_links[os.path.basename(f)[:-5]] = d["items"]
snap_thumbs = {}
for f in glob.glob(f"{B}/../snap/thumbs/*.json"):
    d = json.load(open(f, encoding="utf-8"))
    if d.get("asset"): snap_thumbs[os.path.basename(f)[:-5]] = d["asset"]
snap_bosses = {}
for f in glob.glob(f"{B}/../snap/bosses/*.json"):
    d = json.load(open(f, encoding="utf-8"))
    if d.get("game") and d.get("ko"): snap_bosses[os.path.basename(f)[:-5]] = {"game": d["game"], "ko": d["ko"], "zh": d.get("zh",""), "createdAt": d.get("createdAt","")}
snap_bms = {}
for f in glob.glob(f"{B}/../snap/bookmarks/*.json"):
    d = json.load(open(f, encoding="utf-8"))
    if d.get("char") and d.get("vid"): snap_bms.setdefault(d["char"], []).append({"id": os.path.basename(f)[:-5], **{k: d.get(k) for k in ["vid","t","fps","note","thumb","title","at"]}})
snap_tags = {}
for f in glob.glob(f"{B}/../snap/tags/*.json"):
    d = json.load(open(f, encoding="utf-8"))
    if d.get("tags"): snap_tags[os.path.basename(f)[:-5]] = [str(t) for t in d["tags"]]
sprites = {}
BLOBS = json.load(open(f"{B}/../sprites/blobs.json"))
for f in glob.glob(f"{B}/../sprites/*.json"):
    if f.endswith("blobs.json"): continue
    m = json.load(open(f)); g = m["game"]
    ids = [("" if i in m.get("bad", []) else i) for i in m["ids"]]
    sprites[g] = {"file": f"/_blob/{BLOBS[g]}", "cols": m["cols"], "rows": m["rows"], "ids": ids}
data["sprites"] = sprites
data["snapshot"] = {"links": snap_links, "thumbs": snap_thumbs, "bosses": snap_bosses, "bookmarks": snap_bms, "tags": snap_tags, "at": datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9))).strftime("%m월 %d일 %H:%M")}
print({k: len(v["roster"]) for k, v in data.items() if k not in ("snapshot","sprites")}, "snapshot links", len(snap_links), "thumbs", len(snap_thumbs))

js = (open(f"{B}/script.js", encoding="utf-8").read() + "\n" + open(f"{B}/viewer.js", encoding="utf-8").read()).replace("/*__GAME_DATA__*/", json.dumps(data, ensure_ascii=False))
head = '<title>스킬 연출 라이브러리</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbit&family=IBM+Plex+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">\n'
out = head + "<style>" + css + "</style>\n\n" + open(f"{B}/markup.html", encoding="utf-8").read() + "\n<script>\n" + js + "</script>\n"
open(f"{B}/../dist/library.html", "w", encoding="utf-8").write(out)
open(f"{B}/../dist/check.js", "w", encoding="utf-8").write(js)

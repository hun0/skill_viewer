/* ---------- language switch (한국어 / English / 中文) ----------
   UI text is written in Korean in the code; this layer swaps it on screen.
   Fixed strings go through DICT, templated ones through RULES, game-specific terms through GDICT. */
const LANGS = ["ko", "en", "zh"];
let LANG = (() => { try { const v = localStorage.getItem("hfx-lib-lang"); if (LANGS.includes(v)) return v; } catch {} return "ko"; })();
const L = (ko, en, zh) => LANG === "en" ? en : LANG === "zh" ? zh : ko;
const nm = c => LANG === "ko" ? c.ko : LANG === "en" ? (c.boss ? (c.ko) : (c.en || c.ko)) : (c.zh || (c.boss ? c.ko : c.en) || c.ko);
const sub = c => LANG === "ko" ? c.en : LANG === "en" ? (c.boss ? (c.zh || "Boss") : c.ko) : (c.boss ? "Boss" : (c.zh ? c.en : c.ko));

const GI18N = {
  hsr:["Star Rail","Honkai: Star Rail","星铁","崩坏：星穹铁道"], zzz:["ZZZ","Zenless Zone Zero","绝区零","绝区零"],
  ww:["Wuthering Waves","Wuthering Waves","鸣潮","鸣潮"], nte:["NTE","Neverness to Everness","异环","异环"],
  e7:["Epic Seven","Epic Seven","第七史诗","第七史诗"], gi:["Genshin","Genshin Impact","原神","原神"],
  r99:["Reverse: 1999","Reverse: 1999","重返未来","重返未来：1999"], pgr:["PGR","Punishing: Gray Raven","战双","战双帕弥什"],
  nikke:["NIKKE","Goddess of Victory: NIKKE","妮姬","胜利女神：妮姬"], ake:["Endfield","Arknights: Endfield","终末地","明日方舟：终末地"],
  bd2:["BD2","Brown Dust 2","棕色尘埃2","棕色尘埃2"], hi3:["Honkai 3rd","Honkai Impact 3rd","崩坏3","崩坏3"],
  dna:["DNA","Duet Night Abyss","二重螺旋","二重螺旋"], mgl:["Mongil","Mongil: STAR DIVE","Mongil","Mongil: STAR DIVE"],
  gbvs:["GBVS","Granblue Fantasy Versus: Rising","碧蓝VS","碧蓝幻想Versus：Rising"], kny:["Hinokami 2","Demon Slayer: The Hinokami Chronicles 2","火之神2","鬼灭之刃 火之神血风谭2"],
  ap:["Azur","Azur Promilia","蓝色星原","蓝色星原：旅谣"], sp:["Silver Palace","Silver Palace","白银之城","白银之城"],
  mt:["Tōkon","MARVEL Tōkon: Fighting Souls","漫威斗魂","漫威斗魂：Fighting Souls"], mr:["Marvel Rivals","Marvel Rivals","漫威争锋","漫威争锋"], sn:["Strinova","Strinova","卡拉彼丘","卡拉彼丘"], er:["Eternal Return","Eternal Return","永恒轮回","永恒轮回"],
  gg:["Guilty Gear","GUILTY GEAR -STRIVE-","罪恶装备","罪恶装备 -Strive-"], db:["DBFZ","Dragon Ball FighterZ","龙珠斗士Z","龙珠斗士Z"], bb:["BlazBlue","BlazBlue: Central Fiction","苍翼默示录","苍翼默示录：神观之梦"], dnf:["DNF Duel","DNF Duel","DNF Duel","DNF Duel"],
  gbr:["GBF Relink","Granblue Fantasy: Relink","碧蓝 Relink","碧蓝幻想 Relink"],
  lol:["LoL","League of Legends","英雄联盟","英雄联盟"], tft:["TFT","Teamfight Tactics · Set 18","云顶","云顶之弈 · S18"],
  val:["VALORANT","VALORANT","无畏契约","无畏契约"], "2xko":["2XKO","2XKO","2XKO","2XKO"]
};
const gTab = g => { const t = GI18N[g.key]; return !t || LANG === "ko" ? g.tab : LANG === "en" ? t[0] : t[2]; };
const gName = g => { const t = GI18N[g.key]; return !t || LANG === "ko" ? g.name : LANG === "en" ? t[1] : t[3]; };

/* fixed strings: "한국어": ["English", "中文"] */
const DICT = {
  "스킬 연출 라이브러리":["Skill FX Library","技能演出资料库"],
  "이름":["Name","名称"], "태그":["Tag","标签"], "북마크":["Bookmark","书签"],
  "최신순":["Newest","最新"], "오래된순":["Oldest","最早"], "이름순":["By name","按名称"],
  "필터":["Filter","筛选"], "썸네일 채우기":["Fill thumbnails","补全缩略图"], "도구 ▾":["Tools ▾","工具 ▾"],
  "북마크 붙여넣기":["Paste bookmarks","粘贴书签"], "CSV 복사":["Copy CSV","复制 CSV"], "링크 없는 캐릭터만":["Only without links","仅显示无链接"],
  "썸네일 없는 북마크를 뷰어에서 한 번에 캡처해요":["Capture every bookmark without a thumbnail in the viewer at once","在查看器中一次性截取所有缺少缩略图的书签"],
  "프레임 뷰어의 ‘라이브러리로 보내기’나 유튜브 북마크 버튼의 ‘복사’로 복사한 코드를 아래에 붙여넣으세요. 데스크톱에서는 이 창 없이 페이지 아무 곳에서 Ctrl+V 해도 돼요.":
    ["Paste the code copied with ‘Send to library’ in the frame viewer or ‘Copy’ on the YouTube bookmark button. On desktop you can also just press Ctrl+V anywhere on the page.","请粘贴从帧查看器的“发送到资料库”或 YouTube 书签按钮的“复制”得到的代码。桌面端也可以直接在页面任意位置按 Ctrl+V。"],
  "여기에 붙여넣기 (HFXBM1:…)":["Paste here (HFXBM1:…)","在此粘贴 (HFXBM1:…)"], "유튜브 북마크 버튼 설치":["Install the YouTube bookmark button","安装 YouTube 书签按钮"],
  "닫기":["Close","关闭"],
  "이름 검색 (한글·영문·중문)":["Search names (Korean · English · Chinese)","搜索名称（韩·英·中）"],
  "태그 검색 (모든 게임)":["Search tags (all games)","搜索标签（全部游戏）"], "북마크 메모 검색 (모든 게임)":["Search bookmark notes (all games)","搜索书签备注（全部游戏）"],
  "출시 예정":["Upcoming","即将推出"], "보스 연출":["Boss FX","Boss 演出"], "보스":["Boss","Boss"], "월광":["Moonlight","月光"],
  "출시 후 추가":["Added after release","上线后添加"], "아직 링크 없음":["No links yet","暂无链接"],
  "프레임 뷰어로 보기":["Open in frame viewer","在帧查看器中打开"], "앱":["App","App"],
  "빌리빌리 검색":["Bilibili search","B站搜索"], "궁극기":["Ultimate","大招"], "스킬모음":["Skill compilation","技能合集"], "스킬플레이":["Gameplay","实机"],
  "보스전":["Boss fight","Boss战"], "연출":["Cutscene","演出"],
  "영상 링크 붙여넣기":["Paste a video link","粘贴视频链接"], "라벨 (선택)":["Label (optional)","标签（可选）"], "추가":["Add","添加"],
  "유튜브에서 찾기":["Find on YouTube","在 YouTube 搜索"], "보스 삭제":["Delete boss","删除 Boss"], "한 번 더 누르면 삭제":["Tap again to delete","再按一次删除"],
  "다운로드 명령 복사":["Copy download command","复制下载命令"],
  "보스 이름 (예: 죽음의 용)":["Boss name (e.g. Death Dragon)","Boss 名称（例：死亡之龙）"],
  "중국어 이름 (선택, 빌리빌리 검색용)":["Chinese name (optional, for Bilibili search)","中文名（可选，用于B站搜索）"], "보스 추가":["Add boss","添加 Boss"],
  "썸네일 지우기":["Remove thumbnail","删除缩略图"], "예: 번개, 검기":["e.g. lightning, sword aura","例：闪电、剑气"], "+ 태그":["+ Tag","+ 标签"],
  "(메모 없음)":["(no note)","（无备注）"], "삭제?":["Delete?","删除？"],
  "조건에 맞는 캐릭터가 없어요.":["No characters match.","没有符合条件的角色。"],
  "이 태그가 달린 캐릭터가 없어요.":["No characters have this tag.","没有角色带有此标签。"], "이 메모가 달린 캐릭터가 없어요.":["No bookmarks have this note.","没有书签带有此备注。"],
  "캐릭터 이름 검색":["Search character name","搜索角色名"], "이 북마크 건너뛰기":["Skip this bookmark","跳过此书签"],
  "이 영상이 연결된 캐릭터가 없어요. 이름으로 찾아 주세요.":["No character is linked to this video. Search by name.","没有角色关联此视频，请按名称搜索。"],
  "(자동생성) 스킬모음":["(auto) Skill compilation","（自动）技能合集"], "공식 소개":["Official trailer","官方介绍"], "공식 콜라보 PV":["Official collab PV","官方联动 PV"],
  "공식 챔피언 스포트라이트":["Official Champion Spotlight","官方英雄聚焦"], "스킬 참고":["Skill reference","技能参考"],
  "링크는":["Links come from","链接优先使用"], "의 스킬 참고 합집을 우선하고, 없으면":["'s skill reference compilations first, otherwise","的技能参考合集，没有时使用"],
  "의 「崩铁角色技能合集」입니다. 라벨이 업로더를 뜻해요.":["'s 「崩铁角色技能合集」. The label names the uploader.","的「崩铁角色技能合集」。标签表示上传者。"],
  "보스를 추가하지 못했어요":["Couldn't add the boss","无法添加 Boss"], "보스를 삭제하지 못했어요":["Couldn't delete the boss","无法删除 Boss"],
  "이미지 파일을 끌어다 놓아 주세요":["Drop an image file","请拖入图片文件"], "클립보드에 이미지가 없어요":["No image on the clipboard","剪贴板中没有图片"],
  "이미지가 너무 커요":["The image is too large","图片太大"], "PNG·JPG·WebP 이미지만 넣을 수 있어요":["Only PNG, JPG or WebP images","仅支持 PNG·JPG·WebP 图片"],
  "저장 공간이 가득 찼어요":["Storage is full","存储空间已满"], "썸네일을 저장하지 못했어요":["Couldn't save the thumbnail","无法保存缩略图"],
  "썸네일을 지우지 못했어요":["Couldn't remove the thumbnail","无法删除缩略图"], "태그를 저장하지 못했어요":["Couldn't save the tag","无法保存标签"],
  "북마크 삭제됨":["Bookmark deleted","书签已删除"], "북마크를 지우지 못했어요":["Couldn't delete the bookmark","无法删除书签"],
  "북마크를 올리려면 편집 가능한 계정으로 열어 주세요":["Open with an account that can edit to add bookmarks","请使用可编辑的账号打开以添加书签"],
  "채울 북마크를 찾지 못했어요":["No bookmarks to fill","没有需要补全的书签"], "북마크를 저장하지 못했어요":["Couldn't save the bookmark","无法保存书签"],
  "북마크 코드를 읽지 못했어요":["Couldn't read the bookmark code","无法读取书签代码"], "이 화면에서는 링크를 저장할 수 없어요":["Links can't be saved on this screen","此页面无法保存链接"],
  "저장하지 못했어요. 잠시 후 다시 시도해 주세요":["Couldn't save. Please try again shortly","保存失败，请稍后再试"],
  "http로 시작하는 주소를 넣어 주세요":["Enter an address starting with http","请输入以 http 开头的地址"], "이미 추가된 링크예요":["This link is already added","该链接已添加"],
  "복사하지 못했어요":["Couldn't copy","复制失败"], "링크를 불러오지 못했어요. 새로고침해 주세요":["Couldn't load links. Please refresh","无法加载链接，请刷新"],
  /* filter labels */
  "속성":["Element","属性"], "운명의 길":["Path","命途"], "특성":["Specialty","特性"], "구분":["Type","类别"], "역할군":["Role","定位"],
  "근접 무기":["Melee weapon","近战武器"], "무기":["Weapon","武器"], "역할":["Role","职能"], "직군":["Class","职业"], "직업":["Class","职业"],
  "코스튬":["Costume","服装"], "클래스":["Class","职业"], "피해 유형":["Damage type","伤害类型"], "영감":["Afflatus","灵感"], "원소":["Element","元素"],
  "원작 속성":["Original element","原作属性"], "진영":["Faction","阵营"], "호흡·술법":["Breathing · Arts","呼吸 · 术"], "코드":["Code","代码"], "버스트":["Burst","爆裂"], "코스트":["Cost","费用"],
  /* attributes and roles (shared) */
  "물리":["Physical","物理"], "화염":["Fire","火"], "불":["Fire","火"], "얼음":["Ice","冰"], "번개":["Lightning","雷"], "바람":["Wind","风"], "물":["Water","水"],
  "빛":["Light","光"], "어둠":["Dark","暗"], "암흑":["Dark","暗"], "흙":["Earth","土"], "양자":["Quantum","量子"], "허수":["Imaginary","虚数"],
  "파멸":["Destruction","毁灭"], "수렵":["The Hunt","巡猎"], "지식":["Erudition","智识"], "화합":["Harmony","同谐"], "공허":["Nihility","虚无"],
  "보존":["Preservation","存护"], "풍요":["Abundance","丰饶"], "기억":["Remembrance","记忆"], "환락":["Elation","欢愉"],
  "전기":["Electric","电"], "에테르":["Ether","以太"], "서리":["Frost","烈霜"], "현묵":["Auric Ink","玄墨"], "서슬":["Honed Edge","锋芒"], "루멘":["Lumen","流明"],
  "강공":["Attack","强攻"], "격파":["Stun","击破"], "이상":["Anomaly","异常"], "지원":["Support","支援"], "방어":["Defense","防护"], "명파":["Rupture","命破"], "단조":["Forge","锻造"],
  "기류":["Aero","气动"], "용융":["Fusion","热熔"], "응결":["Glacio","冷凝"], "인멸":["Havoc","湮灭"], "전도":["Electro","导电"], "회절":["Spectro","衍射"],
  "권갑":["Gauntlets","臂铠"], "권총":["Pistols","佩枪"], "대검":["Greatsword","大剑"], "증폭기":["Rectifier","音感仪"], "직검":["Sword","迅刀"],
  "령":["Spirit","灵"], "상":["Aspect","相"], "암":["Dark","暗"], "주":["Curse","咒"], "혼":["Soul","魂"], "딜러":["DPS","输出"], "버프":["Buff","增益"], "생존":["Survival","生存"],
  "광":["Light","光"], "냉기":["Cryo","寒冷"], "자연":["Nature","自然"], "열기":["Heat","灼热"],
  "기사":["Knight","骑士"], "도적":["Thief","盗贼"], "마도사":["Mage","魔导士"], "사수":["Ranger","射手"], "전사":["Warrior","战士"], "정령사":["Soul Weaver","精灵师"],
  "법구":["Catalyst","法器"], "양손검":["Claymore","双手剑"], "장병기":["Polearm","长柄武器"], "한손검":["Sword","单手剑"], "활":["Bow","弓"], "바위":["Geo","岩"], "풀":["Dendro","草"],
  "나무":["Plant","草木"], "암석":["Mineral","岩石"], "야수":["Beast","兽类"], "영혼":["Spirit","灵"], "지능":["Intellect","智"], "천체":["Star","星"], "정신":["Mental","精神"], "현실":["Reality","现实"],
  "공격형":["Attacker","进攻型"], "관측자":["Observer","观测者"], "관통형":["Piercer","贯穿型"], "보조형":["Support","辅助型"], "선봉형":["Vanguard","先锋型"],
  "아머형":["Tank","装甲型"], "융합형":["Fusion","融合型"], "인멸형":["Annihilator","湮灭型"], "증폭형":["Amplifier","增幅型"],
  "수냉":["Water","水冷"], "작열":["Fire","燃烧"], "전격":["Electric","电击"], "철갑":["Iron","铁甲"], "풍압":["Wind","风压"],
  "가드":["Guard","近卫"], "디펜더":["Defender","重装"], "뱅가드":["Vanguard","先锋"], "서포터":["Supporter","辅助"], "스트라이커":["Striker","突击"], "캐스터":["Caster","术师"],
  "스페셜":["Special","特别"], "일반":["Standard","普通"], "프레스티지":["Prestige","典藏"],
  "대도":["Katana","太刀"], "쌍도":["Dual Blades","双刀"], "전 무기":["All weapons","全武器"], "칼날 채찍":["Whipsword","鞭刃"],
  "기본":["Base","基础"], "단품 DLC":["Single DLC","单独 DLC"], "시즌1 DLC":["Season 1 DLC","第一季 DLC"], "시즌2 DLC":["Season 2 DLC","第二季 DLC"],
  "기계":["Mech","机械"], "생물":["Bio","生物"], "성진":["Star","星"], "이능":["Psychic","异能"], "뇌전":["Lightning","雷"], "빙결":["Ice","冰"],
  "귀살대":["Demon Slayer Corps","鬼杀队"], "기타":["Other","其他"], "혈귀":["Demon","鬼"], "인술":["Ninjutsu","忍术"], "혈귀술":["Blood Demon Art","血鬼术"],
  "고귀":["Exalted","尊贵"], "레전더리":["Legendary","传说"], "얼티밋":["Ultimate","终极"], "챔피언":["Champion","英雄"], "초월":["Transcendent","超凡"],
  "마법사":["Mage","法师"], "암살자":["Assassin","刺客"], "원거리 딜러":["Marksman","射手"], "탱커":["Tank","坦克"],
  "레전더리 스킨":["Legendary skins","传说皮肤"], "특별 스킨 (고귀·초월·얼티밋)":["Special skins (Exalted · Transcendent · Ultimate)","特殊皮肤（尊贵·超凡·终极）"],
  "대지":["Earth","大地"], "난투":["Brawler","乱斗"], "암살":["Assassin","暗杀"], "파괴":["Destroyer","破坏"],
  "땅":["Earth","地"], "무":["Neutral","无"], "폭발":["Burst","爆发"], "증폭":["Amplify","增幅"], "부여":["Enhance","赋予"], "전투 역할군":["Combat role","战斗定位"], "미공개":["Unrevealed","未公开"],
  "연소":["Ignis","燃烧"], "응결":["Glacies","凝结"], "중력":["Gravitas","引力"], "전격":["Fulmen","电击"], "방사":["Radiatio","辐射"], "정화":["Alba","净化"],
  "영웅":["Hero","英雄"], "수호자":["Guardian","守护者"], "무법자":["Outlaw","法外者"], "목격자":["Witness","目击者"], "구원자":["Saviour","救赎者"],
  "팀":["Team","队伍"], "파이팅 어벤져스":["Fighting Avengers","战斗复仇者"], "언브레이커블 엑스맨":["Unbreakable X-Men","不屈X战警"], "어메이징 가디언즈":["Amazing Guardians","惊奇守护者"], "사무라이 아웃라이더즈":["Samurai Outriders","武士骑手"], "나이츠 오브 둠":["Knights of Doom","毁灭骑士"],
  "뱅가드":["Vanguard","先锋"], "듀얼리스트":["Duelist","决斗者"], "시저스":["Scissors","剪刀手"], "우르비노":["Urbino","乌尔比诺"], "돌격대":["Assault","突击"], "역할군":["Role","定位"],
  "단검":["Dagger","短剑"], "도끼":["Axe","斧"], "쌍검":["Dual Swords","双剑"], "돌격 소총":["Assault Rifle","突击步枪"], "저격총":["Sniper Rifle","狙击枪"], "글러브":["Glove","拳套"], "톤파":["Tonfa","拐棍"], "방망이":["Bat","球棒"], "망치":["Hammer","锤"], "채찍":["Whip","鞭"], "투척":["Throw","投掷"], "암기":["Shuriken","暗器"], "석궁":["Crossbow","弩"], "창":["Spear","枪"], "쌍절곤":["Nunchaku","双节棍"], "레이피어":["Rapier","细剑"], "카메라":["Camera","相机"], "아르카나":["Arcana","奥秘"], "VF 의수":["VF Prosthetic","VF义肢"],
  "스킬 딜러":["Mage","法师"], "원거리 딜러":["Ranged","射手"],
  "공식 실험체 백과사전":["Official character encyclopedia","官方实验体百科"], "궁극기 (공식 GIF)":["Ultimate (official GIF)","大招（官方GIF）"],
  "시즌 1":["Season 1","第一季"], "시즌 2":["Season 2","第二季"], "시즌 3":["Season 3","第三季"], "시즌 4":["Season 4","第四季"], "시즌 5":["Season 5","第五季"], "파이터즈 패스 1":["FighterZ Pass 1","FighterZ 通行证 1"], "파이터즈 패스 2":["FighterZ Pass 2","FighterZ 通行证 2"], "파이터즈 패스 3":["FighterZ Pass 3","FighterZ 通行证 3"], "추가 DLC":["Extra DLC","追加 DLC"], "첫 참전":["Debut","初登场"], "캘러미티 트리거":["Calamity Trigger","刻之幻影 CT"], "컨티뉴엄 시프트":["Continuum Shift","CS"], "크로노판타즈마":["Chronophantasma","CP"], "센트럴픽션":["Central Fiction","CF"],
  "이름 (전체)":["Name (all games)","名称（全部游戏）"], "속성·역할 (전체)":["Element / role (all games)","属性·定位（全部游戏）"],
  "이름 검색 (모든 게임)":["Search names (all games)","搜索名称（全部游戏）"], "속성·역할 검색 (모든 게임) 예: 불, 탱커":["Search element / role (all games), e.g. fire, tank","搜索属性·定位（全部游戏），例：火、坦克"],
  "이 속성·역할의 캐릭터가 없어요.":["No characters with this element or role.","没有该属性或定位的角色。"],
  "수집형 RPG":["Collectible RPGs","收集型 RPG"], "대전 격투":["Fighting games","格斗游戏"], "MOBA·슈터·기타":["MOBA, shooters & more","MOBA·射击·其他"], "게임 선택":["Choose game","选择游戏"],
  "자세히":["Detailed","详细"], "간략":["Compact","简略"], "▶ 보기":["▶ Watch","▶ 观看"], "열기 ↗":["Open ↗","打开 ↗"], "자세히 (링크·북마크까지)":["Detailed (links and bookmarks)","详细（含链接与书签）"], "간략 (썸네일·정보만)":["Compact (thumbnail and info only)","简略（仅缩略图与信息）"],
  "감시자":["Sentinel","哨卫"], "전략가":["Controller","控场"], "척후대":["Initiator","先锋"], "타격대":["Duelist","决斗"]
};
/* per-game notes (keyed by the exact Korean text, so an edited note falls back to Korean) */
Object.assign(DICT, {
"그랑블루 판타지 버서스 -라이징- 전체 플레이어블 파이터(기본 28 + 캐릭터 패스 1·2 + 이드 + EX 3종). ver는 라이징에서 플레이 가능해진 연도, attr은 원작 그랑블루 판타지 속성(색 분류용)이에요.": [
"Every playable fighter in Granblue Fantasy Versus: Rising (28 base + Character Passes 1·2 + Id + 3 EX). ver is the year the fighter became playable in Rising; attr is the element from the original Granblue Fantasy (used for color grouping).",
"《碧蓝幻想Versus：Rising》全部可玩角色（基础 28 名 + 角色通行证 1·2 + 伊德 + 3 名 EX）。ver 为在 Rising 中可用的年份，attr 为原作《碧蓝幻想》的属性（用于颜色分类）。"
],
"명일방주: 엔드필드 플레이어블 오퍼레이터 전원(관리자 포함, 4~6성, 2026-10-27 기준); ver는 처음 출시된 게임 버전(배포 직후 첫 픽업/획득 시점), date는 첫 픽업/출시일.": [
"Every playable operator in Arknights: Endfield (Endministrator included, 4–6★, as of 2026-10-27). ver is the game version the operator first launched in (first banner/obtainable right after release); date is the first banner/release date.",
"《明日方舟：终末地》全部可玩干员（含管理员，4~6星，截至 2026-10-27）。ver 为首次上线的游戏版本（上线后的首次卡池/获取时点），date 为首次卡池/上线日期。"
],
"2026년 4월 29일 글로벌·한국 출시, 현재 1.4 기준. 역할(딜러·버프·생존)은 공식 한국어 분류명이 확인되지 않아 임시 표기예요.": [
"Global and Korean launch on April 29, 2026; currently based on 1.4. Roles (DPS · Buff · Survival) are provisional labels because official Korean category names haven't been confirmed.",
"2026 年 4 月 29 日全球及韩服上线，当前以 1.4 为准。职能（输出·增益·生存）尚未确认官方韩文分类名，为暂定标注。"
],
"플레이 가능한 전 코스튬(★5·4·3, 스페셜·프레스티지 스킨 포함) 목록이며, ver는 글로벌 첫 출시 연도예요. role은 코스튬 구분(일반/스페셜/프레스티지)이에요.": [
"Every playable costume (★5·4·3, Special and Prestige skins included); ver is the first global release year. role is the costume type (Standard / Special / Prestige).",
"全部可用服装（★5·4·3，含特别·典藏皮肤）；ver 为全球服首次上线年份。role 为服装类别（普通/特别/典藏）。"
],
"6성·5성 마도학자 전체(4성 이하 제외). ver는 글로벌(한국) 서버에 처음 출시된 버전이고, 글로벌 미출시(중국 서버 선행)는 upcoming으로 표시했어요.": [
"All 6★ and 5★ arcanists (4★ and below excluded). ver is the version they first launched on the global (Korean) server; characters not yet on global (CN-first) are marked upcoming.",
"全部 6 星和 5 星神秘学家（不含 4 星及以下）。ver 为在国际服（韩服）首次上线的版本，国际服尚未上线（国服先行）的标记为即将推出。"
],
"듀엣 나이트 어비스 플레이어블 캐릭터 전원(2026-10-28 기준, 1.7까지 출시분); ver는 출시된 게임 버전(1.0=2025-10-28 글로벌 출시), role은 근접 무기 종류.": [
"Every playable character in Duet Night Abyss (as of 2026-10-28, released through 1.7); ver is the game version of release (1.0 = global launch on 2025-10-28); role is the melee weapon type.",
"《二重螺旋》全部可玩角色（截至 2026-10-28，已上线至 1.7）；ver 为上线的游戏版本（1.0 = 2025-10-28 全球上线），role 为近战武器类型。"
],
"붕괴3rd 플레이어블 발키리 슈트 전체(S·A·B, SP·증폭 코어, 2부, 콜라보 포함, 협력 캐릭터/아스트랄 옵 제외)이고, ver는 CN·글로벌 공통 첫 출시 버전(3.8 이전은 1.x/2.x/3.x 대략 구분)이에요.": [
"Every playable Valkyrie battlesuit in Honkai Impact 3rd (S·A·B, SP and Augment cores, Part 2 and collabs; support characters and Astral Ops excluded). ver is the first release version shared by CN and global (before 3.8 roughly grouped as 1.x/2.x/3.x).",
"《崩坏3》全部可用女武神装甲（S·A·B，含 SP、增幅核心、第二部及联动；不含协同角色与星之环）。ver 为国服与国际服共同的首次上线版本（3.8 之前大致分为 1.x/2.x/3.x）。"
],
"전략적 팀 전투 세트 18 「Enchanted Wilds」 유닛 (정글 몬스터 제외, 럭스 원소 변형 포함). 데이터·이미지: TFT Data Dragon.": [
"Teamfight Tactics Set 18 「Enchanted Wilds」 units (jungle monsters excluded, Lux elemental variants included). Data and images: TFT Data Dragon.",
"云顶之弈 S18「Enchanted Wilds」棋子（不含野怪，含拉克丝元素形态）。数据与图片：TFT Data Dragon。"
],
"발로란트 요원 30명. 역할·출시 시기는 공식 발표·커뮤니티 정리 기준(2025년 이후 요원은 월 단위).": [
"The 30 VALORANT agents. Roles and release timing follow official announcements and community records (agents from 2025 on are by month).",
"《无畏契约》30 名特工。职能与上线时间依据官方公告和社区整理（2025 年以后的特工按月份）。"
],
"4·5성 플레이어블 전체(여행자는 원소별 분리), ver는 해당 캐릭터가 처음 출시된 게임 버전이며 2026년 10월 말 라이브 7.1 기준이에요.": [
"Every 4★ and 5★ playable character (the Traveler split by element); ver is the game version the character first launched in, as of live 7.1 at the end of October 2026.",
"全部 4 星和 5 星可玩角色（旅行者按元素拆分）；ver 为角色首次上线的游戏版本，以 2026 年 10 月底正式服 7.1 为准。"
],
"2026-04-15 글로벌 정식 출시(중국 제외) 후 2026-10-28까지 출시된 플레이어블 캐릭터 전원(발표만 된 미출시 캐릭터 없음), ver는 추가된 업데이트 버전(각 버전 후반 추가분 포함)이며 중국 서버가 없어 zh는 비움.": [
"Every playable character released from the global launch on 2026-04-15 (excluding China) through 2026-10-28 (no announced-but-unreleased characters); ver is the update version they were added in (including mid-version additions). There is no Chinese server, so zh is empty.",
"自 2026-04-15 全球正式上线（不含中国）至 2026-10-28 已上线的全部可玩角色（无仅公布未上线的角色）；ver 为加入的更新版本（含版本后半段追加），因无中国服务器，zh 留空。"
],
"퍼니싱: 그레이 레이븐 전체 기체(S·A·B, 유니프레임·초월체·콜라보 포함)이고, ver는 글로벌 서버 출시 연도예요.": [
"Every Punishing: Gray Raven frame (S·A·B, Uniframes, Transcendants and collabs included); ver is the global server release year.",
"《战双帕弥什》全部机体（S·A·B，含独域机体、超限机体及联动）；ver 为国际服上线年份。"
],
"5성 영웅 전체 (월광 포함). 출시일은 글로벌 기준 첫 픽업 날짜예요.": [
"Every 5★ hero (Moonlight included). Release date is the first global banner date.",
"全部 5 星英雄（含月光）。上线日期为国际服首次卡池日期。"
],
"리그 오브 레전드 — 챔피언 173명(출시일은 LoL 위키) + 레전더리·얼티밋·초월·고귀 등급 스킨 144개(CommunityDragon 등급 기준). 썸네일은 Data Dragon 타일 이미지.": [
"League of Legends — 173 champions (release dates from the LoL wiki) + 144 Legendary, Ultimate, Transcendent and Exalted skins (tiers from CommunityDragon). Thumbnails are Data Dragon tile images.",
"英雄联盟 —— 173 名英雄（上线日期来自 LoL wiki）+ 144 款传说·终极·超凡·尊贵品质皮肤（品质依据 CommunityDragon）。缩略图为 Data Dragon 头像图。"
],
"2XKO 챔피언 18명(2025년 10월 얼리 액세스 ~ 2026년 10월 사미라·세트). 2026년 8월 라이엇이 연말 개발 종료를 발표했고, 서버는 유지돼요.": [
"The 18 2XKO champions (October 2025 early access through Samira and Sett in October 2026). In August 2026 Riot announced development will end at the end of the year; servers stay up.",
"2XKO 的 18 名英雄（2025 年 10 月抢先体验 ~ 2026 年 10 月莎弥拉·瑟提）。2026 年 8 月拳头宣布年底结束开发，服务器继续运营。"
],
"VS 모드 플레이어블 전원(공식 사이트 기준 52명, 별도 버전·합동 캐릭터 포함, 무한성편 제1장 캐릭터 패스 7명 포함). ver는 플레이 가능해진 연도, date는 기본판 발매일(2025-08-01) 또는 무료 업데이트/DLC 배포일(일본 기준)이에요.": [
"Every playable character in VS mode (52 per the official site, including alternate versions and joint characters, plus the 7 from the Infinity Castle Part 1 Character Pass). ver is the year they became playable; date is the base game release (2025-08-01) or the free update/DLC date (Japan time).",
"VS 模式全部可玩角色（据官网共 52 名，含不同版本与合体角色，以及无限城篇第一章角色通行证 7 名）。ver 为可用年份，date 为本体发售日（2025-08-01）或免费更新/DLC 配信日（日本时间）。"
],
"SSR 니케 전체(이격·콜라보 포함). ver는 글로벌 첫 출시 연도, date는 확인된 글로벌 픽업 시작일(일부만)이에요.": [
"Every SSR Nikke (alt versions and collabs included). ver is the first global release year; date is the confirmed global banner start date (only some).",
"全部 SSR 妮姬（含异装与联动）。ver 为国际服首次上线年份，date 为已确认的国际服卡池开始日期（仅部分）。"
]
});
Object.assign(DICT, {"2026-11-26 한국·일본·대만·중국 출시 예정(넥슨 국내 서비스). CBT와 공식 공개로 확인된 플레이어블 26명이며 모두 출시 예정으로 표시해요. 속성·전투 역할군은 나무위키 기준, 영문명은 공식 발표가 없는 경우 로마자로 적었어요. 링크는 CBT·공식 영상이에요.": ["Launches 2026-11-26 in Korea, Japan, Taiwan and China (Nexon publishes in Korea). The 26 playable characters confirmed through CBTs and official reveals, all marked upcoming. Elements and combat roles follow Namu Wiki; English names are romanized where no official name exists. Links are CBT and official videos.", "2026-11-26 于韩国、日本、台湾和中国上线（韩国由 Nexon 运营）。收录 CBT 与官方公开确认的 26 名可玩角色，均标记为即将推出。属性与战斗定位依据 Namu Wiki，没有官方英文名的角色使用罗马字。链接为 CBT 与官方视频。"], "2026-12-14 글로벌 출시 예정. 1·2차 CBT(동일률·이분법 테스트)에 공개된 플레이어블 14명이며 모두 출시 예정으로 표시해요. 속성은 나무위키, 클래스는 팬 위키 기준이라 출시 후 바뀔 수 있어요. 링크는 CBT 영상이에요.": ["Global launch on 2026-12-14. The 14 playable characters shown in the first and second CBTs (Identity and Dichotomy tests), all marked upcoming. Elements follow Namu Wiki and classes a fan wiki, so they may change at launch. Links are CBT videos.", "2026-12-14 全球上线。收录第一、二次 CBT（同一律测试、二分法测试）中公开的 14 名可玩角色，均标记为即将推出。属性依据 Namu Wiki，职业依据玩家 wiki，上线后可能变动。链接为 CBT 视频。"]});
Object.assign(DICT, {"마블 투혼: 파이팅 소울즈(아크시스템웍스, 2026-08-06 출시) 기본 20명과 Year 1 DLC 4명. 피닉스 사이클롭스는 2026-11-02 배포됐고, 토르(제인 포스터)·베놈·주빌리는 2027년 겨울~여름 예정이라 출시 예정으로 표시해요. 팀은 스토리 모드 기준이에요. 링크는 PlayStation 공식 캐릭터 가이드 트레일러 위주예요.": ["MARVEL Tōkon: Fighting Souls (Arc System Works, launched 2026-08-06): the 20 base fighters plus 4 Year 1 DLC. Phoenix Cyclops arrived on 2026-11-02; Thor (Jane Foster), Venom and Jubilee are due winter–summer 2027 and are marked upcoming. Teams follow story mode. Links are mostly PlayStation's official character guide trailers.", "漫威斗魂（Arc System Works，2026-08-06 发售）基础 20 名角色与 Year 1 DLC 4 名。凤凰镭射眼已于 2026-11-02 上线，雷神（简·福斯特）、毒液、朱比莉预计 2027 年冬至夏季推出，标记为即将推出。队伍按故事模式划分。链接以 PlayStation 官方角色指南预告为主。"], "마블 라이벌즈 영웅 54명(2026년 11월 기준). 역할은 공식 사이트 기준 뱅가드·듀얼리스트·전략가로 묶었어요. 링크는 스킬 전체를 보여 주는 'All Abilities' 영상과 공식 캐릭터 공개 트레일러예요.": ["The 54 Marvel Rivals heroes as of November 2026, grouped by the official roles Vanguard, Duelist and Strategist. Links are 'All Abilities' showcases plus the official character reveal trailers.", "漫威争锋 54 名英雄（截至 2026 年 11 月），按官方定位先锋、决斗者、战略家分组。链接为“全技能”展示视频与官方角色公开预告。"], "스트리노바 슈퍼스트링 24명. 진영과 역할(돌격대·타격대·척후대·수호자·전략가·지원가)은 나무위키 기준이고, 링크는 공식 'Superstring Agent Gameplay Reveal' 영상 위주예요. 썸네일은 게임 데이터의 프로필 이미지예요.": ["The 24 Strinova Superstrings. Factions and roles (Assault, Duelist, Vanguard, Sentinel, Controller, Support) follow Namu Wiki; links are mostly the official 'Superstring Agent Gameplay Reveal' videos. Thumbnails are in-game profile images.", "卡拉彼丘 24 名超弦体。阵营与定位依据 Namu Wiki，链接以官方“Superstring Agent Gameplay Reveal”视频为主。缩略图为游戏内档案图。"], "이터널 리턴 실험체 91명(코드 #91 세레스까지). 역할군은 나무위키의 주 역할군으로 묶었고, 무기는 게임 데이터의 첫 번째 무기예요. 링크는 공식 '실험체 백과사전'·'미리보기'가 있으면 그것을, 없으면 유튜버 공략 영상을 넣었고, 궁극기 공식 GIF(게임 내 스킬 미리보기 영상)도 붙였어요. #번호는 출시 순서예요.": ["All 91 Eternal Return subjects (through #91 Seres), grouped by their main role on Namu Wiki; the weapon is the first weapon in the game data. Links use the official 'Subject Encyclopedia' or preview videos where they exist, otherwise creator guides, plus the official ultimate GIF from the in-game skill preview. #numbers are release order.", "永恒轮回全部 91 名实验体（至 #91 塞蕾丝），按 Namu Wiki 主定位分组，武器为游戏数据中的第一武器。链接优先使用官方“实验体百科”或预览视频，否则为创作者攻略，并附官方大招 GIF。#编号为上线顺序。"]});
Object.assign(DICT, {"길티기어 -스트라이브- 플레이어블 34명(기본 15명 + 시즌 패스 1~5, 2026년 11월 기준). 시즌별로 묶었고, 시즌 5의 미공개 2명은 빠져 있어요. 썸네일은 Dustloop 위키 아이콘이에요.": ["The 34 playable fighters of GUILTY GEAR -STRIVE- (15 base + Season Passes 1–5, as of November 2026), grouped by season; the two unrevealed Season 5 fighters are not included. Thumbnails are Dustloop wiki icons.", "罪恶装备 -Strive- 可玩角色 34 名（基础 15 名 + 季票 1~5，截至 2026 年 11 月），按赛季分组，第五季未公开的 2 名未收录。缩略图为 Dustloop wiki 图标。"], "드래곤볼 파이터즈 플레이어블 45명(기본 24명 + 파이터즈 패스 1~3 + 손오공(초사이어인 4 DAIMA)). 패스별로 묶었어요. 썸네일은 Dustloop 위키 아이콘이에요.": ["The 45 playable fighters of Dragon Ball FighterZ (24 base + FighterZ Passes 1–3 + Goku (SS4, DAIMA)), grouped by pass. Thumbnails are Dustloop wiki icons.", "龙珠斗士Z 可玩角色 45 名（基础 24 名 + FighterZ 通行证 1~3 + 悟空（超四 DAIMA）），按通行证分组。缩略图为 Dustloop wiki 图标。"], "블레이블루 센트럴픽션(2.0) 플레이어블 36명을 첫 참전작(캘러미티 트리거·컨티뉴엄 시프트·크로노판타즈마·센트럴픽션)별로 묶었어요. 링크는 디스토션 드라이브·아스트랄 히트 영상 위주예요. 썸네일은 Dustloop 위키 아이콘이에요.": ["The 36 playable fighters of BlazBlue: Central Fiction (2.0), grouped by the game they debuted in. Links are mostly Distortion Drive and Astral Heat videos. Thumbnails are Dustloop wiki icons.", "苍翼默示录 Central Fiction（2.0）可玩角色 36 名，按初登场作品分组。链接以 Distortion Drive 与 Astral Heat 视频为主。缩略图为 Dustloop wiki 图标。"], "DNF 듀얼 플레이어블 21명(출시 로스터 17명 + DLC). 썸네일은 Dustloop 위키 아이콘이에요.": ["The 21 playable fighters of DNF Duel (17 at launch + DLC). Thumbnails are Dustloop wiki icons.", "DNF Duel 可玩角色 21 名（首发 17 名 + DLC）。缩略图为 Dustloop wiki 图标。"]});
Object.assign(DICT, {"그랑블루 판타지 리링크 플레이어블 26명(본편 19명 + 무료 업데이트 3명 + 「Endless Ragnarok」 4명). 주인공은 그랑/지타를 한 칸으로 묶었어요. 링크는 대부분 'All Moveset, Skills & Skybound Arts' 영상이에요. 썸네일은 나무위키 아이콘이에요.": ["The 26 playable characters of Granblue Fantasy: Relink (19 in the base game + 3 free updates + 4 from Endless Ragnarok). Gran and Djeeta share one row. Links are mostly 'All Moveset, Skills & Skybound Arts' videos. Thumbnails are Namu Wiki icons.", "碧蓝幻想 Relink 可玩角色 26 名（本篇 19 名 + 免费更新 3 名 + Endless Ragnarok 4 名）。古兰与姬塔合为一行。链接以“全招式·技能·奥义”视频为主。缩略图为 Namu Wiki 图标。"], "무료 업데이트": ["Free update", "免费更新"]});
/* the same Korean word means something else in some games */
const GDICT = {
  gi: { "물":["Hydro","水"], "바람":["Anemo","风"], "불":["Pyro","火"], "번개":["Electro","雷"], "얼음":["Cryo","冰"] },
  ww: { "대검":["Broadblade","长刃"] },
  e7: { "냉기":["Ice","冰"], "자연":["Earth","木"] },
  lol: { "전사":["Fighter","战士"], "서포터":["Support","辅助"] },
  pgr: { "공허":["Void","空"] },
  kny: { "기타":["Other","其他"] },
  val: { "역할":["Role","职能"] },
  ake: { "자연":["Nature","自然"] },
  mr: { "전략가":["Strategist","战略家"] },
  sn: { "돌격대":["Assault","突击"], "타격대":["Duelist","决斗"], "척후대":["Vanguard","先锋"], "수호자":["Sentinel","哨卫"], "전략가":["Controller","控场"] },
  er: { "전사":["Bruiser","斗士"], "탱커":["Tank","坦克"], "기타":["Guitar","吉他"], "양손검":["Two-handed Sword","双手剑"], "권총":["Pistol","手枪"], "지원가":["Support","辅助"] },
  ap: { "파괴":["Break","破坏"], "강공":["Assault","强攻"], "나무":["Wood","木"] },
  "2xko": { "챔피언":["Champion","角色"] }
};
const BREATH = { "물":["Water","水"], "바람":["Wind","风"], "바위":["Stone","岩"], "뱀":["Serpent","蛇"], "번개":["Thunder","雷"], "벌레":["Insect","虫"], "사랑":["Love","恋"], "소리":["Sound","音"], "안개":["Mist","霞"], "짐승":["Beast","兽"], "해":["Sun","日"], "화염":["Flame","炎"] };
/* templated strings: [regex, english, chinese]; $1… are translated again */
const RULES = [
  [/^(.+)의 호흡$/, m => BREATH[m[1]] ? [`${BREATH[m[1]][0]} Breathing`, `${BREATH[m[1]][1]}之呼吸`] : null],
  [/^([1-5])코스트$/, m => [`${m[1]}-cost`, `${m[1]}费`]],
  [/^버스트 (A|I|II|III)$/, m => [`Burst ${m[1]}`, `爆裂 ${m[1]}`]],
  [/^(\d+)명$/, m => [m[1], `${m[1]}人`]],
  [/^영상 ?(\d+)$/, m => [`Video ${m[1]}`, `视频 ${m[1]}`]],
  [/^북마크 (\d+)$/, m => [`Bookmarks ${m[1]}`, `书签 ${m[1]}`]],
  [/^([\s\S]+): 링크 저장됨$/, m => [`${m[1]}: link saved`, `${m[1]}：链接已保存`]],
  [/^([\s\S]+): 링크 삭제됨$/, m => [`${m[1]}: link removed`, `${m[1]}：链接已删除`]],
  [/^([\s\S]+): 썸네일 올리는 중…$/, m => [`${m[1]}: uploading thumbnail…`, `${m[1]}：正在上传缩略图…`]],
  [/^([\s\S]+): 썸네일 저장됨$/, m => [`${m[1]}: thumbnail saved`, `${m[1]}：缩略图已保存`]],
  [/^([\s\S]+): 썸네일 지움$/, m => [`${m[1]}: thumbnail removed`, `${m[1]}：缩略图已删除`]],
  [/^([\s\S]+): Ctrl\+V로 붙여넣기 · 한 번 더 누르면 파일 선택$/, m => [`${m[1]}: paste with Ctrl+V · tap again to pick a file`, `${m[1]}：按 Ctrl+V 粘贴 · 再按一次选择文件`]],
  [/^([\s\S]+): 다운로드 명령어를 복사했어요\. 터미널에 붙여넣으세요$/, m => [`${m[1]}: download command copied. Paste it into a terminal`, `${m[1]}：已复制下载命令，请粘贴到终端`]],
  [/^보스 '([\s\S]+)' 추가됨$/, m => [`Boss '${m[1]}' added`, `已添加 Boss「${m[1]}」`]],
  [/^보스 '([\s\S]+)' 삭제됨$/, m => [`Boss '${m[1]}' deleted`, `已删除 Boss「${m[1]}」`]],
  [/^([\s\S]+)에 북마크를 올렸어요$/, m => [`Bookmark added to ${m[1]}`, `已为 ${m[1]} 添加书签`]],
  [/^썸네일 (\d+)개를 채웠어요$/, m => [`Filled ${m[1]} thumbnails`, `已补全 ${m[1]} 张缩略图`]],
  [/^북마크 (\d+)개를 올렸어요$/, m => [`Added ${m[1]} bookmarks`, `已添加 ${m[1]} 个书签`]],
  [/^([\s\S]+) CSV를 클립보드에 복사했어요$/, m => [`Copied ${m[1]} CSV to the clipboard`, `已将 ${m[1]} CSV 复制到剪贴板`]],
  [/^썸네일 없는 북마크 (\d+)개 · PC 크롬에서 채울 수 있어요$/, m => [`${m[1]} bookmarks without thumbnails · fill them in desktop Chrome`, `${m[1]} 个书签缺少缩略图 · 可在电脑版 Chrome 中补全`]],
  [/^어느 캐릭터의 북마크인가요\? \((\d+\/\d+)\)$/, m => [`Which character is this bookmark for? (${m[1]})`, `这个书签属于哪个角色？(${m[1]})`]],
  [/^'([\s\S]+)' 태그로 모든 게임 검색$/, m => [`Search all games for the '${m[1]}' tag`, `在全部游戏中搜索“${m[1]}”标签`]],
  [/^보기 전용 화면이에요 \(([\s\S]+) 기준\)\. 링크 추가·수정은 편집 권한이 있는 계정으로 로그인하면 할 수 있어요\.$/, m => [`View-only page (as of ${m[1].replace(/(\d+)월 (\d+)일/, "$1/$2")}). Sign in with an account that can edit to add or change links.`, `只读页面（截至 ${m[1].replace(/(\d+)월 (\d+)일/, "$1月$2日")}）。使用有编辑权限的账号登录后可添加或修改链接。`]]
];
const HANGUL = /[가-힣]/;
function tr1(s, gk) {
  if (!s || !HANGUL.test(s)) return s;
  const i = LANG === "en" ? 0 : 1;
  const gd = gk && GDICT[gk];
  if (gd && gd[s]) return gd[s][i];
  if (DICT[s]) return DICT[s][i];
  if (s.endsWith(" ↗")) { const b = tr1(s.slice(0, -2), gk); if (b !== s.slice(0, -2)) return b + " ↗"; }
  for (const [re, f] of RULES) { const m = s.match(re); if (m) { const r = f(m); if (r) return r[i]; } }
  if (s.includes(" · ")) { const p = s.split(" · "); const t = p.map(x => tr1(x, gk)); if (t.some((x, k) => x !== p[k])) return t.join(" · "); }
  return s;
}
function tr(s, gk) {
  if (LANG === "ko" || !s || !HANGUL.test(s)) return s;
  const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const t = tr1(m[2], gk);
  return t === m[2] ? s : m[1] + t + m[3];
}

/* DOM pass: remember the Korean source of every node so switching back restores it */
const I18N_SKIP = ".ph,.name,.en,.zh,.vid,.tag-t,.bm-n,.bm-t,.code,.lang,small,datalist,script,style,textarea";
const TX_SRC = new WeakMap(), TX_SET = new WeakMap(), AT = new WeakMap();
const gkOf = el => { const r = el.closest("[data-g]"); return r ? r.dataset.g : (typeof state !== "undefined" && state.game ? state.game.key : ""); };
function trText(n) {
  const p = n.parentElement; if (!p || p.closest(I18N_SKIP)) return;
  let src = n.nodeValue;
  if (TX_SET.has(n) && TX_SET.get(n) === src) src = TX_SRC.get(n);
  if (!HANGUL.test(src)) { TX_SET.delete(n); return; }
  const t = tr(src, gkOf(p));
  TX_SRC.set(n, src); TX_SET.set(n, t);
  if (n.nodeValue !== t) n.nodeValue = t;
}
function trAttr(el, a) {
  if (!el.hasAttribute(a) || el.closest(".lang")) return;
  const rec = AT.get(el) || {}; let src = el.getAttribute(a);
  if (rec[a] && rec[a][1] === src) src = rec[a][0];
  if (!HANGUL.test(src)) { delete rec[a]; return; }
  const t = tr(src, gkOf(el));
  rec[a] = [src, t]; AT.set(el, rec);
  if (el.getAttribute(a) !== t) el.setAttribute(a, t);
}
function trTree(root) {
  if (root.nodeType === 3) { trText(root); return; }
  if (root.nodeType !== 1) return;
  ["placeholder", "title"].forEach(a => trAttr(root, a));
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let n; while ((n = w.nextNode())) { if (n.nodeType === 3) trText(n); else { trAttr(n, "placeholder"); trAttr(n, "title"); } }
}
new MutationObserver(ms => {
  for (const m of ms) {
    if (m.type === "characterData") trText(m.target);
    else if (m.type === "attributes") trAttr(m.target, m.attributeName);
    else m.addedNodes.forEach(trTree);
  }
}).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title"] });

function setLang(l) {
  if (!LANGS.includes(l)) return;
  LANG = l;
  try { localStorage.setItem("hfx-lib-lang", l); } catch {}
  document.documentElement.lang = l === "zh" ? "zh-CN" : l;
  document.title = L("스킬 연출 라이브러리", "Skill FX Library", "技能演出资料库");
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === l));
  document.querySelectorAll("#gameSel option").forEach(o => { const g = GAMES.find(x => x.key === o.value); if (g) o.textContent = `${gName(g)} (${g.roster.length})`; });
  document.querySelectorAll("#gameSel optgroup").forEach(og => { og.label = tr(og.dataset.ko); });
  setHeader(state.game); setPlaceholder(); render();
  try { updateFillBtn(); } catch {}
  trTree(document.body);
}

# 스킬 연출 라이브러리 — 월간 갱신 절차

라이브러리 아티팩트: https://claude.ai/artifact/7LbERytRvd6GRiqhs3saUB
프레임 뷰어: https://hun0.github.io/skill_viewer/ (이 저장소 루트의 index.html)

이 폴더(`library/`)가 라이브러리 페이지의 원본이에요. 페이지는 `lib/build.py`가 만들고, 링크·북마크는 아티팩트 DB에 있어요.

## 폴더 구성
- `lib/script.js`, `lib/extra.css`, `lib/markup.html`, `lib/viewer.js` — 페이지 코드
- 검색 기준 '속성·역할 (전체)'는 `lib/script.js`의 `ELEM_GROUPS`(불·얼음·번개… 대표 이름과 게임별 동의어)로 게임마다 다른 속성 이름을 하나로 묶어요. 새 게임에 새 속성 이름이 있으면 해당 그룹의 `w` 목록에 추가하고, 같은 단어가 게임마다 뜻이 다르면 `ELEM_GAME`에 예외를 넣어요
- 게임 선택은 검색창 왼쪽 드롭다운(`#gameSel`)이에요. 새 게임은 `lib/script.js`의 `GAME_GROUPS`(수집형 RPG / 대전 격투 / MOBA·슈터·기타) 중 맞는 묶음에 키를 넣어요. 어느 묶음에도 없는 게임은 맨 아래 '기타'로 들어가요
- `lib/i18n.js` — 상단 언어 전환(한국어/English/中文). 코드의 한국어 문구를 화면에서 바꿔 끼우는 층이라, 새 문구·속성·역할 값이 생기면 `DICT`(공통), `GDICT`(게임마다 뜻이 다른 단어), `RULES`(숫자·이름이 섞인 문구), `GI18N`(게임 이름)에 영어·중국어를 추가해요. 게임 노트 번역은 노트 원문 그대로를 키로 쓰므로 노트를 고치면 번역도 다시 넣어야 해요(없으면 한국어로 표시)
- `lib/hsr_source.html` — 스타레일 로스터와 기본 CSS. 캐릭터 행 형식: `["id","한글","English",등급,"속성","운명의 길","버전"]`, 중국어 이름은 같은 파일의 `const ZH = {...}`
- `lib/build.py` — 페이지 생성. **스타레일 출시 예정 표시는 build.py 안의 `r[6]=="4.8"` 조건**이라, 새 버전이 나오면 이 숫자를 다음 예정 버전으로 바꿔요
- 스타레일 4.8 젠존제 콜라보(엘렌·아스트라)는 zzz.webp 칸을 hsr.webp 뒤에 붙였어요. 스프라이트는 **RGBA로 저장**해야 해요(RGB로 저장하면 투명 영역이 깨져 보여요)
- `games/<게임>.json` — 나머지 39개 게임 로스터 + 애니 30작품(아래 대분류 참고) (`zzz ww nte e7 gi r99 pgr nikke ake bd2 hi3 dna mgl ao an hna gbvs gbr gg db bb dnf kny nrt opa hd1 hd2 d4 ap sp mt mr sn er lol tft val 2xko`). 항목: `id, ko, en, zh, rarity, attr, role, ver`, 선택 `date`, 출시 전이면 `"upcoming": true`
- **대분류 게임 | 애니 | 영상 모음** — 필터 줄 맨 앞 스위치(`topOf`, `lib/script.js`의 `GAME_GROUPS`·`VIDEO_GROUPS`)
  - **영상 모음(`vid`)**: 링크를 붙여넣고(여러 개면 한 번에) 메모는 선택. 항목마다 DB `bosses`에 `{game:"vid", ko:메모(빈 문자열 가능), createdAt}`(id `vid-…`), `links`에 `{items:[{url, label}], game:"vid", ko}`. 메모가 없으면 링크로 이름을 만들어요(`reelAutoName`). 최근에 넣은 순, 카드의 ✎로 메모 수정·🗑로 삭제(두 번 누르기). 예전 항목의 `sub`(게임 이름)는 더 이상 안 써요
  - **유튜브 썸네일 가져오기**: 아티팩트는 외부 이미지·요청이 막혀 있어서 페이지가 직접 못 받아요. 그래서 영상 모음 입력 줄의 ‘유튜브 썸네일 가져오기 N’(썸네일 없는 유튜브 항목 수)이 프레임 뷰어를 `#ytthumbs=<base64url {items:[{i: 항목 id, v: 유튜브 id}]}>`로 열고, 뷰어가 `i.ytimg.com/vi/<id>/mqdefault.jpg`(CORS 허용)를 받아 `HFXTH2:<base64url {v:2, items:[{c, img}]}>`를 복사 → 라이브러리에서 Ctrl+V 하면 `importThumbs`가 전부 `setThumb`(편집 권한 필요)
  - **애니**: 드롭다운은 `전체`(`aall`, 모든 작품 클립을 한 목록에. 작품 칩 = 작품 이름) → `화려한 전투 (50개)`(`ANI_TOP` = 나루토·보루토·나히아·원펀맨·페이트, 클립 50개씩) → `작품별`(나머지 25작품, 20개씩)
  - 작품 키: `aop ajjk anrt abrt amha acsm afate adb aopm aaot afma afrn aeva abc akny agl aff ablc amob ase asl addd ajojo aklk apkm agdm apc amt aor acpe`. `games/<키>.json`에 `meta`(ko·en·zh·Sakugabooru 태그)가 있으면 애니로 인식
  - 데이터: Sakugabooru `"<태그> effects fighting order:score"` 상위 mp4(나루토는 `-boruto:_naruto_next_generations -boruto:_naruto_the_movie`로 보루토 제외). 원본 수집 데이터는 `tools/sakuga/sakuga.json`(작품별 `{id, md5, ext, score, artists, cp, src, fx}`, `fx`는 이펙트 태그 코드 a~o), 이걸 `tools/sakuga/gen.py`가 `games/<키>.json`으로 바꿔요(경로 인자로 `ani/`·`bili/games/`가 있는 폴더). 항목: `id=<키>-<post id>`, `ko`=원화가(2명 + 외 N명), `en`=작품·화수, `attr`=세부 작품, `score`, `arts`=전체 원화가, `fx`=이펙트 태그(한글), `sk:{p:post id, u:원본 파일 URL}`. 링크는 DB가 아니라 `sk`에서 바로 만들어요
  - **이펙트 태그**: Sakugabooru 일반 태그 중 `fire lightning explosions beams ice liquid smoke wind sparks debris impact_frames smears missiles morphing cgi` → `불 번개 폭발 빔 얼음 물·액체 연기 바람 스파크 파편 임팩트 프레임 스미어 미사일 변형 CG`. 애니에서는 두 번째 칩 줄('이펙트')이 이 태그 필터이고, 정렬의 '이펙트별'은 태그마다 섹션으로 묶어 보여 줘요(여러 태그가 붙은 클립은 여러 섹션에). 칩 순서는 `FX_ORDER`
  - Sakugabooru는 컨테이너에서 막혀 있어서 Chrome으로 `post.json?api_version=2&include_tags=1`을 받아요(태그 종류로 원화가·작품 구분). 브라우저 도구 결과가 약 1000자에서 잘리고 base64는 막히므로, 압축 텍스트를 950자씩 나눠 받고 FNV-1a 해시로 조각마다 검증했어요. 미리보기(`/data/preview/<md5>.jpg`, 300×169)는 같은 페이지 캔버스에 120px 정사각(가운데 자르기)으로 깔고 `zoom save_to_disk`로 캡처해 80px 시트(10열, 20개면 2행·50개면 5행)로 만들었어요
  - 재생·다운로드: ▶와 간략히 보기의 썸네일 클릭은 프레임 뷰어 `?src=<mp4>&page=<글 주소>`(네이티브 video라 프레임 단위 정확). Sakugabooru는 CORS를 안 열어 줘서 스크립트 저장이 안 되고, 아티팩트는 `download` 속성 링크를 막아요. 그래서 ⬇는 원본 mp4를 새 탭으로 열고(우클릭 → 저장), 작품 단위로는 헤더의 ‘전체 다운로드 명령 복사’(curl)를 써요
- **태그 검색**: 검색 기준 ‘태그’는 내가 단 태그와 애니 이펙트 태그(한·영·중 이름)를 함께 찾아요. 이 모드에서는 검색창 아래 `#tagQuick`에 이펙트 태그와 내 태그(많이 쓴 순 40개)가 칩으로 떠서 눌러 고를 수 있어요(`buildTagQuick`). 여러 개를 고르면 검색창에 쉼표로 이어지고 모두 붙은 것만 남아요(AND, `tagTerms`)
- **검색 범위**: ‘이름(전체)·속성·역할(전체)·태그·북마크’ 검색은 지금 대분류 안에서만 찾아요(`scopeGames`). 애니 쪽 ‘속성·역할’ 바로 찾기 칩은 이펙트 태그
- **프레임 뷰어 → 썸네일**: 뷰어의 ‘🖼 이 프레임을 썸네일로’(T 키, 라이브러리에서 연 영상만 = `c` 파라미터)가 `HFXTH1:<base64url {v, c, img}>` 코드와 PNG를 클립보드에 넣어요. 라이브러리에서 Ctrl+V 하면 그 캐릭터·클립의 썸네일로 저장(`importThumb` → `setThumb`, 편집 권한 필요). 기기 영상은 바로 뜨고, 유튜브·Sakugabooru처럼 다른 사이트 영상은 캔버스가 막혀서 ‘📸 프레임 캡처 켜기’(탭 공유)를 먼저 켜야 해요
- **주의 (실시간 연결 수)**: `links`는 게임마다 구독 하나씩이라, 구독이 너무 많으면 뒤쪽 구독(bosses·thumbs·tags·bookmarks)이 오류 없이 조용히 실패해요(애니 30작품을 더했을 때 85개에서 발생). 애니는 링크가 데이터(`sk`)에 있어 구독에서 빼 두었어요. 게임을 크게 늘릴 땐 구독 수를 확인하세요
- **주의 (CSP)**: 아티팩트 페이지에서는 `fetch("data:…")`도 막혀요. 데이터 URL은 `dataUrlToBlob`로 바꾸세요. 로컬 테스트에는 이 정책이 없어서 통과해 버리니 실제 페이지에서 확인할 것
- **간략히 보기 썸네일**: 누르면 첫 영상이 바로 재생돼요(프레임 뷰어). 썸네일 바꾸기(붙여넣기·끌어다 놓기)는 자세히 보기에서만
- `sprites/<게임>.webp` + `<게임>.json` — 나무위키 이미지로 만든 캐릭터 썸네일 시트(80px 칸, 16열). json의 `ids` 순서가 칸 순서
- `sprites/blobs.json` — 각 시트가 아티팩트에 올라가 있는 asset id
- `tools/transfer_grab.py` — 브라우저 결과가 너무 커서 파일로 저장됐을 때 `@@TAG@@...@@END@@` 사이 JSON을 꺼내는 도우미

## 갱신 순서
1. **새 캐릭터 확인** — 게임마다 최근 한 달 사이 출시됐거나 출시 예정이 공개된 플레이어블 캐릭터를 웹 검색으로 확인해요(나무위키·공식 공지·Prydwen·fandom). 로스터와 비교해서
   - 없는 캐릭터는 추가(id는 `게임키-영문-소문자-하이픈`, 스타레일은 접두어 없음)
   - 이미 있던 `upcoming` 캐릭터가 출시됐으면 `upcoming` 제거
   - 브더2는 코스튬 단위, 니케·퍼니싱·브더2·에픽세븐·그랑블루VS·히노카미2는 `ver`가 출시 연도
   - 라이엇 게임: 롤은 챔피언(`ver`=출시 연도) + 주요 스킨(레전더리·고귀·초월·얼티밋, `ver`는 `레전더리 스킨` 또는 `특별 스킨 (고귀·초월·얼티밋)`, id는 `lol-<챔피언>-skin-<번호>`), TFT는 **현재 세트 유닛만**(`ver`=코스트, 새 세트가 나오면 로스터를 통째로 교체하고 `lib/script.js`의 TFT `name`·`bili`·`yt` 세트 번호도 바꿈), 발로란트는 요원(`ver`=출시 연도), 2XKO는 챔피언(`ver`=출시 연도). 라이엇 CDN은 컨테이너에서 막혀 있어서 GitHub 미러(`InFinity54/LoL_DDragon`, `noxelisdev/TFT_DDragon`·`Valorant_DDragon`·`2XKO_DDragon`)의 raw 파일로 목록과 썸네일을 받아요
   - 아주르 프로밀리아(`ap`, 2026-11-26 출시)·실버 팰리스(`sp`, 2026-12-14 출시)는 CBT 기준으로 전원 `upcoming`, `ver` 1.0으로 넣어 둠. 출시되면 `upcoming`을 지우고, CBT 영상(아주르는 유튜버 '조슈' 모션 영상, 실버 팰리스는 'delumi1' Gameplay 위주)을 출시 버전 스킬 영상으로 교체하고, 속성·클래스(실버 팰리스 클래스는 팬 위키 기준)와 영문명(아주르는 일부 로마자 표기)을 공식 값으로 고쳐요
   - 마블 투혼(`mt`)은 팀별, 마블 라이벌즈(`mr`)·스트리노바(`sn`)·이터널 리턴(`er`)은 역할별로 묶음(`ver`에 역할 이름, `date`로 묶음 순서). 데이터 출처: 이터널 리턴은 `pypy-vrc/er-gamedata`(Character·CharacterMastery·CharacterSkillVideos, 공식 궁극기 GIF 포함)와 썸네일 `EternalReturnInfo/EternalReuturnInfo` 드로어블(#1~#68만 있음), 스트리노바는 `Celest151/StrinovaData`(Localization·RolePlayerProfile), 마블 라이벌즈는 `anthonyturner/rivals-pulse-web`(official heroes json·hero 이미지). 마블 투혼 썸네일과 이터널 리턴 #69~#91 썸네일은 나무위키 이미지를 Claude in Chrome 화면 캡처(zoom save_to_disk)로 받아 만듦(토르·사이클롭스는 공식 트레일러 썸네일 크롭, 베놈·주빌리는 없음). 스트리노바 시엘/노라의 프로필 이미지(126/130)는 추정 매칭
   - 아크 시스템웍스 격투 게임 길티기어 스트라이브(`gg`, 시즌별)·드래곤볼 파이터즈(`db`, 패스별)·블레이블루 센트럴픽션(`bb`, 첫 참전작별)·DNF 듀얼(`dnf`)의 썸네일은 Dustloop 위키(`/w/GGST`·`DBFZ`·`BBCF`·`DNFD` 페이지의 `*_Icon.png`)를 Chrome에서 캔버스로 모아 화면 캡처해 만듦. 영상 자동 검색 품질이 들쭉날쭉해서 다른 작품(Xrd·스파킹 제로 등) 영상은 걸러 냈고, 여러 캐릭터에 똑같이 걸린 영상은 넣지 않음
   - 무한대/아난타(`an`, 넷이즈, 2027-01-15 출시 예정)는 한국 공식 홈페이지 `anantagame.com/kr/index.html`의 `.role-name`(6명, `공식 공개`) + 팬 위키 zeroluck.gg/ananta/characters의 이후 공개 7명(`추가 공개`, 한글 이름은 음역). 공식 6명 아이콘은 홈페이지 캐릭터 영상(blob) 프레임을 캔버스로 떠서 크롭, 나머지는 zeroluck 카드 이미지. 캐릭터별 공식 영상이 없어 링크는 공식 홈페이지 + 공식 게임플레이 트레일러
   - 붕괴: 넥서스 아니마(`hna`, 출시일 미정)는 크리처 수집 게임이라 플레이어블 캐릭터 중 EODGamerSG 채널에 "{이름} Gameplay ... Ultimate" 영상이 있는 9명만. 아니마 82종은 개별 영상·아이콘이 없어 보류. 공식 한국어 PV(@HonkaiNA)에 나온 나나페이·바이 메이 외 한글 이름은 음역
   - 아스트라에 오라티오(`ao`, NC, 출시 전)는 드롭다운의 '출시 예정' 묶음. 공식 홈페이지 JS 번들(`assets.playnccdn.com/static-astra/.../js/index.js`)의 `{key,clanKey,classification,department,nameEn,nameKo}` 객체와 `img/character/character-thumbnail/{클랜}/{key}.webp`에서 이름·소속·아이콘을 받음. 홈페이지는 10명만 PLAYER로 표시하지만 2026-10 CBT에서는 18명이 플레이 가능해서 그 18명(역할 = CBT 기준) + 홈페이지 공개 캐릭터를 넣었고 전부 `upcoming`. 링크는 CBT 모음 영상(시롤 `6CZVikGaKqo`, Kami `27vQpf1hnKs`)의 챕터 시간(`&t=`)으로 캐릭터 구간을 바로 열게 함. 정식 출시되면 `upcoming` 해제·공식 영상으로 교체
   - 오버워치(`ow`)는 공식 영웅 페이지 `overwatch.blizzard.com/{en-us,ko-kr,zh-tw}/heroes/`의 `a.hero-card`(id, data-role, data-subrole, `blz-image` 초상화 256px)에서 이름·역할을 받음. 세부 역할 한글은 같은 페이지 필터 라벨. 링크는 PlayOverwatch 채널의 "{영웅} Ability Overview"·"Gameplay Trailer"
   - 하데스(`hd1`)·하데스 II(`hd2`)는 주인공이 한 명이라 신(축복)과 무기 단위. 아이콘은 hades.fandom.com의 `File:CodexPortrait {신} I.png`(I = 하데스1)·`CodexPortrait {신}.png`(하데스2), 무기는 각 무기 문서의 대표 이미지. 영상은 팬 가이드(Mattsimus·Voxel Star·Tulok & Mango·Haelian 등)라 일부 신은 비어 있음
   - 디아블로 IV(`d4`)는 공식 사이트 클래스 섹션의 클래스 트레일러 썸네일을 잘라 아이콘으로 씀. 링크는 공식 클래스 트레일러 + 스킬 모음
   - 나루토 모바일(`nrt`, 火影忍者手游)은 **S급 닌자만**. 공식 닌자 도감 JSON `https://hyrz.qq.com/act/a20240723fashion/ninja-data/prod/ninja_list.json`(필드: rzzmc 이름, rzfmc 형태, rzzxd 등급, rzsxsj 출시일, rzwyID id)에서 등급 S를 출시순으로 받고, id는 `nrt-<rzwyID>`, `ver`=출시 연도, 소속(`attr`)은 원작 기준 수동 분류, 형태(`role`)는 일반/예토전생/콤비. 아이콘은 `https://ninja.hyrz.qq.com/hyrz/prod/ninja/{id}/ap.png`를 Chrome 화면 캡처로 시트에 모음. 영상은 유튜브 "火影手游 {이름} 技能" 검색(같은 이름의 다른 등급·스킨 영상은 제외)
   - 원피스 앰비션(`opa`, 航海王：壮志雄心, 중국 전용)은 공식 도감이 없어서 출시 초기 53명은 GameKee 위키(`api-cdn.gamekee.com/wiki2.0/pro/50392/entry/list.json`의 伙伴图鉴, 등급 빨강/금색/보라/파랑), 이후 동료는 공식 사이트 `op.qq.com/web202406/js/characters.js`·공식 빌리빌리 '砂糖有料到' 합집(영상 페이지의 `__INITIAL_STATE__.videoData.ugc_season`)·유튜브 `Tom Kids` 채널의 "X - One Piece Ambition" 스킬 공개 영상으로 확인해 `신규 추가`로 넣음(날짜는 대략). 공식 원형 아이콘은 `https://game.gtimg.cn/images/op/web202406/characters/total/{id}.png`(초기 34명만 있음), 나머지는 GameKee 아이콘이나 공식 공개 이미지 크롭, 블루 등급 일부는 썸네일 없음. 새 동료는 '砂糖有料到' 합집과 Tom Kids 채널을 보면 빨라요. 야마토·킬러는 예고만 나와 `upcoming`
   - 붕괴3rd는 발키리 슈트 단위(`ko`는 `캐릭터 - 슈트명`, 3.8 이전은 `1.x/2.x/3.x`), 히노카미2는 버전 캐릭터(무한성·학원 등)를 따로, 그랑블루VS는 EX도 따로
2. **현재 DB 받기** — `ArtifactData list`로 `links`(1000개씩 cursor 페이징), `bookmarks`, `thumbs`, `bosses`, `tags`를 `library/snap/` 아래에 out_dir로 저장. 응답에 찍힌 version은 이후 update의 `if_version`에 써요.
3. **스킬 영상 찾기** — 새로 출시된 캐릭터와 아직 `(자동생성) 스킬모음` 링크가 없는 캐릭터만 대상. 사용자의 데스크톱 앱 내장 브라우저로 youtube.com 탭을 열고 페이지 안에서 `fetch('/results?search_query=...&sp=EgIQAQ%253D%253D')`의 `ytInitialData`를 파싱해 후보를 고르면 빨라요. 기준:
   - 제목에 캐릭터 이름(이격·코스튬 이름까지)이 모두 들어가야 함, 같은 이름의 다른 버전 영상이면 제외
   - 가산: skill/showcase/gameplay/combat demo/burst/스킬/시연, 25초~10분
   - 감점·제외: tier/guide/review/pull/summon/banner/reaction/fan animation/뉴스·정보 유출
   - 게임별 좋은 출처: 에픽세븐 `Pixel Flow`의 "(Skills & Voice Lines)", 엔드필드 공식 "Operator Combat Demo", 원신 공식 "Character Demo", 니케 "Burst Skill Animation"·"Motion Demonstration", 몬길 `몬 자` 채널 "~도 이해하는 {이름} 가이드"와 공식 채널 "[몬길: STAR DIVE] {칭호} - {이름}", 히노카미2 `GameBurst` "Complete Moveset"·`고네` "오의 ... 모음"·SEGA Korea "캐릭터 소개 영상", 그랑블루VS `Cygames EN` "Gameplay Trailer"와 "Super Skybound Art" 영상, 듀나어 공식 "Character Trailer", 붕괴3rd 공식 "Battlesuit Trailer", 롤 "{영문} Champion Spotlight"·"{스킨} Skin Spotlight"(SkinSpotlights), TFT "3 Star {영문}", 발로란트 공식 "Agent Trailer"·"abilities showcase", 2XKO `GameBurst` "Complete Moveset"·`StixFGC` "All Supers"·공식 "Champion Spotlight" (팬 리메이크·"all supers on X" 류는 제외)
   - 공식 트레일러는 `{"label":"공식 소개"}`로 스킬모음 뒤에 넣어요
   - 브라우저를 쓸 수 없으면 WebSearch로 `site:youtube.com` 검색해서 같은 기준으로 골라요
4. **DB 쓰기** — 링크 문서 형식 `{items:[{url,label}], game, ko, en, ver, updatedAt}`. 새 영상은 `{"label":"(자동생성) 스킬모음"}`로 items 맨 앞에 넣고 기존 항목(공식 소개 등)은 유지. 기존 문서는 `update` + `if_version`, 없는 문서는 `set`. batch는 50개씩.
5. **썸네일(가능할 때만)** — 나무위키 등장인물 페이지(붕괴3rd는 `붕괴3rd/발키리`, 몬길은 `몬길: STAR DIVE/인게임 정보`, 듀나어는 `듀엣 나이트 어비스/캐릭터`, 그랑블루VS는 `그랑블루 판타지 Versus -RISING-`, 히노카미2는 `귀멸의 칼날 히노카미 혈풍담 2`)에서 새 캐릭터 이미지 해시를 찾고, 내장 브라우저 탭을 `https://i.namu.wiki/i/<아무 이미지>`로 연 뒤(나무위키 페이지에서 `window.name`에 담아 둔 값은 같은 사이트라 i.namu.wiki로 이동해도 남아 있어요) 같은 출처 fetch로 이미지를 받아 80×80 칸으로 그려요(세로로 긴 그림은 윗부분 정사각). 결과는 base64로 출력하고 끝에 7만 자 정도 패딩을 붙이면 도구 결과가 파일로 저장돼서 `tools/transfer_grab.py`로 꺼낼 수 있어요. 컨테이너에서 PIL로 기존 시트 끝에 칸을 붙이고 json의 `ids`/`rows`를 갱신 → `Artifact publish`(`asset: true`, url 지정)로 새 webp 업로드 → `sprites/blobs.json`의 id 교체. 못 하면 건너뛰어도 돼요(이름 첫 글자로 표시됨).
6. **빌드·게시** — `python3 lib/build.py && node --check dist/check.js` 후 `Artifact publish`에 url `https://claude.ai/artifact/7LbERytRvd6GRiqhs3saUB`, file_path `library/dist/library.html`. capabilities는 생략(기존 db·user·assets 유지). 게시본은 로그인하지 않은 사람에게 보이는 스냅샷도 함께 갱신해요.
6-1. **팀 배포판 갱신** — 팀원 공유용 보기 전용 사본 https://claude.ai/artifact/LXJy98ic5VNv8ZEfZsjbCg (DB 없이 스냅샷만, 링크 편집·북마크 추가 불가). `DIST=1 python3 lib/build.py`로 `dist/team/index.html`을 만들고, `dist/team/sprites/<게임>.webp`(= `sprites/*.webp` 복사)와 `dist/team/thumbs/<asset id>.webp`(DB `thumbs` 컬렉션의 asset을 `Artifact read`의 `path`=asset id로 하나씩 받아 둠)를 함께 `Artifact publish`(file_path `dist/team/index.html`, `root` `dist/team`, `files`에 sprites·thumbs 목록, url 위 주소)로 올려요. 원본을 갱신할 때마다 같이 올려야 팀 배포판도 최신이 돼요
7. **저장소 반영** — 로스터·스프라이트 변경을 `library/`에 커밋하고 main에 push(`snap/`, `dist/`는 커밋하지 않음).
8. **보고** — 게임별로 추가한 캐릭터, 새로 넣은 스킬모음 수, 못 찾은 캐릭터를 짧게 정리해서 사용자에게 알려요.

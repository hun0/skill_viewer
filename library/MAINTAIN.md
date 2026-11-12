# 스킬 연출 라이브러리 — 월간 갱신 절차

라이브러리 아티팩트: https://claude.ai/artifact/7LbERytRvd6GRiqhs3saUB
프레임 뷰어: https://hun0.github.io/skill_viewer/ (이 저장소 루트의 index.html)

이 폴더(`library/`)가 라이브러리 페이지의 원본이에요. 페이지는 `lib/build.py`가 만들고, 링크·북마크는 아티팩트 DB에 있어요.

## 폴더 구성
- `lib/script.js`, `lib/extra.css`, `lib/markup.html`, `lib/viewer.js` — 페이지 코드
- 검색 기준 '속성·역할 (전체)'는 `lib/script.js`의 `ELEM_GROUPS`(불·얼음·번개… 대표 이름과 게임별 동의어)로 게임마다 다른 속성 이름을 하나로 묶어요. 새 게임에 새 속성 이름이 있으면 해당 그룹의 `w` 목록에 추가하고, 같은 단어가 게임마다 뜻이 다르면 `ELEM_GAME`에 예외를 넣어요
- `lib/i18n.js` — 상단 언어 전환(한국어/English/中文). 코드의 한국어 문구를 화면에서 바꿔 끼우는 층이라, 새 문구·속성·역할 값이 생기면 `DICT`(공통), `GDICT`(게임마다 뜻이 다른 단어), `RULES`(숫자·이름이 섞인 문구), `GI18N`(게임 이름)에 영어·중국어를 추가해요. 게임 노트 번역은 노트 원문 그대로를 키로 쓰므로 노트를 고치면 번역도 다시 넣어야 해요(없으면 한국어로 표시)
- `lib/hsr_source.html` — 스타레일 로스터와 기본 CSS. 캐릭터 행 형식: `["id","한글","English",등급,"속성","운명의 길","버전"]`, 중국어 이름은 같은 파일의 `const ZH = {...}`
- `lib/build.py` — 페이지 생성. **스타레일 출시 예정 표시는 build.py 안의 `r[6]=="4.7"` 조건**이라, 새 버전이 나오면 이 숫자를 다음 예정 버전으로 바꿔요
- `games/<게임>.json` — 나머지 30개 게임 로스터 (`zzz ww nte e7 gi r99 pgr nikke ake bd2 hi3 dna mgl gbvs gbr gg db bb dnf kny ap sp mt mr sn er lol tft val 2xko`). 항목: `id, ko, en, zh, rarity, attr, role, ver`, 선택 `date`, 출시 전이면 `"upcoming": true`
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
7. **저장소 반영** — 로스터·스프라이트 변경을 `library/`에 커밋하고 main에 push(`snap/`, `dist/`는 커밋하지 않음).
8. **보고** — 게임별로 추가한 캐릭터, 새로 넣은 스킬모음 수, 못 찾은 캐릭터를 짧게 정리해서 사용자에게 알려요.

# 스킬 연출 라이브러리 — 월간 갱신 절차

라이브러리 아티팩트: https://claude.ai/artifact/7LbERytRvd6GRiqhs3saUB
프레임 뷰어: https://hun0.github.io/skill_viewer/ (이 저장소 루트의 index.html)

이 폴더(`library/`)가 라이브러리 페이지의 원본이에요. 페이지는 `lib/build.py`가 만들고, 링크·북마크는 아티팩트 DB에 있어요.

## 폴더 구성
- `lib/script.js`, `lib/extra.css`, `lib/markup.html`, `lib/viewer.js` — 페이지 코드
- `lib/hsr_source.html` — 스타레일 로스터와 기본 CSS. 캐릭터 행 형식: `["id","한글","English",등급,"속성","운명의 길","버전"]`, 중국어 이름은 같은 파일의 `const ZH = {...}`
- `lib/build.py` — 페이지 생성. **스타레일 출시 예정 표시는 build.py 안의 `r[6]=="4.7"` 조건**이라, 새 버전이 나오면 이 숫자를 다음 예정 버전으로 바꿔요
- `games/<게임>.json` — 나머지 10개 게임 로스터 (`zzz ww nte e7 gi r99 pgr nikke ake bd2`). 항목: `id, ko, en, zh, rarity, attr, role, ver`, 선택 `date`, 출시 전이면 `"upcoming": true`
- `sprites/<게임>.webp` + `<게임>.json` — 나무위키 이미지로 만든 캐릭터 썸네일 시트(80px 칸, 16열). json의 `ids` 순서가 칸 순서
- `sprites/blobs.json` — 각 시트가 아티팩트에 올라가 있는 asset id
- `tools/transfer_grab.py` — 브라우저 결과가 너무 커서 파일로 저장됐을 때 `@@TAG@@...@@END@@` 사이 JSON을 꺼내는 도우미

## 갱신 순서
1. **새 캐릭터 확인** — 게임마다 최근 한 달 사이 출시됐거나 출시 예정이 공개된 플레이어블 캐릭터를 웹 검색으로 확인해요(나무위키·공식 공지·Prydwen·fandom). 로스터와 비교해서
   - 없는 캐릭터는 추가(id는 `게임키-영문-소문자-하이픈`, 스타레일은 접두어 없음)
   - 이미 있던 `upcoming` 캐릭터가 출시됐으면 `upcoming` 제거
   - 브더2는 코스튬 단위, 니케·퍼니싱·브더2·에픽세븐은 `ver`가 출시 연도
2. **현재 DB 받기** — `ArtifactData list`로 `links`(1000개씩 cursor 페이징), `bookmarks`, `thumbs`, `bosses`를 `library/snap/` 아래에 out_dir로 저장. 응답에 찍힌 version은 이후 update의 `if_version`에 써요.
3. **스킬 영상 찾기** — 새로 출시된 캐릭터와 아직 `(자동생성) 스킬모음` 링크가 없는 캐릭터만 대상. 사용자의 데스크톱 앱 내장 브라우저로 youtube.com 탭을 열고 페이지 안에서 `fetch('/results?search_query=...&sp=EgIQAQ%253D%253D')`의 `ytInitialData`를 파싱해 후보를 고르면 빨라요. 기준:
   - 제목에 캐릭터 이름(이격·코스튬 이름까지)이 모두 들어가야 함, 같은 이름의 다른 버전 영상이면 제외
   - 가산: skill/showcase/gameplay/combat demo/burst/스킬/시연, 25초~10분
   - 감점·제외: tier/guide/review/pull/summon/banner/reaction/fan animation/뉴스·정보 유출
   - 게임별 좋은 출처: 에픽세븐 `Pixel Flow`의 "(Skills & Voice Lines)", 엔드필드 공식 "Operator Combat Demo", 원신 공식 "Character Demo", 니케 "Burst Skill Animation"·"Motion Demonstration"
   - 브라우저를 쓸 수 없으면 WebSearch로 `site:youtube.com` 검색해서 같은 기준으로 골라요
4. **DB 쓰기** — 링크 문서 형식 `{items:[{url,label}], game, ko, en, ver, updatedAt}`. 새 영상은 `{"label":"(자동생성) 스킬모음"}`로 items 맨 앞에 넣고 기존 항목(공식 소개 등)은 유지. 기존 문서는 `update` + `if_version`, 없는 문서는 `set`. batch는 50개씩.
5. **썸네일(가능할 때만)** — 나무위키 등장인물 페이지에서 새 캐릭터 이미지 해시를 찾고, 내장 브라우저 탭을 `https://i.namu.wiki/i/<아무 이미지>`로 연 뒤 같은 출처 fetch로 이미지를 받아 80×80 칸으로 그려요(세로로 긴 그림은 윗부분 정사각). 결과는 base64로 출력하고 끝에 7만 자 정도 패딩을 붙이면 도구 결과가 파일로 저장돼서 `tools/transfer_grab.py`로 꺼낼 수 있어요. 컨테이너에서 PIL로 기존 시트 끝에 칸을 붙이고 json의 `ids`/`rows`를 갱신 → `Artifact publish`(`asset: true`, url 지정)로 새 webp 업로드 → `sprites/blobs.json`의 id 교체. 못 하면 건너뛰어도 돼요(이름 첫 글자로 표시됨).
6. **빌드·게시** — `python3 lib/build.py && node --check dist/check.js` 후 `Artifact publish`에 url `https://claude.ai/artifact/7LbERytRvd6GRiqhs3saUB`, file_path `library/dist/library.html`. capabilities는 생략(기존 db·user·assets 유지). 게시본은 로그인하지 않은 사람에게 보이는 스냅샷도 함께 갱신해요.
7. **저장소 반영** — 로스터·스프라이트 변경을 `library/`에 커밋하고 main에 push(`snap/`, `dist/`는 커밋하지 않음).
8. **보고** — 게임별로 추가한 캐릭터, 새로 넣은 스킬모음 수, 못 찾은 캐릭터를 짧게 정리해서 사용자에게 알려요.

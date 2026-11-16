import json,re,sys
B=sys.argv[1] if len(sys.argv)>1 else '.'
d=json.load(open(f'{B}/ani/sakuga.json')); K=json.load(open(f'{B}/ani/keys.json'))
META={"aop":("원피스","One Piece","海贼王"),"ajjk":("주술회전","Jujutsu Kaisen","咒术回战"),"anrt":("나루토","Naruto","火影忍者"),
"abrt":("보루토","Boruto","博人传"),"amha":("나의 히어로 아카데미아","My Hero Academia","我的英雄学院"),"acsm":("체인소 맨","Chainsaw Man","电锯人"),
"afate":("페이트 시리즈","Fate Series","Fate 系列"),"adb":("드래곤볼","Dragon Ball","龙珠"),"aopm":("원펀맨","One-Punch Man","一拳超人"),
"aaot":("진격의 거인","Attack on Titan","进击的巨人"),"afma":("강철의 연금술사","Fullmetal Alchemist","钢之炼金术师"),"afrn":("장송의 프리렌","Frieren","葬送的芙莉莲"),
"aeva":("에반게리온","Evangelion","新世纪福音战士"),"abc":("블랙 클로버","Black Clover","黑色五叶草"),"akny":("귀멸의 칼날","Demon Slayer","鬼灭之刃"),
"agl":("천원돌파 그렌라간","Gurren Lagann","天元突破"),"aff":("불꽃 소방대","Fire Force","炎炎消防队"),"ablc":("블리치","Bleach","死神"),
"amob":("모브사이코 100","Mob Psycho 100","灵能百分百"),"ase":("소울 이터","Soul Eater","噬魂师"),"asl":("나 혼자만 레벨업","Solo Leveling","我独自升级"),
"addd":("단다단","Dandadan","胆大党"),"ajojo":("죠죠의 기묘한 모험","JoJo's Bizarre Adventure","JOJO的奇妙冒险"),"aklk":("킬라킬","Kill la Kill","斩服少女"),
"apkm":("포켓몬스터","Pokémon","宝可梦"),"agdm":("건담","Gundam","高达"),"apc":("프리큐어","Pretty Cure","光之美少女"),
"amt":("무직전생","Mushoku Tensei","无职转生"),"aor":("왕 랭킹","Ranking of Kings","国王排名"),"acpe":("사이버펑크: 엣지러너","Cyberpunk: Edgerunners","赛博朋克：边缘行者")}
SPECIAL={"robert_psychosis_onehundred_s1":"Mob Psycho 100","robert_psychosis_onehundred_s2":"Mob Psycho 100 II","mօb_psycho_100_iii":"Mob Psycho 100 III",
 "naruto_(2002)":"Naruto (2002)","one_piece:_episode_of_chopper_+_fuyu_ni_saku_kiseki_no_sakura":"One Piece: Episode of Chopper"}
SMALL={"of","the","no","ni","wa","to","a","an","and","in","o","ga"}
LAB=["불","번개","폭발","빔","얼음","물·액체","연기","바람","스파크","파편","임팩트 프레임","스미어","미사일","변형","CG"]
QUERY={"naruto":"naruto -boruto:_naruto_next_generations -boruto:_naruto_the_movie"}
def pretty(t):
    if t in SPECIAL: return SPECIAL[t]
    out=[]
    for i,x in enumerate(t.replace('_',' ').split(' ')):
        if not x: continue
        out.append(x if (i and x in SMALL) else x[:1].upper()+x[1:])
    s=' '.join(out)
    s=re.sub(r'/([a-z])',lambda m:'/'+m.group(1).upper(),s)
    s=re.sub(r'\b(Ii|Iii|Iv)\b',lambda m:m.group(1).upper(),s)
    return s.replace(' Pv',' PV').replace(' Cm',' CM').replace('(tv)','(TV)').replace(' Ms ',' MS ').replace('(ova)','(OVA)')
def aname(a): return 'Unknown' if a=='artist_unknown' else ' '.join(x[:1].upper()+x[1:] for x in a.replace('_',' ').split(' '))
for tag,recs in d.items():
    k=K[tag]; ko,en,zh=META[k]; roster=[]
    for r in recs:
        arts=[aname(a) for a in r['artists']] or ['Unknown']
        named=[a for a in arts if a!='Unknown'] or arts
        disp=', '.join(named[:2])+(f" 외 {len(named)-2}명" if len(named)>2 else '')
        work=pretty(r['cp']) if r['cp'] else en
        src=r['src'] if not r['src'].startswith('http') else ''
        attr=work if len(work)<=34 else work[:33]+'…'
        roster.append({"id":f"{k}-{r['id']}","ko":disp,"en":work+(f" · {src}" if src else ''),"zh":"","rarity":"","attr":attr,"role":"","ver":"",
          "score":r['score'],"arts":', '.join(arts),"fx":[LAB[ord(c)-97] for c in r['fx']],"sk":{"p":r['id'],"u":f"https://www.sakugabooru.com/data/{r['md5']}.{r['ext']}"}})
    q=QUERY.get(tag,tag)
    out={"note":f"Sakugabooru에서 ‘{q} effects fighting’ 태그를 점수순(order:score)으로 뽑은 인기 이펙트 전투 클립 {len(roster)}개예요. 이름 자리는 원화가(키 애니메이터), 아래 줄은 작품·화수, 태그는 Sakugabooru의 이펙트 종류 태그(불·번개·폭발·연기·스미어 등)를 옮긴 거예요.",
         "src":f'출처: <a href="https://www.sakugabooru.com/post?tags={q.replace("&","%26").replace(" ","+")}+effects+fighting+order%3Ascore" target="_blank" rel="noopener">Sakugabooru · {en}</a>',
         "roster":roster,"meta":{"ko":ko,"en":en,"zh":zh,"tag":tag}}
    json.dump(out,open(f'{B}/bili/games/{k}.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('gen', sum(len(v) for v in d.values()))

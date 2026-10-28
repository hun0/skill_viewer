import json,sys
def grab(p,tag):
    d=json.load(open(p)); t=d[0]['text']
    s,_=json.JSONDecoder().raw_decode(t)
    i=s.index('@@'+tag+'@@'); j=s.index('@@END@@')
    return json.loads(s[i+len(tag)+4:j])
if __name__=='__main__':
    o=grab(sys.argv[1],sys.argv[2]); json.dump(o,open(sys.argv[3],'w'))
    print({k:len(v) for k,v in o.items()} if isinstance(o,dict) else len(o))

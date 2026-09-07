"""Extract every English interface string from the mock and report which ones lack fr/es/nl/id entries.

Usage:  python scripts/extract_strings.py            -> prints totals, writes scripts/todo.json (untranslated English strings)
        python scripts/extract_strings.py merge tr.json ... -> merges {"<index>": [fr,es,nl,id]} chunks (index into todo.json)
                                                           into lib/dict.generated.json (hand-reviewed lib/dict.ts CORE entries always win)
"""
import re, glob, json, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
HERE = os.path.join(ROOT, "scripts")
GEN = os.path.join(ROOT, "lib", "dict.generated.json")

files = glob.glob("app/**/*.tsx", recursive=True) + glob.glob("components/*.tsx") + glob.glob("lib/*.ts") + glob.glob("lib/*.tsx")
files = [f for f in files if not f.replace("\\", "/").endswith("lib/dict.ts")]
ens = set()
STR = r'"((?:[^"\\]|\\.)*)"'
pat = re.compile(r't3\(\s*' + STR + r'\s*,\s*' + STR + r'\s*,\s*' + STR + r'\s*\)')
pat2 = re.compile(r'\{\s*zh:\s*"([^"]*)",\s*en:\s*"([^"]*)",\s*sw:\s*"([^"]*)"\s*\}')
for f in files:
    s = open(f, encoding="utf8").read()
    for m in pat.finditer(s): ens.add(m.group(2).replace('\\"', '"'))
    for m in pat2.finditer(s): ens.add(m.group(2))

dict_src = open("lib/dict.ts", encoding="utf8").read()
have = {h.replace('\\"', '"') for h in re.findall(r'^\s*"((?:[^"\\]|\\.)*)":\s*\[', dict_src, re.M)}
gen = json.load(open(GEN, encoding="utf8")) if os.path.exists(GEN) else {}
have |= set(gen)

todo_path = os.path.join(HERE, "todo.json")
if len(sys.argv) > 1 and sys.argv[1] == "merge":
    todo = json.load(open(todo_path, encoding="utf8"))
    for chunk in sys.argv[2:]:
        for k, v in json.load(open(chunk, encoding="utf8")).items():
            assert isinstance(v, list) and len(v) == 4, (chunk, k)
            gen[todo[int(k)]] = v
    json.dump(gen, open(GEN, "w", encoding="utf8"), ensure_ascii=False, indent=0)
    print("generated entries:", len(gen))
    sys.exit()

todo = sorted(e for e in ens if e not in have)
json.dump(todo, open(todo_path, "w", encoding="utf8"), ensure_ascii=False, indent=0)
print(len(ens), "total strings;", len(ens - set(todo)), "translated;", len(todo), "todo (scripts/todo.json)")

import re

src = open(r"src\data\casa.ts", encoding="utf-8").read()
seg = src[src.find("export const categorias"):src.find("export const almuerzoEjemplo")]
print("caracteres:", len(seg))
for m in re.finditer(r"id: '([a-z-]+)'|titulo: '([^']+)'|pie: '([^']+)'", seg):
    print("".join(x for x in m.groups() if x))

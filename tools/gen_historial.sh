#!/bin/sh
# Genera data/historial.js con el historial de commits (instantánea para uso sin conexión).
# Ejecutar antes de hacer commit:  sh tools/gen_historial.sh
cd "$(dirname "$0")/.." || exit 1
python3 - <<'PY'
import subprocess, json
out = subprocess.check_output(["git","log","--format=%H%x1f%an%x1f%aI%x1f%s%x1f%b%x1e"], text=True)
rows=[]
for r in out.split("\x1e"):
    r=r.strip()
    if not r: continue
    h,a,d,s,b=(r.split("\x1f")+[""])[:5]
    rows.append({"sha":h,"autor":a,"fecha":d,"msg":s,"cuerpo":"\n".join(l for l in b.splitlines() if not l.startswith(("Co-Authored-By","Claude-Session"))).strip()})
open("data/historial.js","w",encoding="utf8").write("// Generado por tools/gen_historial.sh\nwindow.HISTORIAL = "+json.dumps(rows,ensure_ascii=False,indent=1)+";\n")
PY

"""Fase 1: observación en vivo de grillify #brewery + interacciones (marquee arrastrable?)."""
from playwright.sync_api import sync_playwright

URL = "https://grillify.framer.website/"
OUT = r"C:\Users\Usuario\Dev\casa-del-sabor\tests\capturas"

JS_INSP = """() => {
  // localiza la sección brewery y sus tarjetas
  const qs = (s) => document.querySelectorAll(s);
  const h2s = Array.from(document.querySelectorAll('h2,h1,h3'));
  const brew = h2s.find(h => /brewery/i.test(h.innerText));
  if (!brew) return { error: 'no brewery' };
  let sec = brew.closest('section') || brew.parentElement.parentElement.parentElement.parentElement;
  const r = sec.getBoundingClientRect();
  // describe estructura de hijos con clases framer
  const describe = (el, d = 0, out = []) => {
    if (d > 5 || out.length > 60) return out;
    for (const c of el.children) {
      const cr = c.getBoundingClientRect();
      out.push(`${' '.repeat(d)}<${c.tagName.toLowerCase()}> ${String(c.className).slice(0, 60)} x:${Math.round(cr.x - r.x)} w:${Math.round(cr.width)} h:${Math.round(cr.height)}`);
      describe(c, d + 1, out);
    }
    return out;
  };
  // overflow del contenedor de tarjetas?
  const scrollables = Array.from(sec.querySelectorAll('*')).filter(e => e.scrollWidth > e.clientWidth + 10).slice(0, 8)
    .map(e => ({ cls: String(e.className).slice(0, 70), sw: e.scrollWidth, cw: e.clientWidth });
  return { rect: { w: Math.round(r.width), h: Math.round(r.height) }, arbol: describe(sec.slice(0, 40)), scrollables };
}"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(2500)

    # directo al ancla
    page.goto(URL + "#brewery", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(3500)
    page.screenshot(path=f"{OUT}/ref-brewery.png")

    # estado tras mover rueda ligeramente (¿avanza el marquee con drag?)
    page.mouse.wheel(0, 260)
    page.wait_for_timeout(1400)
    page.screenshot(path=f"{OUT}/ref-brewery2.png")

    # introspección
    try:
        data = page.evaluate(JS_INSP)
        import json
        print(json.dumps(data, ensure_ascii=False)[:2600])
    except Exception as e:
        print("inspección falló:", e)
    browser.close()

"""Captura de referencia: grillify.framer.website (solo lectura, no se publica nada)."""
import json
from playwright.sync_api import sync_playwright

URL = "https://grillify.framer.website/"
OUT = r"C:\Users\Usuario\Dev\casa-del-sabor\tests\capturas"

with sync_playwright() as p:
    browser = p.chromium.launch()

    # ---------- Escritorio ----------
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(URL, wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(3000)

    # recorrer para disparar animaciones framer
    alto = page.evaluate("document.body.scrollHeight")
    y = 0
    while y < alto:
        y += 700
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(300)
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(600)
    page.screenshot(path=f"{OUT}/grillify-desktop.png", full_page=True)

    # estructura de secciones + estilos clave
    info = page.evaluate("""() => {
      const estilo = (el, props) => {
        const c = getComputedStyle(el);
        const o = {};
        for (const p of props) o[p] = c.getPropertyValue(p);
        return o;
      };
      const heads = Array.from(document.querySelectorAll('h1,h2,h3')).map(h => ({
        tag: h.tagName, text: h.innerText.slice(0, 60),
        size: getComputedStyle(h).fontSize,
        family: getComputedStyle(h).fontFamily.replace(/['"]/g,'').split(',')[0],
        weight: getComputedStyle(h).fontWeight,
        ls: getComputedStyle(h).letterSpacing, lh: getComputedStyle(h).lineHeight,
      }));
      const body = estilo(document.body, ['background-color','color','font-family']);
      const btn = document.querySelector('a:has(p.Path-Button), a.pulsante') || Array.from(document.querySelectorAll('a')).find(a => a.className.includes('avilable'));
      const links = Array.from(document.querySelectorAll('nav a, header a')).slice(0, 20).map(a => a.innerText.trim() + ' -> ' + a.getAttribute('href'));
      const imgs = Array.from(document.images).slice(0, 14).map(i => ({src: i.currentSrc.split('/').pop().slice(0,60), w: i.width, h: i.height}));
      const botones = Array.from(document.querySelectorAll('a')).filter(a => a.innerText.trim()).slice(0, 30)
        .map(a => ({t: a.innerText.trim().slice(0,30), href: (a.getAttribute('href')||'').slice(0,50)}));
      // metadata framer
      const html = document.documentElement.outerHTML;
      const colores = [...new Set((html.match(/rgb\\([0-9, .]+\\)/g)||[]))].slice(0, 40);
      return { heads, body, links, imgs, botones: botones.slice(0,20), colores };
    }""")
    with open(f"{OUT}/grillify-meta.json", "w", encoding="utf-8") as f:
        json.dump(info, f, ensure_ascii=False, indent=1)
    print(json.dumps(info, ensure_ascii=False)[:1800])
    browser.close()

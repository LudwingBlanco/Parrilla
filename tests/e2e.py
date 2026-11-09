"""Pruebas E2E del sitio de Casa del Sabor Parrilla.

Cubre: carga, consola/errores, recursos rotos, desbordamiento horizontal,
navegación por anclas, filtrado de carta, menú móvil, enlaces externos y
capturas de pantalla para revisión visual (escritorio y móvil).
"""
from pathlib import Path
import json

from playwright.sync_api import sync_playwright

AQUÍ = Path(__file__).parent
CAPTURAS = AQUÍ / "capturas"
CAPTURAS.mkdir(exist_ok=True)
BASE = "http://localhost:4173"

errores = []
recursos_fallidos = []
avisos_consola = []


def recepcion(page):
    page.on("console", lambda m: (
        errores.append(m.text) if m.type == "error" else (
            avisos_consola.append(m.text) if m.type == "warning" else None
        )
    ))
    page.on("pageerror", lambda e: errores.append(f"pageerror: {e}"))
    page.on("requestfailed", lambda r: recursos_fallidos.append(r.url))


def sin_desbordamiento(page):
    sw = page.evaluate("document.scrollingElement.scrollWidth")
    iw = page.evaluate("window.innerWidth")
    return sw <= iw + 1


def recorrido(page, paso=800, pausa=160):
    """Recorre la página forzando los reveals (IntersectionObserver) y las
    cargas diferidas antes de capturar: sin esto, un screenshot de página
    completa muestra en negro las secciones que aún no entraron en pantalla."""
    alto = page.evaluate("document.body.scrollHeight")
    y = 0
    while y < alto:
        y += paso
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(pausa)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)


def imagenes_cargadas(page):
    # Invoca el disparador de carga diferida en cada imagen y da tiempo a terminar
    page.evaluate(
        """async () => {
          const imgs = Array.from(document.images);
          for (const i of imgs) { i.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 220)); }
          window.scrollTo(0, 0);
          await new Promise(r => setTimeout(r, 400));
        }"""
    )
    page.wait_for_load_state("networkidle")
    return page.evaluate(
        "Array.from(document.images).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src || '(sin src)')"
    )


with sync_playwright() as p:
    navegador = p.chromium.launch(headless=True)

    # ---------- Escritorio ----------
    pag = navegador.new_page(viewport={"width": 1440, "height": 900})
    recepcion(pag)
    pag.goto(BASE, wait_until="networkidle")
    assert "Casa del Sabor Parrilla" in pag.title(), pag.title()

    recorrido(pag)
    pag.screenshot(path=str(CAPTURAS / "escritorio-completo.png"), full_page=True)
    print("TITULO:", pag.title())
    print("DESBORDAMIENTO_ESCRITORIO:", not sin_desbordamiento(pag))
    print("IMAGENES_ROTAS:", imagenes_cargadas(pag))

    # jerarquía semántica mínima
    for sel, n in [("h1", 1), ("section", 6)]:
        print(f"CONTEO {sel}:", pag.locator(sel).count(), "esperado >=", n)

    # carta: filtrado por categoría
    pag.locator("button", has_text="Perros dog").first.click()
    pag.wait_for_timeout(250)
    texto_carta = pag.locator("#carta").inner_text()
    assert "Perro Tradicional" not in texto_carta, "debe decir 'Tradicional' sin 'Perro' repetido…"
    print("PERROS_MOSTRADOS:", "$ 20,000" in texto_carta or "$ 20.000" in texto_carta or "Salchicha americana" in texto_carta)
    pag.locator("button", has_text="Almuerzos del día").first.click()
    pag.wait_for_timeout(250)
    print("ALMUERZOS_CTA_OPLACE:", pag.locator("#carta a", has_text="Ola.Click").count() >= 1)
    # El enlace de almuerzos solo está montado con esta categoría activa
    hrefs_almuerzos = pag.evaluate("Array.from(document.querySelectorAll('a[href^=\"http\"]')).map(a => a.href)")
    pag.locator("button", has_text="Hamburguesas").first.click()
    pag.wait_for_timeout(250)
    print("XL_PRECIO_VISIBLE:", pag.locator("#carta").inner_text().find("38.900") >= 0)

    # enlaces externos verificados
    esperados = {
        "whatsapp": "https://api.whatsapp.com/send?phone=+573183417101",
        "cartaRapidas": "https://queresto.com/lacasadelsaborcomidasrapidas",
        "cartaAlmuerzos": "https://almuerzosgourmet.ola.click/products",
        "maps": "https://maps.google.com/?cid=4175041854354877566",
        "instagram": "https://www.instagram.com/casadelsaborparrilla/",
        "facebook": "https://www.facebook.com/RestauranteLaCasaDelSabor/",
    }
    hrefs = pag.evaluate("Array.from(document.querySelectorAll('a[href^=\"http\"]')).map(a => a.href)")
    hrefs_set = set(hrefs) | set(hrefs_almuerzos)
    for nombre, url in esperados.items():
        ok = any(h.startswith(url) for h in hrefs_set)
        print(f"ENLACE {nombre}:", "OK" if ok else f"FALTA ({url})")
    # rel=noopener en externos target=_blank
    sin_relayer = pag.evaluate(
        "Array.from(document.querySelectorAll('a[target=_blank]')).filter(a => { const rel = a.rel || ''; return !rel.includes('noopener'); }).length"
    )
    print("TARGET_BLANK_SIN_NOOPENER:", sin_relayer)

    # anclas de navegación
    pag.locator("header a", has_text="Carta").first.click()
    pag.wait_for_timeout(400)
    print("ANCLA_CARTA:", pag.evaluate("window.scrollY") > 200)

    # JSON-LD
    datos = pag.evaluate("JSON.parse(document.querySelector('script[type=\"application/ld+json\"]').textContent)")
    print("JSON_LD_TIPO:", datos["@type"], "| DIRECCION:", datos["address"]["streetAddress"])
    pag.screenshot(path=str(CAPTURAS / "escritorio-carta.png"), clip={"x": 0, "y": pag.evaluate("document.querySelector('#carta').getBoundingClientRect().top + window.scrollY"), "width": 1440, "height": 900}) if False else None
    pag.close()

    # ---------- Móvil ----------
    mov = navegador.new_page(viewport={"width": 390, "height": 844})
    recepcion(mov)
    mov.goto(BASE, wait_until="networkidle")

    recorrido(mov)
    mov.screenshot(path=str(CAPTURAS / "movil-completo.png"), full_page=True)
    print("DESBORDAMIENTO_MOVIL:", not sin_desbordamiento(mov))
    print("IMAGENES_ROTAS_MOVIL:", imagenes_cargadas(mov))

    # botón de WhatsApp flotante y CTA
    print("CTA_FLOTANTE_MOVIL:", mov.locator("a[aria-label*='WhatsApp']").count() >= 1)

    # menú móvil: abrir, verificar aria, navegar, cerrar
    boton = mov.locator("header button[aria-controls='menu-movil']")
    boton.click()
    mov.wait_for_timeout(200)
    print("MENU_ABIERTO_ARIA:", boton.get_attribute("aria-expanded"))
    mov.screenshot(path=str(CAPTURAS / "movil-menu.png"))
    enl_menu = mov.locator("#menu-movil a", has_text="Visítanos").first
    enl_menu.click()
    mov.wait_for_timeout(500)
    print("MENU_CERRADO_TRAS_CLICK:", boton.get_attribute("aria-expanded") == "false")
    print("SECCION_VISITANOS_VISIBLE:", mov.locator("#visitanos").bounding_box()["y"] < 900)
    # Escape cierra el menú
    boton.click()
    mov.wait_for_timeout(150)
    mov.keyboard.press("Escape")
    mov.wait_for_timeout(150)
    print("MENU_CERRADO_ESC:", boton.get_attribute("aria-expanded") == "false")
    mov.close()

    navegador.close()

print("\n--- RESULTADO CONSOLA ---")
print("ERRORES:", errores if errores else "ninguno")
print("AVISOS:", avisos_consola if avisos_consola else "ninguno")
print("RECURSOS_FALLIDOS:", recursos_fallidos if recursos_fallidos else "ninguno")

resultado = {
    "errores": errores,
    "avisos": avisos_consola,
    "recursos_fallidos": recursos_fallidos,
}
(CAPTURAS / "resultado.json").write_text(json.dumps(resultado, ensure_ascii=False, indent=2), encoding="utf-8")

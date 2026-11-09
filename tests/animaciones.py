"""Fase 4/5 — verificación de animaciones e interacciones reales en el navegador."""
from playwright.sync_api import sync_playwright
import json

BASE = "http://localhost:4173"
OUT = r"C:\Users\Usuario\Dev\casa-del-sabor\tests\capturas"
ok = []
fallos = []


def check(nombre, cond):
    (ok if cond else fallos).append(nombre)
    print(("OK   " if cond else "FALLO") + " " + nombre)


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errores_consola = []
    page.on("console", lambda m: errores_consola.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errores_consola.append(str(e)))
    page.goto(BASE, wait_until="networkidle")
    page.wait_for_timeout(600)

    # --- 1. marquesinas corriendo (fotos y fichas) ---
    estado = page.evaluate(
        """() => document.querySelector('.desfile-fotos') &&
            getComputedStyle(document.querySelector('.desfile-fotos')).animationPlayState"""
    )
    check("marquee de fotos en ejecución", estado == "running")

    # --- 2. parallax del hero: transform cambia con el scroll ---
    y0 = page.evaluate("document.querySelector('.paralaje-img').style.transform")
    page.evaluate("window.scrollTo({top: 320, behavior: 'instant'})")
    page.wait_for_timeout(220)
    y1 = page.evaluate("document.querySelector('.paralaje-img').style.transform")
    check("hero parallax cambia con el scroll", y0 != y1 and "translate3d" in y1)
    page.screenshot(path=f"{OUT}/anim-parallax.png")

    # --- 3. reveal escalonado: sección especialidades se revela al entrar ---
    page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    page.wait_for_timeout(300)
    revela = page.evaluate(
        """() => {
            const el = document.querySelector('#especialidades .titulo-seccion')?.closest('.aparece');
            return el ? el.classList.contains('aparece-visible') : null;
        }"""
    )
    check("especialidades NO visible antes del scroll", revela is False)
    page.evaluate("document.querySelector('#especialidades h2').scrollIntoView({block: 'center'})")
    page.wait_for_timeout(900)
    revela2 = page.evaluate(
        """() => {
            const el = document.querySelector('#especialidades .titulo-seccion')?.closest('.aparece');
            return el ? el.classList.contains('aparece-visible') : null;
        }"""
    )
    check("especialidades se revela al entrar", revela2 is True)

    # --- 4. panel de la carta animado al cambiar categoría ---
    page.evaluate("document.querySelector('#carta').scrollIntoView()")
    page.wait_for_timeout(500)
    page.locator("button", has_text="Perros dog").first.click()
    page.wait_for_timeout(320)  # mitad de la animación
    clase_panel = page.evaluate(
        """() => {
            const panel = document.querySelector('#carta .panel-entra');
            return { existe: !!panel, anim: getComputedStyle(panel).animationName };
        }"""
    )
    check("panel de categoría con animación", clase_panel["existe"] is True and clase_panel["anim"] != "none")

    # stagger de filas: al menos dos filas con retrasos distintos
    unicos = page.evaluate(
        """() => Array.from(document.querySelectorAll('#carta .fila-entra'))
              .filter(el => el.style.animationDelay !== '')
              .map(el => el.style.animationDelay)"""
    )
    check("filas escalonadas por índice", len(set(unicos)) >= 2)

    # --- 5. fades del carrusel de filtros (desbordamiento real) ---
    page.evaluate("document.querySelector('#carta [role=group], #carta [aria-label*=Filtrar]').scrollBy({left: 400})")
    page.wait_for_timeout(250)
    fade_der = page.evaluate(
        """() => {
            const spans = document.querySelectorAll('#carta .sticky span[aria-hidden]');
            return Array.from(spans).some(s => s.className.includes('opacity-100'));
        }"""
    )
    check("fade izquierdo aparece al desplazar filtros", fade_der)

    # --- 6. lightbox: abrir/Escape/cerrar ---
    page.evaluate("document.querySelector('#historia').scrollIntoView()")
    page.wait_for_timeout(400)
    abrir = page.evaluate(
        """() => {
            const btn = document.querySelector('#historia .desfile-fotos button');
            btn.click();
            const dlg = document.querySelector('#historia dialog');
            return dlg ? dlg.open : null;
        }"""
    )
    check("lightbox abre con clic", abrir is True)
    page.keyboard.press("Escape")
    page.wait_for_timeout(200)
    cerrado = page.evaluate(
        """() => { const dlg = document.querySelector('#historia dialog'); return dlg ? !dlg.open : null }"""
    )
    check("lightbox cierra con Escape", cerrado is True)

    # --- 7. parallax en salón y pedido ---
    page.evaluate("document.querySelector('#en-la-casa').scrollIntoView()")
    page.wait_for_timeout(250)
    page.evaluate("window.scrollBy({top: 240, behavior: 'instant'})")
    page.wait_for_timeout(250)
    t_sl = page.evaluate("document.querySelector('#en-la-casa .paralaje-img').style.transform")
    page.evaluate("document.querySelector('#pedir').scrollIntoView()")
    page.wait_for_timeout(250)
    page.evaluate("window.scrollBy({top: 200, behavior: 'instant'})")
    page.wait_for_timeout(250)
    t_upd = page.evaluate("document.querySelector('#pedir .paralaje-img').style.transform")
    check("parallax salón aplicado", "translate3d" in t_sl)
    check("parallax pedido aplicado", "translate3d" in t_upd)

    # --- 8. prefers-reduced-motion: sin transform de parallax ---
    ctx2 = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    p2 = ctx2.new_page()
    p2.goto(BASE, wait_until="networkidle")
    p2.wait_for_timeout(400)
    p2.evaluate("window.scrollTo({top: 320, behavior: 'instant'})")
    p2.wait_for_timeout(250)
    t_rm = p2.evaluate(
        """() => { const el = document.querySelector('.paralaje-img'); return el ? el.style.transform || 'sin-estilo' : 'no-ref' }"""
    )
    que_marquee = p2.evaluate(
        """() => { const el = document.querySelector('.desfile-fotos'); return el ? getComputedStyle(el).animationName : 'x' } """
    )
    check("reduced-motion: parallax desactivado", t_rm in ("sin-estilo", "", "none"))
    check("reduced-motion: cinta sin animación", que_marquee in ("none", "x"))
    ctx2.close()

    # --- 9. captura completa animada (recorrido) ---
    page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    alto = page.evaluate("document.body.scrollHeight")
    import time
    y = 0
    while y < alto:
        y += 700
        page.evaluate(f"window.scrollTo(0,{y})")
        time.sleep(0.15)
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(400)
    page.screenshot(path=f"{OUT}/anim-recorrido.png", full_page=True)

    mov = browser.new_page(viewport={"width": 390, "height": 844})
    mov.goto(BASE, wait_until="networkidle")
    mov.wait_for_timeout(500)
    # menú móvil animado
    mov.locator("header button[aria-expanded]").click()
    mov.wait_for_timeout(200)
    abrir_menu = mov.evaluate(
        """() => { const nav = document.querySelector('#menu-movil'); return nav && getComputedStyle(nav).animationName !== 'none' }"""
    )
    check("menú móvil entra animado", abrir_menu is True)
    sw = mov.evaluate("document.scrollingElement.scrollWidth <= window.innerWidth + 1")
    check("sin desbordamiento horizontal en móvil", sw)
    mov.close()

    check("cero errores de consola", len(errores_consola) == 0)
    if errores_consola:
        print("CONSOLE:", errores_consola[:6])

    browser.close()

print("\nRESUMEN: ok=", len(ok), " fallos=", len(fallos), fallos)

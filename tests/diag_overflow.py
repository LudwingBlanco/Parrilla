"""Diagnóstico 2: valor exacto de scrollWidth y origen del desbordamiento."""
import json
from playwright.sync_api import sync_playwright

URL = "http://localhost:4173"

JS = """() => {
  const se = document.scrollingElement;
  const out = {
    innerW: window.innerWidth,
    seScrollW: se.scrollWidth,
    seClientW: se.clientWidth,
    seTag: se.tagName,
    htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
  };
  // recorremos elementos REALES fuera de corte: los que no tienen ancestro con overflow hidden/clip
  const recortado = (el) => {
    let n = el.parentElement;
    while (n) {
      const o = getComputedStyle(n);
      if (o.overflowX !== 'visible') return true;
      n = n.parentElement;
    }
    return false;
  };
  const sinCuble = [];
  const vw = window.innerWidth;
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1) && !recortado(el)) {
      sinCuble.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 100),
        left: Math.round(r.left), right: Math.round(r.right),
      });
    }
  }
  out.realesSinRecorte = sinCuble.slice(0, 25);
  return out;
}"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto(URL, wait_until="networkidle")
    page.wait_for_timeout(300)
    print(json.dumps(page.evaluate(JS), indent=1, ensure_ascii=False))
    browser.close()

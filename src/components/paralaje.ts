import { useEffect, useRef } from 'react'

/**
 * Parallax sutil para fondos de sección: el fondo va a la zaga del scroll
 * (un solo elemento, solo transform, rAF-throttled, sin trabajo cuando la
 * sección no está en pantalla). Se desactiva con prefers-reduced-motion.
 *
 * Se aplica a una <img> con la clase `.paralaje-img` dentro de un marco
 * overflow-hidden (180 % de sobra vertical repartida arriba/abajo).
 */
export function useParalaje<T extends HTMLElement>(factor = 0.08) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const alDesplazar = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return
        const centro = r.top + r.height / 2 - window.innerHeight / 2
        el.style.transform = `translate3d(0, ${(-centro * factor).toFixed(1)}px, 0)`
      })
    }

    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    window.addEventListener('resize', alDesplazar)
    return () => {
      window.removeEventListener('scroll', alDesplazar)
      window.removeEventListener('resize', alDesplazar)
      cancelAnimationFrame(raf)
    }
  }, [factor])

  return ref
}

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'

/**
 * Revela contenido la primera vez que entra en pantalla.
 * Envoltorio ligero sobre IntersectionObserver: solo CSS propio,
 * sin librerías de animación (la CSP del sitio solo carga scripts locales).
 *
 * Con prefers-reduced-motion la regla global de index.css colapsa la
 * transición a 0.01 ms, así que el contenido simplemente aparece.
 */
export function useAparecer<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

interface AparecerProps {
  children: ReactNode
  /** Clases adicionales (ej. col-span para no romper la grilla) */
  className?: string
  /** Retraso en ms para escalonar fichas o filas hermanas */
  delay?: number
  /** Lado desde el que entra; por defecto sube desde abajo */
  desde?: 'izquierda' | 'derecha'
  /** Estilos extra (fusión con transitionDelay) */
  style?: CSSProperties
}

export default function Aparecer({
  children,
  className = '',
  delay = 0,
  desde,
  style,
}: AparecerProps) {
  const [ref, visible] = useAparecer<HTMLDivElement>()

  const clases = [
    'aparece',
    desde === 'izquierda' && 'aparece-izq',
    desde === 'derecha' && 'aparece-der',
    visible && 'aparece-visible',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={clases} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconoCerrar } from './Iconos'

interface DialogoFotoProps {
  src: string
  alt: string
  children: ReactNode
  /** Copia decorativa de una cinta: no alcanzable con Tab */
  silencioso?: boolean
  lazy?: boolean
}

/**
 * Fotografía ampliable con <dialog> nativo: clic abre con transición,
 * Escape o clic en el fondo cierran. El botón real que envuelve la imagen
 * garantiza foco y teclado (el botón de cerrar recibe el foco al abrir).
 * Solo monta la imagen del diálogo cuando está abierto para evitar nodos
 * no renderizados con naturalWidth = 0 en el DOM pasivo.
 */
export default function DialogoFoto({ src, alt, silencioso = false, children }: DialogoFotoProps) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const [abierto, setAbierto] = useState(false)

  const abrir = () => {
    setAbierto(true)
    dialogo.current?.showModal()
  }

  const cerrar = () => {
    dialogo.current?.close()
    setAbierto(false)
  }

  return (
    <>
      <button
        type="button"
        tabIndex={silencioso ? -1 : undefined}
        onClick={abrir}
        aria-label={`Ampliar fotografía: ${alt}`}
        className="group block w-full cursor-zoom-in text-left"
      >
        {children}
      </button>

      <dialog
        ref={dialogo}
        onClose={() => setAbierto(false)}
        aria-label={alt}
        className="dialogo-foto m-auto max-h-[90svh] max-w-[92vw] bg-transparent p-0"
        onClick={(e) => {
          if (e.target === dialogo.current) {
            cerrar()
          }
        }}
      >
        {abierto && (
          <div className="relative">
            <img
              src={src}
              alt={alt}
              className="max-h-[86svh] max-w-[90vw] rounded-sm object-contain"
            />
            <button
              type="button"
              autoFocus
              aria-label="Cerrar fotografía"
              onClick={cerrar}
              className="absolute -top-0 right-0 m-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-carbon/80 text-papel-ivory transition-colors hover:bg-carbon"
            >
              <IconoCerrar className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </>
  )
}

import { useRef, useState } from 'react'
import Aparecer from './Aparecer'
import { adiciones, cop, negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

function TiraFichas({ oculta = false }: { oculta?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-4" aria-hidden={oculta || undefined}>
      {adiciones.map((a) => {
        const urlPedido = `${negocio.whatsapp}&text=${encodeURIComponent(
          `Hola! Quiero pedir la adición: ${a.nombre} (${cop(a.precio)})`
        )}`

        return (
          <div
            key={a.nombre + (oculta ? '-oculta' : '')}
            className="group relative flex w-64 shrink-0 flex-col justify-between rounded-xl border border-carbon-line/60 bg-carbon p-6 text-papel-ivory transition-all duration-300 hover:-translate-y-2 hover:border-fuego/80 hover:bg-carbon-deep hover:shadow-[0_16px_32px_rgba(194,64,29,0.3)] sm:w-72"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-cuerpo text-[0.92rem] font-bold uppercase tracking-[0.04em] leading-snug text-papel-ivory group-hover:text-fuego transition-colors">
                  {a.nombre}
                </span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-fuego/60 group-hover:bg-fuego group-hover:scale-125 transition-all" />
              </div>
              <p className="mt-1 font-cuerpo text-[0.72rem] text-papel-ivory/50">
                Adición a elección para cualquier plato
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-carbon-line/50 pt-4">
              <div>
                <span className="block font-cuerpo text-[0.62rem] font-bold uppercase tracking-[0.16em] text-papel-ivory/40">
                  Precio oficial
                </span>
                <span className="font-display text-[1.85rem] font-bold tracking-wider text-fuego tabular-nums leading-none">
                  {cop(a.precio)}
                </span>
              </div>

              {!oculta && (
                <a
                  href={urlPedido}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Pedir adición ${a.nombre} por WhatsApp`}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-fuego/40 bg-fuego/15 px-3 font-cuerpo text-[0.68rem] font-bold uppercase tracking-wider text-papel-ivory transition-all duration-200 hover:border-fuego hover:bg-fuego hover:scale-105 active:scale-95"
                >
                  <IconoWhatsApp className="h-3 w-3 text-fuego group-hover:text-papel-ivory transition-colors" />
                  <span>Pedir</span>
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Adiciones() {
  const [pausado, setPausado] = useState(false)
  const carruselRef = useRef<HTMLDivElement>(null)

  const desplazar = (direccion: 'izq' | 'der') => {
    if (!carruselRef.current) return
    const paso = 320
    carruselRef.current.scrollBy({
      left: direccion === 'izq' ? -paso : paso,
      behavior: 'smooth',
    })
  }

  return (
    <section id="adiciones" aria-labelledby="titulo-adiciones" className="relative bg-papel-ivory pb-20 pt-4 text-tinta lg:pb-28">
      <Aparecer className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-tinta/20 bg-carbon/5 px-4 py-1">
          <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
          <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tinta/80">
            Personaliza tu sabor
          </span>
        </div>
        <h2 id="titulo-adiciones" className="titulo-seccion mt-4 text-[clamp(2.8rem,7vw,5.5rem)]">
          Adiciones y salsas
        </h2>
        <p className="mx-auto mt-4 max-w-[54ch] font-cuerpo text-[0.95rem] leading-relaxed text-tinta/75">
          Todas las preparaciones salen con las salsas de la casa hechas a diario. Puedes sumar
          estas adiciones a tus hamburguesas, perros, cortes o patacones.
        </p>

        {/* Controles interactivos visibles: flechas para avanzar manualmente y botón de pausa */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => desplazar('izq')}
            aria-label="Desplazar adiciones a la izquierda"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-tinta/30 bg-papel-ivory text-base font-bold text-tinta shadow-sm transition-all hover:border-fuego hover:bg-fuego hover:text-papel-ivory hover:scale-105 active:scale-95"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setPausado((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-tinta/30 bg-papel-ivory px-4 py-1.5 font-cuerpo text-[0.72rem] font-bold uppercase tracking-wider text-tinta transition-all hover:border-fuego hover:text-fuego active:scale-95"
            aria-label={pausado ? 'Reanudar carrusel' : 'Pausar carrusel'}
          >
            <span className={`h-2 w-2 rounded-full ${pausado ? 'bg-carbon' : 'bg-fuego pulso-brasa'}`} />
            {pausado ? '▶ Reanudar movimiento' : '❚❚ Pausar'}
          </button>
          <button
            type="button"
            onClick={() => desplazar('der')}
            aria-label="Desplazar adiciones a la derecha"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-tinta/30 bg-papel-ivory text-base font-bold text-tinta shadow-sm transition-all hover:border-fuego hover:bg-fuego hover:text-papel-ivory hover:scale-105 active:scale-95"
          >
            →
          </button>
        </div>
      </Aparecer>

      {/* Carrusel continuo con soporte para scroll manual suave y animación infinita */}
      <div
        ref={carruselRef}
        className="mt-10 overflow-x-auto overflow-y-hidden py-3"
        style={{ scrollbarWidth: 'none' }}
      >
        <div
          className="desfile desfile-fichas"
          style={pausado ? { animationPlayState: 'paused' } : undefined}
        >
          <TiraFichas />
          <TiraFichas oculta />
        </div>
      </div>
    </section>
  )
}

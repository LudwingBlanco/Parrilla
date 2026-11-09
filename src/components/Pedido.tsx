import Aparecer from './Aparecer'
import { useParalaje } from './paralaje'
import { negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

export default function Pedido() {
  const fondo = useParalaje<HTMLImageElement>(0.08)

  return (
    <section id="pedir" aria-labelledby="titulo-pedido">
      <div className="relative flex min-h-[75vh] items-center overflow-hidden bg-carbon">
        <img
          ref={fondo}
          src="/img/pedido-fondo.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="paralaje-img"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-carbon/80" />

        <Aparecer className="relative z-10 mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuego/40 bg-carbon-deep/80 px-4 py-1.5 backdrop-blur-md mb-4">
            <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
            <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-papel-ivory/90">
              Atención directa sin intermediarios
            </span>
          </div>
          <h2 id="titulo-pedido" className="titulo-seccion text-[clamp(2.8rem,7.5vw,6.5rem)] text-papel-ivory">
            Armar tu pedido
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] font-cuerpo text-[1.05rem] leading-relaxed text-papel-ivory/85">
            Pide en línea a través de WhatsApp o en las cartas oficiales del restaurante. Sin cobros
            ocultos ni sobrecostos dentro del sitio web.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer" className="pildora-llena">
              <IconoWhatsApp className="h-4 w-4" />
              Pedir por WhatsApp
            </a>
            <a href={negocio.cartaRapidas} target="_blank" rel="noopener noreferrer" className="pildora">
              Pedir en línea · Queresto
            </a>
          </div>
        </Aparecer>
      </div>
    </section>
  )
}

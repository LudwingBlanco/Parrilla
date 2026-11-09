import { useParalaje } from './paralaje'
import { negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

// Divide el título en letras para el stagger de entrada
function TituloStagger({ texto }: { texto: string }) {
  const partes = texto.split('')
  return (
    <>
      {partes.map((c, i) =>
        c === ' ' ? (
          <span key={i} aria-hidden="true">&nbsp;</span>
        ) : (
          <span
            key={i}
            className="letra-entra"
            style={{ animationDelay: `${80 + i * 28}ms` }}
          >
            {c}
          </span>
        )
      )}
    </>
  )
}

export default function Hero() {
  const fondo = useParalaje<HTMLImageElement>(0.09)

  return (
    <section
      id="inicio"
      aria-label="Bienvenida"
      className="relative flex h-[100svh] min-h-[580px] items-center justify-center overflow-hidden bg-carbon"
    >
      {/* Fondo con Ken-Burns suave + parallax */}
      <div className="absolute inset-0 scanline-overlay">
        <img
          ref={fondo}
          src="/img/hero-fondo.jpg"
          alt=""
          aria-hidden="true"
          className="paralaje-img ken-burns"
          fetchPriority="high"
        />
        {/* Oscurecido editorial */}
        <div aria-hidden="true" className="absolute inset-0 bg-carbon/72" />
        {/* Degradado inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-56"
          style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.92), transparent)' }}
        />
        {/* Degradado lateral izquierdo sutil */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3"
          style={{ background: 'linear-gradient(to right, rgba(7,7,7,0.25), transparent)' }}
        />
      </div>

      {/* Chispas flotantes de brasa — posiciones distribuidas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="chispa-1 flotar absolute bottom-1/4 left-1/4 h-2 w-2 rounded-full bg-fuego-holo blur-[1px]" />
        <span className="chispa-2 flotar-2 absolute bottom-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-fuego blur-[1px]" />
        <span className="chispa-3 flotar-3 absolute bottom-2/5 right-1/5 h-2.5 w-2.5 rounded-full bg-fuego-holo/80 blur-[2px]" />
        <span className="chispa-1 absolute bottom-1/2 left-2/3 h-1 w-1 rounded-full bg-fuego/70 blur-[0.5px]" style={{ animationDelay: '2s' }} />
        <span className="chispa-2 absolute bottom-3/5 left-1/3 h-1.5 w-1.5 rounded-full bg-fuego-holo/60 blur-[1px]" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Badge animado con rebote */}
        <div
          className="badge-rebote mb-6 inline-flex items-center gap-2 rounded-full border border-fuego/40 bg-carbon-deep/85 px-5 py-2 shadow-[0_0_24px_rgba(194,64,29,0.28)] backdrop-blur-md"
          style={{ animationDelay: '60ms' }}
        >
          <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
          <span className="font-cuerpo text-[0.72rem] font-bold uppercase tracking-[0.22em] text-papel-ivory/90">
            Auténtica Brasa al Carbón · Floridablanca
          </span>
        </div>

        {/* Título monumental con entrada letra a letra */}
        <h1
          className="titulo-seccion inline-block overflow-hidden text-[clamp(3.8rem,15vw,12rem)] leading-[0.9] text-papel-ivory drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
          aria-label="Casa del Sabor"
        >
          <TituloStagger texto="Casa del Sabor" />
        </h1>

        {/* Línea decorativa que crece desde izquierda */}
        <div
          className="linea-crece mx-auto mt-4 h-[2px] w-32 bg-fuego"
          style={{ animationDelay: '580ms' }}
        />

        <p
          className="entra mt-5 max-w-xl font-cuerpo text-[1rem] leading-relaxed text-papel-ivory/82 sm:text-[1.1rem]"
          style={{ animationDelay: '660ms' }}
        >
          Hamburguesas al carbón, cortes de carne a la parrilla,<br className="hidden sm:block" />
          gyros artesanales y cocina santandereana.
        </p>

        {/* Botones de acción */}
        <div
          className="entra mt-9 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '820ms' }}
        >
          <a href="#carta" className="pildora">
            Explorar la carta
          </a>
          <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer" className="pildora-llena">
            <IconoWhatsApp className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </div>

        <p
          className="entra mt-10 font-cuerpo text-[0.74rem] font-bold uppercase tracking-[0.24em] text-papel-ivory/55"
          style={{ animationDelay: '1020ms' }}
        >
          El Remanso · Floridablanca, Santander
        </p>
      </div>

      {/* Scroll hint animado */}
      <div
        className="entra absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animationDelay: '1200ms' }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="font-cuerpo text-[0.6rem] uppercase tracking-[0.22em] text-papel-ivory/40">Scroll</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-papel-ivory/25 p-1">
            <span
              className="h-1.5 w-1 rounded-full bg-papel-ivory/50"
              style={{ animation: 'flotar 1.8s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

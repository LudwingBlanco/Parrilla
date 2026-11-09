import Aparecer from './Aparecer'
import { useParalaje } from './paralaje'
import { negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

export default function Salon() {
  const fondo = useParalaje<HTMLImageElement>(0.08)

  return (
    <section id="en-la-casa" aria-labelledby="titulo-salon">
      {/* El salón: foto del video oficial a pantalla completa con parallax */}
      <div className="relative flex min-h-[72vh] items-end overflow-hidden bg-carbon">
        <img
          ref={fondo}
          src="/img/salon-fondo.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="paralaje-img"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-carbon/65" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-64"
          style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.98), rgba(7,7,7,0))' }}
        />
        <Aparecer className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuego/40 bg-carbon-deep/80 px-4 py-1.5 backdrop-blur-md mb-4">
              <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
              <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-papel-ivory/90">
                Experiencia en mesa
              </span>
            </div>
            <h2
              id="titulo-salon"
              className="titulo-seccion entra text-[clamp(2.8rem,7.5vw,6.5rem)] text-papel-ivory"
            >
              El salón
            </h2>
            <p className="entra mt-4 max-w-lg font-cuerpo text-[1.02rem] leading-relaxed text-papel-ivory/85" style={{ animationDelay: '180ms' }}>
              Mesas amplias para la familia y amigos, parrilla en vivo y bandejas calientes recién
              salidas del carbón. Un ambiente acogedor en Floridablanca para compartir con las salsas de la casa en la mesa.
            </p>
          </div>
        </Aparecer>
      </div>

      {/* Celebraciones */}
      <div className="bg-carbon py-20 text-papel-ivory lg:py-24 border-t border-carbon-line">
        <Aparecer className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="titulo-seccion text-[clamp(2.4rem,5vw,3.8rem)] text-papel-ivory">
            Cumpleaños, grados
            <span className="block text-fuego">y fechas especiales</span>
          </p>
          <blockquote className="mx-auto mt-7 max-w-[50ch] font-cuerpo text-[1.05rem] leading-relaxed text-papel-ivory/85">
            “El mejor lugar para celebrar tus fechas especiales.”
            <cite className="mt-3 block font-cuerpo text-[0.76rem] font-bold uppercase not-italic tracking-[0.2em] text-papel-ivory/45">
              Anfitriones en el video oficial de la marca
            </cite>
          </blockquote>
          <p className="mx-auto mt-6 max-w-[52ch] font-cuerpo text-[0.95rem] leading-relaxed text-papel-ivory/70">
            Si planeas un almuerzo familiar o una noche de celebración con amigos, reserva tu mesa y consulta
            disponibilidad por WhatsApp.
          </p>
          <a
            href={negocio.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="pildora-llena mt-8"
          >
            <IconoWhatsApp className="h-4 w-4" />
            Preguntar por mi celebración
          </a>
        </Aparecer>
      </div>
    </section>
  )
}

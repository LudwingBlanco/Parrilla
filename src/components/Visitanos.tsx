import Aparecer from './Aparecer'
import { negocio } from '../data/casa'
import { IconoWhatsApp } from './Iconos'

const horario = [
  { dias: 'Lunes a domingo', horas: '7:30 a. m. – 11:45 p. m.' },
  { dias: 'Desayunos', horas: 'Martes a domingo, en el día' },
]

export default function Visitanos() {
  return (
    <footer id="visitanos" aria-labelledby="titulo-visitanos" className="bg-carbon pb-10 pt-20 text-papel-ivory lg:pt-28 border-t border-carbon-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Aparecer className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-fuego/40 bg-carbon-deep/80 px-4 py-1.5 backdrop-blur-md mb-4">
            <span className="h-2 w-2 rounded-full bg-fuego pulso-brasa" />
            <span className="font-cuerpo text-[0.7rem] font-bold uppercase tracking-[0.2em] text-papel-ivory/90">
              Encuéntranos en Floridablanca
            </span>
          </div>
          <h2 id="titulo-visitanos" className="titulo-seccion text-[clamp(2.8rem,7.5vw,6.5rem)]">
            Visítanos
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] font-cuerpo text-[0.98rem] leading-relaxed text-papel-ivory/75">
            ¿Quieres cotizar un evento, pedir a domicilio o visitarnos en el salón? Escríbenos por los
            canales oficiales o acércate a nuestro punto en El Remanso.
          </p>
        </Aparecer>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Contactos: dirección → Maps, teléfono y WhatsApp reales del negocio */}
          <Aparecer className="rounded-xl border border-carbon-line/60 bg-carbon-raised/60 p-6 text-center">
            <h3 className="titulo-seccion text-2xl tracking-wide text-fuego">Contactos</h3>
            <ul className="mt-5 space-y-3 font-cuerpo text-[0.92rem] text-papel-ivory/80">
              <li>
                <a
                  href={negocio.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block no-underline transition-colors hover:text-fuego"
                >
                  {negocio.direccion} · Barrio El Remanso, {negocio.ciudad}
                </a>
              </li>
              <li>
                <a href={`tel:${negocio.telefonoFijoTel}`} className="inline-block no-underline transition-colors hover:text-fuego">
                  Fijo: {negocio.telefonoFijo}
                </a>
              </li>
              <li>
                <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 no-underline transition-colors hover:text-fuego font-bold">
                  <IconoWhatsApp className="h-4 w-4 text-fuego" />
                  WhatsApp {negocio.whatsappVista}
                </a>
              </li>
            </ul>
          </Aparecer>

          <Aparecer delay={90} className="rounded-xl border border-carbon-line/60 bg-carbon-raised/60 p-6 text-center">
            <h3 className="titulo-seccion text-2xl tracking-wide text-fuego">Horarios</h3>
            <ul className="mt-5 space-y-3 font-cuerpo text-[0.92rem] text-papel-ivory/80">
              {horario.map((h) => (
                <li key={h.dias}>
                  <span className="block font-bold text-papel-ivory">{h.dias}</span>
                  <span className="text-papel-ivory/70">{h.horas}</span>
                </li>
              ))}
            </ul>
          </Aparecer>

          <Aparecer delay={180} className="rounded-xl border border-carbon-line/60 bg-carbon-raised/60 p-6 text-center">
            <h3 className="titulo-seccion text-2xl tracking-wide text-fuego">Síguenos</h3>
            <ul className="mt-5 space-y-3 font-cuerpo text-[0.92rem] text-papel-ivory/80">
              <li>
                <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="inline-block no-underline transition-colors hover:text-fuego">
                  Instagram @casadelsaborparrilla
                </a>
              </li>
              <li>
                <a href={negocio.facebook} target="_blank" rel="noopener noreferrer" className="inline-block no-underline transition-colors hover:text-fuego">
                  Facebook La Casa del Sabor
                </a>
              </li>
            </ul>
          </Aparecer>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-carbon-line pt-6 font-cuerpo text-[0.78rem] text-papel-ivory/55">
          <p>© {new Date().getFullYear()} Casa del Sabor Parrilla · Al carbón</p>
          <p>Floridablanca, Santander · Precios oficiales verificados (octubre 2026)</p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { negocio } from '../data/casa'
import { IconoCerrar, IconoMenu, IconoWhatsApp } from './Iconos'

const enlaces = [
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#carta', label: 'La carta' },
  { href: '#en-la-casa', label: 'El salón' },
  { href: '#adiciones', label: 'Adiciones' },
  { href: '#visitanos', label: 'Visítanos' },
]

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const [pegado, setPegado] = useState(false)

  useEffect(() => {
    const onScroll = () => setPegado(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        pegado || abierto
          ? 'border-b border-carbon-line bg-carbon/95 backdrop-blur-md shadow-lg'
          : 'border-b border-transparent bg-gradient-to-b from-carbon/90 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-3" onClick={() => setAbierto(false)}>
          <img
            src="./img/logo.png"
            alt="Logo Casa del Sabor Parrilla"
            width="52"
            height="52"
            className="h-[52px] w-[52px] -rotate-6 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-2xl uppercase tracking-wide text-papel-ivory group-hover:text-fuego transition-colors">
              Casa del Sabor
            </span>
            <span className="block font-cuerpo text-[0.64rem] font-bold uppercase tracking-[0.22em] text-papel-ivory/70">
              Parrilla · Al carbón
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {enlaces.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="relative font-cuerpo text-[0.8rem] font-bold uppercase tracking-[0.14em] text-papel-ivory/85 no-underline transition-colors hover:text-papel-ivory py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-fuego after:transition-all after:duration-300 hover:after:w-full"
            >
              {e.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={negocio.whatsapp} target="_blank" rel="noopener noreferrer" className="pildora-llena hidden !px-5 !py-2.5 sm:inline-flex">
            <IconoWhatsApp className="h-4 w-4" />
            <span>Pedir</span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-papel-ivory/40 text-papel-ivory transition-colors hover:border-fuego hover:text-fuego lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <IconoCerrar className="h-5 w-5" /> : <IconoMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          aria-label="Menú móvil"
          className="panel-entra border-b border-carbon-line bg-carbon pb-8 md:hidden shadow-2xl"
        >
          <ul className="mx-auto max-w-7xl px-4">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block border-b border-carbon-line py-4 font-display text-3xl uppercase tracking-wide text-papel-ivory no-underline hover:text-fuego transition-colors"
                >
                  {e.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a
                href={negocio.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="pildora-llena w-full justify-center text-center"
              >
                <IconoWhatsApp className="h-5 w-5" />
                Pedir por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

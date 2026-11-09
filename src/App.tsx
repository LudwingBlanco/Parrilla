import Header from './components/Header'
import Hero from './components/Hero'
import Historia from './components/Historia'
import Especialidades from './components/Especialidades'
import Carta from './components/Carta'
import Salon from './components/Salon'
import Adiciones from './components/Adiciones'
import Pedido from './components/Pedido'
import Visitanos from './components/Visitanos'
import { IconoWhatsApp } from './components/Iconos'
import { negocio } from './data/casa'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Historia />
        <Especialidades />
        <Carta />
        <Salon />
        <Adiciones />
        <Pedido />
      </main>
      <Visitanos />

      <a
        href={negocio.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación de WhatsApp para pedir"
        className="fab-entrada fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-fuego text-papel-ivory shadow-lg transition-colors hover:bg-fuego-deep md:hidden"
      >
        <IconoWhatsApp className="h-7 w-7" />
      </a>
    </>
  )
}

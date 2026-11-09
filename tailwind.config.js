/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Negros puros estilo editorial de la plantilla de referencia
        carbon: {
          DEFAULT: '#0d0d0d',
          deep: '#070707',
          raised: '#161616',
          line: '#292929',
        },
        // Crema cálido (base del diseño de referencia)
        papel: {
          ivory: '#faebd7',
          dim: '#f1e2cd',
          tint: '#dfc39c',
        },
        tinta: '#0a0a0a',
        // Acento mínimo: el rojo-naranja del numeral del logotipo real
        fuego: {
          DEFAULT: '#c2401d',
          deep: '#9c2f12',
          holo: '#e8691f',
        },
        humo: '#a99e8c',
      },
      fontFamily: {
        // Display contemporánea para títulos gastronómicos de impacto (Bebas Neue + Syne)
        display: ['"Bebas Neue"', '"Syne"', 'Impact', 'sans-serif'],
        // Títulos de sección y acentos editoriales
        heading: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        // Cuerpo y detalles con altísima legibilidad y elegancia geométrica
        cuerpo: ['"Plus Jakarta Sans"', '"Archivo Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.14em',
      },
      height: {
        68: '17rem',
      },
      scale: {
        108: '1.08',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

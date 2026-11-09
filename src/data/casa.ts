// Datos comerciales de Casa del Sabor Parrilla.
// Fuente verificada el 2026-10-29: Instagram oficial (@casadelsaborparrilla),
// hub oficial del negocio (megalinkpro.com.co/lacasadelsaboralcarbon) y cartas
// digitales de Queresto y Ola.Click enlazadas por el propio negocio.
// Los precios se toman de la carta Queresto de comidas rápidas de esa fecha.

export const negocio = {
  nombre: 'Casa del Sabor Parrilla',
  nombreAlternativo: 'La Casa del Sabor al Carbón',
  barrio: 'El Remanso',
  ciudad: 'Floridablanca, Santander',
  direccion: 'Calle 27 #12-06, El Remanso',
  ciudadCompleta: 'Floridablanca, Santander, Colombia',
  whatsappNumero: '+573183417101',
  whatsappVista: '+57 318 341 7101',
  telefonoFijo: '(607) 605 8585',
  telefonoFijoTel: '+576076058585',
  horario: 'Lunes a domingo, 7:30 a. m. – 11:45 p. m.',
  horarioDesayunos: 'Desayunos de martes a domingo, solo de día',
  // Enlaces tal como los publica el negocio (el prefijo del texto lo mantiene redactado el propio restaurante)
  whatsapp: 'https://api.whatsapp.com/send?phone=+573183417101&text=Quiero%20hacer%20un%20pedido',
  maps: 'https://maps.google.com/?cid=4175041854354877566&entry=gps',
  cartaRapidas: 'https://queresto.com/lacasadelsaborcomidasrapidas',
  cartaAlmuerzos: 'https://almuerzosgourmet.ola.click/products',
  instagram: 'https://www.instagram.com/casadelsaborparrilla/',
  facebook: 'https://www.facebook.com/RestauranteLaCasaDelSabor/',
} as const

export const cop = (valor: number) => `$ ${valor.toLocaleString('es-CO')}`

export interface Plato {
  nombre: string
  detalle?: string
  descripcion?: string
  precio: number
}

export interface GrupoPlatos {
  titulo: string
  pie?: string
  condicion?: string
  platos: Plato[]
}

export interface Categoria {
  id: string
  titulo: string
  pie?: string
  grupos: GrupoPlatos[]
}

export const categorias: Categoria[] = [
  {
    id: 'almuerzos',
    titulo: 'Almuerzos del día',
    pie: 'El menú cambia todos los días: cada mañana sale el listado vigente.',
    grupos: [],
  },
  {
    id: 'hamburguesas',
    titulo: 'Hamburguesas al carbón',
    pie: 'Todas vienen acompañadas de papas a la francesa.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Tradicional',
            detalle: '150 g',
            descripcion: 'Res al carbón o filete de pechuga, mezcla de cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 21900,
          },
          {
            nombre: 'Combi',
            detalle: '150 g',
            descripcion: 'Res al carbón y pollo desmechado en salsa de la casa, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 24500,
          },
          {
            nombre: 'Bacon',
            detalle: '150 g',
            descripcion: 'Doble piso de tocineta ahumada crocante sobre la carne al carbón, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 24500,
          },
          {
            nombre: 'Argentina',
            detalle: '150 g',
            descripcion: 'Chorizo artesanal bañado en chimichurri, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 25500,
          },
          {
            nombre: 'Fusión',
            detalle: '150 g',
            descripcion: 'Res al carbón, pollo desmechado en salsa de la casa y doble piso de tocineta, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 26500,
          },
          {
            nombre: 'Chori Candy',
            detalle: '150 g',
            descripcion: 'Chorizo salteado en bocadillo y cebolla crocante, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 26500,
          },
          {
            nombre: 'Champion',
            detalle: '150 g',
            descripcion: 'Pollo desmechado en salsa de la casa y champiñones salteados, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 27500,
          },
          {
            nombre: 'Pork',
            detalle: '150 g',
            descripcion: 'Bondiola de cerdo rebosada en miel mostaza y tocineta, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 27500,
          },
          {
            nombre: 'Crispy Bacon',
            descripcion: 'Pechuga apanada, pepinillos agridulces, tocineta ahumada, aros de cebolla, cheddar y doble crema, lechuga, tomate y salsa de la casa.',
            precio: 27500,
          },
          {
            nombre: 'Doble Carne',
            detalle: '150 g',
            descripcion: 'Doble carne de res al carbón y cuatro pisos de queso cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Criolla',
            detalle: '150 g',
            descripcion: 'Carne desmechada conservada en su hogao y huevo frito, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Mexicana',
            detalle: '150 g',
            descripcion: 'Carne desmechada en salsa chipotle, jalapeños y nachos crocantes, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Ranchera',
            detalle: '150 g',
            descripcion: 'Salchicha ranchera, tocineta ahumada y huevo frito, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Granjera',
            detalle: '150 g',
            descripcion: 'Lomo de res salteado con maíz tierno bañado en doble crema, tocineta y cheddar, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Camaronera',
            detalle: '150 g',
            descripcion: 'Camarones salteados y pollo desmechado en salsa de la casa sobre la carne al carbón, cheddar y doble crema, lechuga, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'Texana',
            descripcion: 'Carne desmechada en salsa BBQ, tocineta ahumada, cheddar y doble crema, lechuga, cebolla acaramelizada, tomate y salsa de la casa.',
            precio: 28900,
          },
          {
            nombre: 'NN',
            descripcion: 'Res al carbón, filete de pechuga, camarones salteados y aros de cebolla, cheddar y doble crema, lechuga, tomate y salsa de la casa.',
            precio: 32900,
          },
          {
            nombre: 'Manhattan',
            descripcion: 'Carne desmechada en salsa BBQ y chorizos salteados con aros de cebolla, cheddar y doble crema, lechuga, tomate y salsa de la casa.',
            precio: 31900,
          },
          {
            nombre: 'Camaronera Chicken',
            descripcion: 'Filete de pechuga a la parrilla, camarones salteados y pollo desmechado en salsa de la casa, tocineta, cheddar y doble crema.',
            precio: 32500,
          },
          {
            nombre: 'Máxima',
            descripcion: 'Doble carne al carbón, pollo desmechado en salsa de la casa, dos pisos de tocineta, lechuga, tomate, cebolla acaramelada y mix de cheddar y doble crema.',
            precio: 33500,
          },
          {
            nombre: 'Chuletona',
            descripcion: 'Chuleta de cerdo ahumada a la parrilla, doble tocineta, huevo frito y doble mezcla de quesos, lechuga, tomate y salsa de la casa.',
            precio: 33900,
          },
          {
            nombre: 'XL',
            detalle: '150 g',
            descripcion: 'Doble carne al carbón, pollo desmechado en salsa de la casa, cuadros de lomo de res, tocineta crocante y chorizo artesanal, cheddar y doble crema, lechuga, tomate y cebolla acaramelizada.',
            precio: 38900,
          },
        ],
      },
    ],
  },
  {
    id: 'perros',
    titulo: 'Perros dog',
    pie: 'Todos vienen acompañados de papas a la francesa.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Tradicional',
            descripcion: 'Salchicha americana o chorizo entero, papa molida, cebolla acaramelizada y queso doble crema.',
            precio: 20000,
          },
          {
            nombre: 'Hawaiano',
            descripcion: 'Salchicha americana, piña en cuadros, jamón ahumado de cerdo, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 21500,
          },
          {
            nombre: 'Combi',
            descripcion: 'Salchicha americana y pollo desmechado en salsa de la casa, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 23500,
          },
          {
            nombre: 'Bacon',
            descripcion: 'Salchicha americana, tocineta ahumada crocante, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 23500,
          },
          {
            nombre: 'De la casa',
            descripcion: 'Salchicha americana con mezcla de pechuga y lomo fino de res en cuadros, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Fusión',
            descripcion: 'Salchicha americana, pollo desmechado en salsa de la casa y tocineta ahumada, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Pork',
            descripcion: 'Salchicha americana con lomo de cerdo bañado en miel mostaza, tocineta, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Criollo',
            descripcion: 'Salchicha americana, carne desmechada en hogao criollo y huevo frito, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Mexicano',
            descripcion: 'Salchicha americana, carne desmechada en salsa chipotle, jalapeños y nachos crocantes, papa molida y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Champion',
            descripcion: 'Salchicha americana, pollo desmechado en salsa de la casa y champiñones salteados, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Ranchero',
            descripcion: 'Salchicha ranchera, lomo de res en cuadros, tocineta ahumada y huevo frito, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Granjero',
            descripcion: 'Salchicha americana, maíz tierno con lomo de res en cuadros, tocineta ahumada, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Camaronero',
            descripcion: 'Salchicha americana, pollo desmechado en salsa de la casa y camarones salteados, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 26900,
          },
          {
            nombre: 'Sanbernardo',
            descripcion: 'Doble cabano con lomo de res y pollo desmechado, tocineta, papa molida, cebolla acaramelizada y queso fundido.',
            precio: 28900,
          },
        ],
      },
    ],
  },
  {
    id: 'gyros',
    titulo: 'Gyros',
    pie: 'Tortilla árabe sobre verduras frescas y con el verdadero queso chitagá. Acompañados de papas a la francesa.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Combi',
            descripcion: 'Lomo de res, pechuga en cuadros, jamón ahumado y queso chitagá sobre lechuga, cebolla cruda y tomate.',
            precio: 25500,
          },
          {
            nombre: 'Fusión',
            descripcion: 'Lomo de res, pechuga en cuadros, tocineta ahumada, jamón y queso chitagá sobre verduras frescas.',
            precio: 26900,
          },
          {
            nombre: 'Granjero',
            descripcion: 'Lomo de res, jamón ahumado, maíz tierno, tocineta y queso chitagá sobre verduras frescas.',
            precio: 26900,
          },
          {
            nombre: 'Mexicano',
            descripcion: 'Carne desmechada en salsa chipotle, jalapeños, nachos, guacamole, jamón ahumado y queso chitagá.',
            precio: 26900,
          },
          {
            nombre: 'De la casa',
            descripcion: 'Lomo de res, pechuga en cuadros, jamón ahumado, camarones salteados y queso chitagá sobre verduras frescas.',
            precio: 28900,
          },
        ],
      },
    ],
  },
  {
    id: 'papas',
    titulo: 'Papas locas y más',
    pie: 'Sobre papas a la francesa crocantes y cubiertas con mix de quesos y salsa de la casa.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Salchipapa clásico',
            descripcion: 'Papas a la francesa, salchicha Zenú, quesito semisalado y salsa de la casa.',
            precio: 21900,
          },
          {
            nombre: 'Choripapa clásico',
            descripcion: 'Papas a la francesa, chorizo artesanal, quesito semisalado y salsa de la casa.',
            precio: 21900,
          },
          {
            nombre: 'Papas locas tradicional',
            descripcion: 'Pollo desmechado, tocineta ahumada y jamón de cerdo sobre papas crocantes con mix de quesos.',
            precio: 24900,
          },
          {
            nombre: 'Salchipapa express',
            descripcion: 'Pollo desmechado, tocineta ahumada y salchicha tipo Long sobre papas con quesito y salsa de la casa.',
            precio: 24900,
          },
          {
            nombre: 'Choripapa express',
            descripcion: 'Pollo desmechado, tocineta ahumada, chorizo artesanal, quesito semisalado y salsa de la casa.',
            precio: 24900,
          },
          {
            nombre: 'Papas locas champion',
            descripcion: 'Champiñones salteados, pollo desmechado, tocineta y jamón sobre papas crocantes con mix de quesos.',
            precio: 26900,
          },
          {
            nombre: 'Papas locas granjeras',
            descripcion: 'Lomo de res, maíz tierno, tocineta, jamón y chorizo artesanal sobre papas, con mix de quesos y salsa de la casa.',
            precio: 33900,
          },
          {
            nombre: 'Papas locas criollas',
            descripcion: 'Carne desmechada con hogao, tocineta, jamón, cabano y maíz tierno sobre papas, con mix de quesos y salsa de la casa.',
            precio: 34900,
          },
          {
            nombre: 'Papas locas express',
            descripcion: 'Lomo de res, pollo desmechado, tocineta, jamón y chorizo sobre papas, con mix de quesos y salsa de la casa.',
            precio: 34900,
          },
          {
            nombre: 'Morrongo personal',
            descripcion: 'Pechuga y carne de res en julianas (240 g), chorizo, salchicha americana, cebolla salteada en BBQ y doble crema.',
            precio: 34900,
          },
          {
            nombre: 'Papas locas Porkin',
            descripcion: 'Bondiola de cerdo en miel mostaza, chicharrón, jamón, tocineta y quesos sobre papas crocantes.',
            precio: 39900,
          },
          {
            nombre: 'Morrongo especial x 2',
            descripcion: 'Pechuga y carne de res en julianas (480 g), chorizo, salchicha americana, cebolla salteada en BBQ y doble crema.',
            precio: 49000,
          },
        ],
      },
    ],
  },
  {
    id: 'desgranados',
    titulo: 'Desgranados',
    pie: 'Maíz tierno rebosado con queso rayado y fundido, acompañados de 2 chips de plátano.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Combi',
            descripcion: 'Pollo desmechado en salsa de la casa, jamón ahumado, queso rayado y fundido.',
            precio: 22900,
          },
          {
            nombre: 'Bacon',
            descripcion: 'Pollo desmechado en salsa de la casa, tocineta crocante, jamón ahumado y quesos.',
            precio: 24900,
          },
          {
            nombre: 'Chorizo',
            descripcion: 'Pollo desmechado en salsa de la casa, chorizo a la parrilla, jamón ahumado y quesos.',
            precio: 24900,
          },
          {
            nombre: 'Champion',
            descripcion: 'Pollo desmechado en salsa de la casa, champiñones salteados, jamón ahumado y quesos.',
            precio: 25900,
          },
          {
            nombre: 'Granjero',
            descripcion: 'Pollo desmechado, lomo fino en cuadros, tocineta, jamón ahumado y quesos.',
            precio: 28500,
          },
          {
            nombre: 'Camaronero',
            descripcion: 'Pollo desmechado, camarones salteados, jamón ahumado y quesos.',
            precio: 28900,
          },
          {
            nombre: 'Ranchero',
            descripcion: 'Pollo desmechado, lomo en cuadros, tocineta, salchicha ranchera, jamón ahumado y quesos.',
            precio: 30000,
          },
          {
            nombre: 'Máximo',
            descripcion: 'Pollo desmechado, lomo fino en cuadros, tocineta, chorizo a la parrilla, jamón ahumado y quesos.',
            precio: 30000,
          },
        ],
      },
    ],
  },
  {
    id: 'club',
    titulo: 'Club house',
    pie: 'Pan tajado con lechuga, tomate y cebolla cruda. Acompañados de papas a la francesa.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Combi',
            descripcion: 'Jamón ahumado, huevo frito, doble crema y pollo desmechado en salsa de la casa.',
            precio: 25500,
          },
          {
            nombre: 'Bacon',
            descripcion: 'Jamón ahumado, huevo frito, doble crema, pollo desmechado y doble piso de tocineta.',
            precio: 26900,
          },
          {
            nombre: 'Champion',
            descripcion: 'Jamón ahumado, huevo frito, doble crema, pollo desmechado y champiñones salteados.',
            precio: 26900,
          },
          {
            nombre: 'Camarones',
            descripcion: 'Jamón ahumado, huevo frito, doble crema, camarones rebozados en salsa rosada y pollo desmechado.',
            precio: 28900,
          },
        ],
      },
    ],
  },
  {
    id: 'parrilla',
    titulo: 'Parrilla',
    pie: 'Acompañados de papas a la francesa, croquetas de yuca, guacamole y ensaladita.',
    grupos: [
      {
        titulo: '',
        platos: [
          {
            nombre: 'Carne fresca al carbón',
            detalle: '300 g',
            precio: 34000,
          },
          {
            nombre: 'Pechuga a la brasa',
            detalle: '300 g',
            precio: 32000,
          },
          {
            nombre: 'Pechuga ranchera',
            detalle: '300 g',
            descripcion: 'Cubierta con tocineta ahumada y queso fundido.',
            precio: 34000,
          },
          {
            nombre: 'Chuleta de cerdo',
            detalle: '400 g',
            precio: 37000,
          },
          {
            nombre: 'Chatas a la brasa',
            detalle: '350 g',
            precio: 41000,
          },
          {
            nombre: 'Chatas de la casa',
            detalle: '350 g',
            precio: 44000,
          },
          {
            nombre: 'Costillitas de cerdo BBQ',
            detalle: '350 g',
            precio: 46900,
          },
          {
            nombre: 'Chatas con camarones gratinadas',
            detalle: '350 g',
            precio: 46900,
          },
          {
            nombre: 'Alitas broaster',
            descripcion: 'Apanadas, con BBQ o miel mostaza; acompañadas de papa criolla o a la francesa.',
            precio: 23900,
          },
          {
            nombre: 'Pincho de carne',
            descripcion: 'Lomo fino de res (220 g) con chorizo.',
            precio: 28900,
          },
          {
            nombre: 'Pincho mixto',
            descripcion: 'Lomo fino (120 g) y filete de pechuga (120 g) con chorizo.',
            precio: 29900,
          },
          {
            nombre: 'Picada x 62 K',
            detalle: 'Para 3-4 personas',
            descripcion: 'Carne fresca, pechuga al carbón, chorizo artesanal, chunchulla rellena, croquetas de yuca, papas y ensaladita.',
            precio: 62000,
          },
        ],
      },
    ],
  },
  {
    id: 'domingos',
    titulo: 'Domingos en la casa',
    pie: 'Los domingos se suma la cocina santandereana: típicos, carnes, aves y pescados.',
    grupos: [
      {
        titulo: 'Platos típicos',
        platos: [
          { nombre: 'Mute santandereano', descripcion: 'Con arroz, ensalada, arepa amarilla y yuca al vapor.', precio: 23500 },
          { nombre: 'Sancocho de gallina', descripcion: 'Con gallina asada, arroz, yuca al vapor, ensalada y arepa amarilla.', precio: 26900 },
          { nombre: 'Sancocho de costilla', descripcion: 'Arrocito, yuca, arepa amarilla y ensalada.', precio: 28000 },
          { nombre: 'Consomé de sancocho', precio: 7500 },
          { nombre: 'Cabrito a la brasa', detalle: '400 g', descripcion: 'Con pepitoria, yuca al vapor, ensalada y arepa amarilla.', precio: 38900 },
        ],
      },
      {
        titulo: 'Carnes',
        platos: [
          { nombre: 'Carne fresca', detalle: '300 g', descripcion: 'Papa a la francesa, guacamole, ensalada y croquetas de yuca.', precio: 34000 },
          { nombre: 'Carne semioreada', detalle: '300 g', descripcion: 'Arroz, ensaladita, yuca al vapor y arepa amarilla.', precio: 37000 },
          { nombre: 'Chuleta de cerdo', detalle: '350 g', precio: 37000 },
          { nombre: 'Punta de anca', detalle: '350 g', descripcion: 'Arroz, ensaladita, yuca al vapor y arepa amarilla.', precio: 39000 },
          { nombre: 'Sobrebarriga a la brasa', detalle: '300 g', descripcion: 'Arroz, ensaladita, yuca al vapor y arepa amarilla.', precio: 38900 },
          { nombre: 'Chatas a la brasa', detalle: '350 g', precio: 41000 },
          { nombre: 'Costillas de cerdo BBQ', detalle: '350 g', precio: 46900 },
        ],
      },
      {
        titulo: 'Aves',
        platos: [
          { nombre: 'Arroz con pollo', precio: 29000 },
          { nombre: 'Espaguetis con pollo', precio: 32000 },
          { nombre: 'Pechuga a la brasa', detalle: '300 g', precio: 32000 },
          { nombre: 'Pechuga rellena', detalle: '350 g', precio: 34000 },
          { nombre: 'Pechuga ranchera', detalle: '300 g', descripcion: 'Tocineta ahumada, queso fundido, croquetas de yuca y ensaladita.', precio: 34000 },
        ],
      },
      {
        titulo: 'Pescados',
        platos: [
          { nombre: 'Trucha', detalle: '400 g', descripcion: 'A la plancha, al ajillo o en verduras; con arroz, ensaladita y patacón.', precio: 36900 },
          { nombre: 'Robalo apanado', detalle: '380 g', precio: 36500 },
          { nombre: 'Mojarra frita', detalle: '500 g', descripcion: 'Arroz, ensaladita y patacones.', precio: 38900 },
          { nombre: 'Bagre frito', detalle: '380 g', precio: 39000 },
          { nombre: 'Bocachico frito', detalle: '500 g', precio: 39000 },
          { nombre: 'Robalo en salsa termidor', detalle: '380 g', precio: 39000 },
          { nombre: 'Bagre en salsa', detalle: '380 g', precio: 41000 },
          { nombre: 'Bocachico sudado', detalle: '500 g', descripcion: 'Arroz, ensaladita, yuca al vapor y patacones.', precio: 41000 },
        ],
      },
    ],
  },
  {
    id: 'patacones',
    titulo: 'Entradas y patacones',
    grupos: [
      {
        titulo: 'Entradas',
        pie: 'Con yuca al vapor o croquetas de yuca, a elección.',
        platos: [
          { nombre: 'Chorizos de cerdo', precio: 12000 },
          { nombre: 'Chunchulla', precio: 16500 },
          { nombre: 'Chicharrón de cerdo', precio: 16500 },
          { nombre: 'Empanadas', precio: 13900 },
        ],
      },
      {
        titulo: 'Patacones rellenos',
        pie: 'Con mix de quesito semisalado y doble crema fundido.',
        platos: [
          { nombre: 'Combi', descripcion: 'Carne desmechada, pollo desmechado en salsa de la casa, tocineta y jamón.', precio: 25500 },
          { nombre: 'Champion', descripcion: 'Champiñones salteados, pollo desmechado, tocineta y jamón.', precio: 26900 },
          { nombre: 'Granjero', descripcion: 'Lomo de res en cuadros, maíz tierno, chorizos, tocineta y jamón.', precio: 27900 },
          { nombre: 'De la casa', descripcion: 'Lomo de res, filete de pechuga, camarones salteados, tocineta y jamón.', precio: 28900 },
          { nombre: 'Mexicano', descripcion: 'Carne desmechada en chipotle, jalapeños, nachos, guacamole y jamón.', precio: 29900 },
        ],
      },
    ],
  },
  {
    id: 'infantil',
    titulo: 'Menú infantil',
    pie: 'Para los chamacos de la casa: con sorpresa, jugo y chocolatina.',
    grupos: [
      {
        titulo: '',
        platos: [
          { nombre: 'Mini hamburguesa', descripcion: 'Carne al carbón con cheddar y doble crema, con papas a la francesa.', precio: 25900 },
          { nombre: 'Mini perro', descripcion: 'Salchicha americana con queso doble crema y papas a la francesa.', precio: 25900 },
          { nombre: 'Mini salchipapa', descripcion: 'Salchicha Long Zenú con papas a la francesa.', precio: 25900 },
          { nombre: 'Nuggets caseros', descripcion: 'Pechuga apanada con la receta de la casa y papas a la francesa.', precio: 25900 },
        ],
      },
    ],
  },
  {
    id: 'desayunos',
    titulo: 'Desayunos',
    pie: 'De martes a domingo, solo de día. Con arepa blanca o amarilla y bebida caliente (chocolate, tinto o café con leche).',
    grupos: [
      {
        titulo: '',
        platos: [
          { nombre: 'Huevos al gusto', precio: 13500 },
          { nombre: 'Caldo de huevo', precio: 14000 },
          { nombre: 'Huevos rancheros', descripcion: 'Con arepa blanca y bebida caliente.', precio: 15000 },
          { nombre: 'Caldo de costilla', precio: 16900 },
          { nombre: 'Bandeja de carne', detalle: '230 g', descripcion: 'Con ensaladita y arepa blanca.', precio: 19500 },
          { nombre: 'Bandeja de pechuga', precio: 19500 },
          { nombre: 'Desayuno de la abuela', descripcion: 'Caldo a elección, huevo al gusto o bandeja, arepa y bebida caliente.', precio: 25000 },
          { nombre: 'Bebida caliente', detalle: 'Tinto, chocolate o café con leche', precio: 1600 },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    titulo: 'Bebidas',
    grupos: [
      {
        titulo: 'Frías y gaseosas',
        platos: [
          { nombre: 'Gaseosa PET 400', precio: 3800 },
          { nombre: 'Gaseosa PET Postobón', precio: 3500 },
          { nombre: 'Agua natural o con gas', precio: 3500 },
          { nombre: '1½ Coca-Cola', precio: 7000 },
          { nombre: '1½ Postobón', precio: 6000 },
          { nombre: 'Soda italiana', precio: 11900 },
        ],
      },
      {
        titulo: 'Granizadas y jugos',
        platos: [
          { nombre: 'Granizada de naranja, limón o mandarina', precio: 7500 },
          { nombre: 'Granizada de hierbabuena o cereza', precio: 10500 },
          { nombre: 'Granizada de coco', precio: 10500 },
          { nombre: 'Jugo natural', descripcion: 'Fresa, luló, mora, guanábana, maracuyá o mango.', precio: 7500 },
        ],
      },
      {
        titulo: 'Cervezas y micheladas',
        platos: [
          { nombre: 'Cerveza nacional', descripcion: 'Águila Light, Andina o Poker.', precio: 4500 },
          { nombre: 'Michelada', descripcion: 'Águila Light, Pilsen, Poker, Club Colombia, Coronita o Heineken.', precio: 8900 },
        ],
      },
    ],
  },
]

// El almuerzo no es una carta fija: cambia a diario. Este es el ejemplo
// publicado por el negocio para un día concreto, tomado de Ola.Click.
export const almuerzoEjemplo = {
  dia: 'Viernes',
  siempreIncluye: ['Sopa de pastas', 'Arroz paisa', 'Tomate de árbol'],
  proteinas: [
    'Estofado',
    'Carne BBQ / brasa',
    'Pernil (frito / carbón / apanado)',
    'Pechuga con salsa del día — brasa — crispy',
    'Cerdo con salsa del día / brasa',
    'Milanesa de pollo 1½',
    'Palitos de robalo apanado en tártara',
    'Cazuela de bagre',
    'Pechuga hawaiana / suiza',
  ],
}

export const adiciones = [
  { nombre: 'Papa a la francesa', precio: 10900 },
  { nombre: 'Agrandado de papa (hamburguesas)', precio: 4800 },
  { nombre: 'Agrandado de papa (perros, papas, club, desgranados)', precio: 5800 },
  { nombre: 'Croquetas de yuca x 4', precio: 5500 },
  { nombre: 'Pollo desmechado', precio: 6500 },
  { nombre: 'Carne desmechada', precio: 7000 },
  { nombre: 'Carne picada', precio: 7500 },
  { nombre: 'Carne de hamburguesa extra', precio: 8500 },
  { nombre: 'Camarón', precio: 8500 },
  { nombre: 'Tocineta', precio: 6000 },
  { nombre: 'Chorizo', precio: 6000 },
  { nombre: 'Lomo de cerdo', precio: 5500 },
  { nombre: 'Salchicha Americana', precio: 5800 },
  { nombre: 'Salchicha Zenú', precio: 5000 },
  { nombre: 'Cabano', precio: 3400 },
  { nombre: 'Filete de pechuga', precio: 7000 },
  { nombre: 'Champiñón', precio: 5900 },
  { nombre: 'Maíz tierno', precio: 5800 },
  { nombre: 'Jalapeños', precio: 4500 },
  { nombre: 'Huevo frito', precio: 1600 },
  { nombre: 'Queso cheddar', precio: 6500 },
  { nombre: 'Queso doble crema', precio: 6500 },
  { nombre: 'Guacamole', precio: 2000 },
  { nombre: 'Salsa tártara o piña', precio: 1000 },
  { nombre: 'Combo x 3 salsas', precio: 2800 },
]

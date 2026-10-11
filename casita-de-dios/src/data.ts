// Contenido de La Casita de Dios. La carta sale de sus PDF "Bebidas" y "Desayunos y Postres" (precios en pesos).
// Lo que todavía no tenemos va en null y se muestra "por confirmar".

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;
export const carta = (name: string) => `${ROOT}img/carta/${name}.webp`;
export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

// Datos de contacto (placeholders hasta que el dueño los confirme).
export const WHATSAPP: string | null = "573208320980"; // Sale de la carta ("Reserva con nosotros por WhatsApp 320 832 0980"); por confirmar.
export const WHATSAPP_LABEL = "320 832 0980";
export const ADDRESS: string | null = null;
export const CITY: string | null = null;
export const HOURS: string | null = null;
export const INSTAGRAM: string | null = null;
export const DELIVERY: string | null = null;
export const MAPS_URL: string | null = null;

export const wa = (msg: string) => (WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : "#visita");

export const BREAKFAST_UNTIL = 11; // "Desayunos disponibles solo hasta las 11:00 a. m."

export type Price = { label?: string; value: number };
export type Item = { name: string; desc?: string; prices: Price[]; photo?: string; tag?: string };
export type Category = { id: string; title: string; kicker: string; intro?: string; items: Item[]; extras?: Item[] };

const p = (value: number, label?: string): Price => ({ value, label });
const sizes = (a: number, b: number) => [p(a, "9 onz"), p(b, "12 onz")];

export const menu: Category[] = [
  {
    id: "desayunos",
    title: "Desayunos",
    kicker: "Energía y dulzura en cada bocado",
    intro: "Huevos revueltos, fritos o pericos, como los quieras.",
    items: [
      { name: "Combo de la Casita", desc: "Huevos del día con arepita de yuca y una bebida caliente: americano, chocolate, Milo o aromática.", prices: [p(29900)], photo: "combo-casita", tag: "El combo" },
      { name: "Desayuno de la Casita", desc: "Huevos a tu gusto con una arepita de la Casita.", prices: [p(22900)], photo: "desayuno-casita" },
      { name: "Desayuno valluno", desc: "Huevos a tu gusto con arepa de chocolo.", prices: [p(24900)], photo: "desayuno-valluno" },
      { name: "Desayuno paisa", desc: "Huevos a tu gusto con arepa paisa y quesito campesino rallado.", prices: [p(18900)], photo: "desayuno-paisa" },
      { name: "Desayuno sencillo", desc: "Huevos a tu gusto con arepita de yuca o croissant de mantequilla.", prices: [p(18900)], photo: "desayuno-sencillo" },
      { name: "Huevos a la carta", desc: "Revueltos, fritos o pericos.", prices: [p(9900)], photo: "huevos" },
      { name: "Arepita de la Casita", desc: "Masa de maíz peto con un centro de queso Paipa fundido.", prices: [p(16200)], photo: "arepa-casita" },
      { name: "Arepita de chocolo", desc: "Con un corazón saladito de queso campesino.", prices: [p(16900)], photo: "arepa-chocolo" },
      { name: "Arepita antioqueña", desc: "Maíz peto 100 % paisa con quesito campesino finamente rallado.", prices: [p(9900)], photo: "arepa-antioquena" },
      { name: "Arepita de yuca", desc: "Repletica de quesito.", prices: [p(8900)], photo: "arepa-yuca" },
      { name: "Croissant de chocolate", desc: "Hojaldre francés con Nutella, fresas y crema chantilly.", prices: [p(14900)], photo: "croissant-chocolate" },
      { name: "Croissant de jamón y queso", desc: "Hojaldre francés con jamón cotto y mozzarella.", prices: [p(14900)], photo: "croissant-jamon" },
      { name: "Croissant de mantequilla", prices: [p(9900)], photo: "croissant" },
    ],
    extras: [
      { name: "Tocineta", prices: [p(4900)] },
      { name: "Queso", prices: [p(3500)] },
      { name: "Jamón", prices: [p(3500)] },
      { name: "Salchicha", prices: [p(3500)] },
      { name: "Maíz", prices: [p(3500)] },
    ],
  },
  {
    id: "calientes",
    title: "Calientitos",
    kicker: "Frías o calientes, siempre abrazan el alma",
    items: [
      { name: "Café latte", desc: "Espresso y leche cremada.", prices: sizes(9900, 10900), photo: "latte" },
      { name: "Capuccino", desc: "Tradicional, de tiramisú o de la Casita (con chocolate blanco).", prices: [p(9900, "Tradicional"), p(12900, "Tiramisú"), p(12900, "De la Casita")], photo: "capuccino", tag: "Tres versiones" },
      { name: "Americano vienés", desc: "Espresso y agua caliente, con crema chantilly.", prices: sizes(8900, 9900), photo: "americano-vienes", tag: "¡Mi favorito!" },
      { name: "Americano", desc: "Tradicional, o de la Casita con panela y canela.", prices: sizes(8900, 9900), photo: "americano" },
      { name: "Espresso", desc: "Intenso y auténtico, con crema dorada avellana. Corto, largo o doble.", prices: [p(6900, "Corto"), p(6900, "Largo"), p(7900, "Doble")], photo: "espresso" },
      { name: "Espresso bombón", desc: "Endulzado con leche condensada. También dolce (arequipe y chantilly) o macchiato.", prices: [p(8900, "Bombón"), p(7900, "Dolce"), p(7900, "Macchiato")], photo: "espresso-bombon" },
      { name: "Amor salado", desc: "Café, caramelo salado, leche, crema chantilly y maní salado.", prices: sizes(12900, 13900), photo: "amor-salado" },
      { name: "Mocca", desc: "Espresso, leche, chantilly y salsa de chocolate. Caliente o frío.", prices: [p(10900, "9 onz"), p(13900, "12 onz"), p(13900, "Frío")], photo: "mocca" },
      { name: "Chocolate caliente", desc: "En agua o en leche.", prices: sizes(10900, 12900), photo: "chocolate" },
      { name: "Milo caliente", desc: "Milo y leche, con malvaviscos.", prices: sizes(12900, 14900), photo: "milo-caliente" },
      { name: "Lindo recuerdo", desc: "Leche y una planta exótica de China que ayuda a reducir el estrés, con malvaviscos. Caliente o fría.", prices: [p(16900)], photo: "lindo-recuerdo" },
      { name: "Té chai", desc: "Canela, clavos, cardamomo y jengibre, en agua o leche. También frío.", prices: [p(12900, "9 onz"), p(14900, "12 onz"), p(14900, "Frío")], photo: "chai" },
      { name: "Aromática", desc: "Endulzada con Frutalia, trozos de fruta y hierbabuena.", prices: [p(10900)], photo: "aromatica" },
    ],
  },
  {
    id: "frios",
    title: "Fríos y frappés",
    kicker: "Suavidad helada, sabor que encanta",
    items: [
      { name: "Frappuccino Oreo", desc: "Galleta Oreo, chocolate blanco y crema chantilly.", prices: [p(17900, "14 onz")], photo: "frappe-oreo", tag: "Dulce tentación" },
      { name: "Frappé arcoíris", desc: "Baileys, leche y crema irlandesa, con chantilly y leche condensada.", prices: [p(17900, "14 onz")], photo: "arcoiris" },
      { name: "Frappuccino", desc: "Tradicional o de caramelo, con crema chantilly.", prices: [p(17900, "Tradicional"), p(17900, "Caramelo")], photo: "frappe" },
      { name: "Amor salado frappé", desc: "Café, caramelo salado, leche, chantilly y maní salado.", prices: [p(17900, "14 onz")], photo: "amor-salado-frio" },
      { name: "Latte frío", desc: "Espresso, hielo y leche. También caramel latte.", prices: [p(11900, "Latte"), p(11900, "Caramel")], photo: "latte-frio" },
      { name: "Milo frío", desc: "Bendito y sencillo: Milo, leche y malvaviscos.", prices: [p(14900, "14 onz")], photo: "milo-frio" },
      { name: "Flor de Jamaica", desc: "Jamaica, hielo, limón y syrup de coco y rosas.", prices: [p(13900, "14 onz")], photo: "jamaica" },
      { name: "Americano frío", desc: "Espresso y hielo.", prices: [p(9900, "14 onz")], photo: "americano-frio" },
    ],
  },
  {
    id: "granizados",
    title: "Granizados y sodas",
    kicker: "Pura fruta, puro amor",
    items: [
      { name: "Soda de arándanos", desc: "Syrup de arándanos, limón, hielo y bolitas explosivas.", prices: [p(17900)], photo: "arandanos", tag: "Explosión burbujeante" },
      { name: "Sodas", desc: "Sandía, lychee o manzana verde, con limón y hielo.", prices: [p(17900)], photo: "sodas" },
      { name: "Jugos granizados", desc: "Mora, fresa o mango, maracuyá y piña.", prices: [p(11900, "En agua"), p(12900, "En leche")], photo: "granizados" },
      { name: "Limonada de hierbabuena", desc: "Granizada con hierbabuena, limón y almíbar.", prices: [p(15900)], photo: "limonada-hierbabuena" },
      { name: "Limonada de cereza", desc: "Pulpa de cereza y limón, decorada con cereza.", prices: [p(15900)], photo: "cereza" },
      { name: "Limonada de coco", desc: "Coco y limón, con coco tostado.", prices: [p(15900)], photo: "coco" },
      { name: "Limonada de mango biche", desc: "Mango biche, limón y almíbar, con Tajín.", prices: [p(15900)], photo: "mango-biche" },
      { name: "Batidos", desc: "Rojo: piña, arándanos, manzana y chía. Amarillo: mango, maracuyá y albahaca.", prices: [p(13900, "Rojo"), p(13900, "Amarillo")], photo: "batidos" },
      { name: "Limonada natural", prices: [p(13900)] },
    ],
  },
  {
    id: "tortas",
    title: "Tortas",
    kicker: "Cada torta, un momento de felicidad",
    intro: "Por porción o la torta entera de 12 porciones.",
    items: [
      { name: "Cheesecake de frutos rojos", desc: "Torta fría de queso con base de galleta y salsa natural de frutos rojos.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "cheesecake-frutos" },
      { name: "Chocolate", desc: "Un sueño hecho pastel: chocolate Snickers, crema de maní, chocolate y caramelo salado.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "chocolate-torta" },
      { name: "Fresa", desc: "Vainilla humedecida en salsa de fresa, rellena de trocitos de fresa.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "fresa" },
      { name: "Durazno y crema", desc: "Un dulce poema: vainilla en salsa de durazno con trocitos de durazno.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "durazno" },
      { name: "Amapola", desc: "Suave y esponjosa, con naranja y cubierta de chocolate blanco.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "amapola" },
      { name: "Zanahoria", desc: "Con frosting de queso crema y nuez de Brasil.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "zanahoria" },
      { name: "Delirio de almojábana", desc: "Con cuajada, bañada en almíbar de panela.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "almojabana" },
      { name: "Cheesecake de limón", desc: "Torta fría de limón con base de galleta.", prices: [p(15900, "Porción"), p(190800, "Entera")], photo: "cheesecake-limon" },
      { name: "Maracuyá", prices: [p(15900, "Porción"), p(190800, "Entera")] },
      { name: "Oreo", prices: [p(15900, "Porción"), p(190800, "Entera")] },
      { name: "Cheesecake de Nutella", prices: [p(15900, "Porción"), p(190800, "Entera")] },
      { name: "Red velvet", prices: [p(15900, "Porción"), p(190800, "Entera")] },
    ],
    extras: [
      { name: "Saludable · Cheesecake brownie", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Saludable · Doble chocolate", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Saludable · Cheesecake de caramelo", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Saludable · Chocomaní", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Saludable · Zanahoria", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Saludable · Cheesecake de limón", prices: [p(19900, "Porción"), p(238800, "Entera")] },
      { name: "Mojadito de frutos rojos", prices: [p(16900, "Porción")] },
    ],
  },
];

// Galletas de la cajita: los 8 sabores de la carta.
export const COOKIE_PRICE: number | null = 13900; // En la carta aparece $13.900 por sabor; por confirmar si es por galleta.
export const BOX_SIZE = 6; // Por confirmar.
export const cookies = [
  { id: "red-velvet", name: "Red velvet" },
  { id: "nutella", name: "Nutella" },
  { id: "cheesecake", name: "Cheesecake" },
  { id: "coco", name: "Limonada de coco" },
  { id: "oreo", name: "Oreo" },
  { id: "kinder", name: "Kinder" },
  { id: "klim", name: "Leche Klim" },
  { id: "tiramisu", name: "Tiramisú" },
];

// Frases que la casita ya publica en sus historias.
export const phrases = [
  "Un café con Dios",
  "Agradece, agradece, agradece",
  "El amor de Dios es el ingrediente secreto",
  "Dios, que tu tiempo sea mi reloj y tu voluntad mi camino",
  "Donde hay torta y fe, hay esperanza y sabor",
  "Cada día es un regalo de Dios para amar más",
];

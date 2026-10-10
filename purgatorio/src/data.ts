// Contenido de El Purgatorio, tomado de su menú "Arte, café y algo más" y de sus piezas de Instagram.

export const PLACE = "Castillo del Mono Osorio";
export const ADDRESS = "Calle 74 # 2-86";
export const CITY = "Bogotá";
// Falta el usuario de Instagram del local: mientras tanto el botón busca "El Purgatorio Bogotá" en Instagram.
export const INSTAGRAM_DM = "https://www.instagram.com/explore/search/keyword/?q=" + encodeURIComponent("el purgatorio bogota");
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("El Purgatorio, Castillo del Mono Osorio, Calle 74 # 2-86, Bogotá");

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;
export const snd = (name: string) => `${ROOT}snd/${name}.mp3`;
export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

// Noche de Villanos: 31 de octubre, 6 a 9 p. m. (hora de Bogotá).
export const VILLANOS = new Date("2026-10-31T18:00:00-05:00");

export type Sin = { id: string; name: string; numeral: string; spirit: string; desc: string; price: number };

export const sins: Sin[] = [
  { id: "lujuria", name: "Lujuria", numeral: "I", spirit: "Vodka", price: 42000, desc: "Chispeante y seductor. Vodka, granadina y limón arden con el picor de la ginger beer, suavizados por un toque dulce. Entra como un beso prohibido… y deja ganas de más." },
  { id: "pereza", name: "Pereza", numeral: "II", spirit: "Vodka", price: 42000, desc: "Oscuro y lento como un atardecer sin prisa. Naranja dulce, vodka suave y un toque de granadina, envueltos en la negrura sigilosa del carbón activado. Te hunde en su calma." },
  { id: "gula", name: "Gula", numeral: "III", spirit: "Gin", price: 42000, desc: "Dulce, cítrico y atrevido. Gin, maracuyá y limón se funden con el amargo sutil del aperol, suavizados por syrup y espuma de clara. Un pecado que no se resiste… se repite." },
  { id: "envidia", name: "Envidia", numeral: "IV", spirit: "Ron", price: 42000, desc: "Ron, blue curaçao, sirope de lychee, limón y triple sec. Dulce, cítrico y tan llamativo que hará que todos quieran el tuyo." },
  { id: "soberbia", name: "Soberbia", numeral: "V", spirit: "Tequila", price: 42000, desc: "Tequila con limón y frambuesa en una mezcla que no pide aprobación… se impone. Ácida, dulce y desafiante, como quien sabe que siempre será el centro." },
  { id: "avaricia", name: "Avaricia", numeral: "VI", spirit: "Ron blanco", price: 42000, desc: "Brillante, amarga y codiciosa. Ron blanco, limón y miel se mezclan con el carácter del campari en un trago que lo tiene todo: dulzura, acidez y fuego. Y no deja nada para nadie." },
  { id: "ira", name: "Ira", numeral: "VII", spirit: "Tequila", price: 42000, desc: "Tequila, campari, triple sec y miel arden con el filo del tabasco. Coronado con sal negra, es un coctel intenso, amargo y picante, hecho para quienes disfrutan el fuego en cada sorbo." },
];

export type Line = { name: string; price: string; note?: string };
export type Chapter = { id: string; title: string; lines: Line[]; foot?: string };

const p = (n: number) => cop(n);

export const menu: Chapter[] = [
  {
    id: "cafe",
    title: "Café",
    foot: "El café que usamos es exótico y de alta calidad. Adiciones: leche de almendras $6.000 · amaretto $3.000 · caramelo $3.000 · kahlúa $7.500.",
    lines: [
      { name: "Espresso", price: p(6500) },
      { name: "Americano", price: p(7300) },
      { name: "Capuchino", price: p(10700) },
      { name: "Latte", price: p(11000) },
      { name: "Flat white", price: p(9500) },
      { name: "Mokaccino", price: p(14500) },
      { name: "Filtrados", price: p(22500) },
      { name: "Affogato", price: p(33500) },
      { name: "Té", price: p(16000) },
      { name: "Té en leche", price: p(20000) },
      { name: "Matcha", price: p(12000) },
      { name: "Chai latte", price: p(14000), note: "Masala, rosas, carbón activado o matcha" },
      { name: "Chocolate caliente", price: p(14000), note: "100 % chocolate colombiano" },
    ],
  },
  {
    id: "frias",
    title: "Bebidas frías",
    lines: [
      { name: "Ice latte", price: p(13000), note: "Espresso suave con leche fría y hielo" },
      { name: "Espuma eléctrica", price: p(17500), note: "Espresso con agua tónica, hielo y un toque cítrico" },
      { name: "Matcha latte", price: p(14000), note: "Té verde japonés con leche" },
      { name: "Blueberry latte / matcha", price: p(18500), note: "Mermelada de fresa y mora, hielo, leche y espresso o matcha" },
      { name: "Lluvia dorada", price: p(18500), note: "Espresso con miel, hielo y espuma de leche" },
      { name: "Café naranja", price: p(13500), note: "Espresso con jugo de naranja" },
      { name: "Apple honey (limón)", price: p(16500), note: "Sirope de manzana, miel y hielo" },
      { name: "Bebida espirituosa", price: p(18000), note: "Coctel sin alcohol: pulpa de fruta, soda, jengibre, yerbabuena, limón y naranja" },
      { name: "Jugo en agua", price: p(9500) },
      { name: "Jugo en leche", price: p(12000) },
      { name: "Agua con gas", price: p(4500) },
    ],
  },
  {
    id: "clasicos",
    title: "Clásicos",
    foot: "Entre tanta tentación, también hay espacio para los clásicos.",
    lines: [
      { name: "Old fashion", price: p(45000), note: "Bourbon, azúcar y bitters. Fuerte, balanceado, inolvidable." },
      { name: "Espresso martini", price: p(42000), note: "Vodka, café y un toque dulce. Para quienes no duermen temprano." },
      { name: "Rosita", price: p(42000), note: "Vodka, crema, granadina y limón. Sedosa y encantadora." },
      { name: "Copa bourbon", price: p(30000) },
      { name: "Copa whisky (12 años)", price: p(30000) },
      { name: "Botella whisky (12 años)", price: p(360000) },
      { name: "Botella whisky (15 años)", price: p(420000) },
    ],
  },
  {
    id: "vino",
    title: "Vino y cerveza",
    lines: [
      { name: "Vino tinto de la casa", price: `${p(21000)} · botella ${p(90000)}`, note: "Especiado, nuez moscada, frambuesas y final de vainilla" },
      { name: "Vino blanco de la casa", price: `${p(21000)} · botella ${p(90000)}`, note: "Herbáceo, hierbabuena, tilo y peras en almíbar" },
      { name: "Vino caliente", price: p(22000), note: "Con yerbabuena, canela y azúcar. Ideal para los fríos bogotanos" },
      { name: "Tinto de verano", price: p(22000) },
      { name: "Lambrusco Remigio Rosso", price: p(90000) },
      { name: "Cerveza endiablada", price: p(35000), note: "Cerveza blanca con limón, shot de tequila y labios de tajín" },
      { name: "Cerveza Lino NE IPA", price: p(18000) },
      { name: "Cerveza artesanal Ramona Sour", price: p(16500), note: "Frutos rojos o guayaba, durazno y sal" },
      { name: "Stella", price: p(14000) },
      { name: "Club Colombia", price: p(10000) },
    ],
  },
  {
    id: "dulce",
    title: "Pastelería",
    lines: [
      { name: "Croissant de almendras", price: p(13500) },
      { name: "Pan de chocolate", price: p(10800) },
      { name: "Porción de torta", price: p(18400), note: "Arándanos, red velvet o María Luisa" },
      { name: "Torta de chocolate", price: p(14600), note: "Opción vegana" },
      { name: "Porción de helado", price: "+" + p(9000) },
    ],
  },
  {
    id: "comida",
    title: "Para comer",
    foot: "Todas las cremas tienen opción vegetariana y vegana. Hamburguesas en combo con papas y jugo o Club Colombia +$7.000.",
    lines: [
      { name: "Empanada argentina", price: p(9200), note: "Tocineta y queso, carne o ricota y espinaca" },
      { name: "Porción de papas a la francesa", price: p(8500) },
      { name: "Chorizo", price: p(13500) },
      { name: "Choripapas", price: p(20000) },
      { name: "Sándwich italiano", price: p(28000), note: "Mozzarella, tomates cherry confitados, rúgula y balsámico" },
      { name: "Sándwich durazno", price: p(28000), note: "Mozzarella, rúgula, duraznos confitados y pesto" },
      { name: "Sándwich pesto", price: p(28000), note: "Mozzarella de búfala, tomate y pesto" },
      { name: "Sándwich jamón serrano", price: p(36000), note: "Búfala, rúgula, tomates secos y serrano" },
      { name: "Sándwich salmón", price: p(37000), note: "Queso crema, aguacate, rúgula y salmón curado" },
      { name: "Crema de tomate", price: p(18000), note: "Con un toque de picante y búfala" },
      { name: "Crema de lenteja y chorizo", price: p(20000) },
      { name: "Raviolis de carne", price: p(40000) },
      { name: "Raviolis de ricotta y espinaca", price: p(40000) },
      { name: "Raviolis de salmón", price: p(55000) },
      { name: "Pasta boloñesa", price: p(35000) },
      { name: "Hamburguesa", price: p(35000), note: "150 g de res, doble cheddar y mermelada de tocineta y cebolla" },
      { name: "Hamburguesa queso azul", price: p(44000), note: "Rellena de queso azul, rúgula y tocineta" },
    ],
  },
];

export const events = [
  { title: "Tarot en el castillo", text: "Lecturas de cartas entre muros de piedra.", photo: "tarot-evento" },
  { title: "Club de lectura", text: "Noches de libros oscuros, como La metamorfosis.", photo: "metamorfosis" },
  { title: "Talleres de arte", text: "Incomódate, pinta tu arcano, dibujo ciego.", photo: "arcano" },
  { title: "Picnic en un castillo", text: "La terraza entre torres y plantas.", photo: "picnic" },
];

// Precios tomados del tablero del local (en miles de pesos colombianos).
// Para actualizar el menú solo hay que editar este archivo.

export type MenuItem = {
  name: string;
  note?: string;
  price?: number;
  // Foto que aparece al pasar el cursor (o miniatura en celular). Nombre base en public/img.
  photo?: string;
};

export type MenuGroup = {
  title: string;
  photo: string;
  items: MenuItem[];
};

export type FoodItem = {
  name: string;
  note: string;
  image?: string;
};

export const INSTAGRAM = "https://www.instagram.com/somos.noble/";
export const INSTAGRAM_DM = "https://ig.me/m/somos.noble";
export const ADDRESS = "Calle 106 # 56-76";
export const ADDRESS_DETAIL = "Local 101, Puente Largo, Bogotá";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Noble Cafelicidad, Calle 106 # 56-76 Local 101, Bogotá");

export const hot: MenuGroup[] = [
  {
    title: "Espresso",
    photo: "vaso-galleta",
    items: [
      { name: "Espresso", note: "Corto e intenso", price: 4.5, photo: "buen-dia" },
      { name: "Macchiato", note: "Espresso y un toque de espuma", price: 6.5 },
      { name: "Americano", note: "Espresso alargado con agua", price: 6.5, photo: "buen-dia" },
      { name: "Flat white", note: "Leche sedosa, más café", price: 8.5 },
      { name: "Latte", note: "Espresso y leche texturizada", price: 9 },
      { name: "Cappuccino", note: "Espuma alta", price: 9.5 },
      { name: "Mocaccino", note: "Con chocolate", price: 10 },
      { name: "Affogato", note: "Helado con espresso encima", price: 13, photo: "postre-frutos" },
    ],
  },
  {
    title: "Filtrados y más",
    photo: "chemex-vertido",
    items: [
      { name: "Tinto", note: "El de toda la vida", price: 5, photo: "buen-dia" },
      { name: "Filtrados", note: "Método Chemex", price: 11.5, photo: "chemex-vertido" },
      { name: "Aromática", price: 8, photo: "chemex" },
      { name: "Té negro", price: 8.5, photo: "chemex" },
      { name: "Milo", price: 9.5, photo: "cliente" },
      { name: "Té chai", price: 13.5, photo: "cliente" },
    ],
  },
];

export const cold: MenuGroup[] = [
  {
    title: "Con café",
    photo: "iced-latte",
    items: [
      { name: "Americano", note: "Sobre hielo", price: 9, photo: "iced-latte" },
      { name: "Iced latte", price: 10, photo: "iced-mano" },
      { name: "Iced moca", note: "Con chocolate", price: 11, photo: "iced-latte" },
    ],
  },
  {
    title: "Sin café",
    photo: "iced-mano",
    items: [
      { name: "Milo", price: 10 },
      { name: "Soda Noble", note: "La soda de la casa", price: 12 },
      { name: "Vaca negra", price: 12 },
      { name: "Chai", price: 15 },
    ],
  },
  {
    title: "Para la sed",
    photo: "silla",
    items: [
      { name: "Agua", price: 6 },
      { name: "Coca-Cola Zero", price: 6 },
      { name: "Agua con gas", price: 6.5 },
    ],
  },
];

// Filtrado del mes: se cambia cada mes editando solo este bloque.
// El dibujo del contorno corresponde a la prensa francesa.
export const monthly = {
  title: ["filtrado", "del mes"],
  method: "PRENSA FRANCESA",
};

// Selección corta que se muestra en el inicio; el menú completo vive en /menu.
export const featured: MenuItem[] = [
  { name: "Flat white", note: "Leche sedosa, más café", price: 8.5, photo: "vaso-galleta" },
  { name: "Filtrados", note: "Método Chemex", price: 11.5, photo: "chemex-vertido" },
  { name: "Iced latte", price: 10, photo: "iced-mano" },
  { name: "Soda Noble", note: "La soda de la casa", price: 12, photo: "iced-latte" },
  { name: "Tinto", note: "El de toda la vida", price: 5, photo: "buen-dia" },
  { name: "Postres de la casa", note: "Precio en barra", photo: "postre-frutos" },
];

// La vitrina cambia según el día; los precios se confirman en barra.
export const food: FoodItem[] = [
  { name: "Postres de la casa", note: "Con frutos rojos", image: "postre-frutos" },
  { name: "Deditos de queso", note: "Para acompañar el tinto" },
  { name: "Sándwich", note: "Con chips de papa", image: "sandwich" },
  { name: "Galletas", note: "De chocolate", image: "vaso-galleta" },
  { name: "Tortas", note: "Pregunta por la del día" },
  { name: "Panadería", note: "Hojaldres para el café", image: "bodegon" },
];

// Mismo formato del tablero del local: 4.5K, 10K.
export const formatPrice = (k: number) => `${k}K`;

// Precios tomados del tablero del local (en miles de pesos colombianos).
// Para actualizar el menú solo hay que editar este archivo.

export type MenuItem = {
  name: string;
  note?: string;
  price?: number;
};

export type MenuGroup = {
  title: string;
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
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Noble Café, Calle 106 # 56-76, Bogotá");

export const hot: MenuGroup[] = [
  {
    title: "Espresso",
    items: [
      { name: "Espresso", note: "Corto e intenso", price: 4.5 },
      { name: "Macchiato", note: "Espresso y un toque de espuma", price: 6.5 },
      { name: "Americano", note: "Espresso alargado con agua", price: 6.5 },
      { name: "Flat white", note: "Leche sedosa, más café", price: 8.5 },
      { name: "Latte", note: "Espresso y leche texturizada", price: 9 },
      { name: "Cappuccino", note: "Espuma alta", price: 9.5 },
      { name: "Mocaccino", note: "Con chocolate", price: 10 },
      { name: "Affogato", note: "Helado con espresso encima", price: 13 },
    ],
  },
  {
    title: "Filtrados y más",
    items: [
      { name: "Tinto", note: "El de toda la vida", price: 5 },
      { name: "Filtrados", note: "Método Chemex", price: 11.5 },
      { name: "Aromática", price: 8 },
      { name: "Té negro", price: 8.5 },
      { name: "Milo", price: 9.5 },
      { name: "Té chai", price: 13.5 },
    ],
  },
];

export const cold: MenuGroup[] = [
  {
    title: "Con café",
    items: [
      { name: "Americano", note: "Sobre hielo", price: 9 },
      { name: "Iced latte", price: 10 },
      { name: "Iced moca", note: "Con chocolate", price: 11 },
    ],
  },
  {
    title: "Sin café",
    items: [
      { name: "Milo", price: 10 },
      { name: "Soda Noble", note: "La soda de la casa", price: 12 },
      { name: "Vaca negra", price: 12 },
      { name: "Chai", price: 15 },
    ],
  },
  {
    title: "Para la sed",
    items: [
      { name: "Agua", price: 6 },
      { name: "Coca-Cola Zero", price: 6 },
      { name: "Agua con gas", price: 6.5 },
    ],
  },
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

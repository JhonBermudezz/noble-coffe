// Contenido de Creaviva Café. Menú y kits tomados del tablero del local.
// Precios en pesos colombianos, con el mismo formato del tablero (6.900).

export const INSTAGRAM = "https://www.instagram.com/creaviva_cafe/";
export const INSTAGRAM_DM = "https://ig.me/m/creaviva_cafe";

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;

export const price = (n: number) => n.toLocaleString("es-CO");

export type Kit = {
  id: string;
  name: string;
  price: number;
  includes: string[];
  photo: string;
  color: string; // clase de fondo
  text: string; // clase de texto
};

export const kits: Kit[] = [
  { id: "escencia", name: "Escencia", price: 39900, includes: ["Cerámica pequeña", "Café"], photo: "osito", color: "bg-forest", text: "text-cream" },
  { id: "inspira", name: "Inspira", price: 49900, includes: ["Cerámica pequeña", "Panadería", "Café"], photo: "cerdito", color: "bg-mustard", text: "text-forest" },
  { id: "florece", name: "Florece", price: 59900, includes: ["Cerámica mediana", "Bebida", "Panadería"], photo: "unicornio", color: "bg-terra", text: "text-cream" },
  { id: "crea", name: "Crea", price: 79900, includes: ["Cerámica grande", "Bebida", "Panadería"], photo: "pareja", color: "bg-forest", text: "text-cream" },
  { id: "enciende", name: "Enciende", price: 69900, includes: ["Taller de velas", "Bebida", "Panadería"], photo: "velas", color: "bg-mustard", text: "text-forest" },
  { id: "expresa", name: "Expresa", price: 75900, includes: ["Tote bag para pintar o estampar", "Café", "Panadería"], photo: "totebag", color: "bg-terra", text: "text-cream" },
  { id: "siembra", name: "Siembra", price: 89900, includes: ["Pinta tu matera y siembra", "Bebida", "Panadería"], photo: "siembra", color: "bg-forest", text: "text-cream" },
];

export type MenuLine = { name: string; price: number; flavors?: string[] };
export type MenuTab = { id: string; title: string; color: string; ink: string; photo: string; items: MenuLine[] };

export const menu: MenuTab[] = [
  {
    id: "panaderia",
    title: "Panadería",
    color: "bg-mustard",
    ink: "text-forest",
    photo: "croissant",
    items: [
      { name: "Empanadas", price: 6900, flavors: ["Carne", "Pollo"] },
      { name: "Galletas", price: 3900, flavors: ["Maní", "Chocochips", "Avena", "Café", "Alfajor", "Corazón"] },
      { name: "Croissants", price: 6400, flavors: ["Arequipe", "Jamón y queso", "Chocolate", "Bocadillo y queso"] },
      { name: "Pasteles", price: 6900, flavors: ["Carne", "Pollo", "Gloria"] },
      {
        name: "Tortas",
        price: 6700,
        flavors: ["Amapola", "Red velvet", "Arándanos", "Zanahoria", "Banano", "Mantecada", "Brownie", "Milhoja", "Almojábana", "Garulla"],
      },
    ],
  },
  {
    id: "calientes",
    title: "Bebidas calientes",
    color: "bg-terra",
    ink: "text-cream",
    photo: "taller",
    items: [
      { name: "Americano", price: 5900 },
      { name: "Espresso", price: 6900 },
      { name: "Cappuccino", price: 7500 },
      { name: "Cappuccino almendras", price: 8500 },
      { name: "Latte", price: 8500 },
      { name: "Latte almendras", price: 9500 },
      { name: "Té chai", price: 12500 },
      { name: "Té matcha", price: 10500 },
      { name: "Agua de panela con queso", price: 8200 },
    ],
  },
  {
    id: "frias",
    title: "Bebidas frías",
    color: "bg-teal",
    ink: "text-forest",
    photo: "soda",
    items: [
      { name: "Sodas", price: 10500, flavors: ["Frutos rojos", "Maracuyá", "Limón", "Cereza"] },
      {
        name: "Jugos",
        price: 10500,
        flavors: ["Coco", "Durazno", "Guanábana", "Feijoa", "Fresa", "Mango", "Avena cubana"],
      },
    ],
  },
];

export const gallery = [
  { name: "grupo", alt: "Grupo de amigas pintando frente al logo de Creaviva" },
  { name: "cumple", alt: "Cumpleaños con globos en Creaviva" },
  { name: "terraza", alt: "Niñas pintando cerámica en la terraza" },
  { name: "cumple-nina", alt: "Niña celebrando su cumpleaños" },
  { name: "mural-logo", alt: "Pieza de cerámica pintada frente al mural" },
  { name: "lienzo", alt: "Lienzo pintado con manchas de colores" },
  { name: "salon", alt: "El salón lleno de plantas" },
  { name: "taller", alt: "Taller con la pared de marcos de colores" },
];

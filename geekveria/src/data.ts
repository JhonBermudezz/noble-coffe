// Contenido de Geekveria. Menú tomado del "Menú Geek" del local (precios en pesos).
// Los precios de la tienda aún no los tenemos: van en null y se muestran "por confirmar".

export const ADDRESS = "Av. Calle 100 # 60-77";
export const CITY = "Bogotá";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Geekveria, Av. Calle 100 # 60-77, Bogotá");

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;
export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

export type MenuItem = { id: string; name: string; price: number; note?: string };
export type MenuSection = { id: string; title: string; sfx: string; color: string; items: MenuItem[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const items = (prefix: string, list: [string, number, string?][]): MenuItem[] =>
  list.map(([name, price, note]) => ({ id: `${prefix}-${slug(name)}`, name, price, note }));

export const menu: MenuSection[] = [
  {
    id: "calientes",
    title: "Bebidas calientes",
    sfx: "¡FSSH!",
    color: "#e63946",
    items: items("cal", [
      ["Espresso", 4500],
      ["Americano", 5000],
      ["Macchiato", 4500],
      ["Latte", 7000],
      ["Flat White", 8000],
      ["Capuccino", 8000],
      ["Mocaccino", 9000],
      ["Choco caliente", 7000],
      ["Chai caliente", 10000],
      ["Chai caliente en agua", 9500],
      ["Aromática de infusión", 3500],
      ["Aromática con hierbabuena", 4000],
      ["Aromática de frutas", 4500],
    ]),
  },
  {
    id: "frias",
    title: "Bebidas frías",
    sfx: "¡GLUP!",
    color: "#2ec4f1",
    items: items("fri", [
      ["Americano frío", 5500],
      ["Latte frío", 7500],
      ["Caramelatte", 9000],
      ["Moca frío", 9500],
      ["Choco frío", 7500],
      ["Chai frío", 12000],
      ["Chai frío en agua", 11500],
      ["Jugos naturales", 6000],
      ["Jugos en leche", 7500],
      ["Limonada natural", 4500],
      ["Limonada de hierbabuena", 5500],
      ["Sodas Schweppes", 5000],
      ["Coca-Cola Original", 5000],
      ["Coca-Cola Zero", 5000],
      ["Té Hatsu", 7000],
      ["Agua", 3000],
    ]),
  },
  {
    id: "panaderia",
    title: "Panadería",
    sfx: "¡ÑAM!",
    color: "#f2c40f",
    items: items("pan", [
      ["Croissant de mantequilla", 5900],
      ["Croissant con miel y almendras", 7900],
      ["Croissant de jamón y queso", 8500],
      ["Pastel de pollo", 8500],
      ["Pastel de carne", 8900],
      ["Palito de queso", 7500],
    ]),
  },
  {
    id: "pasteleria",
    title: "Pastelería",
    sfx: "¡YUM!",
    color: "#ff5fa2",
    items: items("pas", [
      ["Torta de amapola", 8900],
      ["Torta de chocolate", 9900],
      ["Torta red velvet", 9900],
      ["Torta de queso ricotta", 7500],
      ["Cheesecake de frutos amarillos", 9500],
      ["Cheesecake de frutos rojos", 9500],
      ["Cheesecake de Baileys", 10500],
      ["Galletas", 4900, "Chocochips o avena con arándanos"],
      ["Brownie", 8500],
    ]),
  },
  {
    id: "sandwiches",
    title: "Sándwiches",
    sfx: "¡CRUNCH!",
    color: "#7b2ff7",
    items: items("san", [
      ["Capresse con serrano", 21900, "Jamón serrano, mozzarella de búfala, tomate, rúgula y balsámico en ciabatta. Con papas chips."],
      ["Jamón de cordero y cerdo", 21900, "Queso Gouda, tomate y lechuga en ciabatta. Con papas chips."],
      ["Español", 21900, "Chorizo español y salami con queso Colby Jack, tomate, rúgula y balsámico en ciabatta. Con papas chips."],
    ]),
  },
  {
    id: "postres",
    title: "Postres fríos",
    sfx: "¡BRRR!",
    color: "#06d6a0",
    items: items("pos", [
      ["Brownie con mochi", 13900],
      ["Galleta con mochi", 10500],
      ["Helado mochi", 6500, "Mora, Nutella, maracuyá, pie de limón, vainilla Golochips, Oreo, café, frutos rojos, maracumango o cereza con chocochips"],
    ]),
  },
];

export const ADDITIONS = [
  { name: "Bebida de almendras", price: 2000 },
  { name: "Zumo de limón", price: 1000 },
];

export const COMBO = {
  id: "combo-verde",
  name: "Combo Verde",
  price: 13000,
  includes: ["Brownie o cheesecake de Baileys", "Latte, americano o capuccino"],
};

export type Product = { id: string; name: string; kind: "Camisetas" | "Pines" | "Manga"; photo: string; price: number | null };

const shirt = (photo: string, name: string): Product => ({ id: photo, name, kind: "Camisetas", photo, price: null });

export const products: Product[] = [
  shirt("t-sailor", "Sailor Moon"),
  shirt("t-white", "Ghibli"),
  shirt("t-gow", "God of War"),
  shirt("t-stranger", "Stranger Things"),
  shirt("t-delorean", "DeLorean"),
  shirt("t-wolverine", "Wolverine y Deadpool"),
  shirt("t-batman", "The Batman"),
  shirt("t-potter", "Harry Potter"),
  shirt("t-southpark", "South Park"),
  shirt("t-courage", "Coraje"),
  shirt("t-snoopy", "Snoopy noche estrellada"),
  shirt("t-pup", "Pup Fiction"),
  shirt("t-rick", "Rick y Doc"),
  shirt("t-mk", "Mortal Kombat"),
  shirt("t-hellfire", "Hellfire Club"),
  shirt("t-superman", "Superman"),
  shirt("t-moes", "Flaming Moe's"),
  shirt("t-itchy", "Itchy & Scratchy"),
  shirt("t-clash", "Should I Stay"),
  shirt("t-megadeth", "Megadeth"),
  shirt("t-scorpions", "Scorpions"),
  shirt("t-soad", "System of a Down"),
  shirt("t-jamiroquai", "Jamiroquai"),
  shirt("t-muerto", "Ya estoy muerto"),
  { id: "pin-phineas", name: "Pin Phineas", kind: "Pines", photo: "pin-phineas", price: null },
  { id: "pin-grim", name: "Pin Puro Hueso", kind: "Pines", photo: "pin-grim", price: null },
  { id: "dbs", name: "Dragon Ball Super Vol. 1", kind: "Manga", photo: "dbs", price: null },
];

export const BRANDS = ["One Piece", "Dragon Ball", "Demon Slayer", "Star Wars", "Kaiju No. 8", "Harry Potter", "My Hero Academia", "Marvel", "DC", "Funko", "Bandai", "Banpresto", "Hello Kitty", "Panini"];

// Contenido de Panal de Amor, tomado de su sitio (repo panal-de-amor). Lo que falta confirmar está marcado.

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;
export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

export const WHATSAPP = "573195514507";
export const WHATSAPP_LABEL = "319 551 4507";
export const CONTACT_NAME = "Maye Jiménez";
export const HOURS = "Lunes a sábado, 8:00 a. m. a 7:00 p. m.";
// Por confirmar: los enlaces reales de redes.
export const SOCIAL = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  tiktok: "https://www.tiktok.com/",
};
export const VERSE = "“Me alegraré con ellos haciéndoles bien”";
export const VERSE_REF = "Jeremías 32:41";

export const wa = (msg = "¡Hola, Panal de Amor! Quiero cotizar frasquitos de miel personalizados.") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export type EventKind = "boda" | "bautizo" | "quince" | "comunion" | "empresa" | "otros";
export const eventLabels: Record<EventKind, string> = {
  boda: "Bodas",
  bautizo: "Bautizos",
  quince: "Quince años",
  comunion: "Comuniones",
  empresa: "Empresas",
  otros: "Detalles",
};

export type Product = { id: string; name: string; tag: string; desc: string; specs: string[]; from: number; photo: string; events: EventKind[] };

// Precios "desde" del sitio actual (por confirmar).
export const products: Product[] = [
  { id: "gypsophila", name: "Nube de gypsophila", tag: "Novias", desc: "Tela de lino, ramito de gypsophila natural, cucharita de madera y etiqueta con iniciales doradas.", specs: ["45 g", "Flores naturales", "Cucharita"], from: 6900, photo: "frasquito-mano-flores", events: ["boda"] },
  { id: "fucsia", name: "Clásico lazo fucsia", tag: "Más pedido", desc: "Frasco hexagonal con lazo de satín, ramito de flores secas y etiqueta redonda personalizada.", specs: ["45 g", "Tapa dorada", "Flores secas"], from: 5900, photo: "frasquito-lazo-fucsia", events: ["boda", "quince", "otros"] },
  { id: "yute", name: "Yute con dije de corazón", tag: "Rústico", desc: "Tela de yute, cordón natural, dije de corazón dorado y tarjetita kraft con tu mensaje.", specs: ["120 g", "Dije metálico", "Tarjeta kraft"], from: 9800, photo: "frasquito-yute-gracias", events: ["boda", "otros"] },
  { id: "bautizo", name: "Bautizo celeste o rosa", tag: "Bautizo", desc: "Tela de lino, lazo en tono pastel y etiqueta con el nombre del bebé y una cruz delicada.", specs: ["30 g", "Tonos pastel", "Cucharita"], from: 4900, photo: "frasquito-bautizo", events: ["bautizo"] },
  { id: "quince", name: "Quinceañera con coronita", tag: "Quince años", desc: "Tapa dorada, lazo en el color de tu vestido, dije de corona y etiqueta con tu nombre.", specs: ["45 g", "Dije de corona", "Color a elección"], from: 6400, photo: "frasquito-quince", events: ["quince"] },
  { id: "comunion", name: "Primera comunión perla", tag: "Comunión", desc: "Tapa perla, lazo de organza, dije de cáliz y etiqueta con espigas doradas.", specs: ["45 g", "Organza", "Dije de cáliz"], from: 5700, photo: "frasquito-comunion", events: ["comunion"] },
  { id: "corporativo", name: "Corporativo con logo", tag: "Con tu logo", desc: "Para clientes, equipos y ferias. Etiqueta con el logo y los colores de tu marca.", specs: ["45 g o 120 g", "Caja de regalo"], from: 6800, photo: "frasquito-corporativo", events: ["empresa"] },
  { id: "mini", name: "Mini con cucharita", tag: "Mini", desc: "El formato más tierno: frasquito pequeño con cucharita de madera atada al lazo.", specs: ["25 g", "Cucharita"], from: 5200, photo: "frasquito-mini", events: ["bautizo", "otros"] },
  { id: "encaje", name: "Encaje rústico con abejita", tag: "Con abejita", desc: "Lazo de encaje en crochet, dije de abejita dorada y cucharita de madera para servir.", specs: ["40 g", "Dije de abeja", "Cucharita"], from: 7400, photo: "frasquitos-encaje-boda", events: ["boda"] },
];

export const benefits = [
  { icon: "ico-corazon", title: "Simboliza amor y dulzura", text: "Transmite sentimientos puros y deseos sinceros." },
  { icon: "ico-trebol", title: "Atrae prosperidad", text: "Se asocia con abundancia y buena suerte." },
  { icon: "ico-hoja", title: "Natural y saludable", text: "100 % natural, nutritivo y lleno de energía." },
  { icon: "ico-fiesta", title: "Para cualquier ocasión", text: "Bodas, bautizos, cumpleaños y más." },
  { icon: "ico-carta", title: "Un mensaje que perdura", text: "Un recuerdo que tus invitados atesoran." },
];

export const steps = [
  { img: "paso-1", title: "Cuéntanos tu evento", text: "Escríbenos por WhatsApp con la fecha, la cantidad y los colores. Te enviamos la cotización el mismo día." },
  { img: "paso-2", title: "Aprueba tu diseño", text: "Creamos la etiqueta con tus nombres y frase. Recibes una prueba digital y ajustamos hasta que te encante." },
  { img: "paso-3", title: "Hecho a mano con amor", text: "Preparamos cada frasquito a mano y lo enviamos protegido a tu ciudad, listo para entregar." },
];

export const events = ["Bodas", "Bautizos", "Primeras comuniones", "Quince años", "Cumpleaños", "Grados", "Baby showers", "Empresariales"];

export const quality = [
  { title: "Miel 100 % pura", text: "De apicultores colombianos, sin jarabes ni aditivos." },
  { title: "Manipulación de alimentos", text: "Equipo capacitado y protocolos de higiene en cada preparación." },
  { title: "Frascos sellados", text: "Vidrio nuevo y tapa hermética que conserva la miel." },
  { title: "Revisión uno por uno", text: "Cada frasquito pasa control antes de empacarse." },
  { title: "Empaque protegido", text: "Embalaje antigolpes para que lleguen perfectos." },
];

export const history = [
  { stamp: "sello-italia", place: "Italia y Grecia", text: "La miel era símbolo de prosperidad, dulzura y abundancia. Se regalaba a los invitados deseándoles lo mejor." },
  { stamp: "sello-espana", place: "España", text: "La costumbre se extendió por Europa y llegó a las bodas y bautizos españoles." },
  { stamp: "sello-colombia", place: "Colombia", text: "Hoy es un detalle que une tradición, amor y gratitud en cada celebración." },
];

export const values = ["Amor en cada detalle", "Honestidad", "Calidad", "Creatividad", "Compromiso", "Responsabilidad", "Servicio con excelencia", "Fe en Dios"];

export const about = {
  mission:
    "Creamos frasquitos de miel personalizados que transforman cada celebración en un recuerdo inolvidable. Elaboramos cada detalle con amor, excelencia y dedicación para bodas, bautizos, cumpleaños, baby showers, grados, eventos empresariales y toda ocasión especial.",
  vision:
    "Ser una empresa reconocida en Colombia y Latinoamérica por los recordatorios personalizados con miel, la primera opción para quienes desean regalar un detalle único que permanezca en el corazón de sus invitados.",
  pillars: [
    { title: "Nuestra promesa", text: "Cada frasquito se prepara con dedicación para que tus invitados reciban un recuerdo dulce, elegante y lleno de significado." },
    { title: "Nuestra filosofía", text: "Los pequeños detalles crean los recuerdos más grandes. Diseñamos cada pedido como si fuera para nuestra propia familia." },
    { title: "Nuestra esencia", text: "No vendemos solamente frasquitos de miel: creamos detalles que expresan gratitud, amor y alegría." },
  ],
};

export const women = [
  { title: "Curso de manipulación de alimentos", text: "Te acompañamos para certificarte y trabajar con todos los estándares." },
  { title: "Trabajo desde casa", text: "Preparas frasquitos con horarios flexibles, cerca de tu familia." },
  { title: "Una comunidad que te apoya", text: "Aprendes el oficio con amor, paso a paso." },
];

export const gallery = [
  { photo: "frasquito-mano-flores", caption: "Recordatorio de boda" },
  { photo: "frasquito-flores", caption: "Detalle para quince años" },
  { photo: "frasquito-yute-gracias", caption: "Rústico con yute" },
  { photo: "frasquitos-encaje-boda", caption: "Mesa rústica" },
  { photo: "etiqueta-gracias-bee", caption: "Etiqueta baby shower" },
  { photo: "frasquito-quince", caption: "Quince con coronita" },
  { photo: "frasquito-bautizo", caption: "Bautizo celeste" },
];

export const cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Ibagué", "Santa Marta", "Villavicencio", "Pasto", "Neiva", "Montería"];

export const faqs = [
  { q: "¿Puedo pedir un solo frasquito?", a: "Sí. Puedes cotizar desde un frasquito, ideal para un regalo especial. Para pedidos grandes manejamos precios especiales por cantidad." },
  { q: "¿Con cuánto tiempo debo hacer mi pedido?", a: "Recomendamos pedir con 2 a 3 semanas de anticipación. Para pedidos urgentes escríbenos por WhatsApp y revisamos disponibilidad." },
  { q: "¿Hacen envíos a todo Colombia?", a: "Sí. Enviamos a cualquier ciudad o municipio con transportadora aliada, empacados con protección especial para vidrio." },
  { q: "¿Qué tipo de miel usan?", a: "Miel de abejas 100 % pura, de apicultores colombianos, sin aditivos ni jarabes." },
  { q: "¿Puedo personalizar la etiqueta?", a: "Sí. Diseñamos la etiqueta con los nombres, la fecha, una frase o versículo y los colores de tu evento. Te enviamos una prueba digital para aprobar antes de producir." },
  { q: "¿Cuánto dura la miel?", a: "La miel pura no se daña. Recomendamos consumirla dentro de los 2 años siguientes y guardarla en un lugar fresco, lejos del sol." },
  { q: "¿Cómo se paga?", a: "Con un anticipo del 50 % iniciamos la producción y el saldo se paga antes del envío. Recibimos transferencia, Nequi y Daviplata." },
  { q: "¿Cómo me postulo como mamá cabeza de familia?", a: "Escríbenos por WhatsApp con tu nombre y ciudad. Te contamos cómo funciona el curso de manipulación de alimentos y el trabajo desde casa." },
];

export type Article = { id: string; tag: string; title: string; date: string; minutes: number; photo: string; intro: string; blocks: { h: string; p?: string; list?: string[] }[] };

export const articles: Article[] = [
  {
    id: "significado",
    tag: "Tradición",
    title: "¿Qué significa regalar un frasquito de miel?",
    date: "14 de octubre de 2026",
    minutes: 5,
    photo: "frasquito-lazo-fucsia",
    intro: "Regalar un frasquito de miel a tus invitados es mucho más que entregar un recuerdo bonito. Es un gesto con siglos de historia que dice, sin palabras, “te deseo una vida dulce”.",
    blocks: [
      { h: "El origen de la tradición", p: "La costumbre se popularizó en Europa, especialmente en Italia y Grecia, donde la miel era símbolo de prosperidad, dulzura y abundancia. Las familias la compartían con sus invitados como un deseo de buena fortuna. Con el tiempo llegó a España y de allí a muchos lugares de América Latina, incluida Colombia." },
      { h: "Los cuatro significados", list: ["Dulzura: deseas que la vida de quien lo recibe esté llena de momentos dulces.", "Prosperidad: la miel representa abundancia, buena energía y nuevos comienzos.", "Amor: es una forma sencilla de expresar cariño y agradecimiento.", "Natural y puro: la miel es un regalo de la naturaleza, auténtico y lleno de beneficios."] },
      { h: "¿En qué eventos se regala?", p: "En bodas simboliza el inicio de una vida dulce en pareja. En bautizos y primeras comuniones representa bendición y pureza. En quince años celebra una nueva etapa, y en eventos empresariales es un detalle elegante que deja buena impresión." },
      { h: "Cómo hacerlo especial", p: "Personaliza la etiqueta con los nombres, la fecha y una frase que tenga sentido para ti. Un lazo en los colores del evento y una cucharita de madera completan un detalle que tus invitados guardarán." },
    ],
  },
  {
    id: "bodas",
    tag: "Bodas",
    title: "Ideas de recordatorios para bodas: 9 detalles dulces",
    date: "22 de septiembre de 2026",
    minutes: 6,
    photo: "frasquito-mano-flores",
    intro: "El recordatorio de boda es lo último que tus invitados reciben y lo primero que ven al llegar a casa. Elegir uno útil, bonito y con significado hace la diferencia.",
    blocks: [
      { h: "Encaje rústico", p: "Ideal para bodas campestres o en finca: lazo de encaje crema, dije de abejita dorada y cucharita de madera." },
      { h: "Lazo de satín en el color de tu boda", p: "Fucsia, palo de rosa, verde oliva o azul noche. Repetir la paleta de la decoración hace que todo se vea coordinado en las fotos." },
      { h: "Iniciales y fecha", p: "Un monograma sencillo con la fecha es elegante y atemporal." },
      { h: "Frases para la etiqueta", list: ["“Gracias por acompañarnos en este día tan especial”", "“Que el amor sea tan dulce como la miel”", "“Dulce es compartir este día contigo”", "“Me alegraré con ellos haciéndoles bien”. Jeremías 32:41"] },
      { h: "Mesa de recordatorios", p: "Ubica los frasquitos en una mesa con un letrero de “Llévate un poco de dulzura” para que los invitados los tomen al salir. También funcionan como marcador de puesto con una tarjetita con el nombre." },
      { h: "¿Cuántos pedir?", p: "Uno por invitado o uno por familia. Suma entre un 5 % y un 8 % extra para imprevistos y para guardar de recuerdo. Para los padrinos, una versión de 120 g con un mensaje especial." },
    ],
  },
  {
    id: "bautizos",
    tag: "Bautizos",
    title: "Recordatorios para bautizos: ideas tiernas",
    date: "30 de agosto de 2026",
    minutes: 4,
    photo: "frasquito-bautizo",
    intro: "El bautizo es una celebración de bendición y comienzo. Un frasquito de miel personalizado transmite exactamente eso: pureza, dulzura y buenos deseos para el bebé y su familia.",
    blocks: [
      { h: "Colores que funcionan", p: "Celeste, rosa empolvado, blanco perla, beige y verde salvia. La tapa blanca le da un aire limpio y delicado." },
      { h: "Qué poner en la etiqueta", list: ["Nombre del bebé", "Fecha del bautizo", "Una cruz, palomita o angelito", "Un versículo o frase corta"] },
      { h: "Frases y versículos", list: ["“Gracias por acompañarme en mi bautizo”", "“Hoy recibo la bendición de Dios”", "“Me alegraré con ellos haciéndoles bien”. Jeremías 32:41"] },
      { h: "Tamaño y tiempo", p: "Recomendamos el formato de 30 g: tierno, fácil de llevar y económico para grupos grandes. Pide con dos o tres semanas de anticipación." },
    ],
  },
  {
    id: "quince",
    tag: "Quince años",
    title: "Recordatorios para quince años",
    date: "18 de julio de 2026",
    minutes: 5,
    photo: "frasquito-quince",
    intro: "Los quince años son una de las fiestas más esperadas. El recordatorio debe estar a la altura: bonito para las fotos y con un detalle que tus invitados disfruten.",
    blocks: [
      { h: "Combina con el color del vestido", p: "Lila, rosa, dorado, azul cielo o vino tinto. Elegimos el lazo en el mismo tono de tu vestido o de la decoración." },
      { h: "Tapa dorada y coronita", p: "Una tapa dorada brillante y una coronita en la etiqueta hacen que el frasquito se vea elegante." },
      { h: "Frases para la etiqueta", list: ["“Gracias por ser parte de mis quince”", "“Mis quince años, una noche dulce”", "“Hoy empieza una nueva etapa llena de dulzura”"] },
      { h: "Ideas de presentación", p: "Ubica los frasquitos en una bandeja dorada junto a la torta o entrégalos durante el vals. Uno por invitado, más un pequeño extra para la familia cercana." },
    ],
  },
];

// "Diseña tu etiqueta"
export type Ribbon = { id: string; name: string; color: string };
export const ribbons: Ribbon[] = [
  { id: "fucsia", name: "Fucsia", color: "#d63c7c" },
  { id: "rosa", name: "Palo de rosa", color: "#eab3c4" },
  { id: "celeste", name: "Celeste", color: "#a9cdea" },
  { id: "lila", name: "Lila", color: "#b9a3e0" },
  { id: "champana", name: "Champaña", color: "#e8d3a8" },
];

export const labelEvents: { id: EventKind; name: string; names: string; phrase: string; ribbon: string }[] = [
  { id: "boda", name: "Boda", names: "Laura & Andrés", phrase: "Gracias por acompañarnos en este día tan especial", ribbon: "fucsia" },
  { id: "bautizo", name: "Bautizo", names: "Matías", phrase: "Hoy recibo la bendición de Dios", ribbon: "celeste" },
  { id: "quince", name: "Quince años", names: "Valentina", phrase: "Gracias por ser parte de mis quince", ribbon: "lila" },
  { id: "comunion", name: "Comunión", names: "Sofía", phrase: "Mi primera comunión", ribbon: "champana" },
  { id: "otros", name: "Baby shower", names: "Bebé Martina", phrase: "Dulce espera", ribbon: "rosa" },
  { id: "empresa", name: "Empresa", names: "Tu marca", phrase: "Gracias por endulzar nuestro año", ribbon: "champana" },
];

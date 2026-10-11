// Contenido de Puertas Automáticas del Llano (tomado de su sitio actual y de los recursos del proyecto).
import type { LucideIcon } from "lucide-react";
import { ArrowLeftRight, Car, DoorOpen, Fingerprint, PanelTop, ShieldCheck, Wrench, BrickWall } from "lucide-react";

export const ROOT = document.documentElement.dataset.root ?? "./";
export const img = (name: string) => `${ROOT}img/${name}.webp`;
export const asset = (path: string) => `${ROOT}${path}`;

export const PHONE = "+57 312 385 4010";
export const PHONE_RAW = "573123854010";
export const EMAIL = "puertasautomaticas@gmail.com";
export const WA = (msg = "Hola, quiero una cotización para mi puerta automática.") =>
  `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;
export const FACEBOOK = "https://www.facebook.com/PuertasAutomaticasDelLlano/";
export const HOURS = "Lunes a sábado, 7:00 a. m. – 6:00 p. m.";
export const CITY = "Villavicencio, Meta";

export type Service = { id: string; title: string; text: string; icon: LucideIcon; photo: string };

export const services: Service[] = [
  { id: "corredizas", title: "Puertas corredizas", text: "Motores para portones corredizos de casas, conjuntos, fincas y bodegas.", icon: ArrowLeftRight, photo: "puerta-corrediza-conjunto-residencial-villavicencio" },
  { id: "abatibles", title: "Puertas abatibles", text: "Motores de brazo y pistón para puertas de una o dos hojas.", icon: DoorOpen, photo: "puerta-abatible-moderna-negra-villavicencio" },
  { id: "seccionales", title: "Levadizas y seccionales", text: "Puertas de garaje con motor de techo, silenciosas y seguras.", icon: PanelTop, photo: "puerta-seccional-garaje-casa-villavicencio" },
  { id: "cortinas", title: "Cortinas enrollables", text: "Cortinas eléctricas para locales, garajes y bodegas.", icon: BrickWall, photo: "puerta-seccional-garaje-blanca" },
  { id: "talanqueras", title: "Talanqueras vehiculares", text: "Barreras para conjuntos, condominios y parqueaderos.", icon: Car, photo: "talanquera-vehicular-condominio-meta" },
  { id: "acceso", title: "Control de acceso", text: "Electroimanes, lectores, tarjetas y programación de controles remotos.", icon: Fingerprint, photo: "puerta-peatonal-control-acceso-electroiman" },
  { id: "mantenimiento", title: "Mantenimiento y reparación", text: "Preventivo y correctivo para puertas de cualquier marca.", icon: Wrench, photo: "tecnicos-instalando-puerta-automatica-meta" },
];

export const pillars = [
  { icon: ShieldCheck, title: "Instalación", text: "Puertas automáticas de alta calidad, funcionando de forma óptima y segura en hogares, negocios y edificios." },
  { icon: Wrench, title: "Mantenimiento", text: "Revisión, ajuste y reparación para que tu acceso siga abriendo, cerrando y protegiendo como el primer día." },
  { icon: Fingerprint, title: "Configuración", text: "Programación de controles remotos y sistemas electrónicos de acceso a la medida de tu propiedad." },
];

export type Project = { photo: string; title: string; kind: "Corrediza" | "Abatible" | "Garaje" | "Talanquera" | "Acceso"; video?: string };

export const projects: Project[] = [
  { photo: "puerta-abatible-moderna-negra-villavicencio", title: "Abatible moderna en Villavicencio", kind: "Abatible" },
  { photo: "puerta-corrediza-conjunto-residencial-villavicencio", title: "Corrediza para conjunto residencial", kind: "Corrediza" },
  { photo: "puerta-seccional-garaje-casa-villavicencio", title: "Seccional para garaje residencial", kind: "Garaje" },
  { photo: "talanquera-vehicular-condominio-meta", title: "Talanquera en condominio del Meta", kind: "Talanquera" },
  { photo: "puerta-abatible-madera-garaje-residencia", title: "Abatible en madera para garaje", kind: "Abatible" },
  { photo: "puerta-peatonal-control-acceso-electroiman", title: "Acceso peatonal con electroimán", kind: "Acceso" },
  { photo: "puerta-abatible-finca-meta", title: "Abatible para finca", kind: "Abatible" },
  { photo: "puerta-corrediza-madera-motor", title: "Corrediza en madera con motor", kind: "Corrediza" },
  { photo: "motor-puerta-levadiza-garaje-villavicencio", title: "Motor de techo para levadiza", kind: "Garaje" },
  { photo: "puerta-abatible-negra-motores-brazo-villavicencio", title: "Abatible con motores de brazo", kind: "Abatible" },
  { photo: "puerta-abatible-madera-motor-brazo-meta", title: "Madera con brazo automático", kind: "Abatible" },
  { photo: "puerta-seccional-garaje-blanca", title: "Seccional blanca", kind: "Garaje" },
  { photo: "carlos-guarama-talanquera-villavicencio", title: "Talanquera de acceso vehicular", kind: "Talanquera" },
  { photo: "motor-puerta-abatible-residencial", title: "Motor abatible residencial", kind: "Abatible" },
];

export const videos = [
  { id: "puerta-corrediza-residencial-control-remoto", title: "Corrediza residencial con control remoto" },
  { id: "puerta-abatible-finca-atardecer", title: "Abatible en finca al atardecer" },
  { id: "puerta-corrediza-conjunto-villavicencio", title: "Corrediza en conjunto de Villavicencio" },
  { id: "puerta-abatible-forja-negra", title: "Abatible en forja negra" },
  { id: "puerta-corrediza-reja-moderna", title: "Corrediza en reja moderna" },
  { id: "puerta-abatible-finca-piedra", title: "Abatible en finca de piedra" },
  { id: "puerta-corrediza-garaje-edificio", title: "Corrediza para garaje de edificio" },
  { id: "puerta-abatible-arco-negra", title: "Abatible en arco negra" },
  { id: "puerta-abatible-acceso-peatonal", title: "Acceso peatonal abatible" },
  { id: "puerta-corrediza-conjunto-residencial", title: "Corrediza en conjunto residencial" },
];

export const coverage = ["Villavicencio", "Acacías", "Restrepo", "Cumaral", "Granada", "Puerto López", "San Martín", "Puerto Gaitán"];

export const brands = ["nice", "bft", "faac", "came", "beninca", "liftmaster", "genius", "ppa", "accessmatic", "nas", "zkteco", "dahua", "hikvision", "soyal"];

export const steps = [
  { title: "Nos contactas", text: "Por WhatsApp o llamada nos cuentas qué puerta tienes o necesitas." },
  { title: "Visita técnica", text: "Revisamos el espacio, medimos y te recomendamos el motor adecuado." },
  { title: "Instalación", text: "Montamos, cableamos y programamos con equipos de marcas reconocidas." },
  { title: "Acompañamiento", text: "Te enseñamos a usarla y quedamos para el mantenimiento preventivo." },
];

export const faqs = [
  { q: "¿Pueden automatizar la puerta que ya tengo?", a: "En la mayoría de casos sí. En la visita técnica revisamos el peso, el tamaño y el estado de la puerta para elegir el motor correcto." },
  { q: "¿Trabajan con cualquier marca?", a: "Sí. Instalamos y reparamos equipos Nice, BFT, FAAC, CAME, Beninca, LiftMaster, Genius, PPA, Accessmatic y NAS, y control de acceso ZKTeco, Dahua, Hikvision y Soyal." },
  { q: "¿Qué pasa si se va la luz?", a: "Las puertas se pueden desbloquear para abrir a mano, y según el modelo se puede instalar batería de respaldo." },
  { q: "¿Hasta dónde llegan?", a: "Atendemos Villavicencio y municipios del Meta como Acacías, Restrepo, Cumaral, Granada, Puerto López, San Martín y Puerto Gaitán, y proyectos en otras regiones de Colombia." },
  { q: "¿Cada cuánto se hace mantenimiento?", a: "Recomendamos un mantenimiento preventivo periódico para alargar la vida del motor y evitar fallas; te indicamos la frecuencia según el uso." },
];

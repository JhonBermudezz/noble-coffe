---
name: estilo-serie
description: Reglas de diseño de la serie de sitios (Noble, Creaviva, Geekveria, El Purgatorio). Úsala SIEMPRE antes de crear, rediseñar o cambiar el diseño de cualquier sitio de este repo o de un cliente nuevo de la serie, aunque el negocio no sea un café. Define el proceso, lo que hace que un sitio se sienta de la serie y lo que está prohibido porque se ve genérico o "hecho por IA".
---

# Estilo de la serie

Los sitios que el dueño aprobó como "10 de 10" son la vara: **Noble** (raíz, `src/`), **Creaviva** (`creaviva/`), **Geekveria** (`geekveria/`) y **El Purgatorio** (`purgatorio/`). Antes de diseñar algo nuevo, abre el `index.css` y dos o tres componentes de esos sitios para recalibrar el nivel. Ningún sitio nuevo puede quedar por debajo de ellos.

Este archivo es un documento vivo: cuando el dueño apruebe o rechace algo, se agrega a la **Bitácora** del final.

## 1. La regla de oro: un mundo, no una plantilla

Cada sitio nace de **una metáfora sacada del mundo real del negocio**, y esa metáfora decide todo: la paleta, las letras, el cursor, la carga, cómo se muestra el menú y cómo se cierra la página.

| Sitio | El mundo | Cómo se nota en todo |
|---|---|---|
| Noble | La bolsa de café de especialidad y las formas de su marca (óvalo, arco, círculo) | La bolsa se rasga, cae al molino y llena el vaso con el scroll; la foto se ve a través de un grano que crece; sellos y píldoras |
| Creaviva | Un taller donde se pinta cerámica | El cursor es un pincel; cada clic salpica pintura; los bordes chorrean; el osito se pinta parte por parte; polaroids que se arrastran |
| Geekveria | Una página de cómic / manga | Viñetas con tinta gruesa y sombra sólida; onomatopeyas en cada clic; la pantalla se sacude; el menú son tomos de manga; mascota propia |
| El Purgatorio | Un castillo de arte oscuro | Portón que se abre al entrar; cursor de vela que ilumina; la carta es un grimorio; los cocteles son cartas de tarot; sello de lacre que se parte |

Antes de escribir código, responde por escrito: **¿cuál es el objeto o lugar de este negocio que la página va a "ser"?** Si la respuesta es "una página web de una empresa", todavía no hay concepto.

Esto aplica también a negocios serios o "institucionales": institucional no significa plantilla corporativa. Busca el objeto real del oficio (una ficha técnica, un plano, un taller, una herramienta, un uniforme, un letrero) y construye desde ahí.

## 2. Proceso obligatorio

1. **Recursos primero.** Revisa todas las fotos, logos, piezas de Instagram, menús y videos que mande el dueño. La paleta y la tipografía salen de ahí, no de la imaginación.
2. **Plan antes del código.** Presenta al dueño: el concepto (el mundo), la paleta con su origen, las dos o tres familias tipográficas, la lista de secciones con su "momento" de interacción, y la pieza estrella. Espera su visto bueno ("mira el plan si cambio algo").
3. **Construye** siguiendo este documento.
4. **Verifica con capturas** en computador (1440) y celular (iPhone 13, 390) con Playwright, página completa, antes de entregar. Revisa: sin scroll horizontal, texto legible, botones clicables, nada tapado.
5. **Entrega** con las capturas y una lista corta de los datos que hay que confirmar.

## 3. Identidad visual

**Paleta**
- Sale de los recursos reales: el fondo exacto del logo, el color de los delantales, el mural, el menú impreso, los neones de las fotos de noche. Documenta el origen en un comentario arriba de `:root` en `index.css`.
- Un fondo con temperatura (marfil, crema, papel, noche), nunca blanco puro `#fff` ni gris neutro de plantilla.
- Tokens en `@theme` con nombres del mundo (`paper`, `forest`, `blood`, `bone`, `ink`), no `primary`/`secondary`.

**Tipografía**
- Una display con carácter que venga del mundo del negocio + una de lectura. Ejemplos aprobados: Archivo condensada + Caprasimo (Noble), DM Serif Display con la palabra clave en cursiva de color (Creaviva), Anton + Bangers (Geekveria), IM Fell English SC + Pinyon Script + Cormorant (Purgatorio).
- Prohibidas como display: Inter, Inter Tight, Plus Jakarta Sans, Poppins, Montserrat, Roboto, DM Sans, Manrope, Space Grotesk. Son las letras que hacen que un sitio "se vea de IA".
- Nada de etiquetas con letter-spacing exagerado tipo `TRACKING-[0.3EM]` en todos lados; el dueño lo rechazó en El Purgatorio.

**Iconos e ilustración**
- Los iconos se dibujan o se generan en el estilo del mundo (los iconos del menú de Geekveria, las formas del cuadro de Creaviva, el sello de Noble). Una librería de iconos de línea (Lucide, Heroicons) solo se permite para utilidades pequeñas (cerrar, flecha, carrito), nunca como protagonista de tarjetas.
- Lo que es ilustración va como **imagen real** (foto, o generada con KIE a partir de una foto real del lugar). No se finge una ilustración con SVG simples: el dueño lo nota ("quiero que sea una imagen, literal").
- Cuando el dueño manda una referencia de forma (por ejemplo gotas de pintura), se vectoriza su referencia; no se inventa.

**Formas y texturas**
- Sistema de formas propio del mundo: píldoras y óvalos (Noble), manchas que cambian de forma y bordes festoneados (Creaviva), viñetas con borde de 4 px y sombra sólida desplazada (Geekveria), marcos dorados de cuadro antiguo (Purgatorio).
- Textura que dé materia: grano de película fijo, trama de puntos (halftone), papel.
- Las transiciones entre secciones con fondos distintos no son líneas rectas cuando el mundo lo permite (chorreado de pintura, borde de brochazo, rayos).

## 4. Movimiento e interacción

Cada sitio necesita estas capas. Si falta una, el sitio se siente plano:

1. **Entrada con historia** (una vez por sesión, nunca con reducir movimiento): el logo de Noble se arma y sube el telón; el osito se pinta solo; el logo de cómic cae y la viñeta se parte; el portón del castillo se abre.
2. **Cursor o clic del mundo** (solo con puntero fino): pincel, vela, foto que sigue al cursor, onomatopeyas o salpicaduras en cada clic.
3. **Una pieza estrella ligada al scroll**: una sección fijada que cuenta una historia mientras se baja (la bolsa de Noble, el grano que crece, las flores del mural que forman la palabra, los cuadros del castillo que se desplazan de lado).
4. **Un juguete**: algo que el visitante toca y responde (pintar el osito, el quiz "Arma tu plan", "Carga tu poder", voltear el tarot, el carné del club que se arma mientras escribes, el carrito con la foto que vuela).
5. **Microinteracciones**: píldora compartida en el menú (`layoutId`), hover con personalidad (brochazo detrás del enlace, logo que se balancea como calcomanía), contenido que entra con el scroll.

Técnica: `motion/react` como base (`MotionConfig reducedMotion="user"`), GSAP o anime.js cuando la coreografía lo pida. En animaciones por frame se escribe directo en el DOM, sin re-render de React. Todo respeta `prefers-reduced-motion` con una versión estática digna (como `Bag` frente a `BagStory`).

## 5. Contenido

- El contenido se presenta como un **objeto del mundo**: el menú como grimorio con índice fijo, como tomos de manga en abanico, como la hoja impresa del local; la visita como pergamino con sello; el evento con cuenta regresiva.
- Textos en español de Colombia, cortos, con las frases que la marca ya usa en sus redes.
- **No inventar datos**: precios, horarios, direcciones, reseñas, procesos o preguntas frecuentes. Si falta un dato, va en `null` o como "por confirmar" en `data.ts` y se le pide al dueño. Las reseñas solo aparecen si son reales.
- Todo el contenido editable vive en `data.ts` del sitio.

## 6. Prohibido (se ve genérico)

Estas piezas juntas son la "landing de plantilla" que el dueño rechazó. Ninguna puede aparecer como solución por defecto:

- Fondo blanco con degradado azul / turquesa / morado como acento.
- Fila de 3 tarjetas con icono de línea arriba, título y párrafo ("Instalación / Mantenimiento / Configuración").
- Tarjetas que se montan sobre el hero con `-mt-*`.
- Fila de contadores "+30 años · 8 ciudades · 14 marcas".
- Línea de tiempo de "Cómo trabajamos" en 4 pasos.
- Acordeón de preguntas frecuentes inventadas.
- Cinta de logos de marcas en gris que toman color al pasar el mouse.
- Botón flotante de WhatsApp con pulso como único llamado.
- Hero con video de fondo, titular de tres líneas y dos botones (uno con degradado), sin ningún gesto propio.
- Títulos del tipo "Soluciones integrales", "Calidad y confianza", "¿Por qué elegirnos?".

Si una de estas piezas es necesaria (por ejemplo, el negocio sí trabaja con marcas), se rediseña dentro del mundo: las marcas como placas atornilladas en un tablero, los pasos como una orden de trabajo, etc.

## 7. Reglas técnicas que ya costaron correcciones

- `overflow-x: clip` en `html` y `body`; cero scroll horizontal en 390 px.
- El fondo de `html` igual al del footer (sin franja gris al estirar en celular).
- `cursor: pointer` en todo lo clicable; los botones del hero deben quedar por encima del titular (`z-10`, `pointer-events-none` en lo decorativo).
- El texto siempre legible: si un efecto (collage, neón, imagen) compite con el título, gana el título. Ningún texto cortado por un `clip-path` o un contenedor.
- Celular: menú hamburguesa con desplegable; listas largas (menús) con índice fijo arriba en celular y barra lateral fija en computador.
- Lo arrastrable queda encima después de soltarlo y no se pierde fuera de la pantalla.
- Rutas relativas con `data-root` y los helpers `img()` / `asset()`; `base: "./"` en cada `vite.config.ts`.
- Imágenes en `.webp`; videos recomprimidos (960 px, crf 30); sonidos apagados hasta que la persona los active.
- Vocabulario del dueño: **header** = la barra de navegación; **hero** = la portada.

## 8. Antes de entregar, pregúntate

- ¿Si le quito el logo, se sabe de qué negocio es solo por la forma, el color y el movimiento?
- ¿Hay al menos una cosa que alguien le mostraría a un amigo?
- ¿Alguna sección se podría pegar en la página de otra empresa sin cambiarle nada? Si sí, rediséñala.
- ¿Se ve igual de bien en el celular?

## Bitácora

Lo que el dueño ha dicho, para no repetir errores. Agrega cada aprobación o rechazo nuevo aquí.

- Creaviva: quitar las chispas y las polaroids arrastrables lo dejó "poco dinámico"; se devolvieron. El cursor pincel fue pedido explícito.
- Creaviva: las gotas dibujadas a mano fueron rechazadas; se vectorizó la referencia que él mandó.
- Geekveria: aprobado "10 de 10" con la mascota propia, onomatopeyas, sacudida, tienda con carrito y comunidad.
- El Purgatorio: tipografía con espaciado de etiquetas exagerado "se ve de IA"; se cambió a letra de imprenta antigua. El footer en SVG se veía falso; se cambió por una imagen generada.
- Rediseño institucional con plantilla genérica (fondo blanco, degradado azul, iconos Lucide, tarjetas, contadores, línea de tiempo, FAQ, cinta de marcas): rechazado por completo. Ver sección 6.

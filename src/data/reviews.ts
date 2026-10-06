// Reseñas reales copiadas de Google Maps. Mientras esta lista esté vacía, la sección no se muestra.
// Formato: { quote: "Texto de la reseña (máx. 3 líneas)", author: "Nombre", rating: 5 }
export type Review = { quote: string; author: string; rating: number };

export const reviews: Review[] = [];

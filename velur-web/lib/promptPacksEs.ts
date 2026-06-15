/**
 * Velur, Prompt Packs · Castilian Spanish (es-ES) translations.
 * ---------------------------------------------------------------
 * Indexed by pack slug → group index → prompt index. The English
 * source of truth lives in lib/promptPacks.ts; this file mirrors
 * the same shape, position-for-position, with translated strings
 * for the user-facing chrome (pack title, tagline, intro, group
 * titles, prompt titles, optional notes).
 *
 * The prompt BODIES intentionally stay English in promptPacks.ts
 * because MidJourney / Higgsfield / Claude produce noticeably
 * better results with English prompts. Users who paste into those
 * tools want English; users browsing the page want Spanish chrome.
 */

export type PromptPackEs = {
  title: string;
  tagline: string;
  intro: string;
  groups: {
    title: string;
    prompts: { title: string; note?: string }[];
  }[];
};

export const PROMPT_PACKS_ES: Record<string, PromptPackEs> = {
  "spa-studio": {
    title: "Spa & Estudio",
    tagline: "Imágenes tranquilas y premium para marcas de bienestar.",
    intro:
      "Los prompts exactos que usamos para lanzar una semana de imágenes on-brand en una tarde. Pensados para spas, estética, masaje, recovery y pequeños estudios de bienestar donde el look tiene que sentirse calmado y caro sin sesión de fotos.",
    groups: [
      {
        title: "Imágenes de sala de tratamiento",
        prompts: [
          { title: "Hero de sala limpia", note: "Úsala como portada de la página de un tratamiento." },
          { title: "Detalle de producto sobre piedra" },
          { title: "Herramientas sobre bandeja, cenital" },
          { title: "Manos del ritual, primer plano" },
        ],
      },
      {
        title: "Retratos de fundadora / esteticista",
        prompts: [
          { title: "Fundadora en la puerta" },
          { title: "Retrato trabajando junto a la camilla" },
        ],
      },
      {
        title: "Reels cortos",
        prompts: [
          { title: "Apertura de tratamiento, 9 segundos", note: "Abre un carrusel de Instagram sobre un tratamiento nuevo." },
          { title: "Revelado de producto, 6 segundos" },
          { title: "Disolvencia antes / después" },
        ],
      },
      {
        title: "Captions y copy de reserva",
        prompts: [
          { title: "Caption de tratamiento, tres variantes" },
          { title: "Script de DM para reservar" },
          { title: "Descripción de Google Business" },
        ],
      },
    ],
  },

  "beauty-shots": {
    title: "Beauty Shots",
    tagline: "Stills editoriales de belleza para skincare, cosmética y grooming.",
    intro:
      "Prompts probados sobre el terreno que producen stills de belleza de nivel revista para marcas de skincare, cosmética, color y grooming. Diseñados para reemplazar una sesión de producto pequeña, pega una referencia de producto en MidJourney y lanza una campaña en una tarde.",
    groups: [
      {
        title: "Hero de producto",
        prompts: [
          { title: "Hero de estudio, luz natural suave" },
          { title: "Pila flotante, fondo en degradado" },
          { title: "Producto en mano, piel en primer plano" },
        ],
      },
      {
        title: "Texturas e ingredientes",
        prompts: [
          { title: "Swatch de crema sobre cristal" },
          { title: "Ingrediente sobre piedra" },
        ],
      },
      {
        title: "Talento (piel / manos)",
        prompts: [
          { title: "Primer plano de talento, sin maquillaje" },
          { title: "Manos aplicando sérum" },
        ],
      },
      {
        title: "Reels y movimiento",
        prompts: [
          { title: "Swatch de producto, 6 segundos" },
          { title: "Hero de producto rotando" },
          { title: "Aplicar y sonreír, 9 segundos" },
        ],
      },
      {
        title: "Frameworks de copy",
        prompts: [
          { title: "Set de captions de lanzamiento de producto" },
          { title: "Página de descripción de producto" },
        ],
      },
    ],
  },

  "dtc-products": {
    title: "DTC Products",
    tagline: "Imágenes de página de venta para marcas DTC.",
    intro:
      "Probadas en clientes DTC reales de moda, gran consumo, hogar y accesorios. Estos prompts lanzan la imagen que de verdad convierte en una PDP o en un anuncio de Meta, lo suficientemente limpia para parecer de estudio, lo suficientemente específica para sentirse como tu marca.",
    groups: [
      {
        title: "Hero de catálogo",
        prompts: [
          { title: "Sweep de estudio, sombra limpia" },
          { title: "Producto flotando, degradado" },
          { title: "Producto en contexto lifestyle" },
        ],
      },
      {
        title: "Moda y accesorios",
        prompts: [
          { title: "Flat lay sobre piedra" },
          { title: "Detalle on-body, primer plano" },
        ],
      },
      {
        title: "Reels para anuncios y lanzamientos",
        prompts: [
          { title: "Unbox en 8 segundos" },
          { title: "Hero rotando, 6 segundos" },
          { title: "Demo en contexto real" },
        ],
      },
      {
        title: "PDP y copy de anuncio",
        prompts: [
          { title: "Página de producto orientada a conversión" },
          { title: "Set de anuncio de Meta, tres ángulos" },
          { title: "Secuencia de email de lanzamiento (3 emails)" },
        ],
      },
    ],
  },

  hospitality: {
    title: "Hostelería",
    tagline: "Imágenes on-brand para restaurantes, cafés, hoteles y bares.",
    intro:
      "La hostelería va de mood. Estos prompts producen el tipo de imagen cálida y vivida que un restaurante pequeño o un hotel boutique sí quiere en su grid, sin gastar un viernes noche con un fotógrafo que dispara la marca de otros igual.",
    groups: [
      {
        title: "Platos emplatados",
        prompts: [
          { title: "Plato hero, cenital" },
          { title: "Primer plano, textura de ingrediente" },
          { title: "Hero de coctel en luz baja" },
        ],
      },
      {
        title: "Sala / local",
        prompts: [
          { title: "Comedor, hora dorada" },
          { title: "Habitación de hotel editorial" },
          { title: "Escena de barra de cafetería" },
        ],
      },
      {
        title: "Reels para grid y anuncios",
        prompts: [
          { title: "Plato aterrizando, 6 segundos" },
          { title: "Servido en cámara lenta, 5 segundos" },
          { title: "Pan por la sala, 10 segundos" },
        ],
      },
      {
        title: "Carta, captions y reservas",
        prompts: [
          { title: "Reescritura de descripciones de carta" },
          { title: "Script de DM para reservar" },
          { title: "Caption: cena en mesa del chef" },
        ],
      },
    ],
  },

  "reel-hooks": {
    title: "Reel Hooks",
    tagline: "Hooks de vídeo corto que se ganan los próximos tres segundos.",
    intro:
      "El hook es la única línea que decide si los próximos noventa segundos se ven. Estos son los frameworks que usamos en TikTok, Reels y YouTube Shorts para escribir hooks que encajan con la publicación, no clickbait genérico de ChatGPT. Combina cada uno con un clip de Higgsfield del pack correspondiente.",
    groups: [
      {
        title: "Frameworks de hook (copia y cambia)",
        prompts: [
          { title: "Apertura contraria" },
          { title: "Gap de curiosidad" },
          { title: "POV / primera persona" },
          { title: "Número + resultado" },
          { title: "Aversión a la pérdida / error" },
        ],
      },
      {
        title: "Hooks de nicho para negocios de servicios",
        prompts: [
          { title: "Spa / estética" },
          { title: "Restaurante / café" },
          { title: "Lanzamiento de producto DTC" },
        ],
      },
      {
        title: "Guiones de 30 segundos completos",
        prompts: [
          { title: "Guion 30s: cómo-hacer con payoff" },
          { title: "Guion 30s: POV de fundador" },
        ],
      },
    ],
  },

  "email-voice": {
    title: "Voz para Email",
    tagline: "Prompts de Klaviyo y Mailchimp que suenan a persona de verdad.",
    intro:
      "El email es donde vive la relación. Estos prompts hacen que Claude escriba flows que se leen como un fundador escribiéndole a un cliente, no como una marca a una lista. Pensados para flujos de Klaviyo, secuencias de carrito abandonado, welcome series, win-back y la voz transaccional aburrida-pero-crítica.",
    groups: [
      {
        title: "Welcome series (5 emails)",
        prompts: [
          { title: "Brief de welcome series" },
          { title: "Asuntos para el email de bienvenida" },
        ],
      },
      {
        title: "Flujo de carrito abandonado",
        prompts: [
          { title: "Flujo de carrito de 3 emails" },
          { title: "Variaciones de asunto" },
        ],
      },
      {
        title: "Win-back y reactivación",
        prompts: [
          { title: "Lapso de 60 días, 2 emails" },
          { title: "Re-opt-in de suscriptor inactivo" },
        ],
      },
      {
        title: "Emails de campaña",
        prompts: [
          { title: "Anuncio de lanzamiento, voz de fundador" },
          { title: "Email de última oportunidad" },
          { title: "Notificación de reposición" },
        ],
      },
      {
        title: "Voz transaccional",
        prompts: [
          { title: "Reescritura de email de confirmación" },
          { title: "Disculpa por retraso de envío" },
        ],
      },
    ],
  },
};

/**
 * Localized accessor, returns the right string for the given language.
 * Falls back to the English value if the ES translation is missing.
 */
import type { Lang, PromptPack } from "./promptPacks";

export function packTitle(p: PromptPack, lang: Lang): string {
  return lang === "es" ? PROMPT_PACKS_ES[p.slug]?.title ?? p.title : p.title;
}
export function packTagline(p: PromptPack, lang: Lang): string {
  return lang === "es" ? PROMPT_PACKS_ES[p.slug]?.tagline ?? p.tagline : p.tagline;
}
export function packIntro(p: PromptPack, lang: Lang): string {
  return lang === "es" ? PROMPT_PACKS_ES[p.slug]?.intro ?? p.intro : p.intro;
}
export function groupTitle(p: PromptPack, gi: number, lang: Lang): string {
  if (lang === "es") {
    return PROMPT_PACKS_ES[p.slug]?.groups[gi]?.title ?? p.groups[gi].title;
  }
  return p.groups[gi].title;
}
export function promptTitle(p: PromptPack, gi: number, pi: number, lang: Lang): string {
  if (lang === "es") {
    return PROMPT_PACKS_ES[p.slug]?.groups[gi]?.prompts[pi]?.title ?? p.groups[gi].prompts[pi].title;
  }
  return p.groups[gi].prompts[pi].title;
}
export function promptNote(p: PromptPack, gi: number, pi: number, lang: Lang): string | undefined {
  if (lang === "es") {
    return PROMPT_PACKS_ES[p.slug]?.groups[gi]?.prompts[pi]?.note ?? p.groups[gi].prompts[pi].note;
  }
  return p.groups[gi].prompts[pi].note;
}

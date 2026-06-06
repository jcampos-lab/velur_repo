/**
 * Velur — Prompt Packs
 * ---------------------------------------------------------------
 * Field-tested prompts for the categories Velur AI Studio actually
 * ships for. Each pack maps to a card on /studio and a detail page
 * at /studio/packs/[slug].
 *
 * Prompts are written for the specific tool that does the best job
 * on the asset type:
 *   - MidJourney  → high-end still images
 *   - Higgsfield  → short reels / motion / B-roll
 *   - Claude      → long-form copy, scripts, voice frameworks
 *   - ChatGPT     → quick variations, hooks, restructures
 *
 * Conventions:
 *   - Replace [BRAND] / [PRODUCT] / [LOCATION] / etc. with your own.
 *   - Square brackets are intentional — they make the variables easy
 *     to find and swap.
 *   - Each prompt ends with a stylistic anchor (lighting, lens,
 *     mood) so MidJourney/Higgsfield outputs stay on-brand.
 */

export type PromptTool = "MidJourney" | "Higgsfield" | "Claude" | "ChatGPT";
export type Lang = "en" | "es";

export type Prompt = {
  /** One-line title shown on the prompt card. */
  title: string;
  /** Which tool this prompt is written for. */
  tool: PromptTool;
  /** The actual prompt — paste-ready, with [BRACKETED] variables.
      Stays in English because MidJourney / Higgsfield / Claude
      produce noticeably better results with English prompts. */
  body: string;
  /** Optional one-line note on when to reach for this prompt. */
  note?: string;
};

export type PromptGroup = {
  /** Section header inside the pack page. */
  title: string;
  prompts: Prompt[];
};

export type PromptPack = {
  /** URL slug — /studio/packs/[slug]. */
  slug: string;
  /** Display title (card + page). */
  title: string;
  /** Short positioning line shown under the title. */
  tagline: string;
  /** One paragraph for the pack detail page hero. */
  intro: string;
  /** Card surface — one of the new system tokens. */
  surface:
    | "bg-stone"
    | "bg-signal-green-300"
    | "bg-velur-ink"
    | "bg-midnight"
    | "bg-coral"
    | "bg-signal-green";
  /** Whether the surface needs light text. */
  textOnDark: boolean;
  /** Optional mono-label tone for the pack page eyebrow. */
  eyebrowTone: "green" | "coral" | "blue" | "default";
  /** Total prompt count, computed at runtime — see countPrompts(). */
  groups: PromptGroup[];
};

/* ============================================================
   1. Spa & Studio
   ============================================================ */
const spaStudio: PromptPack = {
  slug: "spa-studio",
  title: "Spa & Studio",
  tagline: "Quiet, premium imagery for wellness brands.",
  intro:
    "The exact prompts Cami Lab Studio uses to ship a week of on-brand imagery in an afternoon. Built for spas, aesthetics, massage, recovery and small wellness studios where the look has to feel calm and expensive without a photo shoot.",
  surface: "bg-stone",
  textOnDark: false,
  eyebrowTone: "default",
  groups: [
    {
      title: "Treatment-room stills",
      prompts: [
        {
          title: "Clean room hero",
          tool: "MidJourney",
          body:
            "Editorial interior photograph of a minimalist [TREATMENT TYPE] room, soft north-facing window light, warm white walls, polished concrete floor, a single linen-draped massage bed, ceramic diffuser, eucalyptus stems, shot on a 35mm lens, shallow depth of field, neutral color grading, calm and expensive --ar 3:4 --style raw --v 6",
          note: "Use as the cover image for a treatment page.",
        },
        {
          title: "Detail crop, product on stone",
          tool: "MidJourney",
          body:
            "Close-up product still of [PRODUCT NAME] on a smooth travertine stone, morning side-light, faint shadow, a sprig of rosemary, no people, soft beige and bone color palette, editorial spa photography, shot on medium format --ar 4:5 --style raw --v 6",
        },
        {
          title: "Tools on tray, top-down",
          tool: "MidJourney",
          body:
            "Top-down photograph of facial tools on a linen-lined oak tray: jade roller, gua sha, ceramic dish, dropper bottle, single dried flower, soft directional window light, warm neutral palette, editorial wellness magazine style --ar 1:1 --style raw --v 6",
        },
        {
          title: "Ritual hands close-up",
          tool: "MidJourney",
          body:
            "Cinematic close-up of an aesthetician's hands gently applying [PRODUCT/TECHNIQUE] to a relaxed client's décolletage, warm low natural light, skin texture visible, soft focus background, calm and intimate, editorial portrait --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Founder / aesthetician portraits",
      prompts: [
        {
          title: "Founder at the door",
          tool: "MidJourney",
          body:
            "Editorial portrait of [FOUNDER NAME], a [DESCRIPTION] aesthetician standing in the doorway of her studio, soft morning side-light, holding a ceramic cup, wearing a linen apron, warm authentic smile, shot on 50mm, neutral color grading, looks like a magazine feature --ar 4:5 --style raw --v 6",
        },
        {
          title: "Working portrait at the bed",
          tool: "MidJourney",
          body:
            "Cinematic mid-shot of an aesthetician adjusting the lamp over a treatment bed, warm natural light, focused expression, blurred client foreground, editorial documentary photography, shot on 35mm --ar 3:4 --style raw --v 6",
        },
      ],
    },
    {
      title: "Short-form reels",
      prompts: [
        {
          title: "Treatment open, 9 seconds",
          tool: "Higgsfield",
          body:
            "9-second vertical reel: aesthetician's hands lighting a single candle on a stone tray, then slow pan to a linen-covered bed in soft window light, morning steam from a tea kettle, warm calm palette, no music, soft ambient room tone, 9:16",
          note: "Opens an Instagram carousel about a new treatment.",
        },
        {
          title: "Product reveal, 6 seconds",
          tool: "Higgsfield",
          body:
            "6-second vertical reel: slow push-in on [PRODUCT NAME] sitting on travertine, soft side-light, a hand enters frame to pick it up, gentle rotation, then sets it down, neutral warm grade, 9:16, no text overlay",
        },
        {
          title: "Before / after dissolve",
          tool: "Higgsfield",
          body:
            "10-second vertical reel: slow dissolve between two skin close-ups of the same client, soft natural light, calm pacing, gentle ambient pad music, neutral warm grade, room for text overlay at the top third, 9:16",
        },
      ],
    },
    {
      title: "Captions & booking copy",
      prompts: [
        {
          title: "Treatment caption, three variations",
          tool: "Claude",
          body:
            "You are writing for [BRAND], a small [LOCATION] [TREATMENT TYPE] studio. The voice is calm, confident, never salesy, never uses emoji. Write three Instagram captions for a new [TREATMENT NAME] post. Each caption: 1 short hook line, 2 sentences on what the treatment does (no jargon), 1 line on who it is for, 1 soft CTA to book. Output as a numbered list.",
        },
        {
          title: "DM booking script",
          tool: "Claude",
          body:
            "Write a 3-message DM script for a small spa replying to a new client who asked about pricing on Instagram. Tone: warm, professional, not pushy. Message 1: thank them and give the price for [TREATMENT] in plain English. Message 2: offer one available time this week and one next week. Message 3: link to booking with one line about what to expect. Keep each message under 35 words.",
        },
        {
          title: "Google Business profile description",
          tool: "Claude",
          body:
            "Write a 700-character Google Business profile description for [BRAND], a [LOCATION] [TREATMENT TYPE] studio run by [FOUNDER NAME]. Voice: calm operator, plain English, no buzzwords. Lead with what we do, then who we serve, then one specific differentiator, then how to book. No emoji.",
        },
      ],
    },
  ],
};

/* ============================================================
   2. Beauty Shots
   ============================================================ */
const beautyShots: PromptPack = {
  slug: "beauty-shots",
  title: "Beauty Shots",
  tagline: "Editorial beauty stills for skincare, cosmetics and grooming.",
  intro:
    "Field-tested prompts that produce magazine-grade beauty stills for skincare, cosmetics, color and grooming brands. Designed to replace a small product shoot — drop a product reference into MidJourney and ship a campaign in an afternoon.",
  surface: "bg-signal-green-300",
  textOnDark: false,
  eyebrowTone: "green",
  groups: [
    {
      title: "Hero product stills",
      prompts: [
        {
          title: "Studio hero, soft daylight",
          tool: "MidJourney",
          body:
            "Editorial beauty product still of [PRODUCT NAME], standing on a smooth warm-beige paper sweep, soft directional daylight from the left, gentle long shadow, light condensation on the glass, no other objects, hyper-real product texture, shot on medium format, 80mm lens, f/8 --ar 4:5 --style raw --v 6",
        },
        {
          title: "Floating stack, gradient backdrop",
          tool: "MidJourney",
          body:
            "Three [PRODUCT NAME] units stacked vertically and floating in mid-air against a smooth warm peach-to-cream gradient, soft rim light, faint contact shadow at the base, editorial advertising photography --ar 3:4 --style raw --v 6",
        },
        {
          title: "Product in hand, skin close",
          tool: "MidJourney",
          body:
            "Close-up of a hand holding [PRODUCT NAME] near the jawline, soft morning skin light, natural skin texture, no makeup, warm neutral color palette, editorial beauty magazine style, shot on 50mm --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Texture & ingredient stills",
      prompts: [
        {
          title: "Cream swatch on glass",
          tool: "MidJourney",
          body:
            "Macro photograph of a [INGREDIENT/CREAM] swatch dragged across smooth glass, soft top-down light, visible texture and pigment, neutral warm background, editorial cosmetics still life, shot on 100mm macro --ar 1:1 --style raw --v 6",
        },
        {
          title: "Ingredient on stone",
          tool: "MidJourney",
          body:
            "Botanical ingredient still: [INGREDIENT] arranged on a smooth pale stone surface, single dried [PETAL/LEAF] beside it, soft directional window light, editorial wellness photography, warm muted palette, shot on medium format --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Talent shots (skin / hands)",
      prompts: [
        {
          title: "Talent close-up, no makeup",
          tool: "MidJourney",
          body:
            "Editorial close-up portrait of a [AGE/DESCRIPTION] woman with bare skin, soft north-facing window light, neutral expression, gentle micro-detail in skin texture, warm honest color grading, shot on 85mm at f/2 --ar 4:5 --style raw --v 6",
        },
        {
          title: "Hands applying serum",
          tool: "MidJourney",
          body:
            "Macro shot of fingertips pressing a single drop of serum from a glass dropper onto a clean palm, soft directional light, slow motion feel, calm beauty advertising aesthetic --ar 1:1 --style raw --v 6",
        },
      ],
    },
    {
      title: "Reels & motion",
      prompts: [
        {
          title: "Product swatch, 6 seconds",
          tool: "Higgsfield",
          body:
            "6-second vertical clip: macro top-down of a brush dragging [PRODUCT NAME] across the back of a hand in one smooth stroke, soft warm light, no music, 9:16",
        },
        {
          title: "Rotation product hero",
          tool: "Higgsfield",
          body:
            "8-second vertical clip: [PRODUCT NAME] rotating slowly on a beige paper sweep, soft single light, subtle shadow follows the rotation, neutral warm grade, 9:16",
        },
        {
          title: "Apply & smile, 9 seconds",
          tool: "Higgsfield",
          body:
            "9-second vertical clip: a [AGE/DESCRIPTION] woman applies [PRODUCT NAME] to her cheekbone in soft morning light, looks at the camera with a small natural smile, no caption, 9:16",
        },
      ],
    },
    {
      title: "Copy frameworks",
      prompts: [
        {
          title: "Product launch caption set",
          tool: "Claude",
          body:
            "You are writing for [BRAND], a [DESCRIPTOR] beauty brand. Voice: calm operator, confident, never hype, never emoji. Write five Instagram captions for the launch of [PRODUCT NAME]. Each caption: 1 hook line under 8 words, 2 sentences on the actual benefit (no jargon), 1 line on who it is for, 1 soft CTA. Vary the angle — sensorial, ingredient-led, before-after, founder voice, ritual.",
        },
        {
          title: "Product description page",
          tool: "Claude",
          body:
            "Write a product description page for [PRODUCT NAME]. Output: 1 short headline, 1 lead paragraph (3 sentences, what it does and why it matters), 3 benefit bullets (concrete, no buzzwords), 1 short ingredient note, 1 line on how to use it. Voice: editorial, calm, honest, no superlatives.",
        },
      ],
    },
  ],
};

/* ============================================================
   3. DTC Products
   ============================================================ */
const dtcProducts: PromptPack = {
  slug: "dtc-products",
  title: "DTC Products",
  tagline: "Sell-page imagery for direct-to-consumer brands.",
  intro:
    "Tested on real DTC clients across apparel, consumables, home and accessories. These prompts ship the imagery that actually converts on a PDP or Meta ad — clean enough to look studio, specific enough to feel like the brand.",
  surface: "bg-velur-ink",
  textOnDark: true,
  eyebrowTone: "blue",
  groups: [
    {
      title: "Catalog hero stills",
      prompts: [
        {
          title: "Studio sweep, clean shadow",
          tool: "MidJourney",
          body:
            "Catalog hero of [PRODUCT NAME] on a smooth [COLOR] paper sweep, single soft key light from the top-left, clean contact shadow, no other props, hyper-real product texture, shot on medium format, 80mm, f/11 --ar 1:1 --style raw --v 6",
        },
        {
          title: "Floating product, gradient",
          tool: "MidJourney",
          body:
            "[PRODUCT NAME] floating in front of a smooth [COLOR A] to [COLOR B] gradient, faint contact shadow, soft rim light, advertising-grade studio still --ar 4:5 --style raw --v 6",
        },
        {
          title: "Lifestyle context still",
          tool: "MidJourney",
          body:
            "[PRODUCT NAME] sitting on a [SURFACE], natural side-light from a window, two understated context objects ([OBJECT 1], [OBJECT 2]) just out of focus, editorial lifestyle photography, shot on 50mm --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Apparel & accessory",
      prompts: [
        {
          title: "Flat lay on stone",
          tool: "MidJourney",
          body:
            "Top-down flat lay of [APPAREL ITEM] arranged on warm grey stone, one fold visible, single accessory beside it, soft top window light, editorial e-commerce photography, neutral grade --ar 1:1 --style raw --v 6",
        },
        {
          title: "On-body close detail",
          tool: "MidJourney",
          body:
            "Editorial close-up of [APPAREL ITEM] worn by a [AGE/DESCRIPTION] model, side-light, focus on the seam / texture / hardware, warm neutral grade, shot on 85mm at f/2.8 --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Reels for ads & launches",
      prompts: [
        {
          title: "Unbox in 8 seconds",
          tool: "Higgsfield",
          body:
            "8-second vertical reel: hands open a [PACKAGING TYPE] in soft top-light, lift out [PRODUCT NAME], place it on a warm neutral surface, no music, room for caption in the top third, 9:16",
        },
        {
          title: "Rotation hero, 6 seconds",
          tool: "Higgsfield",
          body:
            "6-second vertical reel: [PRODUCT NAME] rotates slowly on a small turntable, single soft light, subtle shadow follows, neutral warm grade, 9:16",
        },
        {
          title: "Demo in real context",
          tool: "Higgsfield",
          body:
            "10-second vertical reel: a [AGE/DESCRIPTION] person uses [PRODUCT NAME] for its actual job in [LOCATION/CONTEXT], soft natural light, calm pacing, 9:16",
        },
      ],
    },
    {
      title: "PDP and ad copy",
      prompts: [
        {
          title: "Conversion-led product page",
          tool: "Claude",
          body:
            "Write a high-converting PDP for [PRODUCT NAME] from [BRAND]. Output: 1 short headline (under 8 words), 1 sub-line that names the buyer's job-to-be-done, 3 benefit bullets (concrete, what changes for the buyer), 1 short ingredient/material note, 1 trust line (returns, guarantee, ships from where), 1 micro-FAQ of three Q&As. Voice: honest, calm, never hype.",
        },
        {
          title: "Meta ad set, three angles",
          tool: "Claude",
          body:
            "Write three Meta ad variations for [PRODUCT NAME]. Angles: (1) sensorial, (2) before-after, (3) social proof from a real customer review. Each variation: 1 hook (under 6 words), 2 sentence body, 1 CTA. Match brand voice: [VOICE NOTES].",
        },
        {
          title: "Email launch sequence (3 emails)",
          tool: "Claude",
          body:
            "Write a 3-email launch sequence for [PRODUCT NAME]. Email 1: announce, lead with the problem we solved. Email 2: how it works and who it is for, include one quoted customer line. Email 3: last-call with one specific reason to act now. Each email under 180 words, subject + preview + body. Tone: honest, calm, no exclamation marks.",
        },
      ],
    },
  ],
};

/* ============================================================
   4. Hospitality
   ============================================================ */
const hospitality: PromptPack = {
  slug: "hospitality",
  title: "Hospitality",
  tagline: "On-brand imagery for restaurants, cafes, hotels and bars.",
  intro:
    "Hospitality is mood-led. These prompts produce the kind of warm, lived-in imagery a small restaurant or boutique hotel actually wants on its grid — without spending a Friday night on a photographer who shoots someone else's brand the same way.",
  surface: "bg-midnight",
  textOnDark: true,
  eyebrowTone: "blue",
  groups: [
    {
      title: "Plated food stills",
      prompts: [
        {
          title: "Hero plate, top-down",
          tool: "MidJourney",
          body:
            "Top-down editorial food photograph of [DISH NAME] plated on a hand-thrown ceramic plate, dark linen table, single warm side-light, visible steam, scattered herbs, shot on 50mm, restaurant magazine style --ar 4:5 --style raw --v 6",
        },
        {
          title: "Close-up, ingredient texture",
          tool: "MidJourney",
          body:
            "Macro shot of [INGREDIENT/SAUCE] being poured/placed onto [DISH], warm directional light, visible texture and reflection, shallow depth of field, editorial restaurant photography --ar 4:5 --style raw --v 6",
        },
        {
          title: "Cocktail hero in low light",
          tool: "MidJourney",
          body:
            "Editorial photograph of a [COCKTAIL NAME] in a coupe on a dark wooden bar, single warm candle light, faint reflection on the wood, single citrus peel garnish, moody low-light cinematography --ar 3:4 --style raw --v 6",
        },
      ],
    },
    {
      title: "Room / venue stills",
      prompts: [
        {
          title: "Dining room, golden hour",
          tool: "MidJourney",
          body:
            "Editorial interior of a small [CUISINE] restaurant at golden hour, warm light through the front window, tables set with linen and candles, two guests in soft focus, calm intimate atmosphere, shot on 35mm --ar 3:2 --style raw --v 6",
        },
        {
          title: "Hotel room editorial",
          tool: "MidJourney",
          body:
            "Editorial interior photograph of a [STYLE] hotel room, soft morning side-light, linen-dressed bed, an open book on the side table, neutral warm palette, calm and expensive, shot on medium format --ar 3:2 --style raw --v 6",
        },
        {
          title: "Cafe counter scene",
          tool: "MidJourney",
          body:
            "Editorial photograph of a barista pulling an espresso behind a marble counter, soft morning light from a side window, small chalkboard menu in the background, warm neutral grade, shot on 35mm --ar 4:5 --style raw --v 6",
        },
      ],
    },
    {
      title: "Reels for grid + ads",
      prompts: [
        {
          title: "Plate landing, 6 seconds",
          tool: "Higgsfield",
          body:
            "6-second vertical reel: a server's hand sets [DISH NAME] down on a dark linen table in warm restaurant light, slight steam rising, no caption, ambient room tone, 9:16",
        },
        {
          title: "Pour shot, 5 seconds",
          tool: "Higgsfield",
          body:
            "5-second vertical reel: slow pour of [DRINK] into a coupe / glass in warm low light, single ice cube drop, garnish placed, 9:16",
        },
        {
          title: "Room turn, 10 seconds",
          tool: "Higgsfield",
          body:
            "10-second vertical reel: slow pan across a [RESTAURANT/HOTEL ROOM] at golden hour, candles flickering, calm jazz pad in the background, neutral warm grade, 9:16",
        },
      ],
    },
    {
      title: "Menu, captions & reservations",
      prompts: [
        {
          title: "Menu description rewrite",
          tool: "Claude",
          body:
            "Rewrite the menu descriptions below for [RESTAURANT NAME]. Voice: confident, sensorial, no buzzwords, no clichés (no 'house-made', no 'kissed with', no 'farm-to-table'). Each description: 8–14 words, name two real things you taste or feel. Menu: [PASTE MENU].",
        },
        {
          title: "Reservation DM script",
          tool: "Claude",
          body:
            "Write a 3-message DM script for a restaurant replying to an Instagram message asking about availability for [DAY/SIZE]. Tone: warm, brief, helpful. Message 1: confirm we can hold something, ask 2 specifics. Message 2: propose a time and confirm dietary notes. Message 3: send the booking link and tell them what to expect.",
        },
        {
          title: "Caption: chef's-table dinner",
          tool: "Claude",
          body:
            "Write three Instagram captions for [RESTAURANT NAME] announcing a chef's-table dinner with [CHEF]. Each caption: 1 short hook, 2 sentences on what the dinner is and what makes it different, 1 line on who it is for, 1 soft CTA to reserve. No emoji. No exclamation marks.",
        },
      ],
    },
  ],
};

/* ============================================================
   5. Reel Hooks
   ============================================================ */
const reelHooks: PromptPack = {
  slug: "reel-hooks",
  title: "Reel Hooks",
  tagline: "Short-form hooks that earn the next three seconds.",
  intro:
    "Hooks are the only line that decides whether the next ninety seconds get watched. These are the prompt frameworks we use across TikTok, Instagram Reels and YouTube Shorts to write hooks that fit the post — not generic ChatGPT clickbait. Pair each with a Higgsfield clip from the matching pack.",
  surface: "bg-coral",
  textOnDark: true,
  eyebrowTone: "coral",
  groups: [
    {
      title: "Hook frameworks (paste & swap)",
      prompts: [
        {
          title: "The contrarian opener",
          tool: "Claude",
          body:
            "Write 10 contrarian-opener hooks for a [INDUSTRY] short-form video about [TOPIC]. Each hook: under 9 words, starts with a claim that directly opposes the dominant industry advice. Make them specific, not generic. Output as a numbered list with one short reasoning note per hook.",
        },
        {
          title: "Curiosity gap",
          tool: "Claude",
          body:
            "Write 10 curiosity-gap hooks for a [INDUSTRY] reel about [TOPIC]. Format: '[Strong claim about the result] — but [unexpected reason].' Each under 12 words. The reason must feel earned, not invented. Output numbered.",
        },
        {
          title: "POV / first-person",
          tool: "Claude",
          body:
            "Write 10 POV first-person hooks for a [INDUSTRY] reel about [TOPIC]. Format: 'POV: [specific, recognisable situation that triggers the topic].' Each under 12 words. Lead with a small concrete detail, not a generic emotion.",
        },
        {
          title: "Number + outcome",
          tool: "Claude",
          body:
            "Write 10 number-led hooks for a [INDUSTRY] reel about [TOPIC]. Format: '[N] [things/reasons/mistakes] that [outcome].' Vary the number 3–9, lead with the outcome the viewer actually wants. Each under 11 words.",
        },
        {
          title: "Loss-aversion / mistake",
          tool: "Claude",
          body:
            "Write 10 mistake-framed hooks for a [INDUSTRY] reel about [TOPIC]. Format: '[Audience] are [verb-ing] [thing] wrong. Here is [the fix].' Each under 12 words. The mistake must be specific enough that the target audience nods.",
        },
      ],
    },
    {
      title: "Niche hooks for service businesses",
      prompts: [
        {
          title: "Spa / aesthetics",
          tool: "Claude",
          body:
            "Write 10 reel hooks for a small [LOCATION] spa promoting [TREATMENT]. Mix three hook types (contrarian, curiosity, POV). Audience: women aged 28–48 who care about skin but don't want a hard sell. Each hook under 12 words. No emoji.",
        },
        {
          title: "Restaurant / cafe",
          tool: "Claude",
          body:
            "Write 10 reel hooks for [RESTAURANT NAME] promoting [DISH / EVENT]. Mix POV, number-led, and contrarian. Audience: locals 25–55 who follow food on Instagram. Each hook under 12 words. Make them feel like a real human wrote them, not a marketing agency.",
        },
        {
          title: "DTC product launch",
          tool: "Claude",
          body:
            "Write 10 reel hooks for the launch of [PRODUCT NAME] from [BRAND], a [CATEGORY] DTC brand. Mix contrarian, mistake-framed, and number-led. Lead with the specific job-to-be-done the buyer hires the product for. Under 12 words each.",
        },
      ],
    },
    {
      title: "Full 30-second scripts",
      prompts: [
        {
          title: "30s script: how-to with payoff",
          tool: "Claude",
          body:
            "Write a 30-second TikTok script for [BRAND] teaching [TOPIC]. Structure: (0–3s) hook, (3–10s) the wrong way most people do it, (10–22s) the actual three-step way, (22–30s) the payoff and a soft CTA. Voice: calm operator, no hype. Output as a timed script with on-screen text suggestions in brackets.",
        },
        {
          title: "30s script: founder POV",
          tool: "Claude",
          body:
            "Write a 30-second founder POV script for [FOUNDER NAME] explaining why [BRAND] exists. Structure: (0–4s) the personal moment that started it, (4–18s) what we built, (18–28s) who it is for, (28–30s) one line on what to do next. Voice: honest, specific, never preachy.",
        },
      ],
    },
  ],
};

/* ============================================================
   6. Email Voice
   ============================================================ */
const emailVoice: PromptPack = {
  slug: "email-voice",
  title: "Email Voice",
  tagline: "Klaviyo & Mailchimp prompts that sound like a real person.",
  intro:
    "Email is where the relationship lives. These prompts get Claude to write flows that read like a founder writing to a customer, not a brand to a list. Built for Klaviyo flows, abandoned cart sequences, welcome series, win-back, and the boring-but-critical transactional voice.",
  surface: "bg-signal-green",
  textOnDark: true,
  eyebrowTone: "green",
  groups: [
    {
      title: "Welcome series (5 emails)",
      prompts: [
        {
          title: "Welcome series brief",
          tool: "Claude",
          body:
            "Write a 5-email Klaviyo welcome series for [BRAND], a [CATEGORY] brand. Voice: founder writing personally, calm, no hype, no emoji. Email 1: thank you + the one thing we want them to know about us. Email 2: founder origin story in 4 short paragraphs. Email 3: how to pick your first product, no upsell pressure. Email 4: one happy customer story, quoted. Email 5: low-key first-purchase incentive with a single deadline. Output subject + preview + body. Each body under 220 words.",
        },
        {
          title: "Welcome email subject lines",
          tool: "Claude",
          body:
            "Write 20 subject lines for the first email of a [BRAND] welcome series. 10 plain-curiosity, 10 founder-voice. No emoji. Each under 45 characters. Lead with specificity, not hype. Output numbered.",
        },
      ],
    },
    {
      title: "Abandoned cart flow",
      prompts: [
        {
          title: "3-email cart flow",
          tool: "Claude",
          body:
            "Write a 3-email Klaviyo abandoned cart flow for [BRAND]. Email 1 (1 hour): friendly reminder, 'your [ITEM] is waiting', lead with the actual product, 1 line on the most common hesitation answered. Email 2 (24 hours): one happy customer review of that product. Email 3 (72 hours): single soft incentive with a clear expiry. Voice: helpful, never pressured. Subject + preview + body. Each under 140 words.",
        },
        {
          title: "Subject line variations",
          tool: "Claude",
          body:
            "Write 10 abandoned cart subject lines for [BRAND] for a customer who left [PRODUCT NAME] in their cart. Mix question, statement, founder-voice. No emoji. Lead with the product, not 'you forgot something'. Each under 45 characters.",
        },
      ],
    },
    {
      title: "Win-back & re-engagement",
      prompts: [
        {
          title: "60-day lapse, 2 emails",
          tool: "Claude",
          body:
            "Write a 2-email win-back flow for a customer who hasn't ordered in 60 days from [BRAND]. Email 1: no incentive, just an honest check-in with a 1-line ask 'is the product still working for you'. Email 2 (5 days later): one specific offer they haven't seen before. Voice: founder writing personally. Each under 160 words. Subject + preview + body.",
        },
        {
          title: "Lapsed subscriber re-opt",
          tool: "Claude",
          body:
            "Write a single re-opt-in email for [BRAND] subscribers who haven't opened anything in 90 days. The honest goal: confirm they still want to hear from us, with a clear single-click way to stay. Voice: candid, light, never desperate. Under 110 words.",
        },
      ],
    },
    {
      title: "Campaign emails",
      prompts: [
        {
          title: "Launch announcement, founder voice",
          tool: "Claude",
          body:
            "Write a single launch announcement email for [PRODUCT NAME] from [BRAND]. Voice: founder, personal, calm. Structure: (1) the problem we kept hearing about, (2) what we made, (3) what it does that nothing else does, (4) how to get one. Subject + preview + body under 220 words. No exclamation marks. No emoji.",
        },
        {
          title: "Last-call email",
          tool: "Claude",
          body:
            "Write a final last-call email for a [BRAND] promotion ending tonight. Subject + preview + body under 90 words. One specific deadline, one specific reason to act, one direct CTA. Voice: calm, useful, never frantic.",
        },
        {
          title: "Restock notification",
          tool: "Claude",
          body:
            "Write a restock notification email for [PRODUCT NAME] from [BRAND]. Mention this is the [Nth] time it sold out. Acknowledge the wait. Under 90 words. Subject + preview + body.",
        },
      ],
    },
    {
      title: "Transactional voice",
      prompts: [
        {
          title: "Order confirmation rewrite",
          tool: "Claude",
          body:
            "Rewrite the order confirmation email for [BRAND] in our voice (calm, brief, slightly warm, never corporate). Keep the legally required pieces (order number, items, total, shipping address, return window). Add one short note from the founder about what to expect next. Under 130 words.",
        },
        {
          title: "Shipping delay apology",
          tool: "Claude",
          body:
            "Write a shipping delay apology email for [BRAND] for orders affected by [REASON]. Be honest about the cause, give a real new ETA, offer one tangible make-good. Under 110 words. No corporate-speak. No 'we apologize for any inconvenience'.",
        },
      ],
    },
  ],
};

/* ─── Index ───────────────────────────────────────────────────── */

export const PROMPT_PACKS: PromptPack[] = [
  spaStudio,
  beautyShots,
  dtcProducts,
  hospitality,
  reelHooks,
  emailVoice,
];

export function getPackBySlug(slug: string): PromptPack | undefined {
  return PROMPT_PACKS.find((p) => p.slug === slug);
}

export function countPrompts(pack: PromptPack): number {
  return pack.groups.reduce((acc, g) => acc + g.prompts.length, 0);
}

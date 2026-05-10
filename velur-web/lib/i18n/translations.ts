export type Lang = "en" | "es";

const en = {
  header: {
    nav: { platform: "Platform", caseStudies: "Case Studies", company: "Company", faq: "FAQ" },
    cta: "Join waitlist",
  },
  footer: {
    tagline: "Revenue intelligence for high-growth DTC and subscription brands.",
    cols: { pages: "PAGES", connect: "CONNECT", legal: "LEGAL" },
    links: {
      platform: "Platform", caseStudies: "Case Studies", company: "Company",
      contact: "Contact", faq: "FAQ", privacy: "Privacy", terms: "Terms", imprint: "Imprint",
    },
    quote: "Numbers are the only language that doesn't lie.",
  },
  hero: {
    pill: "Building now · Join the waitlist for early access",
    line1: "Revenue intelligence.",
    line2: "Built for DTC.",
    subhead: "Velur connects your Shopify, Klaviyo, and ad platforms into one unified revenue intelligence layer — with AI-powered context that tells you why your revenue moved, not just that it did.",
    ctaPrimary: "Join the waitlist →",
    ctaSecondary: "See what we're building ↓",
    thesisLabel: "The thesis",
    thesis: "The brands winning in DTC don't have more data. They have better intelligence. Velur turns your existing stack into a daily revenue briefing — with analyst-grade context, every morning.",
  },
  benchmarkGrid: {
    sectionLeft: "01 / THE PAIN",
    sectionRight: "IN NUMBERS",
    heading: "What's actually happening\nin your business right now.",
    desc: "Six numbers that explain why DTC brands leave money on the table — every day. None of them are about your product. All of them are leaking margin.",
    cards: [
      { label: "PER YEAR", body: "What the average DTC brand wastes on duplicate SaaS analytics tools they only use 30% of.", source: "Gartner SaaS Spend Report, 2025" },
      { label: "HIGHER LTV", body: "DTC brands using proper cohort analysis see meaningfully higher 12-month lifetime value vs those who don't.", source: "Klaviyo State of Email Marketing, 2025" },
      { label: "EVERY WEEK", body: "Time the average e-commerce founder spends in spreadsheets reconciling numbers that should be automated.", source: "Shopify SMB Report, 2024" },
      { label: "OF MID-MARKET BRANDS", body: "Cannot accurately attribute revenue post-iOS14, leading to 20–40% misallocated ad spend.", source: "AppsFlyer Performance Index, 2025" },
      { label: "CONVERSION LIFT", body: "For brands segmenting customers beyond RFM into behavioral cohorts.", source: "Bloomreach Personalization Index, 2025" },
      { label: "OF MARKETERS", body: "Make ad spend decisions with incomplete or inaccurate attribution data — leading to systematic over-investment in underperforming channels.", source: "Nielsen Annual Marketing Report, 2025" },
    ],
  },
  threeThings: {
    sectionLeft: "02 / THE DIFFERENCE",
    sectionRight: "WHY VELUR",
    heading1: "Three things that make",
    headingItalic: "Velur",
    heading2: "different.",
    rows: [
      { heading: "AI analyst context, not just charts.", body: "Every metric in Velur comes with a plain-English explanation of why it moved. No more staring at a dashboard trying to guess. Velur tells you what happened — and what to do next." },
      { heading: "One source of truth across every channel.", body: "Shopify revenue, Klaviyo retention, Meta spend, TikTok performance — unified in one intelligence layer. No more reconciling five tabs. One number, one version, every morning." },
      { heading: "Built for how DTC brands actually operate.", body: "Cohort retention, subscription MRR, blended ROAS, contribution margin — Velur surfaces the metrics that matter to DTC brands, not generic SaaS KPIs designed for everyone and useful to no one." },
    ],
  },
  receipts: {
    sectionLeft: "03 / THE TEAM",
    sectionRight: "OUR BACKGROUND",
    stats: [
      { label: "Years of DTC and subscription analytics on our founding team", caption: "Across brands you've heard of in apparel, consumables, and subscription" },
      { label: "In DTC and subscription revenue our team has helped analyze and optimize", caption: "Not through Velur — through the work that made us build it" },
      { label: "Hours is our target from early access signup to your first revenue briefing", caption: "No data engineering team needed on your end" },
    ],
  },
  cta: {
    default:     { h1: "The number that decides your quarter",           h2: "is already in your data.",    meta: "Free · No credit card · Early access pricing when we launch", btn: "Join the waitlist →" },
    platform:    { h1: "Get early access to the revenue intelligence",   h2: "layer built for DTC.",        meta: "Free · No credit card · Early access pricing when we launch", btn: "Join the waitlist →" },
    company:     { h1: "We're building this for brands like yours.",     h2: "Get in before we launch.",    meta: "Free · No credit card · Founder rate locked in at signup", btn: "Join the waitlist →" },
    caseStudies: { h1: "Your numbers already tell the story.",           h2: "We're building the reader.",  meta: "Free · No credit card · Early access pricing when we launch", btn: "Join the waitlist →" },
  },
  services: {
    label: "PLATFORM · WHAT VELUR DOES",
    h1a: "One platform.",
    h1b: "Every revenue signal.",
    subhead: "Velur unifies your Shopify, Klaviyo, and ad data into a single revenue intelligence layer — with AI context built in. Know what happened, why it happened, and what to do next.",
    includedLabel: "WHAT'S INCLUDED",
    demoBtn: "Join the waitlist →",
    howLabel: "HOW IT WORKS",
    howRight: "FOUR STEPS",
    modules: [
      {
        label: "REVENUE PULSE",
        heading: "Your daily revenue briefing, explained.",
        body: "Every morning, Velur surfaces your net revenue, subscription MRR, blended ROAS, and contribution margin — with an AI analyst note that explains why the numbers moved. No tabs to open. No spreadsheets to reconcile. Just clarity.",
        includes: [
          "Real-time net revenue and MRR tracking",
          "Channel breakdown: Shopify · D2C · Wholesale · Amazon",
          "Subscription cohort retention curves",
          "Daily analyst note powered by AI",
          "vs prior period and vs last month comparisons",
        ],
      },
      {
        label: "ATTRIBUTION",
        heading: "Know which ads are actually working.",
        body: "Post-iOS14 broke attribution for most DTC brands. Velur rebuilds it using first-party data and server-side signals — giving you accurate CAC and ROAS per channel, per campaign, per creative. No more guessing where your margin is going.",
        includes: [
          "First-party attribution model",
          "Meta · TikTok · Google unified spend view",
          "Blended vs channel-level ROAS",
          "CAC by acquisition source",
          "Creative performance overlays",
        ],
      },
      {
        label: "COHORTS & LTV",
        heading: "Retain the right customers. Predict the rest.",
        body: "Velur builds behavioral cohorts that go beyond RFM — subscription vs DTC, product-line segments, acquisition-channel groups. Then models their 12-month LTV so you know which customers to double down on and which to stop acquiring.",
        includes: [
          "Behavioral cohort analysis (beyond RFM)",
          "Subscription retention and churn curves",
          "12-month LTV modeling by cohort",
          "Cohort vs cohort benchmarking",
          "Churn prediction signals",
        ],
      },
    ],
    steps: [
      { title: "Connect your stack",   body: "Link Shopify, Klaviyo, Meta, TikTok, and your other sources in 15 minutes. No engineering required." },
      { title: "We model your data",   body: "Velur normalizes and structures your data into a unified revenue model. Live within 48 hours." },
      { title: "Intelligence starts",  body: "Daily revenue briefings, attribution dashboards, and cohort models go live — all in one place." },
      { title: "Grow with context",    body: "Every week your revenue picture gets sharper. Every metric comes with an explanation of why it moved." },
    ],
  },
  company: {
    label: "COMPANY · HOW WE THINK",
    h1a: "The revenue intelligence",
    h1b: "platform for DTC brands.",
    subhead: "Velur turns your Shopify, Klaviyo, and ad platform data into a daily revenue briefing — with AI-powered context that tells you not just what happened, but why.",
    whyLabel: "01 / WHY IT WORKS",
    cards: [
      { num: "01", heading: "Clarity in 48 hours.", body: "Most brands wait a week for revenue reports that tell them what already happened. Velur delivers a unified intelligence layer — live within 48 hours of connecting your stack. No data engineering team needed." },
      { num: "02", heading: "Intelligence, not just data.", body: "Every metric in Velur comes with context. The platform doesn't just show you numbers — it explains the movements, flags the anomalies, and surfaces the signals worth acting on. AI analyst notes, built in." },
      { num: "03", heading: "Built for the DTC stack.", body: "Shopify, Klaviyo, Meta, TikTok, Recharge, Stripe — Velur is built around the exact tools DTC brands run on. No custom integrations. No data warehouse team required. Just connect and go." },
    ],
    bgLabel: "BACKGROUND",
    quote: "Our team has spent years inside the analytics stacks of high-growth DTC and subscription brands — companies you've heard of, in apparel, consumables, and subscription. We've seen what good revenue intelligence can unlock: the right product pulled forward, the right cohort retained, the right channel doubled down on. Now we've built the platform that delivers it automatically.",
    stackRows: [
      { label: "Stack",         value: "BigQuery · dbt · Fivetran · Looker Studio · Metabase · Python · SQL" },
      { label: "Integrations",  value: "Shopify · Klaviyo · Meta · Google · TikTok · Recharge · Stripe" },
      { label: "Approach",      value: "AI-augmented · First-party data · Real-time intelligence" },
    ],
    beliefsLabel: "02 / WHAT WE BELIEVE",
    beliefs: [
      "Revenue intelligence beats raw data, every time",
      "AI as leverage, not as marketing",
      "DTC brands deserve enterprise-grade analytics",
      "Small, fast teams build better products",
      "Numbers are the only language that doesn't lie",
    ],
    roadmapLabel: "03 / THE ROADMAP",
    roadmapHeading: "Where Velur is going.",
    roadmap: [
      { year: "2026", text: "Velur is a revenue intelligence platform. We sit alongside your Shopify and Klaviyo data and surface what matters — every morning, automatically." },
      { year: "2027", text: "Velur becomes predictive. The patterns we surface across dozens of DTC brands become benchmarks, forecasting models, and proactive signals — before the problem becomes visible." },
      { year: "2028+", text: "Velur is the revenue operating system for DTC. The brands on the platform have an intelligence advantage their competitors can't buy. The ones who aren't on it, want to be." },
    ],
  },
  contact: {
    label: "WAITLIST · EARLY ACCESS",
    h1a: "Be first.",
    h1b: "Get in before we launch.",
    subhead: "Velur is in development. Leave your email and we'll reach out personally when we're ready for early access partners — with a founder rate locked in.",
    whatToExpect: "WHAT HAPPENS NEXT",
    timeline: [
      { time: "01", text: "We confirm your spot on the waitlist within 24 hours" },
      { time: "02", text: "You get a personal email from the founders when we're ready" },
      { time: "03", text: "Early access partners get a founder rate locked in — permanently" },
      { time: "04", text: "You're first in line to connect your stack when we open the doors" },
    ],
    noTime: "Prefer email? Reach us at",
    async: "We read every message. Based in Barcelona, async-friendly.",
    response: "We reply within 24 hours, weekdays.",
    iframeTitle: "Join the Velur waitlist",
    formPlaceholder: "your@email.com",
    formBtn: "Join the waitlist →",
    formSuccess: "You're on the list. We'll be in touch.",
    formNote: "No spam. Ever. Just a note when we're ready for you.",
  },
  faq: {
    label: "FAQ · COMMON QUESTIONS",
    h1a: "Everything you need",
    h1b: "to know.",
    subhead: "Answers to the questions DTC founders and growth leads ask us most — before, during, and after evaluating Velur.",
    stillHaveQuestions: "Still have questions?",
    stillHaveQuestionsBody: "Join the waitlist and we'll reach out personally — no pitch, just a conversation about what you're building.",
    contactBtn: "Join the waitlist →",
    categories: [
      {
        title: "The Platform",
        items: [
          {
            q: "What exactly is Velur? Is it another dashboard tool?",
            a: "Velur is a revenue intelligence platform — which is fundamentally different from a dashboard. A dashboard shows you numbers. Velur shows you numbers and tells you why they moved, which ones to act on, and what to do next. Every metric comes with an AI analyst note in plain English. Think of it as a senior data analyst available every morning, not a set of charts to stare at.",
          },
          {
            q: "How is Velur different from Triple Whale, Northbeam, or Daasity?",
            a: "Triple Whale and Northbeam are attribution tools first — focused on ad spend measurement and pixel-based tracking. Velur is a revenue intelligence platform: it covers attribution, but also cohort retention, subscription MRR, behavioral LTV modeling, and daily briefings with AI context. The key difference is that Velur doesn't just report what happened — it tells you why and what to do next. It also unifies your ad platforms, email, and subscription data into a single revenue model rather than treating each channel separately.",
          },
          {
            q: "What is the daily revenue briefing and what does it include?",
            a: "Every morning, Velur generates a briefing that surfaces your key metrics — net revenue, MRR, blended ROAS, contribution margin — alongside an AI-written note explaining the movements. If your revenue dropped 12% yesterday, Velur tells you it was driven by a drop in Meta conversion rate on your acquisition campaigns, correlated with a 3-day delivery delay in Shopify. Not just the number — the story behind it.",
          },
          {
            q: "Can Velur replace my existing analytics tools?",
            a: "For most DTC brands, yes — Velur is designed to consolidate the analytics stack you've accumulated over time. If you're running Triple Whale, Northbeam, a separate cohort tool, and manual spreadsheets alongside each other, Velur replaces all of them. Brands typically save €1,500–€2,500/month in SaaS subscriptions when they consolidate onto Velur. The one tool we don't replace: Shopify's native analytics, which we complement rather than duplicate.",
          },
        ],
      },
      {
        title: "Attribution",
        items: [
          {
            q: "How does Velur handle attribution post-iOS14?",
            a: "Velur uses a first-party attribution model — meaning we rely on server-side signals, your Shopify and Klaviyo conversion data, and modeled attribution rather than browser cookies or pixel tracking. This approach recovers the measurement signal that iOS14 destroyed for pixel-dependent tools. You get accurate CAC and ROAS per channel, per campaign, and per creative — even in a cookieless environment. No black-box pixel required.",
          },
          {
            q: "What's the difference between blended ROAS and channel ROAS?",
            a: "Channel ROAS — what Meta, Google, and TikTok each report — is self-reported. Every platform claims credit for the conversion, which leads to triple-counting and inflated numbers. Blended ROAS is your total ad spend divided by total revenue — the only number that can't be gamed. Velur shows you both: blended ROAS as your ground truth, and channel ROAS with appropriate context applied. When the two diverge significantly, Velur flags it and explains why.",
          },
          {
            q: "How does Velur model attribution across email and paid channels?",
            a: "Velur assigns revenue to the touchpoints that actually influenced the conversion using a data-driven model built on your first-party signals — Shopify order data, Klaviyo flow triggers, and ad platform spend. Unlike last-click models (which give all credit to the final touchpoint) or platform-reported models (which are biased toward each platform's own channels), Velur's model is neutral and built on what your customers actually did, not what any single platform claims they did.",
          },
          {
            q: "Can Velur replace my Triple Whale or Northbeam subscription?",
            a: "For most DTC brands, yes. Velur covers the same core attribution use cases — multi-touch attribution, first-party data, creative performance analysis — plus the cohort, LTV, and subscription intelligence that attribution tools don't offer. If you're spending more than €400/month on attribution point-solutions, Velur typically pays for itself through consolidation alone.",
          },
        ],
      },
      {
        title: "Setup & Integrations",
        items: [
          {
            q: "Which platforms does Velur connect to?",
            a: "Velur currently integrates with: Shopify (orders, products, customers), Klaviyo (email flows, segments, revenue attribution), Meta Ads (spend, creative, campaign-level), Google Ads (search, shopping, Performance Max), TikTok Ads (creative, campaign), Recharge (subscription MRR, churn, cohort data), and Stripe (payment and subscription data). New integrations are added regularly — if you're on a platform not listed, reach out and we'll tell you our timeline.",
          },
          {
            q: "How long does it take to go live?",
            a: "Most brands go live within 48 hours of connecting their stack. There's no data engineering required on your end — you authenticate each integration through Velur's connection flow, and we handle the data modeling, normalization, and intelligence layer. Your first daily revenue briefing arrives the morning after your data connects.",
          },
          {
            q: "Do I need a developer or data engineer to use Velur?",
            a: "No. Velur is built for DTC founders, heads of growth, and marketing leads — not data teams. Connecting your integrations takes about 15 minutes and requires no technical knowledge. The platform is designed so the person making revenue decisions can use it directly, without a technical intermediary. If you've ever connected a Klaviyo integration, you already know how to set up Velur.",
          },
          {
            q: "Does Velur work with Shopify Plus or only standard Shopify?",
            a: "Velur works with all Shopify plans — Standard, Advanced, and Plus. For Plus brands, we also connect to your B2B wholesale channel, Markets data, and any custom Shopify Flow automations that affect revenue attribution.",
          },
        ],
      },
      {
        title: "Data & Cohorts",
        items: [
          {
            q: "What are behavioral cohorts, and how are they different from RFM?",
            a: "RFM (Recency, Frequency, Monetary) groups customers by when they last bought, how often, and how much — a useful starting point, but it tells you nothing about why they behave that way. Behavioral cohorts in Velur group customers by acquisition channel, first product purchased, subscription type, and behavioral signals — and model their predicted 12-month LTV per segment. The difference: RFM tells you what customers did. Behavioral cohorts tell you which customers to acquire more of, and which are draining your CAC without returning value.",
          },
          {
            q: "How does Velur model LTV, and how accurate is it?",
            a: "Velur's LTV model is built on your actual historical cohort data — not industry benchmarks or averages. We use survival analysis on your retention curves to project 12-month and 24-month LTV per segment. Accuracy improves over time as more cohort data accumulates. For brands with 12+ months of Shopify history, the model is typically accurate to within 8–12% of realized LTV. We also show you the confidence interval so you're never working from a false precision.",
          },
          {
            q: "Where does my data actually live? Who has access to it?",
            a: "Velur processes your data to generate intelligence and briefings. We do not resell your data, share it with other brands, or use it to train shared models. Your revenue data is yours — always. We operate under GDPR-compliant data processing agreements and store data in EU-based infrastructure by default. We can discuss specific data residency or DPA requirements for enterprise arrangements.",
          },
          {
            q: "How does Velur handle subscription metrics differently from one-time purchase brands?",
            a: "Velur has a dedicated subscription intelligence layer built for Recharge and Stripe Billing brands. This covers MRR tracking, subscription cohort retention curves, churn prediction signals, and plan-level LTV — metrics that standard ecommerce analytics tools either ignore or handle incorrectly. For hybrid brands (subscription + DTC), Velur models both revenue streams and shows you their interaction: which DTC customers convert to subscription, and at what margin.",
          },
        ],
      },
      {
        title: "Pricing & Commitment",
        items: [
          {
            q: "How does pricing work?",
            a: "Velur pricing is based on the modules you activate and your brand's revenue scale. We don't publish per-seat fees or lock you into annual contracts upfront. The best way to understand what Velur costs for your specific situation is a 15-minute demo — we'll give you exact pricing before you make any commitment. No vague 'contact sales' runaround.",
          },
          {
            q: "What size brand is Velur built for?",
            a: "Velur is built for DTC and subscription brands doing €500K to €50M in annual revenue. Below that threshold, the intelligence layer isn't yet worth the cost — a well-configured Shopify and Klaviyo setup will serve you better, and we'll tell you that honestly. Above €50M, you likely have an in-house data team and we can discuss enterprise arrangements. The sweet spot is fast-growing brands who've outgrown spreadsheets but can't yet justify a full-time data hire.",
          },
          {
            q: "Is there a minimum contract length?",
            a: "No annual contracts, no minimum term. Velur runs month-to-month. We earn your subscription by being useful every day — not by locking you into a contract you regret. If it's not delivering intelligence you act on, you should cancel. We'd rather win you back when we've earned it than trap you when we haven't.",
          },
          {
            q: "Is there a free trial or pilot period?",
            a: "We offer a 14-day pilot for qualified DTC brands. During the pilot, your stack is fully connected, your first revenue briefings go live, and you see exactly what Velur surfaces for your business — not a demo environment with generic data. At the end of 14 days, you decide whether to continue. No credit card required to start the pilot.",
          },
        ],
      },
    ],
  },
};

const es: typeof en = {
  header: {
    nav: { platform: "Plataforma", caseStudies: "Casos de Éxito", company: "Empresa", faq: "FAQ" },
    cta: "Unirse a la lista",
  },
  footer: {
    tagline: "Inteligencia de ingresos para marcas DTC y de suscripción en alto crecimiento.",
    cols: { pages: "PÁGINAS", connect: "CONTACTO", legal: "LEGAL" },
    links: {
      platform: "Plataforma", caseStudies: "Casos de Éxito", company: "Empresa",
      contact: "Contacto", faq: "FAQ", privacy: "Privacidad", terms: "Condiciones", imprint: "Aviso Legal",
    },
    quote: "Los números son el único lenguaje que no miente.",
  },
  hero: {
    pill: "En desarrollo · Únete a la lista de espera para acceso anticipado",
    line1: "Inteligencia de ingresos.",
    line2: "Para marcas DTC.",
    subhead: "Velur conecta tus datos de Shopify, Klaviyo y plataformas publicitarias en una única capa de inteligencia de ingresos — con contexto impulsado por IA que te explica por qué se movieron tus ingresos, no solo que se movieron.",
    ctaPrimary: "Unirme a la lista →",
    ctaSecondary: "Ver qué estamos construyendo ↓",
    thesisLabel: "La tesis",
    thesis: "Las marcas que ganan en DTC no tienen más datos. Tienen mejor inteligencia. Velur convierte tu stack actual en un informe diario de ingresos — con contexto de nivel analista, cada mañana.",
  },
  benchmarkGrid: {
    sectionLeft: "01 / EL PROBLEMA",
    sectionRight: "EN NÚMEROS",
    heading: "Lo que está ocurriendo realmente\nen tu negocio ahora mismo.",
    desc: "Seis cifras que explican por qué las marcas DTC dejan dinero sobre la mesa — cada día. Ninguna tiene que ver con tu producto. Todas están consumiendo margen.",
    cards: [
      { label: "AL AÑO", body: "Lo que desperdicia de media una marca DTC en herramientas de análisis SaaS duplicadas que solo utilizan el 30% del tiempo.", source: "Gartner SaaS Spend Report, 2025" },
      { label: "MAYOR LTV", body: "Las marcas DTC que usan análisis de cohortes adecuado obtienen un valor de por vida a 12 meses significativamente mayor frente a quienes no lo hacen.", source: "Klaviyo State of Email Marketing, 2025" },
      { label: "CADA SEMANA", body: "Tiempo que el fundador de e-commerce medio dedica en hojas de cálculo reconciliando cifras que deberían estar automatizadas.", source: "Shopify SMB Report, 2024" },
      { label: "DE MARCAS MEDIANAS", body: "No pueden atribuir ingresos con precisión tras iOS14, generando una inversión publicitaria mal asignada del 20–40%.", source: "AppsFlyer Performance Index, 2025" },
      { label: "MAYOR CONVERSIÓN", body: "Para marcas que segmentan clientes más allá del RFM en cohortes de comportamiento.", source: "Bloomreach Personalization Index, 2025" },
      { label: "DE LOS MARKETERS", body: "Toman decisiones de inversión publicitaria con datos de atribución incompletos o inexactos, generando una sobreinversión sistemática en canales de bajo rendimiento.", source: "Nielsen Annual Marketing Report, 2025" },
    ],
  },
  threeThings: {
    sectionLeft: "02 / LA DIFERENCIA",
    sectionRight: "POR QUÉ VELUR",
    heading1: "Tres cosas que hacen",
    headingItalic: "diferente",
    heading2: "a Velur.",
    rows: [
      { heading: "Contexto de IA, no solo gráficos.", body: "Cada métrica en Velur incluye una explicación en lenguaje natural de por qué se movió. Sin más mirar dashboards intentando adivinar. Velur te dice qué ocurrió — y qué hacer a continuación." },
      { heading: "Una única fuente de verdad en todos tus canales.", body: "Ingresos de Shopify, retención de Klaviyo, inversión en Meta, rendimiento de TikTok — unificados en una capa de inteligencia. Sin más reconciliar cinco pestañas. Un número, una versión, cada mañana." },
      { heading: "Diseñado para cómo operan realmente las marcas DTC.", body: "Retención de cohortes, MRR de suscripciones, ROAS combinado, margen de contribución — Velur muestra las métricas que importan a las marcas DTC, no KPIs genéricos de SaaS útiles para todos y para nadie." },
    ],
  },
  receipts: {
    sectionLeft: "03 / EL EQUIPO",
    sectionRight: "NUESTRO BACKGROUND",
    stats: [
      { label: "Años de analítica DTC y suscripción en nuestro equipo fundador", caption: "En marcas que conoces en moda, gran consumo y suscripción" },
      { label: "En ingresos DTC y suscripción que nuestro equipo ha ayudado a analizar y optimizar", caption: "No a través de Velur — el trabajo que nos llevó a construirlo" },
      { label: "Horas es nuestro objetivo desde el registro hasta tu primer informe de ingresos", caption: "Sin necesidad de equipo de ingeniería de datos" },
    ],
  },
  cta: {
    default:     { h1: "El número que decide tu trimestre",                            h2: "ya está en tus datos.",          meta: "Gratis · Sin tarjeta · Precio de acceso temprano al lanzamiento", btn: "Unirse a la lista →" },
    platform:    { h1: "Accede antes del lanzamiento a la capa de inteligencia",       h2: "de ingresos para DTC.",          meta: "Gratis · Sin tarjeta · Precio de acceso temprano al lanzamiento", btn: "Unirse a la lista →" },
    company:     { h1: "Lo estamos construyendo para marcas como la tuya.",            h2: "Entra antes del lanzamiento.",   meta: "Gratis · Sin tarjeta · Tarifa fundadora garantizada al registrarse", btn: "Unirse a la lista →" },
    caseStudies: { h1: "Tus números ya cuentan la historia.",                          h2: "Estamos construyendo el lector.", meta: "Gratis · Sin tarjeta · Precio de acceso temprano al lanzamiento", btn: "Unirse a la lista →" },
  },
  services: {
    label: "PLATAFORMA · QUÉ HACE VELUR",
    h1a: "Una plataforma.",
    h1b: "Todas las señales de ingresos.",
    subhead: "Velur unifica tus datos de Shopify, Klaviyo y publicidad en una única capa de inteligencia de ingresos — con contexto de IA integrado. Sabe qué ocurrió, por qué ocurrió y qué hacer a continuación.",
    includedLabel: "QUÉ INCLUYE",
    demoBtn: "Unirse a la lista →",
    howLabel: "CÓMO FUNCIONA",
    howRight: "CUATRO PASOS",
    modules: [
      {
        label: "PULSO DE INGRESOS",
        heading: "Tu informe de ingresos diario, explicado.",
        body: "Cada mañana, Velur muestra tus ingresos netos, MRR de suscripciones, ROAS combinado y margen de contribución — con una nota analítica de IA que explica por qué se movieron las cifras. Sin pestañas que abrir. Sin hojas de cálculo que reconciliar. Solo claridad.",
        includes: [
          "Seguimiento de ingresos netos y MRR en tiempo real",
          "Desglose por canal: Shopify · D2C · Mayorista · Amazon",
          "Curvas de retención de cohortes de suscripción",
          "Nota analítica diaria impulsada por IA",
          "Comparativas vs. periodo anterior y vs. mes anterior",
        ],
      },
      {
        label: "ATRIBUCIÓN",
        heading: "Saber qué anuncios están funcionando realmente.",
        body: "iOS14 rompió la atribución para la mayoría de las marcas DTC. Velur la reconstruye usando datos propios y señales del lado del servidor — dándote CAC y ROAS precisos por canal, por campaña, por creativo. Sin más adivinar dónde se va tu margen.",
        includes: [
          "Modelo de atribución de primera parte",
          "Vista unificada de inversión: Meta · TikTok · Google",
          "ROAS combinado vs. por canal",
          "CAC por fuente de adquisición",
          "Superposición de rendimiento de creatividades",
        ],
      },
      {
        label: "COHORTES Y LTV",
        heading: "Retener a los clientes correctos. Predecir el resto.",
        body: "Velur construye cohortes de comportamiento que van más allá del RFM — suscripción vs. DTC, segmentos por línea de producto, grupos por canal de adquisición. Luego modela su LTV a 12 meses para que sepas en qué clientes invertir más y cuáles dejar de adquirir.",
        includes: [
          "Análisis de cohortes de comportamiento (más allá del RFM)",
          "Curvas de retención y abandono de suscripciones",
          "Modelado de LTV a 12 meses por cohorte",
          "Benchmarking entre cohortes",
          "Señales predictivas de abandono",
        ],
      },
    ],
    steps: [
      { title: "Conecta tu stack",         body: "Vincula Shopify, Klaviyo, Meta, TikTok y otras fuentes en 15 minutos. Sin necesidad de ingeniería." },
      { title: "Modelamos tus datos",       body: "Velur normaliza y estructura tus datos en un modelo de ingresos unificado. En activo en 48 horas." },
      { title: "Comienza la inteligencia",  body: "Los informes diarios, dashboards de atribución y modelos de cohortes se ponen en marcha — todo en un solo lugar." },
      { title: "Crece con contexto",        body: "Cada semana tu visión de ingresos se perfecciona. Cada métrica incluye una explicación de por qué se movió." },
    ],
  },
  company: {
    label: "EMPRESA · CÓMO PENSAMOS",
    h1a: "La plataforma de inteligencia",
    h1b: "de ingresos para marcas DTC.",
    subhead: "Velur convierte tus datos de Shopify, Klaviyo y plataformas publicitarias en un informe diario de ingresos — con contexto impulsado por IA que te dice no solo qué ocurrió, sino por qué.",
    whyLabel: "01 / POR QUÉ FUNCIONA",
    cards: [
      { num: "01", heading: "Claridad en 48 horas.", body: "La mayoría de las marcas esperan una semana para recibir informes que les cuentan lo que ya ocurrió. Velur entrega una capa de inteligencia unificada — en activo en 48 horas tras conectar tu stack. Sin equipo de ingeniería de datos." },
      { num: "02", heading: "Inteligencia, no solo datos.", body: "Cada métrica en Velur incluye contexto. La plataforma no solo muestra números — explica los movimientos, señala las anomalías y pone en primer plano las señales que vale la pena tomar en cuenta. Notas analíticas de IA, integradas." },
      { num: "03", heading: "Diseñado para el stack DTC.", body: "Shopify, Klaviyo, Meta, TikTok, Recharge, Stripe — Velur está construido en torno a las herramientas exactas que utilizan las marcas DTC. Sin integraciones personalizadas. Sin data warehouse necesario. Conecta y empieza." },
    ],
    bgLabel: "TRAYECTORIA",
    quote: "Nuestro equipo ha pasado años dentro de los stacks de datos de marcas DTC y de suscripción en alto crecimiento — marcas que conoces, en moda, gran consumo y suscripción. Hemos visto lo que puede lograr una buena inteligencia de ingresos: el producto correcto adelantado, la cohorte correcta retenida, el canal correcto doblado. Ahora hemos construido la plataforma que lo entrega automáticamente.",
    stackRows: [
      { label: "Stack",         value: "BigQuery · dbt · Fivetran · Looker Studio · Metabase · Python · SQL" },
      { label: "Integraciones", value: "Shopify · Klaviyo · Meta · Google · TikTok · Recharge · Stripe" },
      { label: "Enfoque",       value: "Aumentado por IA · Datos propios · Inteligencia en tiempo real" },
    ],
    beliefsLabel: "02 / LO QUE CREEMOS",
    beliefs: [
      "La inteligencia de ingresos supera a los datos brutos, siempre",
      "IA como palanca, no como marketing",
      "Las marcas DTC merecen analítica de nivel enterprise",
      "Los equipos pequeños y ágiles construyen mejores productos",
      "Los números son el único lenguaje que no miente",
    ],
    roadmapLabel: "03 / LA HOJA DE RUTA",
    roadmapHeading: "Hacia dónde va Velur.",
    roadmap: [
      { year: "2026", text: "Velur es una plataforma de inteligencia de ingresos. Nos situamos junto a tus datos de Shopify y Klaviyo y ponemos en primer plano lo que importa — cada mañana, automáticamente." },
      { year: "2027", text: "Velur se vuelve predictivo. Los patrones que detectamos en decenas de marcas DTC se convierten en benchmarks, modelos de previsión y señales proactivas — antes de que el problema sea visible." },
      { year: "2028+", text: "Velur es el sistema operativo de ingresos para DTC. Las marcas de la plataforma tienen una ventaja de inteligencia que sus competidores no pueden comprar. Las que no están, quieren estarlo." },
    ],
  },
  contact: {
    label: "LISTA DE ESPERA · ACCESO ANTICIPADO",
    h1a: "Sé el primero.",
    h1b: "Entra antes del lanzamiento.",
    subhead: "Velur está en desarrollo. Deja tu email y nos ponemos en contacto personalmente cuando estemos listos para los primeros partners — con una tarifa fundadora garantizada.",
    whatToExpect: "QUÉ PASA DESPUÉS",
    timeline: [
      { time: "01", text: "Confirmamos tu plaza en la lista de espera en menos de 24 horas" },
      { time: "02", text: "Recibes un email personal de los fundadores cuando estemos listos" },
      { time: "03", text: "Los primeros en entrar obtienen una tarifa fundadora permanente" },
      { time: "04", text: "Eres el primero en conectar tu stack cuando abramos las puertas" },
    ],
    noTime: "¿Prefieres el email? Escríbenos a",
    async: "Leemos todos los mensajes. Basados en Barcelona, trabajamos en asíncrono.",
    response: "Respondemos en 24 horas, días laborables.",
    iframeTitle: "Únete a la lista de espera de Velur",
    formPlaceholder: "tu@email.com",
    formBtn: "Unirme a la lista →",
    formSuccess: "Estás en la lista. Te escribimos pronto.",
    formNote: "Sin spam. Solo un mensaje cuando estemos listos para ti.",
  },
  faq: {
    label: "FAQ · PREGUNTAS FRECUENTES",
    h1a: "Todo lo que necesitas",
    h1b: "saber.",
    subhead: "Respuestas a las preguntas que más nos hacen los fundadores y responsables de crecimiento de marcas DTC — antes, durante y después de evaluar Velur.",
    stillHaveQuestions: "¿Tienes más preguntas?",
    stillHaveQuestionsBody: "Únete a la lista de espera y te escribimos personalmente — sin pitch, solo una conversación sobre lo que estás construyendo.",
    contactBtn: "Unirse a la lista →",
    categories: [
      {
        title: "La Plataforma",
        items: [
          {
            q: "¿Qué es exactamente Velur? ¿Es otra herramienta de dashboards?",
            a: "Velur es una plataforma de inteligencia de ingresos — algo fundamentalmente distinto a un dashboard. Un dashboard te muestra números. Velur te muestra números y te explica por qué se movieron, cuáles requieren acción y qué hacer a continuación. Cada métrica incluye una nota analítica de IA en lenguaje natural. Piensa en ello como tener un analista de datos senior disponible cada mañana, no un conjunto de gráficos en los que quedarte mirando.",
          },
          {
            q: "¿En qué se diferencia Velur de Triple Whale, Northbeam o Daasity?",
            a: "Triple Whale y Northbeam son ante todo herramientas de atribución — centradas en la medición del gasto publicitario y el tracking por píxel. Velur es una plataforma de inteligencia de ingresos: cubre la atribución, pero también la retención por cohortes, el MRR de suscripciones, el modelado de LTV conductual y los informes diarios con contexto de IA. La diferencia clave es que Velur no solo te dice qué ocurrió — te explica por qué y qué hacer después. Además, unifica tus plataformas publicitarias, email y datos de suscripción en un modelo de ingresos unificado en lugar de tratarlos por separado.",
          },
          {
            q: "¿Qué es el informe de ingresos diario y qué incluye?",
            a: "Cada mañana, Velur genera un informe que muestra tus métricas clave — ingresos netos, MRR, ROAS combinado, margen de contribución — junto con una nota escrita por IA que explica los movimientos. Si tus ingresos bajaron un 12% ayer, Velur te dirá que fue por una caída en la tasa de conversión de Meta en tus campañas de adquisición, correlacionada con un retraso de entrega de 3 días que aparece en Shopify. No solo el número — la historia detrás.",
          },
          {
            q: "¿Puede Velur reemplazar mis herramientas de análisis actuales?",
            a: "Para la mayoría de las marcas DTC, sí — Velur está diseñado para consolidar el stack de análisis que has acumulado con el tiempo. Si usas Triple Whale, Northbeam, una herramienta de cohortes separada y hojas de cálculo manuales en paralelo, Velur las reemplaza a todas. Las marcas suelen ahorrar entre 1.500 y 2.500 €/mes en suscripciones SaaS al consolidar en Velur. La única herramienta que no reemplazamos es la analítica nativa de Shopify, que complementamos en lugar de duplicar.",
          },
        ],
      },
      {
        title: "Atribución",
        items: [
          {
            q: "¿Cómo gestiona Velur la atribución tras iOS14?",
            a: "Velur utiliza un modelo de atribución de primera parte — es decir, nos apoyamos en señales del lado del servidor, tus datos de conversión de Shopify y Klaviyo, y atribución modelada en lugar de cookies de navegador o tracking por píxel. Este enfoque recupera la señal de medición que iOS14 destruyó para las herramientas dependientes del píxel. Obtienes CAC y ROAS precisos por canal, por campaña y por creativo — incluso en un entorno sin cookies.",
          },
          {
            q: "¿Cuál es la diferencia entre el ROAS combinado y el ROAS por canal?",
            a: "El ROAS por canal — lo que reportan Meta, Google y TikTok — es autoinformado. Cada plataforma se atribuye el mérito de la conversión, lo que genera triple contabilización y cifras infladas. El ROAS combinado es tu gasto publicitario total dividido entre tus ingresos totales — el único número que no se puede manipular. Velur te muestra ambos: el ROAS combinado como verdad absoluta, y el ROAS por canal con el contexto adecuado. Cuando divergen significativamente, Velur lo señala y explica por qué.",
          },
          {
            q: "¿Cómo modela Velur la atribución entre email y canales de pago?",
            a: "Velur asigna ingresos a los puntos de contacto que realmente influyeron en la conversión, usando un modelo basado en tus señales de primera parte — datos de pedidos de Shopify, activadores de flujos de Klaviyo e inversión en plataformas publicitarias. A diferencia de los modelos de último clic (que dan todo el crédito al último punto de contacto) o los modelos reportados por plataformas (sesgados hacia sus propios canales), el modelo de Velur es neutro y se construye sobre lo que tus clientes realmente hicieron.",
          },
          {
            q: "¿Puede Velur reemplazar mi suscripción a Triple Whale o Northbeam?",
            a: "Para la mayoría de las marcas DTC, sí. Velur cubre los mismos casos de uso de atribución — atribución multitoque, datos propios, análisis de rendimiento creativo — más la inteligencia de cohortes, LTV y suscripciones que las herramientas de atribución no ofrecen. Si gastas más de 400 €/mes en soluciones puntuales de atribución, Velur suele amortizarse solo por la consolidación.",
          },
        ],
      },
      {
        title: "Configuración e Integraciones",
        items: [
          {
            q: "¿Con qué plataformas se conecta Velur?",
            a: "Velur se integra actualmente con: Shopify (pedidos, productos, clientes), Klaviyo (flujos de email, segmentos, atribución de ingresos), Meta Ads (inversión, creatividades, nivel de campaña), Google Ads (búsqueda, shopping, Performance Max), TikTok Ads (creatividades, campaña), Recharge (MRR de suscripciones, abandono, datos de cohortes) y Stripe (datos de pagos y suscripciones). Añadimos nuevas integraciones regularmente — si usas una plataforma que no aparece aquí, contáctanos y te diremos nuestra hoja de ruta.",
          },
          {
            q: "¿Cuánto tiempo se tarda en estar operativo?",
            a: "La mayoría de las marcas están activas en 48 horas tras conectar su stack. No se requiere ingeniería de datos por tu parte — autentificas cada integración a través del flujo de conexión de Velur, y nosotros nos encargamos del modelado de datos, la normalización y la capa de inteligencia. Tu primer informe de ingresos diario llega a la mañana siguiente de conectar tus datos.",
          },
          {
            q: "¿Necesito un desarrollador o ingeniero de datos para usar Velur?",
            a: "No. Velur está diseñado para fundadores de marcas DTC, responsables de crecimiento y directores de marketing — no para equipos de datos. Conectar tus integraciones lleva unos 15 minutos y no requiere conocimientos técnicos. Si alguna vez has conectado una integración de Klaviyo, ya sabes cómo configurar Velur.",
          },
          {
            q: "¿Funciona Velur con Shopify Plus o solo con Shopify estándar?",
            a: "Velur funciona con todos los planes de Shopify — Estándar, Avanzado y Plus. Para marcas Plus, también conectamos tu canal mayorista B2B, los datos de Markets y cualquier automatización personalizada de Shopify Flow que afecte a la atribución de ingresos.",
          },
        ],
      },
      {
        title: "Datos y Cohortes",
        items: [
          {
            q: "¿Qué son las cohortes de comportamiento y en qué se diferencian del RFM?",
            a: "El RFM (Recencia, Frecuencia, Valor Monetario) agrupa a los clientes por cuándo compraron por última vez, con qué frecuencia y cuánto — un punto de partida útil, pero que no te dice nada sobre por qué se comportan así. Las cohortes de comportamiento en Velur agrupan a los clientes por canal de adquisición, primer producto comprado, tipo de suscripción y señales conductuales — y modelan su LTV previsto a 12 meses por segmento. La diferencia: el RFM te dice lo que hicieron los clientes. Las cohortes de comportamiento te dicen qué clientes vale la pena adquirir más y cuáles están consumiendo tu CAC sin aportar valor.",
          },
          {
            q: "¿Cómo modela Velur el LTV y qué precisión tiene?",
            a: "El modelo de LTV de Velur se construye sobre tus datos históricos reales de cohortes — no en benchmarks del sector ni medias generales. Usamos análisis de supervivencia sobre tus curvas de retención para proyectar el LTV a 12 y 24 meses por segmento. La precisión mejora con el tiempo a medida que se acumulan más datos de cohortes. Para marcas con más de 12 meses de historial en Shopify, el modelo suele ser preciso dentro de un margen del 8–12% respecto al LTV realizado.",
          },
          {
            q: "¿Dónde están mis datos realmente? ¿Quién tiene acceso a ellos?",
            a: "Velur procesa tus datos para generar inteligencia e informes. No vendemos tus datos, no los compartimos con otras marcas ni los usamos para entrenar modelos compartidos. Tus datos de ingresos son tuyos — siempre. Operamos bajo acuerdos de tratamiento de datos conformes con el RGPD y almacenamos los datos en infraestructura con sede en la UE por defecto.",
          },
          {
            q: "¿Cómo gestiona Velur las métricas de suscripción de forma diferente a las marcas de compra única?",
            a: "Velur dispone de una capa de inteligencia de suscripciones dedicada para marcas con Recharge y Stripe Billing. Esto incluye seguimiento de MRR, curvas de retención de cohortes de suscripción, señales predictivas de abandono y LTV por plan — métricas que las herramientas de análisis de e-commerce estándar ignoran o tratan incorrectamente. Para marcas híbridas (suscripción + DTC), Velur modela ambas líneas de ingresos y muestra su interacción: qué clientes DTC se convierten en suscriptores y a qué margen.",
          },
        ],
      },
      {
        title: "Precios y Compromiso",
        items: [
          {
            q: "¿Cómo funciona el precio?",
            a: "El precio de Velur depende de los módulos que actives y la escala de ingresos de tu marca. No publicamos tarifas por usuario ni contratos anuales de partida. La mejor forma de entender qué costaría Velur para tu situación específica es una demo de 15 minutos — te damos el precio exacto antes de que tomes ninguna decisión. Sin el típico 'contacta con ventas' sin respuesta.",
          },
          {
            q: "¿Para qué tamaño de marca está diseñado Velur?",
            a: "Velur está diseñado para marcas DTC y de suscripción con ingresos anuales de entre 500.000 € y 50 millones €. Por debajo de ese umbral, la capa de inteligencia no compensa aún el coste — una buena configuración de Shopify y Klaviyo te servirá mejor, y te lo diremos con honestidad. Por encima de 50 millones €, probablemente ya tienes un equipo de datos interno y podemos hablar de acuerdos enterprise. El punto óptimo son marcas en crecimiento rápido que han superado las hojas de cálculo pero aún no pueden justificar una contratación de datos a tiempo completo.",
          },
          {
            q: "¿Hay un plazo mínimo de contrato?",
            a: "Sin contratos anuales, sin plazo mínimo. Velur funciona mes a mes. Ganamos tu suscripción siendo útiles cada día — no bloqueándote en un contrato del que te arrepientes. Si no te está aportando inteligencia accionable, deberías cancelar. Preferimos recuperarte cuando lo hayamos ganado a retenerte cuando no es el caso.",
          },
          {
            q: "¿Hay un período de prueba gratuito?",
            a: "Ofrecemos un piloto de 14 días para marcas DTC cualificadas. Durante el piloto, tu stack se conecta completamente, tus primeros informes de ingresos se ponen en marcha y ves exactamente lo que Velur muestra para tu negocio — no en un entorno de demo con datos genéricos. Al cabo de 14 días, decides si continuar. No se requiere tarjeta de crédito para iniciar el piloto.",
          },
        ],
      },
    ],
  },
};

export const translations = { en, es } as const;
export type T = typeof en;

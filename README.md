# Velur Website
Production website for velur.io — revenue intelligence for high-growth DTC and subscription brands.

Stack
Next.js 16 (App Router, TypeScript)
Tailwind CSS v4 with custom design tokens
GSAP + ScrollTrigger for animations
Lenis for smooth scroll
Fonts: Bricolage Grotesque, Fraunces, JetBrains Mono (via next/font/google)
Setup
npm install
npm run dev
Open http://localhost:3000.

Deploy to Vercel
Push this repo to GitHub
Go to vercel.com/new → Import your repo
No env vars needed for the static site
Click Deploy
Connect velur.io domain
In Vercel dashboard → your project → Settings → Domains
Add velur.io and www.velur.io
In your DNS provider (Cloudflare recommended):
Add an A record: @ → Vercel's IP (shown in dashboard)
Add a CNAME record: www → cname.vercel-dns.com
Vercel auto-provisions SSL
Add your Cal.com booking link
Create a free account at cal.com
Create a "30-min discovery call" event type
Open app/(marketing)/contact/page.tsx
Replace https://cal.com/velur/30min with your real URL
Set up Cloudflare Email Routing for hello@velur.io
Add your domain to Cloudflare (free plan works)
Go to Email → Email Routing → Routing Rules
Add a rule: hello@velur.io → forwards to your personal Gmail
No server needed — Cloudflare handles it
Update social links
Both components reference placeholder URLs. Find and replace in two files:

components/marketing/FloatingSideRail.tsx
components/marketing/Footer.tsx
Replace:

https://linkedin.com/company/velur → your real LinkedIn URL
https://x.com/velur_io → your real X handle URL
Add blog posts
Posts live in lib/posts.ts as a TypeScript array. Add entries there. When you have 3+ posts, add Blog back to the nav in components/marketing/Header.tsx.

Pages
Route	File
/	app/(marketing)/page.tsx
/services	app/(marketing)/services/page.tsx
/case-studies	app/(marketing)/case-studies/page.tsx
/company	app/(marketing)/company/page.tsx
/contact	app/(marketing)/contact/page.tsx
/blog	app/(marketing)/blog/page.tsx

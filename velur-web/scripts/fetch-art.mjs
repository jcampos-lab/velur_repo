// Downloads the approved Velur brand art (river / dunes / delta family)
// into public/art/.
// Run from velur-web/:  node scripts/fetch-art.mjs
// Requires Node 18+ (uses built-in fetch).

import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "art");
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3DElr7VkSa8VYOB2OZVPXqeGL0d";

const ASSETS = [
  // ── Hero pair (homepage hero) ───────────────────────────────────────────
  { file: "hero-river-wide.png", url: `${CDN}/hf_20260609_213905_2e359bcf-4b9c-4655-9944-af582f5c1350.png` },
  { file: "hero-river-wide.mp4", url: `${CDN}/hf_20260609_214102_aeb98018-d956-49cc-a532-7a0aafbcc965.mp4` },
  // ── Confluence pair (homepage CTA band) ─────────────────────────────────
  { file: "confluence-y.png", url: `${CDN}/hf_20260609_213918_b5e1c522-9283-4378-af60-97c93c78e031.png` },
  { file: "confluence-y.mp4", url: `${CDN}/hf_20260609_214115_d4df8ebc-e599-4bda-b07f-d903f01c638e.mp4` },
  // ── Capability cards (homepage Signals / Forecast / Risk) ───────────────
  { file: "delta-signals.png",  url: `${CDN}/hf_20260609_213233_617d3283-f1c8-4e98-bed3-07366e146417.png` },
  { file: "delta-forecast.png", url: `${CDN}/hf_20260609_213244_d6828d24-3ff4-4c70-98b6-e8e4cdf64358.png` },
  { file: "delta-risk.png",     url: `${CDN}/hf_20260609_213258_eb194e40-9dd3-4249-8142-d47c4b9723eb.png` },
  // ── Dark hero cards & bands (subpages) ──────────────────────────────────
  { file: "dunes-hero.png",  url: `${CDN}/hf_20260609_213209_5a59793c-a2bf-4c5f-9b3c-6beba6501a9c.png` },  // Services hero card
  { file: "dunes-cta.png",   url: `${CDN}/hf_20260609_213221_6d5e8dc0-6917-43e4-8f1d-ff611c3ea953.png` },  // Contact hero card
  { file: "dunes-quiet.png", url: `${CDN}/hf_20260609_213334_a976f84f-6c98-4ff6-b602-d572e7efbd42.png` },  // FAQ hero card
  { file: "dunes-wide.jpg",  url: `${CDN}/hf_20260609_212907_30d33499-7204-4f0c-ab3d-e6c7f155fada.jpeg` }, // Services "how it works" card
  // ── Image bands (light pages) ───────────────────────────────────────────
  { file: "delta-aerial.png", url: `${CDN}/hf_20260609_212937_d8da5119-046c-4fab-983f-780dc482947a.png` }, // Company band
  { file: "delta-spiral.png", url: `${CDN}/hf_20260609_213321_3cacaf8c-bed2-4334-832f-b1fab302b759.png` }, // Customers band
  // ── OG / share image + Integrations CTA backdrop ────────────────────────
  { file: "dunes-og.png", url: `${CDN}/hf_20260609_213308_f225b62e-fc71-4f4b-842e-638c10784c4c.png` },
];

await mkdir(outDir, { recursive: true });

for (const { file, url } of ASSETS) {
  process.stdout.write(`Downloading ${file} … `);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED (${res.status})`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(join(outDir, file), Buffer.from(await res.arrayBuffer()));
  console.log("done");
}

console.log(`\nSaved to ${outDir}`);
console.log("Optional: strip audio + optimize the mp4s for web (needs ffmpeg):");
console.log(
  '  for f in public/art/*.mp4; do ffmpeg -i "$f" -an -c:v libx264 -crf 23 -movflags +faststart "${f%.mp4}-web.mp4"; done'
);

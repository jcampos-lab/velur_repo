"use client";

import { useEffect, useRef } from "react";

interface Graph3DProps {
  className?: string;
  width?: number;
  height?: number;
  forceTheme?: "light" | "dark";
}

const HEIGHTS = [
  [0.30, 0.65, 0.45, 0.38],
  [0.72, 0.48, 0.90, 0.55],
  [0.42, 0.58, 0.32, 0.80],
  [0.68, 0.35, 0.60, 0.50],
];

const ACCENTS: boolean[][] = [
  [false, false, false, false],
  [false, false, true,  false],
  [false, false, false, true ],
  [true,  false, false, false],
];

export default function Graph3D({
  className = "",
  width = 480,
  height = 360,
  forceTheme,
}: Graph3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const resolveTheme = (): "light" | "dark" => {
      if (forceTheme) return forceTheme;
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    };

    const W = width;
    const H = height;
    const MAX_H   = 2.8;
    const BAR_W   = 0.62;
    const SPACING = 1.82;
    const X_TILT  = 0.36;
    const FOV     = H * 1.25;
    const CAM_Z   = 8.5;
    const CX      = W * 0.5;
    const CY      = H * 0.63;
    const GRID_SZ = 3.5;

    type P3 = [number, number, number];

    function transform(p: P3, yAngle: number): P3 {
      const cy = Math.cos(yAngle), sy = Math.sin(yAngle);
      const x1 =  p[0] * cy + p[2] * sy;
      const y1 =  p[1];
      const z1 = -p[0] * sy + p[2] * cy;
      const cx2 = Math.cos(X_TILT), sx2 = Math.sin(X_TILT);
      return [x1, y1 * cx2 - z1 * sx2, y1 * sx2 + z1 * cx2];
    }

    function proj(p: P3): [number, number] {
      const z = p[2] + CAM_Z;
      if (z <= 0.01) return [CX, CY];
      const s = FOV / z;
      return [p[0] * s + CX, p[1] * s + CY];
    }

    function quad(pts: [number,number][], fill: string, stroke: string, lw: number) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    function drawBar(bx: number, bz: number, h: number, angle: number, accent: boolean, dark: boolean) {
      const hw = BAR_W / 2;
      const bh = h * MAX_H;
      const raw: P3[] = [
        [bx-hw, -bh, bz-hw],[bx+hw, -bh, bz-hw],[bx+hw, -bh, bz+hw],[bx-hw, -bh, bz+hw],
        [bx-hw,   0, bz-hw],[bx+hw,   0, bz-hw],[bx+hw,   0, bz+hw],[bx-hw,   0, bz+hw],
      ];
      const pp = raw.map(p => proj(transform(p, angle)));

      if (accent) {
        const base  = "rgba(31,122,77,";
        quad([pp[0],pp[1],pp[5],pp[4]], base+"0.75)", base+"0.4)", 0.6);
        quad([pp[1],pp[2],pp[6],pp[5]], base+"0.50)", base+"0.3)", 0.6);
        quad([pp[0],pp[1],pp[2],pp[3]], base+"0.95)", base+"0.5)", 0.6);
      } else if (dark) {
        quad([pp[0],pp[1],pp[5],pp[4]], "rgba(240,237,232,0.18)", "rgba(240,237,232,0.10)", 0.5);
        quad([pp[1],pp[2],pp[6],pp[5]], "rgba(240,237,232,0.09)", "rgba(240,237,232,0.07)", 0.5);
        quad([pp[0],pp[1],pp[2],pp[3]], "rgba(240,237,232,0.28)", "rgba(240,237,232,0.12)", 0.5);
      } else {
        quad([pp[0],pp[1],pp[5],pp[4]], "rgba(245,242,236,0.90)", "rgba(26,26,26,0.10)", 0.5);
        quad([pp[1],pp[2],pp[6],pp[5]], "rgba(217,214,207,0.70)", "rgba(26,26,26,0.07)", 0.5);
        quad([pp[0],pp[1],pp[2],pp[3]], "rgba(255,255,255,0.95)", "rgba(26,26,26,0.12)", 0.5);
      }
    }

    function drawGrid(angle: number, dark: boolean) {
      const col = dark ? "rgba(240,237,232,0.09)" : "rgba(26,26,26,0.07)";
      ctx.strokeStyle = col;
      ctx.lineWidth = 0.5;
      const steps = 8;
      for (let i = 0; i <= steps; i++) {
        const t = -GRID_SZ + (2 * GRID_SZ / steps) * i;
        const a = proj(transform([ t,       0, -GRID_SZ], angle));
        const b = proj(transform([ t,       0,  GRID_SZ], angle));
        const c = proj(transform([-GRID_SZ, 0,  t],       angle));
        const d = proj(transform([ GRID_SZ, 0,  t],       angle));
        ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(c[0],c[1]); ctx.lineTo(d[0],d[1]); ctx.stroke();
      }
    }

    let angle = 0;

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const dark = resolveTheme() === "dark";
      angle += 0.0022;
      drawGrid(angle, dark);

      const rows = HEIGHTS.length;
      const cols = HEIGHTS[0].length;
      const ox = ((cols - 1) * SPACING) / 2;
      const oz = ((rows - 1) * SPACING) / 2;

      type E = { bx:number; bz:number; h:number; accent:boolean; depth:number };
      const entries: E[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING - ox;
          const bz = r * SPACING - oz;
          const t  = transform([bx, 0, bz], angle);
          entries.push({ bx, bz, h: HEIGHTS[r][c], accent: ACCENTS[r][c], depth: t[2] });
        }
      }
      entries.sort((a, b) => b.depth - a.depth);
      for (const e of entries) drawBar(e.bx, e.bz, e.h, angle, e.accent, dark);

      rafRef.current = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, forceTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className={className}
      aria-hidden="true"
    />
  );
}

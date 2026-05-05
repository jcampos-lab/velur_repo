import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE_VELUR = "cubic-bezier(0.16, 1, 0.3, 1)";

export function heroLineReveal(elements: Element[], onComplete?: () => void) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = prefersReduced ? 0 : 0.6;
  const stagger = prefersReduced ? 0 : 0.1;

  gsap.set(elements, { clipPath: "inset(0 100% 0 0)" });

  const tl = gsap.timeline({ onComplete });
  tl.to(elements, {
    clipPath: "inset(0 0% 0 0)",
    duration,
    stagger,
    ease: EASE_VELUR,
  });

  return tl;
}

export function amberLineReveal(element: Element, delay = 0.8) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = prefersReduced ? 0 : 0.6;

  gsap.set(element, { clipPath: "inset(0 100% 0 0)" });
  gsap.to(element, {
    clipPath: "inset(0 0% 0 0)",
    duration,
    delay: prefersReduced ? 0 : delay,
    ease: EASE_VELUR,
  });
}

export function countUp(
  element: Element,
  target: number,
  duration = 1.2,
  formatter?: (n: number) => string
) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: prefersReduced ? 0 : duration,
    ease: "power3.out",
    onUpdate: () => {
      if (formatter) {
        element.textContent = formatter(obj.val);
      } else {
        element.textContent = Math.round(obj.val).toString();
      }
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
  });
}

export function fadeUp(elements: Element | Element[], options?: gsap.TweenVars) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return gsap.fromTo(
    elements,
    { opacity: 0, y: prefersReduced ? 0 : 24 },
    {
      opacity: 1,
      y: 0,
      duration: prefersReduced ? 0 : 0.5,
      ease: EASE_VELUR,
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start: "top 85%",
        once: true,
      },
      ...options,
    }
  );
}

export function fadeUpStagger(parent: Element, childSelector: string, stagger = 0.08) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const children = parent.querySelectorAll(childSelector);

  gsap.fromTo(
    children,
    { opacity: 0, y: prefersReduced ? 0 : 24 },
    {
      opacity: 1,
      y: 0,
      duration: prefersReduced ? 0 : 0.5,
      stagger: prefersReduced ? 0 : stagger,
      ease: EASE_VELUR,
      scrollTrigger: {
        trigger: parent,
        start: "top 80%",
        once: true,
      },
    }
  );
}

export function drawLine(lineElement: Element) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.fromTo(
    lineElement,
    { scaleX: 0, transformOrigin: "left" },
    {
      scaleX: 1,
      duration: prefersReduced ? 0 : 0.8,
      ease: EASE_VELUR,
      scrollTrigger: {
        trigger: lineElement,
        start: "top 85%",
        once: true,
      },
    }
  );
}

export function headerOnScroll(headerEl: HTMLElement) {
  const update = () => {
    const scrolled = window.scrollY > 80;
    if (scrolled) {
      headerEl.style.backgroundColor = "rgba(255,255,255,0.85)";
      headerEl.style.backdropFilter = "blur(12px)";
      (headerEl.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "blur(12px)";
    } else {
      headerEl.style.backgroundColor = "rgba(255,255,255,1)";
      headerEl.style.backdropFilter = "none";
      (headerEl.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "none";
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  return () => window.removeEventListener("scroll", update);
}

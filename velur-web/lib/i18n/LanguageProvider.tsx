"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Lang, type T } from "./translations";

interface LanguageCtx { t: T; lang: Lang; setLang: (l: Lang) => void }

const Ctx = createContext<LanguageCtx>({
  t: translations.en,
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("velur-lang") as Lang | null;
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    localStorage.setItem("velur-lang", l);
    setLangState(l);
  };

  return (
    <Ctx.Provider value={{ t: translations[lang], lang, setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLanguage = () => useContext(Ctx);

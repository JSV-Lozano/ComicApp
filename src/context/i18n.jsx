import { Children, createContext, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import es from "../traslations/es.json";
import en from "../traslations/en.json";

const I18nContext = createContext();

const languages = { es, en };

function I18NProvider({ children }) {
  const { locale } = useRouter();

  const t = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];
      if (args.length === 0) return translation;

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index + 1}}`, value);
      });

      return translation;
    },
    [locale]
  );
  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}
export { I18NProvider };

export function useI18N() {
  /* const {t} = useContext(I18nContext)
    return t; */
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useU18N must be used within a I18NProvider");
  }
  return context;
}

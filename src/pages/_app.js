import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { Layaout } from "@components/Layaout";
import { I18NProvider, useI18N } from "context/i18n";
import "@styles/globals.css";

const DefaultHeadApp = () => {
  const { t } = useI18N();

  return (
    <Head>
      <title>{t("SEO_DEFAULT_TITLE")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layaout>
        <I18NProvider>
          <DefaultHeadApp />
          <Component {...pageProps} />
        </I18NProvider>
      </Layaout>
    </NextUIProvider>
  );
}

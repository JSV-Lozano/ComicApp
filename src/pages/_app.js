import "@styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Layaout } from "@components/Layaout";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layaout>
        <Component {...pageProps} />
      </Layaout>
    </NextUIProvider>
  );
}

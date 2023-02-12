import React from "react";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      {/* <ContextProvider> */}
      <Component {...pageProps} />
      <Footer />
      {/* </ContextProvider> */}
    </React.StrictMode>
  );
}

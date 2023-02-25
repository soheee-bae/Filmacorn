import React from "react";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const { genre } = pageProps;

  return (
    <React.StrictMode>
      {/* <ContextProvider> */}
      <Navbar genre={genre} />
      <Component {...pageProps} />
      <Footer />
      {/* </ContextProvider> */}
    </React.StrictMode>
  );
}

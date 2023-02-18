import React from "react";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const { Genre } = pageProps;

  return (
    <React.StrictMode>
      {/* <ContextProvider> */}
      <Navbar genre={Genre} />
      <Component {...pageProps} />
      <Footer />
      {/* </ContextProvider> */}
    </React.StrictMode>
  );
}

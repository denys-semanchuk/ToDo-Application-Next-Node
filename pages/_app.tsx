import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store/index";
import { AppProvider } from "providers/AppProvider";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import "../styles/globals.css";
import Head from "next/head";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "react-hot-toast";

const Header = dynamic(
  () => import("components/Header/Header").then((mod) => mod.Header),
  {
    ssr: false,
    loading: () => <div className="h-16 bg-white shadow-sm" />,
  }
);

const Footer = dynamic(
  () => import("components/Footer/Footer").then((mod) => mod.Footer),
  {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-50" />,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={GeistSans.className}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
      </Head>
      <Toaster />
      <Provider store={store}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
                <Component {...pageProps} />
              </Suspense>
            </main>
            <Footer />
          </div>
        </AppProvider>
      </Provider>
    </div>
  );
}

export default MyApp;

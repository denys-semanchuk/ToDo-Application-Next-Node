import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store/index';
import { AppProvider } from 'providers/AppProvider';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
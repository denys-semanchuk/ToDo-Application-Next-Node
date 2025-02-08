import { AppProps } from 'next/app';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './../app/store/index';
import { AuthProvider } from 'providers/AuthProvider';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
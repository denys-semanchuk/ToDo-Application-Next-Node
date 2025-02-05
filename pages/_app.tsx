import { AppProps } from 'next/app';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from './../app/store/index';
import { AuthProvider } from 'providers/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
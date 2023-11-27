import CoffeeStoreProvider from '@/context/coffee-stores';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <CoffeeStoreProvider>
      <Component {...pageProps} />
    </CoffeeStoreProvider>
  );
}

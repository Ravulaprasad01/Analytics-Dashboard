import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className='flex flex-col bg-slate-800 text-white min-h-screen'>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp

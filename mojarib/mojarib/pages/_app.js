import Head from 'next/head';

import '../styles/globals.css';
import { Header, Footer } from '../components';
import AuthContextProvider from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <Head>
                <title>Mojarib</title>
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </AuthContextProvider>
    );
}

export default MyApp;

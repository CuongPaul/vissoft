import "@fortawesome/fontawesome-svg-core/styles.css"
import "../scss/style.default.scss"
import Layout from "../components/Layout"
import AuthContextProvider from "../contexts/AuthContext";
import PageLoaderProvider from "../contexts/PageLoaderContext";
import {PagePreloader} from "../components/PagePreloader";
import ToastContextProvider from "../contexts/ToastContext";
import {Notification} from "../components/Notification";
import React from "react";
import { SSRProvider } from "react-bootstrap"

function App({ Component, pageProps }) {
  return (
      <SSRProvider>
          <PageLoaderProvider>
              <AuthContextProvider>
                  <ToastContextProvider>
                      <Notification />
                      <PagePreloader />
                      <Layout {...pageProps}>
                          <Component {...pageProps} />
                      </Layout>
                  </ToastContextProvider>
              </AuthContextProvider>
          </PageLoaderProvider>
      </SSRProvider>

  )
}

export default App

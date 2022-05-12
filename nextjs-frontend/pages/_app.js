import "../styles/global.scss";
import Layout from "../components/Layout";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (

      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    
  );
}

export default MyApp;

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import { archivo } from "@/lib/fonts";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  /* Enter-only fade: with an exit animation the old page stays on screen while the router resets the scroll,
     so it would visibly jump or scroll from its old position. The hash is left out of the key so #anchor links
     on the same page don't remount it. */
  return (
    <div className={`app-root ${archivo.variable}`}>
      {getLayout(
        <motion.div
          key={router.asPath.split("#")[0]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="page-transition"
        >
          <Component {...pageProps} />
        </motion.div>
      )}
    </div>
  );
}

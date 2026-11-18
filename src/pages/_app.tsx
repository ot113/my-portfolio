import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { ReactNode } from "react";
import { archivo } from "@/lib/fonts";
import { usePageFade } from "@/hooks/usePageFade";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  usePageFade();

  /* The old page fades out before navigating (usePageFade), so the scroll reset happens while it is invisible;
     the new page fades in here. The hash is left out of the key so #anchor links on the same page don't remount it. */
  return (
    <div className={`app-root ${archivo.variable}`}>
      {getLayout(
        <div key={router.asPath.split("#")[0]} className="page-transition">
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

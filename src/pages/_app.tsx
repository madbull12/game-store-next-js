// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Layout>
        <Component {...pageProps} />

      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

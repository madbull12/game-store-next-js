// src/pages/_app.tsx
import "../styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import AuthWrapper from "../components/AuthWrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: 1000 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 1000 },
  };
  const client = new QueryClient();



  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              transition={{
                type: "spring",
              }}
              key={router.route}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

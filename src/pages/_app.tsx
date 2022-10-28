// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x:1000  },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 1000},
  };
  return (
    <SessionProvider session={session}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Layout>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            transition={{
              type:"spring"
            }}
            key={router.route}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exitState"
          >
            <Component {...pageProps} />

          </motion.div>

        </AnimatePresence>

      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

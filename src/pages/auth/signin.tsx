import { useAnimation } from "framer-motion";
import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import Body from "../../components/Body";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-x-8">
      <div className="  absolute top-0 left-0 hidden h-screen w-1/2 lg:block">
        <Image
          src="/images/gta-v.jpg"
          alt="gta-5"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 bottom-0 right-0 left-0  flex items-center justify-center bg-[#0000009c] text-white">
          <AnimatedText />
        </div>
      </div>

      <div className="hidden flex-[0.5] lg:block"></div>
      <div className="mx-auto flex max-w-xl flex-1 flex-col justify-center space-y-6  lg:flex-[0.5] lg:justify-start">
        <Link href="/" className="text-center text-xl font-bold text-white lg:text-start">
          NXTGAME.
        </Link>
        <div className="block lg:hidden">
        <AnimatedText />

        </div>
        <p className="text-center text-gray-400">Sign in with</p>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: `http://localhost:3000/`,
            })
          }
          className="rounded-md bg-purple-700 px-3 py-2 text-xl font-bold  text-white transition-all duration-200  ease-in-out md:px-6 md:py-4 "
        >
          Google
        </button>
        <button
          onClick={() =>
            signIn("discord", {
              callbackUrl: `http://localhost:3000/`,
            })
          }
          className="rounded-md bg-purple-700 px-3 py-2 text-xl font-bold  text-white transition-all duration-200  ease-in-out md:px-6 md:py-4 "
        >
          Discord
        </button>
      </div>
    </div>
  );
};

const AnimatedText = () => {
  const text = "Start your gaming journey today!"; 

  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };
  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  return (
    <h1 className="text-center text-3xl lg:text-5xl   font-bold text-white">
      {text.split(" ").map((word, index) => {
        return (
          <motion.span
            ref={ref}
            className="whitespace-nowrap inline-block mr-[0.25em]"
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <motion.span
                className="inline-block mr-[-0.05em]"
                  aria-hidden="true"
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </h1>
  );
};
export default SignInPage;

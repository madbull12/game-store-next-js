import { AnimatePresence, useScroll } from "framer-motion";
import React from "react";
import { useCartMenu, useSearchModal } from "../../lib/zustand";
import CartItems from "./CartItems";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Sidebar from "./Sidebar";
import ReactTooltip from "react-tooltip";
import AnimatedModal from "./AnimatedModal";
interface IProps {
  children: React.ReactNode;
}
const Layout = ({ children }: IProps) => {
  const { isOpen } = useCartMenu();
  const { scrollYProgress } = useScroll();
  const { isOpen: searchOpen } = useSearchModal();

  return (
    <AnimatePresence
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      exitBeforeEnter={true}
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      <ReactTooltip />
      <ProgressBar progress={scrollYProgress} />

      <div className="bg-primary p-4">
        <Sidebar />
        <div className="px-2 pt-2">
          <Header />
          {isOpen && <CartItems />}
          {searchOpen ? <AnimatedModal /> : null}
        </div>
        {children}
      </div>
    </AnimatePresence>
  );
};

export default Layout;

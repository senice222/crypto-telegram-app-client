"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface AnimatedLayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -50,
  },
};

const pageTransition = {
  type: "tween",
  duration: 0.3,
};

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          style={{ position: "absolute", width: "100%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

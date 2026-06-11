import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "p" | "h1" | "h2" | "h3";
  once?: boolean;
}

export function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealWords({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

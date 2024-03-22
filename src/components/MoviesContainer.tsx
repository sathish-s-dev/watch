import { motion } from "framer-motion";
import { ReactNode } from "react";
import { movieContainerVariants } from "@/lib/animation/variants";

export function MovieContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={movieContainerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-y-20 pt-8"
    >
      {children}
    </motion.div>
  );
}

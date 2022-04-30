import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";

export default function Layout({ children }) {
  return (
    <motion.div className="" key={children.route} layout>
      <HeaderComponent />

      <main className="relative">{children}</main>

      <div className="">
        <FooterComponent />
      </div>
    </motion.div>
  );
}

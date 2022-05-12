import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import { Cursor } from "../components/Cursor";
export default function Layout({ children }) {
  return (
    <div className="app" key={children.route}>
      <Cursor/>
      <HeaderComponent />

          <main className="">{children}</main>
      
      <FooterComponent />
    </div>
  );
}

import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";
import { Cursor } from "../components/Cursor";
export default function Layout({ children }) {
  const [innermouseState, setinnerMouseState] = useState('default');
  const [outermouseState, setouterMouseState] = useState('default');
  const outermouseVariants = {
    default: {
      scale: 1,
    },
    hovering:{
      scale: [1.2,1.5],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat:Infinity,
      }
    },
  }
  const innermouseVariants = {
    default: {
      scale: 0,
      
    },
    clicked:{
      scale: 4,
      
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
      
    },
    hovering : {
      scale: [0,1.1,0,2],
      backgroundColor: "hsla(292, 100%, 100%, 0.18)",
      transition:{
        repeat:Infinity,
        duration: 2,
      }
    }
  }
  const mouseHoverNav = () => {
    setinnerMouseState('hovering');
  }
  const mouseOffhoverNav = () => {
    setinnerMouseState('default');
  }
  return (
    <div className="app" key={children.route}>
      <Cursor innerVariants={innermouseVariants} innercursorVariants={innermouseState} outerVariants={outermouseVariants} outercursorVariants={outermouseState}/>
      <HeaderComponent onEnter={mouseHoverNav} onLeave={mouseOffhoverNav}/>
          <main className="">{children}</main>
      <FooterComponent />
    </div>
  );
}

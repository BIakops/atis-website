import {
  motion,
  useTransform,
  useViewportScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useState, useLayoutEffect, useRef } from "react";
//create a parallax const expression that accepts children and a speed prop
const Parallax = ({ children, speed }) => {
  //create a ref to the parallax container

  //create the parallax effect
  const { scrollYProgress } = useViewportScroll();
  const yValue = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);


  
  return (
    <motion.div style={{y:yValue}} exit={{opacity:1}}>
      {children}
    </motion.div>
  );
};

export default Parallax;

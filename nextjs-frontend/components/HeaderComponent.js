import Link from "next/link";
import {useState,useEffect} from 'react';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import { motion } from "framer-motion";
import styles from '../styles/header.module.scss';
import { IconContext } from "react-icons";
const HeaderComponent = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.app__navbar}>
        <div className={styles.app__navbarlogo}>
          <Link href='/'>
            <h1>ATIS</h1>
          </Link>
        </div>
        <ul className={styles.app__navbarlinks}>
            {['about','ai','updates'].map((item)=>(
            <li className='app__flex p-text' key = {`link-${item}`}>
                <div/>
                <a href={`/${item}`}>{item}</a>
            </li>))}
        </ul>
        <div className={styles.app__navbarmenu}>
            <HiMenuAlt4 onClick={()=> setToggle(true)}/>
            {
                toggle && (
                    <motion.div
                        whileInView={{x:[300,0]}}
                        transition={{duration:0.85,ease:'easeOut'}}
                        
                    >   
                        
                        <HiX onClick={()=>setToggle(false)} color="black"/>
                        
                        <ul>
                            {['about','ai','updates'].map((item)=>(
                            <li key = {item}>
                                <a href={`/${item}`} onClick={()=>setToggle(false)}>
                                    {item}
                                </a>
                            </li>))}
                        </ul>
                    </motion.div>
                )
            }
        </div>
    </nav>
  );
};
export default HeaderComponent;

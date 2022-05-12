import React,{useEffect,useState} from 'react'
import styles from './Cursor.module.scss'
import { motion } from 'framer-motion'
const Cursor = () => {
  const [mPos, setMPos] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    const mouseMove = (event) =>{
      setMPos({
        x: event.clientX,
        y: event.clientY,
      })
    }
    window.addEventListener('mousemove', mouseMove)
    // return () => {
    //   window.removeEventListener('mousemove', mouseMove)
    // }
  },[])
  const variants = {
    default:{
      x:mPos.x-20,
      y:mPos.y-20,
    }
  }
  return (
    <motion.div className={styles.app__outercursor} variants={variants} animate='default'>
        <div>

        </div>
    </motion.div>
  )
}

export default Cursor
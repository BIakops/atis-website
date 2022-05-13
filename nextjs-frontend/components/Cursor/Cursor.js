import React,{useEffect,useState, useRef} from 'react'
import styles from './Cursor.module.scss'
import { animate, motion } from 'framer-motion'
const Cursor = ({innerVariants,innercursorVariants,outerVariants,outercursorVariants}) => {

  const cursorRef = useRef(null)
  //track the position on the screen
  
  //update every frame
  useEffect(()=>{
    
    document.addEventListener('mousemove', (event)=>{
      const {clientX, clientY} = event
      if ( clientX != null && clientY != null) {
      const mouseX = clientX - cursorRef.current.clientWidth / 2
      const mouseY = clientY - cursorRef.current.clientHeight / 2
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px,0)`
      }else{
        cursorRef.current.style.transform = `translate3d(0, 0,0)`
      }
    })
    
  },[])
  return (
    <motion.div 
     className={styles.app__outercursor} 
     ref={cursorRef}
     variants={outerVariants}
     transition={{
          
      duration: 0.2,
      type: 'spring',
      damping: 20
    
  
      }}
      animate={outercursorVariants}
    >
      <motion.div
        className={styles.app__innercursor}
        variants={innerVariants}
        transition={{
          
            duration: 0.2,
            type: 'spring',
            damping: 20
          
        
        }}
        animate={innercursorVariants}

      />
    </motion.div>
  )
}

export default Cursor
"use client";


import React from 'react'
import {motion} from "framer-motion";


function Header({children}: {children: React.ReactNode}) {
  return (
    <motion.div 
    initial={{opacity: 0, y: 0}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.4}}
    >
      {children}
    </motion.div>
  )
}

export default Header
"use client"

import React from 'react'
import {motion} from 'framer-motion'

function SubHeader({children}: {children: React.ReactNode}) {
  return (
    <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.2 , delay: 0.3}}
    >
    {children}
    </motion.div>
  )
}

export default SubHeader
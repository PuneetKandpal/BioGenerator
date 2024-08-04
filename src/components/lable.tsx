import { cn } from '@/lib/utils'
import React from 'react'

function Label({children , className}: {children: React.ReactNode , className?: string}) {
  return (
    <label
    className={cn("text-sm sm:text-base font-medium text-gray-700", className)}
    >{children}</label>
  )
}

export default Label
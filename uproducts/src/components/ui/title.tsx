import { cn } from '@/lib/utils'
import React from 'react'

function Title({text}:{text:string}) {
  return (
    <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary my-4">{text}</h1>
  )
}

export default Title
"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from "next-themes"

const Home = () => {
    const { theme, setTheme } = useTheme()
  return (
    <div>Home
      <Button onClick={()=>setTheme("light")}>Light</Button>
      <Button onClick={()=>setTheme("dark")}>Dark</Button>
    </div>
  )
}

export default Home
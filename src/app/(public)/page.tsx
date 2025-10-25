"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigation } from '@/store/NavigationContext'

const Home = () => {
  const {navigate} = useNavigation()

  return (
    <div className=" flex justify-center items-center min-h-screen  w-full bg-[url('/svgs/background.svg')] bg-repeat bg-contain ">
      <Button onClick={()=>navigate("/dashboard")} className='cursor-pointer'>Go to Dashboard</Button>
    </div>
  )
}

export default Home
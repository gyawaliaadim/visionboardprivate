
"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState, useEffect } from "react";
import { useNavigation } from "@/store/NavigationContext";
export function Loading({ children }: { children: ReactNode }) {
    const [mounted, setmounted] = useState(false)
    const { isNavigating } = useNavigation()
    const { status } = useSession()

    useEffect(() => {
        setmounted(true)
    }, [])
    if (!mounted) { return null }


    return (
        (status === "loading" || isNavigating) ? (
            <div className="bg-[url('/svgs/background.svg')] bg-repeat bg-contain  flex justify-center items-center w-full h-screen gap-5 cursor-progress">

                <div className="animate-spin rounded-full h-6 w-6 border-t-3 border-b-3 border-gray-300"></div>
                <div className='text-2xl text-black dark:text-white'>Loading</div>
            </div>)
            :
            (
                <div className="flex flex-col w-full min-h-screen justify-center items-center">

                    {children}
                </div>)
    )
}
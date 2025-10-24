"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface NavBarProps {
    className?: string;
}

export default function NavBar({ className }: NavBarProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    if (status == "loading") return <div>Loading</div>
    const pagesList=[
        {path:"/", label:"Home"}
        
    ]
    const navLinkClasses = (href: string) =>
        `flex items-center justify-center py-2 px-3 rounded-sm transition-colors font-extrabold
        hover:text-red-700 ${pathname === href ? "dark:text-red-400 text-red-500" : "dark:text-white text-black"}`;

    return (
        <nav className={`sticky top-0 z-50 flex w-full justify-around text-black dark:text-white bg-white dark:bg-black p-2 xs:p-5 shadow-2xl dark:shadow-2xl shadow-red-200 dark:shadow-gray-700 ${className}`}>
            {/* Logo */}
            <div>
                <Image
                    src="/svgs/logo.svg"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />
            </div>

            {/* Navigation Links */}
            <ul className="flex w-[200px] justify-around">
                <li>
                    <Link href="/" className={navLinkClasses("/")} aria-current={pathname === "/" ? "page" : undefined}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className={navLinkClasses("/about")} aria-current={pathname === "/about" ? "page" : undefined}>
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/demo" className={navLinkClasses("/demo")} aria-current={pathname === "/demo" ? "page" : undefined}>
                        Demo
                    </Link>
                </li>
            </ul>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="rounded-full w-[40px] h-[40px] focus:ring-4 focus:ring-gray-300 cursor-pointer flex text-sm bg-gray-800 ">
                        <Image
                            // src={profilePic}
                            src={"https://avatars.githubusercontent.com/u/110762518?v=4&size=64"}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel >
                        <div className="flex flex-col">
                            <div className="text-2xl font-extrabold">

                                {session?.user?.name}
                            </div>
                            <div className="text-gray-600 ">

                                {session?.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Actions */}
            <div className="flex items-center justify-center gap-1 xs:gap-5">
                {session && status == "authenticated" ? (<div></div>

                ) : (
                    <Button
                        variant="default"
                        size="lg"
                        className="text-lg font-bold bg-red-700 text-white rounded-2xl hover:bg-red-800 cursor-pointer"
                    >
                        Sign in
                    </Button>

                )}
            </div>
        </nav>
    );
}

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
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface NavBarProps {
    className?: string;
}

export default function NavBar({ className }: NavBarProps) {
    const { data: session, status } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [name, setName] = useState("");

    if (status == "loading") return <div>Loading</div>

    const navLinkClasses = (href: string) =>
        `flex items-center justify-center py-2 px-3 rounded-sm transition-colors font-extrabold
        hover:text-red-700 ${pathname === href ? "dark:text-red-500 text-red-900" : "dark:text-white text-black"}`;

    const profileName = name != "" ? name : session?.user?.name;
    const profilePic = session?.user?.image || "/assets/default-profile.jpg";

    return (
        <nav className={`sticky top-0 z-50 flex w-full justify-around text-black dark:text-white bg-white dark:bg-black p-2 xs:p-5 shadow-2xl dark:shadow-2xl shadow-red-200 dark:shadow-gray-700 ${className}`}>
            {/* Logo */}
            <div>
                <Image
                    src="/logo.svg"
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
                        -=_=
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

            {/* Actions */}
            <div className="flex items-center justify-center gap-1 xs:gap-5">
                {session && status=="authenticated" ? (
                    <div className="relative flex items-center">
                        <button
                            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 cursor-pointer"
                            aria-expanded={dropdownOpen}
                        >
                            <Image
                                src={profilePic}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </button>

                        {/* {dropdownOpen && (
                            <div className="absolute right-0 top-12 z-50 text-base list-none bg-white text-black divide-y divide-gray-100 rounded-lg shadow-lg">
                                <div className="px-4 py-3 w-full">
                                    <span className="block text-sm font-semibold">{profileName}</span>
                                    <span className="block text-sm text-gray-500 truncate">{session ? session?.user?.email : ""}</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <Link href={`/dashboard`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )} */}
                        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

                    </div>
                ) : (
                    <button
                        onClick={() => router.push("/signin")}
                        className="transition-colors duration-300 ease-in-out flex xs:h-12 xs:w-30 h-10 w-20 items-center justify-center rounded-2xl bg-red-500 hover:bg-red-600 text-center text-[15px] xs:text-[20px] font-bold text-black cursor-pointer"
                    >
                        Sign in
                    </button>
                )}
            </div>
        </nav>
    );
}

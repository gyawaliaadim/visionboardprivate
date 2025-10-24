"use client"
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust based on your component library
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust based on your component library
import { useNavigation } from '@/app/store/NavigationContext';
import { useTheme } from "next-themes";

export default function Navbar({ className }: { className?: string }) {
  const { data: session, status  } = useSession();
    const { theme, setTheme } = useTheme();
//   const router = useRouter();
  const pathname = usePathname(); // Replace with usePathname() if using Next.js App Router
    const { isNavigating, navigate } = useNavigation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
  ];

  const navLinkClasses = (href: string) =>
    `flex items-center justify-center py-2 px-3 rounded-sm transition-colors font-extrabold cursor-pointer
     ${status === "loading" ? "text-gray-500 pointer-events-none" : `hover:text-red-700 ${pathname === href ? "dark:text-red-400 text-red-500" : "dark:text-white text-black"}`}`;

  return (
    <nav
      className={`sticky top-0 z-50 flex w-full justify-around text-black dark:text-white bg-white dark:bg-black p-2 xs:p-5 shadow-2xl dark:shadow-2xl shadow-red-200 dark:shadow-gray-700 ${className}`}
    >
      {/* Logo */}
      <div>
        <Image
          src="/svgs/logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className={`cursor-pointer ${status === "loading" ? "opacity-50 pointer-events-none" : ""}`}
          onClick={status === "loading" ? undefined : () => navigate("/")}
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex w-[200px] justify-around">
        {navLinks.map((link, index) => (
          <li key={index}>
            <p
              onClick={()=>navigate(link.href)}
              className={navLinkClasses(link.href)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </p>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center justify-center gap-1 xs:gap-5">
        {status === "loading" ? (
          <Button
            variant="default"
            size="lg"
            className="text-lg font-bold bg-red-700 text-white rounded-2xl opacity-50 cursor-not-allowed"
            disabled
          >
            Sign in
          </Button>
        ) : session && status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded-full w-10 h-10 focus:ring-2 focus:ring-gray-300 cursor-pointer flex items-center justify-center bg-gray-800 overflow-hidden"
                aria-label="User menu"
              >
                <Image
                  src={session?.user?.image || "https://avatars.githubusercontent.com/u/110762518?v=4&size=64"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span className="text-lg font-bold">{session?.user?.name}</span>
                <span className="text-sm text-gray-500 truncate">{session?.user?.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log("Go to settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            size="lg"
            className="text-lg font-bold bg-red-700 text-white rounded-2xl hover:bg-red-800 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </Button>
        )}
            <button
      onClick={toggleTheme}
      className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Image
        src={theme === 'dark' ? '/svgs/light_theme.svg' : '/svgs/dark_theme.svg'}
        alt={theme === 'dark' ? 'Light mode icon' : 'Dark mode icon'}
        width={24}
        height={24}
      />
    </button>
      </div>
    </nav>
  );
}
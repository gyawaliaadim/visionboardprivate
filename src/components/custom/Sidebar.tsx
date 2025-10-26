"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiHome, FiShoppingCart, FiFolder, FiSettings, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigation } from "@/store/NavigationContext";
import clsx from "clsx";
import ToggleTheme from "./ToggleTheme";
type SidebarProps = {
  storageKey?: string;
};

export default function Sidebar({ storageKey = "app.sidebar.open" }: SidebarProps) {
  const [open, setOpen] = useState<boolean>(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) setOpen(raw === "true");
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(open));
    } catch {}
  }, [open, storageKey]);



  return (
    <aside
      className={`transition-all flex flex-col justify-between duration-300  bg-white dark:bg-black text-black dark:text-white border-r border-red-900/60 dark:border-red-500/10 ease-in ${open ? "w-64" : "w-16"} h-screen`}
      aria-expanded={open}
    >
      <div>
      {/* Top Section */}
      <div className={clsx(`flex items-center px-3 py-3 h-14 shrink-0`,
        {
          'justify-between':open,
          'justify-center':!open
        }
      )}>
              {open &&
        <div className=" flex jsutify-center items-center pt-4 pb-4 cursor-pointer">
        <div className="flex items-center gap-2"
        onClick={()=>navigate('/')}>
              <Image
                src="/svgs/logo.svg"
                alt="Logo"
                width={30}
                height={30}
                className={`cursor-pointer ${status === "loading" ? "opacity-50 pointer-events-none" : ""}`}
                onClick={status === "loading" ? undefined : () => navigate("/")}
              />
       <div className="leading-5 text-lg font-semibold select-none">Vision Board</div>
          </div>
        </div>
       }

        <div className="flex items-center gap-2">
          <button
            aria-label={open ? "Close sidebar" : "Open sidebar"}
            onClick={() => setOpen(prev => !prev)}
            className="p-1 rounded-md cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/50"
          >
            {open ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="px-2 shrink-0">
        <ul className="space-y-1">
          <li className={clsx("flex justify-center items-center gap-2",
          {
            'justify-start':open,
            'justify-center':!open
          })
          }>
            <div className=" px-2">

<ToggleTheme padding={1} width={18} className={""}/>{open&&<> Theme</>}
            </div>

            </li>
          <li>
            <button
              onClick={() => navigate("/dashboard")}
              className={`flex items-center gap-3 rounded-md px-2 py-2 hover:bg-red-50 dark:hover:bg-red-900/50  w-full cursor-pointer ${open ? "" : "justify-center"}`}
            >
              <FiHome size={18} />
              {open && <span className="truncate">Dashboard</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/dashboard/rewards")}
              className={`flex items-center gap-3 rounded-md px-2 py-2 hover:bg-red-50 dark:hover:bg-red-900/50 cursor-pointer w-full ${open ? "" : "justify-center"}`}
            >
              <FiShoppingCart size={18} />
              {open && <span className="truncate">Rewards</span>}
            </button>
          </li>
          <li>
            <div className=" border-t my-2 border-red-600/10 dark:border-red-500/10" />
          </li>
        </ul>
      </nav>

      </div>
      {/* Settings Section */}
      <div className="shrink-0 border-t border-red-600/10 w-full flex p-5 justify-center items-center dark:border-red-500/10">
        <button
          onClick={() => navigate("/dashboard/settings")}
          className={`flex items-center gap-3 rounded-2xl cursor-pointer px-2 py-3 w-full hover:bg-red-50 dark:hover:bg-red-900/50  ${open ? "" : "justify-center"}`}
        >
          <FiSettings size={18} />
          {open && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}

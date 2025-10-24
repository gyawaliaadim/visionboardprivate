
"use client";
import { NavigationProvider } from "@/store/NavigationContext";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {


  return (

    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    // disableTransitionOnChange
    >
      <SessionProvider>
        <NavigationProvider>

          {children}
        </NavigationProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}

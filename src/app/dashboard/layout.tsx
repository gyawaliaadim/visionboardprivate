
import Sidebar from "@/components/custom/Sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Dashboard',
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
       {children}
      
    </div>

  );
}

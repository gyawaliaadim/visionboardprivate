
import Sidebar from "@/components/custom/Sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex max-h-screen w-full">

      <Sidebar />
      <div className="overflow-y-auto flex w-full">

       {children}
      </div>
      
    </div>

  );
}

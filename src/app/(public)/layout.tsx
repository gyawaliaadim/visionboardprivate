import Topbar from "@/components/custom/Topbar";
import Footer from "@/components/custom/Footer";
import Loading from "@/app/(public)/loading"
import { Suspense } from "react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading/>}>
    <div className="flex flex-col  min-h-screen w-full ">
      <Topbar  />

      <div className="flex flex-col justify-center items-center h-full w-full">
       {children}
      <Footer/>
      </div>
      
    </div>
    </Suspense>

  );
}

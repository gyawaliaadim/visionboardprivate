import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  min-h-screen w-full ">
      <NavBar  />

      <div className="flex justify-center items-center h-full w-full">
      <Loading>

       {children}
      <Footer/>
      </Loading>
      </div>
      
    </div>

  );
}

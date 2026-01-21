import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ClerkProvider} from "@clerk/nextjs";
import Chatbot from "@/components/Chatbot";
//import ZaloButton from "@/components/ZaloButton";

export const metadata: Metadata = {
  title:
  {
    template: "%s - Shopcart online store",
    default:"Shopcart online store"
  } ,
  description: "Shopcart online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
        <main className="flex-1">{children}</main>
        <Footer />
           
              <Chatbot />
              {/* <ZaloButton /> */}
            
        </div>
    </ClerkProvider>
  );
}

import type React from "react";
import "./globals.css";
// import { GeistSans } from "geist/font/sans"
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Blogosphere | Modern Blogging Platform",
   description: "Share your thoughts with the world in style",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={` antialiased`}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <AuthProvider>
                  <div className="flex flex-col min-h-screen">
                     <Navbar />
                     <main className="flex-grow">{children}</main>
                     <Footer />
                     <Toaster />
                  </div>
               </AuthProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { PenSquare, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Navbar() {
   const { data: session } = useSession();
   const { theme, setTheme } = useTheme();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

   return (
      <motion.nav
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         className="sticky top-0 z-50 backdrop-blur-lg border-b bg-background/80"
      >
         <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
               <Link
                  href="/"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
               >
                  Blogosphere
               </Link>

               <div className="hidden md:flex items-center gap-4">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                     }
                  >
                     <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                     <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                     <span className="sr-only">Toggle theme</span>
                  </Button>

                  {session ? (
                     <>
                        <Button asChild variant="ghost">
                           <Link href="/blog">Blog</Link>
                        </Button>
                        <Button asChild>
                           <Link href="/blog/create">
                              <PenSquare className="mr-2 h-4 w-4" />
                              Write
                           </Link>
                        </Button>
                        <Button variant="outline" onClick={() => signOut()}>
                           Sign Out
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button asChild variant="ghost">
                           <Link href="/blog">Blog</Link>
                        </Button>
                        <Button asChild variant="outline">
                           <Link href="/auth/signin">Sign In</Link>
                        </Button>
                        <Button asChild>
                           <Link href="/auth/signup">Sign Up</Link>
                        </Button>
                     </>
                  )}
               </div>

               <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                     {isMenuOpen ? (
                        <X className="h-6 w-6" />
                     ) : (
                        <Menu className="h-6 w-6" />
                     )}
                  </Button>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         {isMenuOpen && <MobileMenu />}
      </motion.nav>
   );
}

function MobileMenu() {
   const { data: session } = useSession();
   const { theme, setTheme } = useTheme();

   return (
      <div className="md:hidden">
         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button asChild variant="ghost" className="w-full justify-start">
               <Link href="/blog">Blog</Link>
            </Button>
            {session ? (
               <>
                  <Button
                     asChild
                     variant="ghost"
                     className="w-full justify-start"
                  >
                     <Link href="/blog/create">
                        <PenSquare className="mr-2 h-4 w-4" />
                        Write
                     </Link>
                  </Button>
                  <Button
                     variant="ghost"
                     onClick={() => signOut()}
                     className="w-full justify-start"
                  >
                     Sign Out
                  </Button>
               </>
            ) : (
               <>
                  <Button
                     asChild
                     variant="ghost"
                     className="w-full justify-start"
                  >
                     <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button
                     asChild
                     variant="ghost"
                     className="w-full justify-start"
                  >
                     <Link href="/auth/signup">Sign Up</Link>
                  </Button>
               </>
            )}
            <Button
               variant="ghost"
               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
               className="w-full justify-start"
            >
               <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               {/* <span className="ml-2">Toggle theme</span> */}
            </Button>
         </div>
      </div>
   );
}

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export function Footer() {
   return (
      <footer className="bg-background border-t">
         <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About Blogosphere</h3>
                  <p className="text-sm text-muted-foreground">
                     Blogosphere is a modern blogging platform where ideas come
                     to life. Share your thoughts, connect with readers, and be
                     part of a vibrant community.
                  </p>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                     <li>
                        <Link
                           href="/"
                           className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="/blog"
                           className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                           Blog
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                     <li>
                        <Link
                           href="#"
                           className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                           Privacy Policy
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="#"
                           className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                           Terms of Service
                        </Link>
                     </li>
                     <li>
                        <Link
                           href="#"
                           className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                           Cookie Policy
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-semibold mb-4">
                     Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                     >
                        <Facebook size={20} />
                        <span className="sr-only">Facebook</span>
                     </Link>
                     <Link
                        href="https://x.com/oyeinbomo"
                        className="text-muted-foreground hover:text-primary transition-colors"
                     >
                        <Twitter size={20} />
                        <span className="sr-only">Twitter</span>
                     </Link>
                     <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                     >
                        <Instagram size={20} />
                        <span className="sr-only">Instagram</span>
                     </Link>
                     <Link
                        href="https://github.com/Oyeins-GUI"
                        className="text-muted-foreground hover:text-primary transition-colors"
                     >
                        <Github size={20} />
                        <span className="sr-only">GitHub</span>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center">
               <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Blogoosphere. All rights
                  reserved.
               </p>
            </div>
         </div>
      </footer>
   );
}

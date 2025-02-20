"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PenLine, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
   return (
      <div className="relative">
         {/* Hero Section */}
         <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/50 bg-grid-small-white/50 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
            <div className="container mx-auto px-4 pt-20 pb-32">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-8"
               >
                  <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                     Share Your Story With The World
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                     Join our community of creative minds and share your
                     thoughts, ideas, and experiences through beautifully
                     crafted blog posts.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                     <Button asChild size="lg" className="group">
                        <Link href="/blog">
                           Explore Posts
                           <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                     </Button>
                     <Button asChild size="lg" variant="outline">
                        <Link href="/auth/signin">Start Writing</Link>
                     </Button>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Features Section */}
         <div className="container mx-auto px-4 py-24">
            <div className="grid md:grid-cols-3 gap-8">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-card border shadow-lg hover:shadow-xl transition-shadow"
               >
                  <PenLine className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                     Express Yourself
                  </h3>
                  <p className="text-muted-foreground">
                     Write and format your posts with our intuitive editor.
                     Support for rich media and markdown.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-card border shadow-lg hover:shadow-xl transition-shadow"
               >
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                     Engage & Connect
                  </h3>
                  <p className="text-muted-foreground">
                     Build your audience through meaningful interactions and
                     discussions.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl bg-card border shadow-lg hover:shadow-xl transition-shadow"
               >
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Reach Global</h3>
                  <p className="text-muted-foreground">
                     Share your content with readers from around the world.
                  </p>
               </motion.div>
            </div>
         </div>
      </div>
   );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { Blog } from "@/supbase";

export default function BlogListing() {
   const [blogs, setBlogs] = useState<Blog[]>([]);

   useEffect(() => {
      const getBlogs = async () => {
         const { data, error } = await supabase.from("blogs").select("*");

         if (error) {
            console.error(error);
            return;
         }

         setBlogs(data);
      };
      getBlogs();
   }, []);

   return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
         >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
               Latest Blog Posts
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
               Discover insightful articles on web development, design, and
               technology.
            </p>
         </motion.div>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
               <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                  <Card className="h-full flex flex-col">
                     <CardHeader>
                        <div className="text-sm text-muted-foreground mb-2">
                           {blog.category}
                        </div>
                        <CardTitle className="text-xl sm:text-2xl">
                           {blog.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                           {blog.excerpt}
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="flex-grow">
                        <div className="flex items-center text-sm text-muted-foreground">
                           <User className="mr-2 h-4 w-4" />
                           {blog.author}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                           <Calendar className="mr-2 h-4 w-4" />
                           {formatDistanceToNow(blog?.created_at)} ago
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button asChild className="w-full group">
                           <Link href={`/blog/${blog.id}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                           </Link>
                        </Button>
                     </CardFooter>
                  </Card>
               </motion.div>
            ))}
         </div>
      </div>
   );
}

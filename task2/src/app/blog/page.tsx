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

// This is mock data. In a real app, you'd fetch this from an API or database.
const posts = [
   {
      id: 1,
      title: "The Future of Web Development",
      excerpt:
         "Exploring the latest trends and technologies shaping the future of web development.",
      author: "Jane Doe",
      date: "2023-05-15",
      category: "Technology",
   },
   {
      id: 2,
      title: "Mastering React Hooks",
      excerpt:
         "A comprehensive guide to using React Hooks for state management and side effects.",
      author: "John Smith",
      date: "2023-05-10",
      category: "Programming",
   },
   {
      id: 3,
      title: "The Art of Minimalist Design",
      excerpt:
         "How to create stunning user interfaces using minimalist design principles.",
      author: "Emily Johnson",
      date: "2023-05-05",
      category: "Design",
   },
   // Add more mock posts here...
];

export default function BlogListing() {
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
            {posts.map((post, index) => (
               <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                  <Card className="h-full flex flex-col">
                     <CardHeader>
                        <div className="text-sm text-muted-foreground mb-2">
                           {post.category}
                        </div>
                        <CardTitle className="text-xl sm:text-2xl">
                           {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                           {post.excerpt}
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="flex-grow">
                        <div className="flex items-center text-sm text-muted-foreground">
                           <User className="mr-2 h-4 w-4" />
                           {post.author}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                           <Calendar className="mr-2 h-4 w-4" />
                           {post.date}
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button asChild className="w-full group">
                           <Link href={`/blog/${post.id}`}>
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

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function SignUp() {
   const router = useRouter();
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      console.log("form data", formData);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const user = { name, email, password };

      console.log(user);

      try {
         const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         });

         if (res.ok) {
            setIsLoading(false);
            router.push("/auth/signin");
         }
      } catch (error) {
         console.error(error);
         toast({
            title: "Signup error",
            description: "Something went wrong",
            draggable: true,
            duration: 3000,
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="container mx-auto px-4 py-16">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
         >
            <Card className="border-2">
               <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">
                     Create an account
                  </CardTitle>
                  <CardDescription>
                     Sign up to start sharing your thoughts with the world
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  {error && (
                     <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg mb-4"
                     >
                        {error}
                     </motion.div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <div className="relative">
                           <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              className="pl-9"
                              required
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="m@example.com"
                              className="pl-9"
                              required
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                           <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input
                              id="password"
                              name="password"
                              type="password"
                              className="pl-9"
                              required
                           />
                        </div>
                     </div>
                     <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                     >
                        {isLoading ? (
                           <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                           </>
                        ) : (
                           "Sign Up"
                        )}
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </motion.div>
      </div>
   );
}

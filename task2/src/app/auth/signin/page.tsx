"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
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
import { useSession } from "next-auth/react";

export default function SignIn() {
   const router = useRouter();
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { data: session } = useSession();

   useEffect(() => {
      if (session) {
         router.push("/blog");
      }
   }, [session, router]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const response = await signIn("credentials", {
         email: formData.get("email"),
         password: formData.get("password"),
         redirect: false,
      });

      if (response?.error) {
         console.error("sign in ", response?.error);
         setError("Invalid credentials");
         setIsLoading(false);
      } else {
         router.push("/blog");
         router.refresh();
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
                     Welcome back
                  </CardTitle>
                  <CardDescription>
                     Sign in to your account to continue
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
                              Signing in...
                           </>
                        ) : (
                           "Sign In"
                        )}
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </motion.div>
      </div>
   );
}

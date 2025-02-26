import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            const { email, password } = credentials ?? {};

            if (!email || !password)
               throw new Error("Email and password are required");

            const { data: user, error } = await supabase
               .from("users")
               .select("*")
               .eq("email", email)
               .single();

            if (error || !user) throw new Error("User does not exist");

            const isValidPassword = await bcrypt.compare(
               password,
               user.password
            );

            if (!isValidPassword) throw new Error("Invalid password");

            return { id: user.id, email: user.email, name: user.name };
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.sub = user.id;
         }
         return token;
      },
      async session({ session }) {
         return session;
      },
   },
   pages: {
      signIn: "/auth/signin",
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

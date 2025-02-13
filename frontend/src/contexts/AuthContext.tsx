import { useState } from "react";
import { AuthContext } from "../constants";
import { User } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [authErr, setAuthErr] = useState<string | null>(null);
   const navigate = useNavigate();

   const login = async (email: string, password: string) => {
      try {
         const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
         });

         if (res.ok) {
            const user: User = await res.json();
            setUser(user);
            navigate("/");
         } else {
            const errorMsg: { message: string } = await res.json();
            toast(errorMsg.message);
            setAuthErr(errorMsg.message);
         }
      } catch (error) {
         toast("Internal server error");
         console.error(error);
      }
   };

   const signup = async (email: string, password: string, username: string) => {
      try {
         const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
         });

         if (res.ok) {
            await login(email, password);
         } else {
            const errorMsg: { message: string } = await res.json();
            toast(errorMsg.message);
            setAuthErr(errorMsg.message);
         }
      } catch (error) {
         console.error("sign up error", error);
      }
   };

   const logout = async () => {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
      });

      if (res.ok) {
         setUser(null);
      } else {
         toast("Failed to logout, try again");
      }
   };

   const updateUserData = async (newUserData: Partial<User>) => {
      try {
         const res = await fetch("http://localhost:8080/api/user/update", {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newUserData),
         });

         if (res.ok) {
            const newUser = await res.json();
            setUser(newUser);
         } else {
            const errorMsg: { message: string } = await res.json();
            toast(errorMsg.message);
         }
      } catch (error) {
         console.error("user updated error", error);
      }
   };

   return (
      <AuthContext.Provider
         value={{ user, login, signup, logout, updateUserData, authErr }}
      >
         {children}
      </AuthContext.Provider>
   );
}

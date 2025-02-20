import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      const { name, email, password } = await req.json();

      console.log({ name, email, password });

      const { data: existingUser } = await supabase
         .from("users")
         .select("*")
         .eq("email", email)
         .single();

      if (existingUser)
         return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
         );

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error } = await supabase
         .from("users")
         .insert([{ name, email, password: hashedPassword }]);

      if (error) throw error;

      return NextResponse.json({ message: "user created" }, { status: 201 });
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Something went wrong" },
         { status: 500 }
      );
   }
}

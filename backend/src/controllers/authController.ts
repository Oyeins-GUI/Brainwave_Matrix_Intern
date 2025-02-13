import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkRecordExists, insertRecord, updateRecord } from "../sql";
import { User } from "../types";
import { v4 as uuid } from "uuid";

export const signup = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
         res.status(400).json({
            message: "Email, username or password cannot be empty",
         });
      }

      const existingUser = await checkRecordExists("users", "email", email);

      if (existingUser) {
         res.status(400).json({ message: "User already exists" });
         return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const id = uuid();

      const result = await insertRecord<User>("users", {
         id,
         email,
         username,
         password: hashedPassword,
      });
      console.log(result);

      res.status(201).json({ id });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
   }
};

export const login = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res
            .status(400)
            .json({ error: "Email or password fields cannot be empty!" });
      }

      const existingUser = await checkRecordExists<User>(
         "users",
         "email",
         email
      );

      if (!existingUser) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordMatch = await bcrypt.compare(
         password,
         existingUser.password
      );
      if (!isPasswordMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
         { id: existingUser.id },
         process.env.JWT_SECRET as string,
         { expiresIn: "1d", algorithm: "HS256" }
      );

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
         id: existingUser.id,
         email: existingUser.email,
         username: existingUser.username,
         currency: existingUser.currency,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
   }
};

export const logout = (req: Request, res: Response): void => {
   res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
   });

   res.json({ message: "Logged out successfully" });
};

export async function updateUserData(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const newUserData = req.body;

      if (!newUserData?.id) {
         res.status(400).json({ message: "User ID is required" });
         return;
      }

      const existingUser = await checkRecordExists<User>(
         "users",
         "id",
         newUserData.id
      );

      if (!existingUser) {
         res.status(404).json({ message: "User not found" });
         return;
      }

      delete newUserData.id;

      if (Object.keys(newUserData).length === 0) {
         res.status(400).json({ message: "No fields to update" });
         return;
      }

      await updateRecord("users", newUserData, {
         column: "id",
         value: existingUser?.id,
      });

      const newUser = await checkRecordExists<User>(
         "users",
         "id",
         existingUser.id
      );

      if (newUser) {
         res.status(200).json({
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            currency: newUser.currency,
         });
      } else {
         res.status(400).json({ message: "Something went wrong" });
      }
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
   }
}

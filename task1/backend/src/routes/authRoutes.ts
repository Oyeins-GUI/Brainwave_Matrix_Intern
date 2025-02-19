import express from "express";
import {
   signup,
   login,
   logout,
   updateUserData,
} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.patch("/update", updateUserData);

export default router;

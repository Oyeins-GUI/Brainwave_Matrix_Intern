import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
// import expenseRoutes from "./routes/expenseRoutes"
// import budgetRoutes from "./routes/budgetRoutes"
// import userRoutes from "./routes/userRoutes"

dotenv.config();

const app = express();

app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/expenses", expenseRoutes)
// app.use("/api/budgets", budgetRoutes)
// app.use("/api/user", userRoutes)

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

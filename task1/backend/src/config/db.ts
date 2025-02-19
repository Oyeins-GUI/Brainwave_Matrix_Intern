import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
});

export const connectDB = async () => {
   pool.connect((err) => {
      if (err) {
         console.error("Error connecting to the database:", err.stack);
         return;
      }
      console.log("Connected to MySQL Database");
   });
};

export default pool;

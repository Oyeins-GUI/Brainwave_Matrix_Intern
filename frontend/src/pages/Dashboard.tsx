import { motion } from "framer-motion";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { Edit2, Trash2, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import type React from "react"; // Import React
import { useAuth } from "../hooks/useAuth";
import { currencies, CurrencyType } from "../constants";

function Dashboard() {
   const { user } = useAuth();
   // Mock data
   const financialData = {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      remainingBudget: 0,
   };

   const expenseData = [
      { category: "Food", amount: 0 },
      { category: "Transport", amount: 0 },
      { category: "Entertainment", amount: 0 },
      { category: "Utilities", amount: 0 },
      { category: "Rent", amount: 0 },
   ];

   const transactions = [
      {
         id: 1,
         date: "2023-05-01",
         category: "Food",
         description: "Groceries",
         amount: 0,
      },
      {
         id: 2,
         date: "2023-05-02",
         category: "Income",
         description: "Salary",
         amount: 0,
      },
      {
         id: 3,
         date: "2023-05-03",
         category: "Transport",
         description: "Gas",
         amount: 0,
      },
   ];

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username}!</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <FinancialCard
               title="Total Balance"
               amount={financialData.totalBalance}
               icon={<Wallet size={32} />}
            />
            <FinancialCard
               title="Monthly Income"
               amount={financialData.monthlyIncome}
               icon={<TrendingUp size={32} />}
            />
            <FinancialCard
               title="Monthly Expenses"
               amount={financialData.monthlyExpenses}
               icon={<TrendingDown size={32} />}
            />
         </div>
         <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="category" />
                     <YAxis />
                     <Tooltip />
                     <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
         <div>
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-right">Amount</th>
                        <th className="p-2 text-center">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {transactions.map((transaction) => (
                        <tr
                           key={transaction.id}
                           className="border-b dark:border-gray-700"
                        >
                           <td className="p-2">{transaction.date}</td>
                           <td className="p-2">{transaction.category}</td>
                           <td className="p-2">{transaction.description}</td>
                           <td
                              className={`p-2 text-right ${
                                 transaction.amount >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                              }`}
                           >
                              {transaction.amount.toFixed(2)}
                           </td>
                           <td className="p-2 text-center">
                              <button className="text-blue-500 hover:text-blue-700 mr-2">
                                 <Edit2 size={16} />
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                 <Trash2 size={16} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </motion.div>
   );
}

function FinancialCard({
   title,
   amount,
   icon,
}: {
   title: string;
   amount: number;
   icon: React.ReactNode;
}) {
   const { user } = useAuth();
   console.log(user);
   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
         <div className="mr-2 text-blue-500">{icon}</div>
         <div className="flex items-center mb-2 flex flex-col items-start">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-2xl font-bold">
               {currencies[user?.currency as CurrencyType]}
               {amount.toFixed(2)}
            </p>
         </div>
      </div>
   );
}
export default Dashboard;

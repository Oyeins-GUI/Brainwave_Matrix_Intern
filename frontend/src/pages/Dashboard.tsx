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
import {
   Edit2,
   Trash2,
   Wallet,
   TrendingUp,
   TrendingDown,
   PiggyBank,
} from "lucide-react";
import type React from "react"; // Import React

function Dashboard() {
   // Mock data
   const financialData = {
      totalBalance: 5000,
      monthlyIncome: 3000,
      monthlyExpenses: 2000,
      remainingBudget: 1000,
   };

   const expenseData = [
      { category: "Food", amount: 500 },
      { category: "Transport", amount: 300 },
      { category: "Entertainment", amount: 200 },
      { category: "Utilities", amount: 400 },
      { category: "Rent", amount: 1000 },
   ];

   const transactions = [
      {
         id: 1,
         date: "2023-05-01",
         category: "Food",
         description: "Groceries",
         amount: -100,
      },
      {
         id: 2,
         date: "2023-05-02",
         category: "Income",
         description: "Salary",
         amount: 3000,
      },
      {
         id: 3,
         date: "2023-05-03",
         category: "Transport",
         description: "Gas",
         amount: -50,
      },
   ];

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <FinancialCard
               title="Total Balance"
               amount={financialData.totalBalance}
               icon={<Wallet size={24} />}
            />
            <FinancialCard
               title="Monthly Income"
               amount={financialData.monthlyIncome}
               icon={<TrendingUp size={24} />}
            />
            <FinancialCard
               title="Monthly Expenses"
               amount={financialData.monthlyExpenses}
               icon={<TrendingDown size={24} />}
            />
            <FinancialCard
               title="Remaining Budget"
               amount={financialData.remainingBudget}
               icon={<PiggyBank size={24} />}
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

const FinancialCard: React.FC<{
   title: string;
   amount: number;
   icon: React.ReactNode;
}> = ({ title, amount, icon }) => (
   <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
         <div className="mr-2 text-blue-500">{icon}</div>
         <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
   </div>
);

export default Dashboard;

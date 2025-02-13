import { useState } from "react";
import { motion } from "framer-motion";
import {
   LineChart,
   Line,
   PieChart,
   Pie,
   Cell,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Legend,
} from "recharts";
import { Download } from "lucide-react";

function Reports() {
   const [dateRange, setDateRange] = useState("month");
   const [category, setCategory] = useState("all");

   // Mock data
   const trendData = [
      { date: "2023-05-01", expenses: 100 },
      { date: "2023-05-02", expenses: 150 },
      { date: "2023-05-03", expenses: 80 },
      { date: "2023-05-04", expenses: 200 },
      { date: "2023-05-05", expenses: 120 },
   ];

   const categoryData = [
      { name: "Food", value: 500 },
      { name: "Transport", value: 300 },
      { name: "Entertainment", value: 200 },
      { name: "Utilities", value: 400 },
      { name: "Rent", value: 1000 },
   ];

   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

   const exportData = () => {
      // TODO: Implement export functionality
      console.log("Exporting data...");
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-3xl font-bold mb-6">Reports</h1>
         <div className="mb-6 flex flex-wrap gap-4">
            <select
               value={dateRange}
               onChange={(e) => setDateRange(e.target.value)}
               className="px-3 py-2 border rounded"
            >
               <option value="week">Last Week</option>
               <option value="month">Last Month</option>
               <option value="year">Last Year</option>
            </select>
            <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="px-3 py-2 border rounded"
            >
               <option value="all">All Categories</option>
               <option value="food">Food</option>
               <option value="transport">Transport</option>
               <option value="entertainment">Entertainment</option>
               <option value="utilities">Utilities</option>
               <option value="rent">Rent</option>
            </select>
            <button
               onClick={exportData}
               className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
            >
               <Download size={16} className="mr-2" />
               Export Data
            </button>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
               <h2 className="text-2xl font-bold mb-4">Expense Trend</h2>
               <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                           type="monotone"
                           dataKey="expenses"
                           stroke="#8884d8"
                        />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
            <div>
               <h2 className="text-2xl font-bold mb-4">Expenses by Category</h2>
               <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={categoryData}
                           cx="50%"
                           cy="50%"
                           labelLine={false}
                           outerRadius={80}
                           fill="#8884d8"
                           dataKey="value"
                           label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                           }
                        >
                           {categoryData.map((entry, index) => (
                              <Cell
                                 key={`cell-${index}`}
                                 fill={COLORS[index % COLORS.length]}
                              />
                           ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      </motion.div>
   );
}

export default Reports;

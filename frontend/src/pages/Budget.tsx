import { useState } from "react";
import { motion } from "framer-motion";

function Budget() {
   const [budgets, setBudgets] = useState([
      { category: "Food", limit: 500, spent: 300 },
      { category: "Transport", limit: 300, spent: 250 },
      { category: "Entertainment", limit: 200, spent: 180 },
      { category: "Utilities", limit: 400, spent: 350 },
      { category: "Rent", limit: 1000, spent: 1000 },
   ]);

   const handleLimitChange = (index: number, newLimit: number) => {
      const updatedBudgets = [...budgets];
      updatedBudgets[index].limit = newLimit;
      setBudgets(updatedBudgets);
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-3xl font-bold mb-6">Budget</h1>
         <div className="grid gap-6">
            {budgets.map((budget, index) => (
               <div
                  key={budget.category}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
               >
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold">
                        {budget.category}
                     </h2>
                     <div className="flex items-center">
                        <span className="mr-2">Limit: $</span>
                        <input
                           type="number"
                           value={budget.limit}
                           onChange={(e) =>
                              handleLimitChange(index, Number(e.target.value))
                           }
                           className="w-24 px-2 py-1 border rounded"
                        />
                     </div>
                  </div>
                  <div className="mb-2">
                     <div className="flex justify-between text-sm mb-1">
                        <span>Spent: ${budget.spent}</span>
                        <span>Remaining: ${budget.limit - budget.spent}</span>
                     </div>
                     <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                           className={`h-full ${getProgressBarColor(
                              budget.spent / budget.limit
                           )}`}
                           style={{
                              width: `${(budget.spent / budget.limit) * 100}%`,
                           }}
                        ></div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </motion.div>
   );
}

const getProgressBarColor = (ratio: number) => {
   if (ratio < 0.5) return "bg-green-500";
   if (ratio < 0.75) return "bg-yellow-500";
   return "bg-red-500";
};

export default Budget;

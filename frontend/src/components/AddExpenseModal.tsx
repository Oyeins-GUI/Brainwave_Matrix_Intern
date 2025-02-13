import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AddExpenseModalProps {
   isOpen: boolean;
   onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
   isOpen,
   onClose,
}) => {
   const [type, setType] = useState<"expense" | "income">("expense");
   const [amount, setAmount] = useState("");
   const [category, setCategory] = useState("");
   const [description, setDescription] = useState("");

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: Implement form submission logic
      console.log({ type, amount, category, description });
      onClose();
   };

   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
               <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
               >
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-2xl font-bold">
                        Add {type === "expense" ? "Expense" : "Income"}
                     </h2>
                     <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                     >
                        <X size={24} />
                     </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label className="block mb-2">Type</label>
                        <div className="flex space-x-4">
                           <button
                              type="button"
                              onClick={() => setType("expense")}
                              className={`px-4 py-2 rounded ${
                                 type === "expense"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                              }`}
                           >
                              Expense
                           </button>
                           <button
                              type="button"
                              onClick={() => setType("income")}
                              className={`px-4 py-2 rounded ${
                                 type === "income"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                              }`}
                           >
                              Income
                           </button>
                        </div>
                     </div>
                     <div className="mb-4">
                        <label htmlFor="amount" className="block mb-2">
                           Amount
                        </label>
                        <input
                           type="number"
                           id="amount"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           className="w-full px-3 py-2 border rounded"
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="category" className="block mb-2">
                           Category
                        </label>
                        <input
                           type="text"
                           id="category"
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                           className="w-full px-3 py-2 border rounded"
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="description" className="block mb-2">
                           Description
                        </label>
                        <textarea
                           id="description"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           className="w-full px-3 py-2 border rounded"
                           rows={3}
                        ></textarea>
                     </div>
                     <div className="flex justify-end space-x-4">
                        <button
                           type="button"
                           onClick={onClose}
                           className="px-4 py-2 bg-gray-200 rounded"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export default AddExpenseModal;

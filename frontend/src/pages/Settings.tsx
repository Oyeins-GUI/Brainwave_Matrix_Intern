import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

function Settings() {
   const { theme, toggleTheme } = useTheme();
   const [currency, setCurrency] = useState("USD");
   const [name, setName] = useState("John Doe");
   const [email, setEmail] = useState("john@example.com");

   const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: Implement save functionality
      console.log("Saving settings...");
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3 }}
      >
         <h1 className="text-3xl font-bold mb-6">Settings</h1>
         <form onSubmit={handleSave} className="max-w-md">
            <div className="mb-4">
               <label htmlFor="theme" className="block mb-2 font-medium">
                  Theme
               </label>
               <div className="flex items-center">
                  <span className="mr-2">Light</span>
                  <button
                     type="button"
                     onClick={toggleTheme}
                     className={`w-12 h-6 rounded-full p-1 ${
                        theme === "dark" ? "bg-blue-600" : "bg-gray-300"
                     }`}
                  >
                     <div
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                           theme === "dark" ? "translate-x-6" : ""
                        }`}
                     ></div>
                  </button>
                  <span className="ml-2">Dark</span>
               </div>
            </div>
            <div className="mb-4">
               <label htmlFor="currency" className="block mb-2 font-medium">
                  Currency
               </label>
               <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
               >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
               </select>
            </div>
            <div className="mb-4">
               <label htmlFor="name" className="block mb-2 font-medium">
                  Name
               </label>
               <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
               />
            </div>
            <div className="mb-4">
               <label htmlFor="email" className="block mb-2 font-medium">
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
               />
            </div>
            <button
               type="submit"
               className="px-4 py-2 bg-blue-500 text-white rounded"
            >
               Save Settings
            </button>
         </form>
      </motion.div>
   );
}

export default Settings;

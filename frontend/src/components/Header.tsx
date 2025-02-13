import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import {
   Sun,
   Moon,
   BarChart2,
   PieChart,
   DollarSign,
   User,
   LogOut,
} from "lucide-react";
import type React from "react";

const Header = () => {
   const { theme, toggleTheme } = useTheme();
   const { user, logout } = useAuth();

   return (
      <header className="bg-white dark:bg-gray-800 shadow-md">
         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
               ExpenseTracker
            </Link>
            <nav className="hidden md:flex space-x-4">
               <NavLink to="/" icon={<BarChart2 />} text="Dashboard" />
               <NavLink to="/reports" icon={<PieChart />} text="Reports" />
               <NavLink to="/budget" icon={<DollarSign />} text="Budget" />
               <NavLink to="/settings" icon={<User />} text="Settings" />
            </nav>
            <div className="flex items-center space-x-4">
               <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
               >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
               </motion.button>
               {user && (
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={logout}
                     className="p-2 rounded-full bg-red-500 text-white"
                  >
                     <LogOut size={20} />
                  </motion.button>
               )}
            </div>
         </div>
      </header>
   );
};

const NavLink: React.FC<{
   to: string;
   icon: React.ReactNode;
   text: string;
}> = ({ to, icon, text }) => (
   <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
   >
      {icon}
      <span>{text}</span>
   </Link>
);

export default Header;

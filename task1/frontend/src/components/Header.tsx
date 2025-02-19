import { motion } from "framer-motion";
import { BarChart2, DollarSign, Moon, PieChart, Sun, User } from "lucide-react";
import type React from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <header className="bg-white dark:bg-gray-800 shadow-md">
         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
               TrackIT
            </Link>
            <nav className="hidden md:flex space-x-6">
               <MobileNavLink to="/" icon={<BarChart2 />} text="Dashboard" />
               <MobileNavLink
                  to="/reports"
                  icon={<PieChart />}
                  text="Reports"
               />
               <MobileNavLink
                  to="/budget"
                  icon={<DollarSign />}
                  text="Budget"
               />
               <MobileNavLink to="/settings" icon={<User />} text="Settings" />
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
            </div>
         </div>
      </header>
   );
};

const MobileNavLink: React.FC<{
   to: string;
   icon: React.ReactNode;
   text: string;
}> = ({ to, icon, text }) => (
   <NavLink
      to={to}
      className={({ isActive }) =>
         isActive
            ? "flex items-center space-x-1 text-gray-600 dark:text-gray-300 text-blue-500 dark:text-blue-400"
            : "flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
      }
   >
      {icon}
      <span>{text}</span>
   </NavLink>
);

export default Header;

import type React from "react";
import { Link } from "react-router";
import { BarChart2, PieChart, DollarSign, User } from "lucide-react";

function MobileNavbar() {
   return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
         <div className="flex justify-around py-3">
            <NavLink to="/" icon={<BarChart2 size={24} />} />
            <NavLink to="/reports" icon={<PieChart size={24} />} />
            <NavLink to="/budget" icon={<DollarSign size={24} />} />
            <NavLink to="/settings" icon={<User size={24} />} />
         </div>
      </nav>
   );
}

function NavLink({ to, icon }: { to: string; icon: React.ReactNode }) {
   return (
      <Link
         to={to}
         className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
      >
         {icon}
      </Link>
   );
}

export default MobileNavbar;

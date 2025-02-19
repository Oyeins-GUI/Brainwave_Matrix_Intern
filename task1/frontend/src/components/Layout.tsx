import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import MobileNavBar from "./MobileNavbar";
import AddExpenseModal from "./AddExpenseModal";
import { Plus } from "lucide-react";

type LayoutProps = {
   children: ReactNode;
};

function Layout({ children }: LayoutProps) {
   const [isModalOpen, setIsModalOpen] = useState(false);

   return (
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
         <Header />
         <main className="container mx-auto px-4 py-8">{children}</main>
         <MobileNavBar />
         <motion.button
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
         >
            <Plus size={24} />
         </motion.button>
         <AddExpenseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
         />
      </div>
   );
}

export default Layout;

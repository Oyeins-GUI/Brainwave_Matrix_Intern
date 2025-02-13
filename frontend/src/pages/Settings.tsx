import { motion } from "framer-motion";
import { LogOut, SaveIcon } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

function Settings() {
   const { user, logout, updateUserData } = useAuth();

   const { register, handleSubmit, control } = useForm({
      defaultValues: {
         username: user?.username,
         email: user?.email,
         currency: user?.currency,
      },
   });

   const handleSave: SubmitHandler<{
      username?: string;
      email?: string;
      currency?: string;
   }> = async (data) => {
      if (
         data.email === user?.email &&
         data.username === user?.username &&
         data.currency === user?.currency
      ) {
         toast("No changes were made");
         console.log("dont save");
         return;
      }
      console.log("saving...");
      await updateUserData({ id: user?.id, ...data });
   };

   return (
      <>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
         >
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <form onSubmit={handleSubmit(handleSave)} className="max-w-md">
               <div className="mb-4">
                  <Controller
                     name="currency"
                     rules={{ required: true }}
                     control={control}
                     render={() => (
                        <>
                           <label
                              htmlFor="currency"
                              className="block mb-2 font-medium"
                           >
                              Currency
                           </label>
                           <select
                              id="currency"
                              className="w-full px-3 py-2 border rounded"
                           >
                              <option value="USD">NGN - NG Naira</option>
                              {/* <option value="USD">USD - US Dollar</option>
                           <option value="EUR">EUR - Euro</option>
                           <option value="GBP">GBP - British Pound</option>
                           <option value="JPY">JPY - Japanese Yen</option> */}
                           </select>
                        </>
                     )}
                  ></Controller>
               </div>
               <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-medium">
                     Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     {...register("username", { required: true })}
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
                     {...register("email", { required: true })}
                     className="w-full px-3 py-2 border rounded"
                  />
               </div>
               <div className="flex items-center gap-4">
                  <button
                     type="submit"
                     className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
                  >
                     <SaveIcon />
                     Save Settings
                  </button>
                  <button
                     type="button"
                     className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-2"
                     onClick={logout}
                  >
                     <LogOut size={20} />
                     Logout
                  </button>
               </div>
            </form>
         </motion.div>
         <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
         />
      </>
   );
}

export default Settings;

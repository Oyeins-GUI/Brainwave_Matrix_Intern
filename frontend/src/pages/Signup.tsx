import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

function Signup() {
   const { signup } = useAuth();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm({
      defaultValues: {
         email: "",
         username: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit: SubmitHandler<{
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
   }> = async (data) => {
      const { email, username, password, confirmPassword } = data;
      if (password !== confirmPassword) {
         setError("password", {
            message: "Password must match confirmed password",
         });
         setError("confirmPassword", {
            message: "Confiremd password must match password",
         });
         return;
      }
      await signup(email, username, password);
   };

   return (
      <>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
         >
            <div className="max-w-md w-full space-y-8">
               <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                     Create your account
                  </h2>
               </div>
               <form
                  className="mt-8 space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
                     <div>
                        <label htmlFor="email" className="sr-only">
                           Email address
                        </label>
                        <input
                           id="email"
                           type="email"
                           autoComplete="email"
                           className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-white"
                           placeholder="Email address"
                           {...register("email", {
                              required: "Provide a valid email",
                           })}
                        />
                        {errors.email && (
                           <p className="text-xs text-red-500">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div>
                        <label htmlFor="password" className="sr-only">
                           Password
                        </label>
                        <input
                           id="password"
                           type="password"
                           autoComplete="current-password"
                           className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-white"
                           placeholder="Password"
                           {...register("password", {
                              required: "Password is required",
                              minLength: {
                                 value: 6,
                                 message:
                                    "Password must be at least six(6) characters",
                              },
                           })}
                        />
                        {errors.password && (
                           <p className="text-xs text-red-500">
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                     <div>
                        <label htmlFor="confirm-password" className="sr-only">
                           Confirm Password
                        </label>
                        <input
                           id="confirm-password"
                           type="password"
                           autoComplete="new-password"
                           className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-white"
                           placeholder="Password"
                           {...register("confirmPassword", {
                              required: "Password is required",
                              minLength: {
                                 value: 6,
                                 message:
                                    "Password must be at least six(6) characters",
                              },
                           })}
                        />
                        {errors.confirmPassword && (
                           <p className="text-xs text-red-500">
                              {errors.confirmPassword.message}
                           </p>
                        )}
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        Sign up
                     </button>
                  </div>
               </form>
               <div className="text-center">
                  <Link
                     to="/login"
                     className="font-medium text-blue-600 hover:text-blue-500"
                  >
                     Already have an account? Sign in
                  </Link>
               </div>
            </div>
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

export default Signup;

import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Budget from "./pages/Budget";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
   return (
      <ThemeProvider>
         <AuthProvider>
            <ToastContainer />
            <AnimatePresence mode="wait">
               <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route element={<ProtectedRoute />}>
                     <Route
                        path="/"
                        element={
                           <Layout>
                              <Dashboard />
                           </Layout>
                        }
                     />
                     <Route
                        path="/reports"
                        element={
                           <Layout>
                              <Reports />
                           </Layout>
                        }
                     />
                     <Route
                        path="/budget"
                        element={
                           <Layout>
                              <Budget />
                           </Layout>
                        }
                     />
                     <Route
                        path="/settings"
                        element={
                           <Layout>
                              <Settings />
                           </Layout>
                        }
                     />
                  </Route>
               </Routes>
            </AnimatePresence>
         </AuthProvider>
      </ThemeProvider>
   );
}

export default App;

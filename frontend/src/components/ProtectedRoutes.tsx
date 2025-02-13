import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
   const { user } = useAuth();

   return !user ? <Navigate to="/login" replace /> : <Outlet />;
}

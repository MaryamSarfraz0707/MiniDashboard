import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Prevents UI flickering during authentication check

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

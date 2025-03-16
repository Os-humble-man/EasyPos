import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

const PrivateRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    verifyAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

// src/routes/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
    const { isAuthenticated, rol } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (requiredRole && rol !== requiredRole) return <Navigate to="/unauthorized" replace />;

    return <>{children}</>;
};

export default PrivateRoute;
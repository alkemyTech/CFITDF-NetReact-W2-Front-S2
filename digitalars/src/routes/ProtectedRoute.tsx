import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem("token"); // o estado global

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role: requiredRole }) => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;

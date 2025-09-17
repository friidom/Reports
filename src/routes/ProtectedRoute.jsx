import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { session } = useAuth();
    if (session === undefined) {
        return <div className="loading">Loading...</div>;
    }

    return session ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;

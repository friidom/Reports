import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RootRedirect() {
    const { session } = useAuth();
    if (session === undefined) {
        return <div>Loading...</div>;
    }

    return session ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

export default RootRedirect;
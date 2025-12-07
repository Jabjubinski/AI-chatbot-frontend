import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";
import LoadingCircleSpinner from "./UI/LoadingCircle";

function SafeRoute({ children }: { children: React.ReactNode }) {
    const { isAuth, user, profile, loading } = useAuthStore();

    useEffect(() => {
        if (!user && !loading) {
            profile();
        }
    }, [user, loading, profile]);

    if (loading) return <div className="mx-auto flex w-full justify-center items-center h-screen"><LoadingCircleSpinner/></div>;
    if (!isAuth) return <Navigate to="/login" replace />;

    return <>{children}</>;
}

export default SafeRoute;
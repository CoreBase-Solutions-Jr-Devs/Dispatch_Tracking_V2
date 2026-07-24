import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { authenticationRoutePaths, protectedRoutePaths, unprotectedRoutePaths } from "./common/routes";

const UnprotectedRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const authPaths = authenticationRoutePaths.map((r) => r.path);
    const protectedPaths = protectedRoutePaths.map((r) => r.path);
    const unprotectedPaths = unprotectedRoutePaths.map((r) => r.path);

    // Prevent browser back button leaving this area
    useEffect(() => {
        const handlePopState = () => {
            navigate(location.pathname, { replace: true });
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [location.pathname, navigate]);

    const currentPath = location.pathname;

    // Someone manually typed an auth route
    if (authPaths.includes(currentPath)) {
        return <Navigate to="/" replace />;
    }

    // Someone manually typed a protected route
    if (protectedPaths.includes(currentPath)) {
        return <Navigate to="/404" replace />;
    }

    // Current path isn't one of the allowed public pages
    if (!unprotectedPaths.includes(currentPath)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default UnprotectedRoute;

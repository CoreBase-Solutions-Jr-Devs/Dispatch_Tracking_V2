import { Outlet, Navigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./common/routePath";
import { useSelector } from "react-redux";

const AuthRoute = () => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // Wait until user state is loaded
  if (accessToken === undefined || user === undefined) return null;

  // If user is not authenticated, show auth pages
  if (!accessToken || !user) {
    return <Outlet />;
  }

  // Otherwise redirect to overview
  return <Navigate to={PROTECTED_ROUTES.OVERVIEW} replace />;
};

export default AuthRoute;

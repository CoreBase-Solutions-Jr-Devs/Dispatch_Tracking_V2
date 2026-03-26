import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_ROUTES } from "./common/routePath";

const ProtectedRoute = ({ allowedRoles }) => {
  const { accessToken, user, bcode } = useSelector((state) => state.auth);

  const roles = user?.userrights?.map((item) => item?.moduleArea) || [];

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  // Wait until user state is loaded
  if (accessToken === undefined || user === undefined) return null;

  // Not logged in? redirect to sign-in
  if (!accessToken || !user) {
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
  }

  // No branch selected? redirect to branch selection
  if (!bcode || bcode === 0) {
    return <Navigate to={AUTH_ROUTES.AUTH_BRANCH} replace />;
  }

  // Role not allowed? redirect to unauthorized page
  if (allowedRoles && !hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
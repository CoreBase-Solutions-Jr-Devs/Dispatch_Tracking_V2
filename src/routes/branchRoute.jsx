import { Outlet, Navigate } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./common/routePath";
import { useSelector } from "react-redux";

const BranchRoute = () => {
  const { accessToken, user, bcode } = useSelector((state) => state.auth);

  // Wait until auth state is loaded
  if (accessToken === undefined || user === undefined) return null;

  // If not authenticated, redirect to login
  if (!accessToken || !user) {
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
  }

  // If branch already selected, redirect to overview
  if (bcode && bcode !== 0) {
    return <Navigate to={PROTECTED_ROUTES.OVERVIEW} replace />;
  }

  // Otherwise, show branch selection page
  return <Outlet />;
};

export default BranchRoute;
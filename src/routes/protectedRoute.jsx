import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_ROUTES } from "./common/routePath";

const ProtectedRoute = ({ allowedRoles }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // let rights = user["userrights"]?.map((item) => item?.moduleCode);

  const role = user?.userrights?.map((item) => item?.moduleArea)[0] || "";

  // Wait until user state is loaded
  if (accessToken === undefined || user === undefined) return null;

  // Not logged in? redirect to sign-in
  if (!accessToken || !user) {
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
  }

  // Role not allowed? redirect to unauthorized page
  // if (allowedRoles && !allowedRoles.includes(user.userRole)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
  if (allowedRoles && !allowedRoles.join(" ").includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

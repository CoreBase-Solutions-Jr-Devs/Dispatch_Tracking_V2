import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  authenticationRoutePaths,
  branchRoutePath,
  protectedRoutePaths, 
  unprotectedRoutePaths,
} from "./common/routes";
import NotFound from "@/pages/not_found/NotFound";
import AppLayout from "@/layouts/app-layout";
import BaseLayout from "@/layouts/base-layout";
import AuthRoute from "./authRoute";
import ProtectedRoute from "./protectedRoute";
import UnAuthorized from "@/pages/unAuthorized";
import UnprotectedRoute from "./unprotectedRoute";

function AppRoutes() {
  // useAuthExpiration();

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthRoute />}>
          <Route element={<BaseLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        {/* Branch Selection Route - requires auth but not branch selection */}
        {branchRoutePath.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child, index) => (
              <Route
                key={child.path || index}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}

        {/* Protected Routes - requires both auth AND branch selection */}
        {protectedRoutePaths.map((route) => (
          <Route
            key={route.path}
            element={<ProtectedRoute allowedRoles={route.roles} />}
          >
            <Route element={<AppLayout />}>
              <Route path={route.path} element={route.element} />
            </Route>
          </Route>
        ))}

        {/* Unprotected Routes */}
        <Route element={<UnprotectedRoute />}>
          <Route element={<BaseLayout />}>
            {unprotectedRoutePaths.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>

        <Route path="/404" element={<NotFound />} />
        {/* Catch-all for undefined routes */}
        <Route path="*" element={<UnAuthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

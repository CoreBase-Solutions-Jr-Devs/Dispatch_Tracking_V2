import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  authenticationRoutePaths, 
  branchRoutePath, 
  protectedRoutePaths 
} from "./common/routes";
import AppLayout from "@/layouts/app-layout";
import BaseLayout from "@/layouts/base-layout";
import AuthRoute from "./authRoute";
import BranchRoute from "./branchRoute";
import ProtectedRoute from "./protectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - for unauthenticated users */}
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
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          >
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

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
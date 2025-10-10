import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { protectedRoutePaths } from "@/routes/common/routes";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toggleSidebar } from "@/features/ui/uiSlice";

const SideBar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const role = user["userrights"]?.map((item) => item?.moduleArea)[0] || "";

  if (!user) return null;

  // Filters routes based on user role
  // const allowedRoutes = protectedRoutePaths.filter((route) =>
  //   route.roles.includes(role)
  // );
  const allowedRoutes = protectedRoutePaths.filter((route) =>
    route.roles.join(" ").includes(role)
  );

  // Global hotkey listener: Ctrl + C
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        dispatch(toggleSidebar());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div
      className={cn(
        "hidden lg:flex sticky top-16 flex-col h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-52"
      )}
    >
      {/* Collapse/Expand Toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-3 z-10 flex h-5 w-5 items-center justify-center rounded-full border bg-background shadow hover:bg-muted"
        title="Toggle sidebar (Ctrl+C)"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1 p-2">
          {allowedRoutes.map((route, i) => {
            const Icon = route.icon;
            return (
              <li key={i}>
                <NavLink
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                    pathname === route.path &&
                      "bg-secondary text-secondary-foreground"
                  )}
                  to={route.path}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {!sidebarCollapsed && (
                    <span className="whitespace-nowrap text-sm">
                      {route.menuLabel || route.label}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { protectedRoutePaths } from "@/routes/common/routes";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (!user) return null; 

  // Filters routes based on user role
  const allowedRoutes = protectedRoutePaths.filter((route) =>
    route.roles.includes(user.userRole)
  );

  return (
    <div className="hidden lg:flex w-screen sticky shrink-0 top-20 flex-col sm:w-[215px] h-full">
      <nav>
        <ul className="flex flex-row justify-between gap-x-4 gap-y-2 p-4 text-center sm:flex-col sm:p-6 sm:text-left">
          {allowedRoutes.map((route, i) => {
            const Icon = route.icon;
            return (
              <li key={i}>
                <NavLink
                  className={cn(
                    "rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary hover:!text-secondary-foreground flex h-max flex-col items-center justify-center gap-2 px-2 py-1.5 font-medium sm:h-10 sm:flex-row sm:justify-start sm:px-4 sm:text-sm bg-transparent text-foreground",
                    pathname === route.path && "bg-secondary"
                  )}
                  to={route.path}
                >
                  {Icon && <Icon className="size-5" />}
                  <span className="sr-only line-clamp-2 sm:not-sr-only">
                    {route.menuLabel || route.label}
                  </span>
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

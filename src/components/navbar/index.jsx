import React, { useMemo, useState, useCallback } from "react";
import {
  Bell,
  Folder,
  HelpCircle,
  Home,
  Key,
  LayoutDashboard,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  ChevronDown,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import {
  cn,
  getAllowedRoutes,
  getUserModuleAreas,
  getUserRightCodes,
  roleToView,
} from "@/lib/utils";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { UserNav } from "./user-nav";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { logout } from "@/features/auth/authSlice";
import { useTheme } from "@/context/theme-provider";
import { SetupsDropdown } from "./setups-dropdown";
import { resetDispatchData } from "@/features/dispatch/dispatchSlice";
import { protectedRoutePaths } from "@/routes/common/routes";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, bcode } = useTypedSelector((state) => state.auth);
  let branches = user["userBranches"] || [];
  let branchName =
    branches.find((branch) => branch.bcode === Number(bcode))?.brancH_NAME ??
    "";

  const userRightCodes = useMemo(() => getUserRightCodes(user), [user]);
  const userAreas = useMemo(() => getUserModuleAreas(user), [user]);

  const dispatch = useAppDispatch();

  const { theme, setTheme } = useTheme();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openMenus, setOpenMenus] = useState({});

  const role =
    user["userrights"]?.map((item) => item?.moduleArea)[0]?.toLowerCase() || "";
  // const view = roleToView(user?.userRole);
  const view = roleToView(role);

  const allowedRoutes = useMemo(() => {
    if (!user) return [];
    return getAllowedRoutes(protectedRoutePaths, userAreas, userRightCodes);
  }, [user, userAreas, userRightCodes]);

  // const routes = useMemo(
  //   () => [
  //     {
  //       icon: LayoutDashboard,
  //       path: PROTECTED_ROUTES.ADMIN,
  //       menuLabel: "Dashboard",
  //     },
  //     { icon: Home, path: PROTECTED_ROUTES.OVERVIEW, menuLabel: "Overview" },
  //     {
  //       icon: Settings,
  //       path: PROTECTED_ROUTES.SETTINGS,
  //       menuLabel: "Settings",
  //     },
  //   ],
  //   [],
  // );

  const setupOptions = ["User Management", "System Settings"];

  const handleLogout = useCallback(() => {
    navigate("/", { replace: true });
    dispatch(logout());
    dispatch(resetDispatchData());
    window.location.reload(true); // Force reload to clear cache
  }, [dispatch]);

  const ThemeIcon = useMemo(() => {
    if (theme === "dark") return Moon;
    if (theme === "system") return Monitor;
    return Sun;
  }, [theme]);

  const renderMobileRoutes = (routes) =>
    routes.map((route) => {
      const Icon = route.icon;
      const hasChildren = route.children?.length > 0;

      const menuKey = route.id || route.path || route.menuLabel;

      const isChildActive = hasChildren
        ? route.children.some(
            (child) =>
              pathname === child.path || pathname.startsWith(`${child.path}/`),
          )
        : false;

      const isOpen = openMenus[menuKey] ?? isChildActive;

      // Parent menu with children
      if (hasChildren) {
        return (
          <div key={menuKey} className="flex flex-col">
            <button
              type="button"
              onClick={() =>
                setOpenMenus((prev) => ({
                  ...prev,
                  [menuKey]: !isOpen,
                }))
              }
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                isChildActive && "bg-secondary",
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}

              <span className="flex-1 text-left">{route.menuLabel}</span>

              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {/* Child routes */}
            {isOpen && (
              <div className="ml-5 mt-1 flex flex-col gap-y-1 border-l pl-3">
                {renderMobileRoutes(route.children)}
              </div>
            )}
          </div>
        );
      }

      // Normal route without children
      return (
        <NavLink
          key={route.path}
          to={route.path}
          onClick={() => setIsSheetOpen(false)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            pathname === route.path
              ? "bg-secondary text-secondary-foreground"
              : "bg-transparent",
          )}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}

          <span className="line-clamp-2">{route.menuLabel}</span>
        </NavLink>
      );
    });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between gap-x-4 px-4 lg:px-6">
        {/* Left: Logo + Mobile trigger + User chip */}
        <NavLogoAndUser
          username={user?.username}
          onOpenMobile={() => setIsSheetOpen(true)}
        />

        {/* Mobile Nav */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="left" className="pt-0">
            <SheetHeader className="px-3 py-2">
              <Logo />
            </SheetHeader>

            <nav className="flex flex-col gap-y-1 px-3">
              {/* {allowedRoutes.map(({ icon: Icon, path, menuLabel }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    pathname === path ? "bg-secondary" : "bg-transparent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="line-clamp-2">{menuLabel}</span>
                </NavLink>
              ))} */}
              {renderMobileRoutes(allowedRoutes)}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Center: Company Name */}
        <div className="flex-1 text-center">
          <h1 className="text-base font-bold text-primary">
            {user?.companyName || "COREBASE SOLUTIONS LTD"}
          </h1>
          <p className="text-sm font-bold">{branchName}</p>
        </div>

        {/* Right: Setups dropdown + actions */}
        <div className="flex items-center gap-4">
          {view === "admin" && (
            <SetupsDropdown
              setupOptions={setupOptions}
              selected={selected}
              setSelected={setSelected}
            />
          )}

          {/* Notifications
          <button
            type="button"
            className="relative rounded-md p-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
              1
            </span>
          </button> */}

          {/* Theme Toggle */}
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <ThemeIcon className="h-4 w-4 transition-all" />
          </Button> */}

          {/* User Menu */}
          <UserNav
            userName={user?.username || ""}
            profilePicture={user?.profilePicture || ""}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

const NavLogoAndUser = ({ username = "", onOpenMobile }) => {
  const initial = username ? username.charAt(0) : "U";

  return (
    <div className="flex items-center gap-2">
      {/* Mobile menu trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="inline-flex cursor-pointer bg-black/10 text-black hover:bg-black/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 lg:hidden"
        onClick={onOpenMobile}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Brand */}
      <div className="hidden md:block">
        <Logo />
      </div>

      {/* Divider + user chip (desktop) */}
      <span className="hidden text-lg font-thin text-muted-foreground md:inline lg:text-2xl">
        /
      </span>

      <div className="hidden items-center md:flex">
        <div className="mr-1 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-sm font-bold uppercase text-white lg:h-7 lg:w-7">
          {initial}
        </div>
        <span className="z-10 truncate pt-[1px] text-sm font-semibold lg:text-sm">
          {username || "no name"}
        </span>
      </div>
    </div>
  );
};

export default Navbar;

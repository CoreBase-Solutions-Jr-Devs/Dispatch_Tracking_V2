import React, { useMemo, useState, useCallback } from "react";
import {
  Bell,
  Folder,
  HelpCircle,
  Home,
  Key,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { cn, roleToView } from "@/lib/utils";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { UserNav } from "./user-nav";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { logout } from "@/features/auth/authSlice";
import { useTheme } from "@/context/theme-provider";
import { SetupsDropdown } from "./setups-dropdown";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { theme, setTheme } = useTheme();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const view = roleToView(user?.userRole);

  const routes = useMemo(
    () => [
      { icon: Home, href: PROTECTED_ROUTES.OVERVIEW, label: "Overview" },
      { icon: Folder, href: PROTECTED_ROUTES.INVOICES, label: "Invoices" },
      { icon: HelpCircle, href: PROTECTED_ROUTES.DOCS, label: "Docs" },
      { icon: Key, href: PROTECTED_ROUTES.REPORTS, label: "Reports" },
      { icon: Settings, href: PROTECTED_ROUTES.SETTINGS, label: "Settings" },
    ],
    []
  );

  const setupOptions = [
    "User Management",
    "System Settings"
  ];

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const ThemeIcon = useMemo(() => {
    if (theme === "dark") return Moon;
    if (theme === "system") return Monitor;
    return Sun;
  }, [theme]);

  return (
<header className="sticky top-0 z-50 w-full border-b bg-background">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-x-4 px-4 lg:px-6">
    {/* Left: Logo + Mobile trigger + User chip */}
    <NavLogoAndUser
      username={user?.userName}
      onOpenMobile={() => setIsSheetOpen(true)}
    />

    {/* Mobile Nav */}
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent side="left" className="pt-0">
        <SheetHeader className="px-3 py-2">
          <Logo />
        </SheetHeader>

        <nav className="flex flex-col gap-y-1 px-3">
          {routes.map(({ icon: Icon, href, label }) => (
            <NavLink
              key={href}
              to={href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                pathname === href ? "bg-secondary" : "bg-transparent"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="line-clamp-2">{label}</span>
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>

    {/* Center: Company Name */}
    <div className="flex-1 text-center">
      <h1 className="text-base font-semibold text-primary">COREBASE SOLUTIONS LTD</h1>
    </div>

    {/* Right: Setups dropdown + actions */}
    <div className="flex items-center gap-4">
      {view === "admin" && (
        <SetupsDropdown setupOptions={setupOptions} selected={selected} setSelected={setSelected} />
      )}

      {/* Notifications */}
      <button
        type="button"
        className="relative rounded-md p-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
          1
        </span>
      </button>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        <ThemeIcon className="h-4 w-4 transition-all" />
      </Button>

      {/* User Menu */}
      <UserNav
        userName={user?.userName || ""}
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
      <Logo />

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

import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePath";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/overview";
import Settings from "@/pages/settings";
import Invoices from "@/pages/invoices";
import Reports from "@/pages/reports";
import { ROLES } from "@/constant";
import { Home, Folder, FileStackIcon, Settings as SettingsIcon } from "lucide-react";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.OVERVIEW,
    element: <Overview />,
    roles: Object.values(ROLES),
    menuLabel: "Overview",
    icon: Home,
  },
  {
    path: PROTECTED_ROUTES.INVOICES,
    element: <Invoices />,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_PERSON],
    menuLabel: "Invoices",
    icon: Folder,
  },
  {
    path: PROTECTED_ROUTES.REPORTS,
    element: <Reports />,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_PERSON],
    menuLabel: "Reports",
    icon: FileStackIcon,
  },
  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
    roles: Object.values(ROLES),
    menuLabel: "Settings",
    icon: SettingsIcon,
  },
];

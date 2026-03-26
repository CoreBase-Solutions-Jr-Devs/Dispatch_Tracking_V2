import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePath";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/overview";
import Dashboard from "@/pages/dashboard";
import AuthBranch from "@/pages/branches";
import Settings from "@/pages/settings";
import { ROLES } from "@/constant";
import DispatchInvoice from "@/pages/dispatch/_component/invoices";
import {
  Home,
  Settings as SettingsIcon,
  Plus,
  LayoutDashboard,
  Store,
  PackageCheck,
  Split,
  Truck,
} from "lucide-react";
import BranchRoute from "../branchRoute";

// Auth routes - only for unauthenticated users
export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

// Branch selection route - requires authentication but not branch selection
export const branchRoutePath = [
  {
    path: AUTH_ROUTES.AUTH_BRANCH,
    element: <BranchRoute />,
    children: [
      {
        index: true,
        element: <AuthBranch />,
      },
    ],
  },
];

// const extraRoutes = [
//   // {
//   //   path: PROTECTED_ROUTES.STORE,
//   //   element: <Overview role="Store" />,
//   //   roles: Object.values(ROLES),
//   //   menuLabel: "Store",
//   //   requiredRight: 5145,
//   //   icon: Store,
//   // },
//   // {
//   //   path: PROTECTED_ROUTES.VERIFICATION,
//   //   element: <Overview role="Verification" />,
//   //   roles: Object.values(ROLES),
//   //   menuLabel: "Verification",
//   //   requiredRight: 5146,
//   //   icon: PackageCheck,
//   // },
//   // {
//   //   path: PROTECTED_ROUTES.DISPATCH,
//   //   element: <Overview role="Dispatch" />,
//   //   roles: Object.values(ROLES),
//   //   menuLabel: "Dispatch",
//   //   requiredRight: 5147,
//   //   icon: Split,
//   // },

//   // {
//   //   path: PROTECTED_ROUTES.DELIVERY,
//   //   element: <Overview role="Delivery" />,
//   //   roles: Object.values(ROLES),
//   //   menuLabel: "Delivery",
//   //   requiredRight: 5148,
//   //   icon: Truck,
//   // },

// ];

// Protected routes - requires both authentication AND branch selection
export const protectedRoutePaths = [
  {
    path: PROTECTED_ROUTES.ADMIN,
    element: <Dashboard />,
    roles: Object.values(ROLES),
    menuLabel: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: PROTECTED_ROUTES.OVERVIEW,
    element: <Overview />,
    roles: Object.values(ROLES),
    menuLabel: "Overview",
    icon: Home,
  },
    {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
    roles: Object.values(ROLES),
    menuLabel: "Settings",
    icon: SettingsIcon,
  },
    {
    path: PROTECTED_ROUTES.NEWDISPATCH,
    element: <DispatchInvoice />,
    roles: Object.values(ROLES),
    menuLabel: "New Dispatch",
    requiredRight: 5147,
    icon: Plus,
  },
];
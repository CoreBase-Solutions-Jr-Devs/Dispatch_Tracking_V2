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
  // {
  //   path: PROTECTED_ROUTES.INVOICES,
  //   element: <Invoices />,
  //   roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_PERSON],
  //   menuLabel: "Invoices",
  //   icon: Folder,
  // },
  // {
  //   path: PROTECTED_ROUTES.REPORTS,
  //   element: <Reports />,
  //   roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SALES_PERSON],
  //   menuLabel: "Reports",
  //   icon: FileStackIcon,
  // },
  {
    path: PROTECTED_ROUTES.NEWDISPATCH,
    element: <DispatchInvoice />,
    roles: [ROLES.DISPATCH_PERSON],
    menuLabel: "New Dispatch",
    icon: Plus,
  },
  //NEW ROUTES
  {
    path: PROTECTED_ROUTES.STORE,
    // element: <h1>Store, Greatness awaits </h1>,
    element: <Overview role={"Store"} />,
    roles: Object.values(ROLES),
    menuLabel: "Store",
    icon: Store,
  },
  {
    path: PROTECTED_ROUTES.VERIFICATION,
    // element: <h1>Verification, Greatness awaits </h1>,
    element: <Overview role={"Verification"} />,
    roles: Object.values(ROLES),
    menuLabel: "Verification",
    icon: PackageCheck,
  },
  {
    path: PROTECTED_ROUTES.DISPATCH,
    // element: <h1>Dispatch, Greatness awaits </h1>,
    element: <Overview role={"Dispatch"} />,
    roles: Object.values(ROLES),
    menuLabel: "Dispatch",
    icon: Split,
  },
  {
    path: PROTECTED_ROUTES.DELIVERY,
    // element: <h1>Dispatch, Greatness awaits </h1>,
    element: <Overview role={"Delivery"} />,
    roles: Object.values(ROLES),
    menuLabel: "Delivery",
    icon: Truck,
  },
  //
  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
    roles: Object.values(ROLES),
    menuLabel: "Settings",
    icon: SettingsIcon,
  },
];

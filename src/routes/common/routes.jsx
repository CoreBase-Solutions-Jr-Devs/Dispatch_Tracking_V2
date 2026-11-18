import { AUTH_ROUTES, PROTECTED_ROUTES, UNPROTECTED_ROUTES } from "./routePath";
import SignIn from "@/pages/auth/sign-in";
import Overview from "@/pages/overview";
import Dashboard from "@/pages/dashboard";
import AgeingSection from "@/pages/adminDashboard/_component/aging-section";
import DashboardSection from "@/pages/adminDashboard/_component/dashboard-section";
import ExceptionSection from "@/pages/adminDashboard/_component/exception-section";
import InsightSection from "@/pages/adminDashboard/_component/insights-section";
import ReconciliationSection from "@/pages/adminDashboard/_component/reconciliation-section";
import ReportSection from "@/pages/adminDashboard/_component/reports-section";
import DashboardSearch from "@/pages/adminDashboard/_component/admin-search";
import AuthBranch from "@/pages/branches";
import Settings from "@/pages/settings";
import StatusProgressPage from "@/pages/status_tracking/landing/StatusProgressPage";
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
  Bike,
  ShieldAlert,
} from "lucide-react";
import BranchRoute from "../branchRoute";
import DriverSetupOverview from "@/pages/driverSetup";

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
    // Parent menu: no page of its own
    menuLabel: "Administration",
    icon: ShieldAlert,
    roles: Object.values(ROLES),
    requiredRight: 5149,
    children: [
      {
        path: PROTECTED_ROUTES.RECONCILIATION,
        element: <ReconciliationSection />,
        menuLabel: "Reconciliations",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.EXECPTIONS,
        element: <ExceptionSection />,
        menuLabel: "Exceptions",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.AGING,
        element: <AgeingSection />,
        menuLabel: "Aging",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.DASHBOARD,
        element: <DashboardSection />,
        menuLabel: "Dashboard",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.INSIGHTS,
        element: <InsightSection />,
        menuLabel: "Insights",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.ADMINREPORTS,
        element: <ReportSection />,
        menuLabel: "Report",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
      {
        path: PROTECTED_ROUTES.ADMINSEARCH,
        element: <DashboardSearch />,
        menuLabel: "Search",
        roles: Object.values(ROLES),
        requiredRight: 5149,
      },
    ],
  },
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
    path: PROTECTED_ROUTES.STORE,
    element: <Overview role="Store" />,
    roles: Object.values(ROLES),
    menuLabel: "Store",
    requiredRight: 5149,
    icon: Store,
  },
  {
    path: PROTECTED_ROUTES.VERIFICATION,
    element: <Overview role="Verification" />,
    roles: Object.values(ROLES),
    menuLabel: "Verification",
    requiredRight: 5149,
    icon: PackageCheck,
  },
  {
    path: PROTECTED_ROUTES.DISPATCH,
    element: <Overview role="Dispatch" />,
    roles: Object.values(ROLES),
    menuLabel: "Dispatch",
    requiredRight: 5149,
    icon: Split,
  },
  {
    path: PROTECTED_ROUTES.NEWDISPATCH,
    element: <DispatchInvoice />,
    roles: Object.values(ROLES),
    menuLabel: "New Dispatch",
    requiredRight: 5149,
    icon: Plus,
  },
  {
    path: PROTECTED_ROUTES.DELIVERY,
    element: <Overview role="Delivery" />,
    roles: Object.values(ROLES),
    menuLabel: "Delivery",
    requiredRight: 5149,
    icon: Truck,
  },
  {
    path: PROTECTED_ROUTES.DRIVERS,
    element: <DriverSetupOverview />,
    roles: Object.values(ROLES),
    menuLabel: "Drivers",
    icon: Bike,
  },
  {
    path: PROTECTED_ROUTES.SETTINGS,
    element: <Settings />,
    roles: Object.values(ROLES),
    menuLabel: "Settings",
    icon: SettingsIcon,
  },
];

export const unprotectedRoutePaths = [
  {
    path: UNPROTECTED_ROUTES.STATUS_TRACKER,
    element: <StatusProgressPage />,
    roles: [ROLES.Customer, ROLES.User],
    menuLabel: "Status",
    // icon: Truck,
  },
];

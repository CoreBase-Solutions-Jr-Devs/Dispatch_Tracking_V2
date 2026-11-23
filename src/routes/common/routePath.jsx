export const AUTH_ROUTES = {
  SIGN_IN: "/",
  AUTH_BRANCH: "/auth-branch",
};

export const PROTECTED_ROUTES = {
  ADMIN: "/dashboard",
  OVERVIEW: "/overview",
  REPORTS: "/reports",
  INVOICES: "/invoices",
  SETTINGS: "/settings",
  NEWDISPATCH: "/newdispatch",
  //
  STORE: "/store",
  VERIFICATION: "/verification",
  DISPATCH: "/dispatch",
  DELIVERY: "/Delivery",
  DRIVERS: "/drivers",
  // ADMIN DASHBOARD
  RECONCILIATION: "/admin/reconciliation",
  EXECPTIONS: "/admin/exceptions",
  AGING: "/admin/agin",
  DASHBOARD: "/admin/dashboard",
  INSIGHTS: "/admin/insights",
  ADMINREPORTS: "/admin/reports",
  ADMINSEARCH: "/admin/search",
  FINISHEDINVOICES: "/admin/finished-invoices",
  STAFFROSTER: "/admin/staff-roster",
};

export const UNPROTECTED_ROUTES = {
  STATUS_TRACKER: "/status-tracker",
};

export const isAuthRoute = (pathname) => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

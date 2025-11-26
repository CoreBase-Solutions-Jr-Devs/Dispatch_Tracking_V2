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
};

export const isAuthRoute = (pathname) => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

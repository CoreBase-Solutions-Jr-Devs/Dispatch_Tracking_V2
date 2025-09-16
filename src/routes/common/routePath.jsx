export const AUTH_ROUTES = {
  SIGN_IN: "/"
};

export const PROTECTED_ROUTES = {
  OVERVIEW: "/overview",
  REPORTS: "/reports",
  INVOICES: "/invoices",
  SETTINGS: "/settings",
  NEWDISPATCH: "/newdispatch",
};

export const isAuthRoute = (pathname) => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

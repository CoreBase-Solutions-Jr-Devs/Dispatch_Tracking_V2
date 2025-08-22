export const AUTH_ROUTES = {
  SIGN_IN: "/"
};

export const PROTECTED_ROUTES = {
  OVERVIEW: "/overview",
  REPORTS: "/reports",
  INVOICES: "/invoices",
  DOCS: "/docs",
  SETTINGS: "/settings",
};

export const isAuthRoute = (pathname) => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

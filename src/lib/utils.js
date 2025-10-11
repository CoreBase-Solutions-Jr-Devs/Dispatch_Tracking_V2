import { ROLES } from "@/constant";
import clsx from "clsx";
import {
  endOfWeek,
  startOfWeek,
  startOfDay,
  endOfYear,
  startOfYear,
  endOfMonth,
  addDays,
  endOfDay,
  startOfMonth,
  addYears,
  addMonths,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function roleToView(role) {
  if (!role) return "user";

  switch (role) {
    case ROLES.SUPER_ADMIN:
    case ROLES.ADMIN:
      return "admin";

    case ROLES.STORE_CONTROLLER:
    case ROLES.STORE_PERSON:
      return "store";

    case ROLES.VERIFICATION_CONTROLLER:
    case ROLES.VERIFICATION_PERSON:
      return "verification";

    case ROLES.DISPATCH_CONTROLLER:
    case ROLES.DISPATCH_PERSON:
      return "dispatch";

    case ROLES.DRIVER:
      return "delivery";

    default:
      return "user";
  }
}

/**
 * View metadata (title + subtitle) per role/view
 */
export const viewMeta = {
  admin: {
    title: "Admin Overview",
    subtitle: "All invoices across the system.",
  },
  store: {
    title: "Store Overview",
    subtitle: "Invoices that are in the store pipeline.",
  },
  verification: {
    title: "Verifier Overview",
    subtitle: "Invoices pending or completed verification.",
  },
  dispatch: {
    title: "Dispatcher Overview",
    subtitle: "Invoices ready or assigned for dispatch.",
  },
  delivery: {
    title: "Delivery Overview",
    subtitle: "Invoices you are responsible for delivering.",
  },
  user: {
    title: "Overview",
    subtitle: "System invoices overview.",
  },
};
/**
 * Date Dropdown
 */
export const ranges = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "Month To Date",
  "This Year",
  // 'Month To Year',
  "Last Year",
  "Year To Date",
  "Custom Range",
];

export const dateDefineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOfNextYear: startOfYear(addYears(new Date(), +1)),
  endOfNextYear: endOfYear(addYears(new Date(), +1)),
};

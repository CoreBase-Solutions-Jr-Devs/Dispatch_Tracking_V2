import {
  useFilterStoreInvoicesMutation,
  // useFilterVerificationInvoicesMutation,
  // useFilterDispatchInvoicesMutation,
  // useFilterDeliveryInvoicesMutation,
} from '@/features/invoices/invoicesAPI';

export function useRoleInvoiceFilter(role) {
 
//   if (role === "delivery") {
//     return null;
//   }

  switch (role) {
    case "store":
      return useFilterStoreInvoicesMutation();
	case "delivery":
		return useFilterStoreInvoicesMutation();
    // case "verification":
    //   return useFilterVerificationInvoicesMutation();
    // case "dispatch":
    //   return useFilterDispatchInvoicesMutation();
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}

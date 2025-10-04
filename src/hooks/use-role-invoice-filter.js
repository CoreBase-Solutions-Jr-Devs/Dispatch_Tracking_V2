import { useGetSavedDispatchedInvoicesQuery } from "@/features/dispatch/dispatchAPI";
import {
  
  useFilterDispatchInvoicesMutation,
  // useFilterDeliveryInvoicesMutation,
} from "@/features/invoices/invoicesAPI";
import { useLazyGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { useLazyGetFilteredVerificationInvoicesQuery } from "@/features/verification/verificationAPI";
  useFilterStoreInvoicesMutation,
  useFilterVerificationInvoicesMutation,
  // useFilterDispatchInvoicesMutation,
  // useFilterDeliveryInvoicesMutation,
} from "@/features/invoices/invoicesAPI";

export function useRoleInvoiceFilter(role) {
  switch (role) {
    case "store":
      return useLazyGetFilteredStoreInvoicesQuery(); 

    case "verification":
   
      return useLazyGetFilteredVerificationInvoicesQuery();

    case "dispatch":
      return useFilterDispatchInvoicesMutation();

    // case "delivery":
    //   return useFilterDeliveryInvoicesMutation();

    default:
      throw new Error(`Unknown role: ${role}`);
  }
  switch (role) {
    case "store":
      return useFilterStoreInvoicesMutation();
    case "verification":
      return useFilterVerificationInvoicesMutation();
    case "dispatch":
      return useGetSavedDispatchedInvoicesQuery();
    // case 'delivery':
    // 	return useFilterDeliveryInvoicesMutation();
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}

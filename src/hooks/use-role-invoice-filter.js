 
import { useGetSavedDispatchedInvoicesQuery } from "@/features/dispatch/dispatchAPI";
import { useLazyGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
 
// import { useGetFilteredStoreInvoicesQuery } from "@/features/store/storeAPI";
import { useLazyGetFilteredVerificationInvoicesQuery } from "@/features/verification/verificationAPI";
 
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
}
 
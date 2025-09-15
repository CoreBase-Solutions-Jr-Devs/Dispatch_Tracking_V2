import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useGetDeliveryDriverQuery } from "@/features/dispatch/dispatchAPI";

export default function DispatchDetails({ collectionType }) {

  // Fetch filter options to get delivery guy ID
  const { data: filterOptions, isLoading: filterLoading, isError: filterError } = useFilterOptionsQuery();
  const deliveryGuyOption = filterOptions?.find(opt => opt.key === "deliveryGuy")?.options?.[0];
  const deliveryGuyId = deliveryGuyOption?.value;

  // Fetch driver details based on delivery Guy ID
  const { data: driverDetails, isLoading: driverLoading, isError: driverError, error: driverApiError } = useGetDeliveryDriverQuery(deliveryGuyId, {
    skip: !deliveryGuyId || collectionType !== "delivery",
  });

  return (
    <div className="flex flex-col w-1/2 gap-2 text-xs font-medium">
      <section className="flex justify-between items-center h-full">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        <Label className="text-xs font-medium">08/20/2025 12:31</Label>
      </section>

      {/* Loading and error states for filter options */}
      {filterLoading && <Label className="text-xs text-blue-500">Loading delivery options...</Label>}
      {filterError && <Label className="text-xs text-red-500">Error loading delivery options: {filterError?.message || "Unknown error"}</Label>}

      {/* Loading and error states for driver details */}
      {collectionType === "delivery" && driverLoading && <Label className="text-xs text-blue-500">Loading driver details...</Label>}
      {collectionType === "delivery" && driverError && <Label className="text-xs text-red-500">Error loading driver details: {driverApiError?.message || "Unknown error"}</Label>}

      {collectionType === "self-collection" && (
        <section className="flex justify-between space-x-2">
          <div className="flex flex-col items-center w-1/3">
            <Label className="text-xs font-medium">Client Name</Label>
            <Input className="w-full h-6 text-xs" />
          </div>
          <div className="flex flex-col items-center w-1/3">
            <Label className="text-xs font-medium">Client ID</Label>
            <Input className="w-full h-6 text-xs" />
          </div>
          <div className="flex flex-col items-center w-1/3">
            <Label className="text-xs font-medium">Phone No</Label>
            <Input className="w-full h-6 text-xs" />
          </div>
        </section>
      )}

      {collectionType === "delivery" && driverDetails && !driverLoading && !driverError && (
        <>
          <section className="flex justify-between w-full h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP ID:</Label>
              <Label className="text-xs font-medium">{driverDetails.personalId}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP DL:</Label>
              <Label className="text-xs font-medium">{driverDetails.driverLicenseNo}</Label>
            </div>
          </section>

          <section className="flex justify-between h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Car Make:</Label>
              <Label className="text-xs font-medium">{driverDetails.carMake}</Label>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">Reg No:</Label>
              <Label className="text-xs font-medium">{driverDetails.regNo}</Label>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
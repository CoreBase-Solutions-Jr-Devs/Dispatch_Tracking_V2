import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DispatchDetails({ data, collectionType }) {
  return (
    <div className="flex flex-col w-1/2 gap-2 text-xs font-medium">
      <section className="flex justify-between items-center gap-2">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        <Label className="text-xs font-medium">08/20/2025 12:31</Label>
      </section>

      {collectionType === "self-collection" && (
        <>
          <section className="flex justify-between space-x-2">
            <div className="flex items-center gap-2 w-1/2">
              <Label className="text-xs font-medium">Client Name:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Enter Name" />
            </div>
            <div className="flex items-center gap-2 w-1/2">
              <Label className="text-xs font-medium">Client ID:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Enter ID" />
            </div>
          </section>

          <section className="flex items-center gap-2">
            <Label className="text-xs font-medium">Phone No:</Label>
            <Input className="w-full h-6 text-xs" placeholder="Enter Phone" />
          </section>
        </>
      )}

      {collectionType === "delivery" && (
        <>
          <section className="flex justify-between space-x-2">
            <div className="flex items-center gap-2 w-1/2">
              <Label className="text-xs font-medium">DP ID:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Driver ID" />
            </div>
            <div className="flex items-center gap-2 w-1/2">
              <Label className="text-xs font-medium">DP DL:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Driver DL" />
            </div>
          </section>

          <section className="flex justify-between gap-x-2">
            <section className="flex items-center gap-2">
              <Label className="text-xs font-medium">Car Make:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Car Make" />
            </section>

            <section className="flex items-center gap-2">
              <Label className="text-xs font-medium">Reg No:</Label>
              <Input className="w-full h-6 text-xs" placeholder="Car Plate" />
            </section>
          </section>
          
        </>
      )}

    </div>
  );
}

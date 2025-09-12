import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DispatchDetails({ data, collectionType }) {
  return (
    <div className="flex flex-col w-1/2 gap-2 text-xs font-medium">
      <section className="flex justify-between items-center h-full">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        <Label className="text-xs font-medium">08/20/2025 12:31</Label>
      </section>

      {collectionType === "self-collection" && (
        <>
          <section className="flex justify-between space-x-2">
            <div className="flex flex-col items-center w-1/3">
              <Label className="text-xs font-medium">Client Name</Label>
              <Input className="w-full h-6 text-xs" />
            </div>
            <div className="flex flex-col items-center w-1/3">
              <Label className="text-xs font-medium">Client ID</Label>
              <Input className="w-full h-6 text-xs" />
            </div>
            <section className="flex flex-col items-center w-1/3">
              <Label className="text-xs font-medium">Phone No</Label>
              <Input className="w-full h-6 text-xs" />
            </section>
          </section>

          
        </>
      )}

      {collectionType === "delivery" && (
        <>
          <section className="flex justify-between w-full h-full">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP ID:</Label>
              <Label className="text-xs font-medium">31456780</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs font-medium">DP DL:</Label>
              <Label className="text-xs font-medium">AB123456</Label>
            </div>
          </section>

          <section className="flex justify-between h-full">
            <section className="flex items-center gap-2">
              <Label className="text-xs font-medium">Car Make:</Label>
              <Label className="text-xs font-medium">Toyota</Label>
            </section>

            <section className="flex items-center gap-2">
              <Label className="text-xs font-medium">Reg No:</Label>
              <Label className="text-xs font-medium">KDA 123X</Label>
            </section>
          </section>
          
        </>
      )}

    </div>
  );
}

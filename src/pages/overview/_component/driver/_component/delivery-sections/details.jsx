import { Label } from "@/components/ui/label";

export default function DeliveryDetails({ data }) {
  return (
    <div>
      <div className="flex flex-row gap-2 font-medium justify-between">
        <Label className="text-sm font-medium">
          Total: {new Intl.NumberFormat("en-GB").format(data?.DOCAMT ?? 0)}
        </Label>
        <Label className="text-sm font-medium">
          Paid: {new Intl.NumberFormat("en-GB").format(data?.PAID ?? 0)}
        </Label>
        <Label className="text-sm font-medium">
          Balance: {new Intl.NumberFormat("en-GB").format(data?.BALANCE ?? 0)}
        </Label>
        {/* <div className="flex items-center gap-3">
        <Label className="text-xs font-medium">Collector's Name:</Label>
        <input
          type="text"
          defaultValue="John"
          className="border border-gray-300 rounded-md p-1 text-xs"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium">Collector's ID:</Label>
        <input
          type="text"
          defaultValue="31456780"
          className="border border-gray-300 rounded-md p-1 text-xs"
        />
      </div>

      <div className="flex items-center gap-3">
        <Label className="text-xs font-medium">Phone No:</Label>
        <input
          type="text"
          defaultValue="0712345678"
          className="border border-gray-300 rounded-md p-1 text-xs"
        />
      </div> */}
      </div>
    </div>
  );
}

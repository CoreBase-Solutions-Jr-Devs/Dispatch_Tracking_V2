import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DispatchSelect({ values, onChange }) {
  return (
    <div className="flex flex-col gap-2 text-xs font-medium">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Delivery Person:</label>
        <Select
          value={values.deliveryPerson}
          onValueChange={(val) => onChange("deliveryPerson", val)}
        >
          <SelectTrigger className="w-32 !h-7 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium">
            {values.deliveryPerson}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dp1">John Doe</SelectItem>
            <SelectItem value="dp2">Jane Smith</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Delivery Route:</label>
        <Select
          value={values.deliveryRoute}
          onValueChange={(val) => onChange("deliveryRoute", val)}
        >
          <SelectTrigger className="w-32 !h-7 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium">
            {values.deliveryRoute}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="route1">Route 1</SelectItem>
            <SelectItem value="route2">Route 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Vehicle Reg. No:</label>
        <Select
          value={values.vehicle}
          onValueChange={(val) => onChange("vehicle", val)}
        >
          <SelectTrigger className="w-32 !h-7 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium">
            {values.vehicle}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="veh1">KAA 123A</SelectItem>
            <SelectItem value="veh2">KBB 456B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Collection Type:</label>
        <Select
          value={values.collectionType}
          onValueChange={(val) => onChange("collectionType", val)}
        >
          <SelectTrigger className="w-32 !h-7 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium">
            {values.collectionType}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

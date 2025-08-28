import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DispatchSelect({ values, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <label className="text-sm font-medium">Delivery Person:</label>
        <Select
          value={values.deliveryPerson}
          onValueChange={(val) => onChange("deliveryPerson", val)}
        >
          <SelectTrigger className="w-48 border border-gray-300 rounded-md px-2 py-1 ml-1">
            {values.deliveryPerson || "Select Delivery Person"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dp1">John Doe</SelectItem>
            <SelectItem value="dp2">Jane Smith</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <label className="text-sm font-medium">Delivery Route:</label>
        <Select
          value={values.deliveryRoute}
          onValueChange={(val) => onChange("deliveryRoute", val)}
        >
          <SelectTrigger className="w-48 border border-gray-300 rounded-md px-2 py-1 ml-1">
            {values.deliveryRoute || "Select Route"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="route1">Route 1</SelectItem>
            <SelectItem value="route2">Route 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <label className="text-sm font-medium">Vehicle Reg. No:</label>
        <Select
          value={values.vehicle}
          onValueChange={(val) => onChange("vehicle", val)}
        >
          <SelectTrigger className="w-48 border border-gray-300 rounded-md px-2 py-1 ml-1">
            {values.vehicle || "Select Vehicle"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="veh1">KAA 123A</SelectItem>
            <SelectItem value="veh2">KBB 456B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <label className="text-sm font-medium">Collection Type:</label>
        <Select
          value={values.collectionType}
          onValueChange={(val) => onChange("collectionType", val)}
        >
          <SelectTrigger className="w-48 border border-gray-300 rounded-md px-2 py-1 ml-1">
            {values.collectionType || "Select Collection Type"}
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

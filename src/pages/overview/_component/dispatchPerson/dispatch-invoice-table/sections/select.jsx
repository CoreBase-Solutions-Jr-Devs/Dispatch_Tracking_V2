import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DispatchSelect({
  values,
  onChange,
  deliveryGuyOptions,
  enabled
}) {
  console.log(values);
  return (
    <div className="flex flex-col justify-between gap-2 text-xs font-medium">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Collection Type:</label>
        <Select
          value={values.collectionType}
          onValueChange={(val) => onChange("collectionType", val)}
          disabled={!enabled}
        >
          <SelectTrigger className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium" disabled={!enabled}>
            {values.collectionType || "Select..."}
          </SelectTrigger>
          <SelectContent className="bg-gray-200">
            <SelectItem value="self-collection">Self-Collection</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="courier">Courier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {values.collectionType === "delivery" && (
        <>
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium">Delivery Person:</label>
            <Select
              value={values.dispatchPerson}
              onValueChange={(val) => onChange("dispatchPerson", val)}
              disabled={!enabled}
            >
              <SelectTrigger className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium" disabled={!enabled}>
                {values.dispatchPerson || "Select..."}
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                {deliveryGuyOptions.map((item, i) => (
                  <SelectItem value={item.value} key={i}>
                    {item.label}
                  </SelectItem>
                ))}
                {/* <SelectItem value="dp1">John Doe</SelectItem>
                <SelectItem value="dp2">Jane Smith</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-xs font-medium">Delivery Route:</label>
            <Select
              value={values.dispatchRoute}
              onValueChange={(val) => onChange("dispatchRoute", val)}
              disabled={!enabled}
            >
              <SelectTrigger className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium" disabled={!enabled}>
                {values.dispatchRoute || "Select..."}
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                <SelectItem value="route1">Route 1</SelectItem>
                <SelectItem value="route2">Route 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DispatchSelect({
  values,
  onChange,
  collectionTypeOptions = [],
  deliveryGuyOptions = [],
  routeOptions = [],
  vehicleOptions = [],
  enabled,
}) {
  const getDeliveryGuyLabel = (val) => {
    const found = deliveryGuyOptions.find((item) => item.value === val);
    return found ? found.label : "Select...";
  };

  const routeLabel = (val) => {
    const found = routeOptions.find((item) => item.value === val);
    return found ? found.label : "Select...";
  };

  const vehicleLabel = (val) => {
    const found = vehicleOptions.find((item) => item.value === val);
    return found ? found.label : "Select...";
  };

  return (
    <div className="flex flex-col justify-between gap-2 text-xs font-medium">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium">Collection Type:</label>
        <Select
          value={values?.collectionType}
          onValueChange={(val) => onChange("collectionType", val)}
          // disabled={!enabled}
        >
          <SelectTrigger
            className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium"
            // disabled={!enabled}
          >
            {collectionTypeOptions?.find(
              (opt) => opt.value === values?.collectionType
            )?.label || "Select..."}
          </SelectTrigger>
          <SelectContent className="bg-gray-200">
            {collectionTypeOptions.length > 0 ? (
              collectionTypeOptions.map((item, i) => (
                <SelectItem key={`${item.value}_${i}`} value={item?.value || 0}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="null">
                "No delivery options"
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {values?.collectionType === "OUR DELIVERY" && (
        <>
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium">Delivery Person:</label>
            <Select
              value={values?.dispatchPerson || ""}
              onValueChange={(val) => onChange("dispatchPerson", val)}
              // disabled={!enabled}
            >
              <SelectTrigger
                className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium"
                // disabled={!enabled}
              >
                <span>{getDeliveryGuyLabel(values?.dispatchPerson)}</span>
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                {deliveryGuyOptions.length > 0 ? (
                  deliveryGuyOptions.map((item, i) => (
                    <SelectItem
                      key={`${item.value}_${i}`}
                      value={item?.value || 0}
                    >
                      {item.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="null">
                    "No delivery options"
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-xs font-medium">Delivery Route:</label>
            <Select
              value={values?.dispatchRoute || ""}
              onValueChange={(val) => onChange("dispatchRoute", val)}
              // disabled={!enabled}
            >
              <SelectTrigger
                className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium truncate"
                // disabled={!enabled}
                title={routeLabel(values?.dispatchRoute)}
              >
                <span className="truncate">
                  {routeLabel(values?.dispatchRoute)}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                {routeOptions.length > 0 ? (
                  routeOptions.map((item, i) => (
                    <SelectItem
                      key={`${item.value}_${i}`}
                      value={item.value || 0}
                    >
                      {item.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="">
                    No route options
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-xs font-medium">Vehicle:</label>
            <Select
              value={values?.vehicle || ""}
              onValueChange={(val) => onChange("vehicle", val)}
              // disabled={!enabled}
            >
              <SelectTrigger
                className="w-28 !h-6 border border-gray-300 rounded-md px-1 ml-1 text-xs font-medium truncate"
                // disabled={!enabled}
                title={vehicleLabel(values?.vehicle)}
              >
                <span className="truncate">
                  {vehicleLabel(values?.vehicle)}
                </span>
              </SelectTrigger>
              <SelectContent className="bg-gray-200">
                {vehicleOptions.length > 0 ? (
                  vehicleOptions.map((item, i) => (
                    <SelectItem
                      key={`${item.value}_${i}`}
                      value={item.value || 0}
                    >
                      {item.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="null">
                    No vehicle options
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}

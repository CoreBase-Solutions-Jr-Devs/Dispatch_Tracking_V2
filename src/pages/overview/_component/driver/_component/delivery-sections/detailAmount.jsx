import { Label } from "@/components/ui/label";

function DetailAmount({ data }) {
  return (
    <div className="flex flex-row gap-2 font-medium justify-between">
      <Label className="text-sm font-medium">
        Total: {new Intl.NumberFormat("en-GB").format(data?.DOCAMT ?? 0)}
      </Label>
      <Label className="text-sm font-medium">
        Paid: {new Intl.NumberFormat("en-GB").format(data?.Paid ?? 0)}
      </Label>
      <Label className="text-sm font-medium">
        Balance: {new Intl.NumberFormat("en-GB").format(data?.Balance ?? 0)}
      </Label>
    </div>
  );
}

export default DetailAmount;

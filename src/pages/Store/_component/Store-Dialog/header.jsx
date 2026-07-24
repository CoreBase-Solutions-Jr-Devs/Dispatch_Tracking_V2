import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";

export default function StoreHeader({ data }) {
  return (
    <div className="flex flex-row justify-between items-center mt-5  w-full">
      <DialogTitle className="text-primary">Store Tracking</DialogTitle>
      <Badge variant="pushed" className="uppercase ">
        {data?.workflowStatus || "N/A"}
      </Badge>
    </div>
  );
}

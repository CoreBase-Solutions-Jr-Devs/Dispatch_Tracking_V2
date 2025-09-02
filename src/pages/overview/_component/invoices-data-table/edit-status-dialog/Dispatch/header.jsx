import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";

export default function DispatchHeader() {
  return (
    <div className="flex flex-row justify-between items-center mt-3 w-full">
      <DialogTitle className="text-primary">DISPATCH INVOICE</DialogTitle>
      <Badge variant="pushed" className="uppercase">
        Document Dispatched
      </Badge>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";

export default function VerificationHeader({ data }) {
  return (
    <div className="flex flex-row justify-between items-center mt-5 w-full">
      <DialogTitle className="text-primary">VERIFICATION</DialogTitle>
      <Badge variant="pushed" className="uppercase ">
        {data?.workflowStatus || "N/A"}
      </Badge>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DeliveryRemarks() {
    return (
 <div className="flex flex-col mb-2">
  <Label className="text-xs font-medium ">Delivery Remarks:</Label>
  <Textarea className="w-200 bg-gray-300 text-xs font-medium" />
</div>



    );
}

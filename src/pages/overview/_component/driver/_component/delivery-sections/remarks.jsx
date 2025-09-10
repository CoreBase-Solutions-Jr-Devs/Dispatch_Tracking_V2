import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DeliveryRemarks() {
    return (
        <div className="flex flex-col mb-2 ">
            <Label className="text-xs font-medium">Dispatch Remarks:</Label>
            <Textarea className="min-w-[80px] bg-gray-300 text-xs font-medium" />
        </div>
    );
}

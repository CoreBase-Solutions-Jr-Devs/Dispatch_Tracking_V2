import { Label } from "@/components/ui/label";

export default function DeliveryMeta() {
  return (
<section className="flex flex-row  gap-16 justify-between max-w-3xl text-xs font-medium">
  <section className="flex items-center gap-1">
    <Label className="font-medium text-xs">Delivery Control:</Label>
    <Label className="font-medium uppercase text-xs">CoreDBA</Label>
  </section>

  <section className="flex items-center gap-1 ml-30">
    <Label className="font-medium text-xs">Delivery Ref:</Label>
    <Label className="font-medium text-xs">DPT000000001</Label>
  </section>
</section>

  );
}

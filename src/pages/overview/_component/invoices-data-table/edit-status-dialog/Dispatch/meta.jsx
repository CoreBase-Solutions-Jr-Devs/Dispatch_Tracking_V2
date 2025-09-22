import { Label } from "@/components/ui/label";

export default function DispatchMeta() {
  return (
    <section className="flex flex-row justify-between items-center gap-2 my-1">
      <section className="flex items-center gap-2">
        <Label className="text-xs text-muted font-medium">Dispatch Ref:</Label>
        <Label className="text-xs text-muted font-medium ">DPT000000001</Label>
      </section>
      
      <section className="flex items-center gap-2">
        <Label className="text-xs text-muted font-medium">Dispatch Control:</Label>
        <Label className="text-xs text-muted font-medium uppercase">CoreDBA</Label>
      </section>
    </section>
  );
}

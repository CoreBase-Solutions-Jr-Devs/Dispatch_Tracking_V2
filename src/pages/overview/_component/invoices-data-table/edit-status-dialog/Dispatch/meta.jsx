import { Label } from "@/components/ui/label";

export default function DispatchMeta() {
  return (
    <section className="flex flex-row justify-between items-center gap-2">
      <section className="flex items-center gap-1">
        <Label className="text-xs font-medium">Dispatch Control:</Label>
        <Label className="text-xs font-medium uppercase">CoreDBA</Label>
      </section>
    </section>
  );
}

import { Label } from "@/components/ui/label";

export default function DispatchDetails({ data }) {
  return (
    <div className="flex flex-col gap-5 text-xs font-medium">
      <section className="flex items-center gap-2">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        <Label className="text-xs font-medium ">08/20/2025 12:31</Label>
      </section>

      <section className="flex justify-between">
        <div className="flex items-center gap-2 w-1/2">
          <Label className="text-xs font-medium">DP ID:</Label>
          <Label className="text-xs font-medium ">31456780</Label>
        </div>
        <div className="flex items-center gap-2 w-1/2">
          <Label className="text-xs font-medium">DP DL:</Label>
          <Label className="text-xs font-medium ">31456780</Label>
        </div>
      </section>

      <section className="flex items-center gap-2">
        <Label className="text-xs font-medium">MAKE:</Label>
        <Label className="text-xs font-medium ">TVS</Label>
      </section>

      <section className="flex items-center gap-2">
        <Label className="text-xs font-medium">Dispatch Ref:</Label>
        <Label className="text-xs font-medium ">DPT000000001</Label>
      </section>
    </div>
  );
}

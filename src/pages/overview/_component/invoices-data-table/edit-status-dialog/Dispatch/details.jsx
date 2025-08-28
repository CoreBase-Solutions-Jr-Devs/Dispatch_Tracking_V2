import { Label } from "@/components/ui/label";

export default function DispatchDetails({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <section className="flex gap-x-12">
        <Label className="text-xs font-medium">Dispatch Date & Time:</Label>
        <Label className="text-xs font-medium text-muted"></Label>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">DP ID: </Label>
          <Label className="text-xs font-medium text-muted">{data.dpId}</Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">DP DL:</Label>
          <Label className="text-xs font-medium text-muted">{data.dpDl}</Label>
        </div>
      </section>

      <section className="flex justify-between">
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">MAKE:</Label>
          <Label className="text-xs font-medium text-muted">{data.make}</Label>
        </div>
        <div className="flex justify-between w-1/2">
          <Label className="text-xs font-medium">Dispatch Ref:</Label>
          <Label className="text-xs font-medium text-muted">
            {data.dispatchRef}
          </Label>
        </div>
      </section>
    </div>
  );
}

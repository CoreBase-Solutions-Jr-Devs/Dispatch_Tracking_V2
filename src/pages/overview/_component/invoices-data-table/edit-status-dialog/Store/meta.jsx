import { Label } from "@/components/ui/label";

export default function StoreMeta({ data }) {
  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "N/A";

  if (!data) return null;
  return (
    <section className="flex flex-row justify-between items-center gap-2">
      <section className="flex items-center gap-1">
        <Label className="text-xs font-medium">Turnaround Time (mins):</Label>
        <Label className="text-xs font-medium  uppercase">
          {/* {formatDateTime(data.turnaroundTime)} */}
          {data.turnaroundTime}
        </Label>
      </section>
      <section className="flex items-center gap-1">
        <Label className="text-xs font-medium">Store Control:</Label>
        <Label className="text-xs font-medium  uppercase">
          {data?.storeControl}
        </Label>
      </section>
    </section>
  );
}

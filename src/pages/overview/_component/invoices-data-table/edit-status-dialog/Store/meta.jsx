import { Label } from "@/components/ui/label";

export default function StoreMeta({ data }) {
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    [
      days && `${days}D`,
      hours && `${hours}H`,
      mins && `${mins}M`,
      secs && `${secs}S`,
    ]
      .filter(Boolean)
      .join(" ") || "0m"
  );
};

  if (!data) return null;
  return (
    <section className="flex flex-row justify-between items-center gap-2">
      <section className="flex items-center gap-1">
        <Label className="text-xs font-medium">Turnaround Time:</Label>
        <Label className="text-xs font-medium  uppercase">
          {formatDuration(data?.durationSeconds)}
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

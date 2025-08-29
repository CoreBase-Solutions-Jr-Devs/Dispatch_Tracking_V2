import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DispatchSummary({ data }) {
  return (
    <section className="flex flex-row justify-end items-center mb-2">
      <div className="flex items-center mr-4">
        <Label>Total Count:</Label>
        <Label className="ml-2">{data.totalCount}</Label>
      </div>
      <div className="flex items-center">
        <Label>Total Value:</Label>
        <Label className="ml-2">{data.totalValue}</Label>
      </div>
    </section>
  );
}

import { Label } from "@/components/ui/label";

export default function VerificationDetails({ data }) {
  const formatDateTime = (date) => {
    if (!date) return "—";
    try {
      return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  const Row = ({ label, value }) => (
    <div className="flex gap-2 min-w-0">
      <Label className="text-xs font-medium min-w-[130px]">{label}</Label>
      <Label className="text-xs font-medium  truncate">
        {value || "—"}
      </Label>
    </div>
  );

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-2">
      <Row label="Customer Name:" value={data.customerName} />
      <div />
      <Row label="Invoice No:" value={data.invoiceNo} />
      <Row
        label="Invoice Date & Time:"
        value={formatDateTime(data.invoiceDateTime)}
      />
      <Row label="Salesman:" value={data.salesman} />
      <Row
        label="Start Date & Time:"
        value={formatDateTime(data.verifyStartDateTime)}
      />
      <Row label="Verified By:" value={data.verifiedBy} />
      <Row
        label="End Date & Time:"
        value={formatDateTime(data.verifyEndDateTime)}
      />
    </div>
  );
}

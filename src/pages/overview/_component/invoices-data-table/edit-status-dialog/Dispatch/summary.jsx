import { Label } from "@/components/ui/label";

export default function DispatchSummary({ data = [] }) {
  const totalCount = data.length; // Document count
  const totalValue = data.reduce((sum, doc) => {
    const cleanAmount = parseFloat((doc.amount || "0").toString().replace(/,/g, "")); // Remove commas
    return sum + (isNaN(cleanAmount) ? 0 : cleanAmount); // 0 value if not a number
  },0).toFixed(2); // 2DP

  return (
    <section className="flex flex-row  justify-end items-center mb-2">
      <div className="flex items-center  text-xs text-medium mr-4">
        <Label>Total Count:</Label>
        <Label className="ml-2">{totalCount}</Label>
      </div>
      <div className="flex items-center text-xs text-medium">
        <Label>Total Value:</Label>
        <Label className="ml-2">{totalValue}</Label>
      </div>
    </section>
  );
}

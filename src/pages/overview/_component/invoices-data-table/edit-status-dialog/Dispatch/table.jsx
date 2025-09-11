import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function DispatchTable({ data }) {
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
  
  if (!data) return null;
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2">Doc No</TableCell>
            <TableCell className="py-1 px-2">Account</TableCell>
            <TableCell className="py-1 px-2">Doc Date & Time</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
          </TableRow>

          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">value={data.invoiceNo}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
            <TableCell className="py-1 px-2">  value={formatDateTime(data.invoiceDateTime)}</TableCell>
            <TableCell className="py-1 px-2">value={data.items}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
          </TableRow>

          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
            <TableCell className="py-1 px-2">value={data.customerName}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

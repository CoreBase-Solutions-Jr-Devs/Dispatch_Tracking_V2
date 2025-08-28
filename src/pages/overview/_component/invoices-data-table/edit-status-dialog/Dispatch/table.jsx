import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function DispatchTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow className="bg-gray-100">
            <TableCell>Doc No</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Doc Date & Time</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{data.docNo}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{data.amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

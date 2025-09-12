import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function DeliveryTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2">Select</TableCell>
            <TableCell className="py-1 px-2">Invoice No</TableCell>
            <TableCell className="py-1 px-2">CusName</TableCell>
             <TableCell className="py-1 px-2">CusCode</TableCell>
            <TableCell className="py-1 px-2">Invoice Date & Time</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
          </TableRow>

          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox className="border border-gray-400 " />
            </TableCell>
            <TableCell className="py-1 px-2">W1_20022693</TableCell>
            <TableCell className="py-1 px-2">A ONE SUPERMARKET</TableCell>
             <TableCell className="py-1 px-2">CUS001</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 23:22</TableCell>
            <TableCell className="py-1 px-2">2</TableCell>
            <TableCell className="py-1 px-2">1,470.00</TableCell>
          </TableRow>

          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2 ">
              <Checkbox className="border border-gray-400 " />
            </TableCell>
            <TableCell className="py-1 px-2">W1_20022674</TableCell>
            <TableCell className="py-1 px-2">ALFA CHEMIST LTD</TableCell>
            <TableCell className="py-1 px-2">CUS002</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 08:12</TableCell>
            <TableCell className="py-1 px-2">2</TableCell>
            <TableCell className="py-1 px-2">2,230.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    </div>
  );
}

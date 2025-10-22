import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function DispatchSummaryTable({ data = [], handleRowCheck }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2">Select</TableCell>
            <TableCell className="py-1 px-2">DocNo</TableCell>
            <TableCell className="py-1 px-2">CusCode</TableCell>
            <TableCell className="py-1 px-2">CusName</TableCell>
            <TableCell className="py-1 px-2">Route</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">DocType</TableCell>
            <TableCell className="py-1 px-2">Terms</TableCell>
            <TableCell className="py-1 px-2">Balance</TableCell>
          </TableRow>
          {data.map((row, index) => (
            <TableRow key={index} className={"text-xs font-medium"}>
              <TableCell className="py-1 px-2">
                <Checkbox
                  className="border border-gray-400"
                  onCheckedChange={(value) => handleRowCheck(value, row)}
                />
              </TableCell>
              <TableCell className="py-1 px-2">{row?.docNo}</TableCell>
              <TableCell className="py-1 px-2">{row?.customerCode}</TableCell>
              <TableCell className="py-1 px-2">{row?.customerName}</TableCell>
              <TableCell className="py-1 px-2">{row?.route}</TableCell>
              <TableCell className="py-1 px-2">{row?.items}</TableCell>
              <TableCell className="py-1 px-2">{row?.docType}</TableCell>
              <TableCell className="py-1 px-2">{row?.paymentTerms}</TableCell>
              <TableCell className="py-1 px-2">
                {Number(
                  new Intl.NumberFormat("en-GB").format(row?.amount)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DispatchSummaryTable;

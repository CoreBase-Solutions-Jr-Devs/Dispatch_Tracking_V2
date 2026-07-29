import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

function DispatchSummaryTable({ data = [], selected, handleRowCheck }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          <TableRow className="bg-gray-100 dark:bg-gray-800 text-xs font-medium border-b dark:border-gray-700">
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
          {data.map((row, index) => {
            const isChecked = selected.some(
              (d) => d.dispatchId === row.dispatchId
            );
            return (
              <TableRow key={index} className={"text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 border-b dark:border-gray-700"}>
                <TableCell className="py-1 px-2">
                  <Checkbox
                    className="border border-gray-400 dark:border-gray-500"
                    checked={isChecked}
                    onCheckedChange={(value) => handleRowCheck(value, row)}
                  />
                </TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.docNo}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.customerCode}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.customerName}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.route}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.items}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.docType}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">{row?.paymentTerms}</TableCell>
                <TableCell className="py-1 px-2 text-foreground">
                  {Number(
                    new Intl.NumberFormat("en-GB").format(row?.amount)
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default DispatchSummaryTable;

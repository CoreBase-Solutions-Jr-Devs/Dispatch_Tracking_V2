import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function DispatchTable({ data, selected, onToggle }) {

  const isSelected = (invNo) => selected.some((d) => d.invNo === invNo);

  return (
    <div className="max-h-40 overflow-y-auto">
      <Table>
        <TableBody>

          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2"></TableCell>
            <TableCell className="py-1 px-2">Inv. No</TableCell>
            <TableCell className="py-1 px-2">Cus Name</TableCell>
            <TableCell className="py-1 px-2">Cus Code</TableCell>
            <TableCell className="py-1 px-2">Inv. Date & Time</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
          </TableRow>

           {/* Row 1 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV001")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV001",
                    cusName: "Naivas Supermarket",
                    cusCode: "CUS1001",
                    invDateTime: "08/20/2025 10:15",
                    items: 5,
                    amount: "12,450.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV001</TableCell>
            <TableCell className="py-1 px-2">Naivas Supermarket</TableCell>
            <TableCell className="py-1 px-2">CUS1001</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 10:15</TableCell>
            <TableCell className="py-1 px-2">5</TableCell>
            <TableCell className="py-1 px-2">12,450.00</TableCell>
          </TableRow>

          {/* Row 2 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV002")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV002",
                    cusName: "Quickmart Ltd",
                    cusCode: "CUS1002",
                    invDateTime: "08/20/2025 11:05",
                    items: 3,
                    amount: "7,800.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV002</TableCell>
            <TableCell className="py-1 px-2">Quickmart Ltd</TableCell>
            <TableCell className="py-1 px-2">CUS1002</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 11:05</TableCell>
            <TableCell className="py-1 px-2">3</TableCell>
            <TableCell className="py-1 px-2">7,800.00</TableCell>
          </TableRow>

          {/* Row 3 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV003")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV003",
                    cusName: "Uchumi Chemists",
                    cusCode: "CUS1003",
                    invDateTime: "08/20/2025 12:40",
                    items: 4,
                    amount: "5,600.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV003</TableCell>
            <TableCell className="py-1 px-2">Uchumi Chemists</TableCell>
            <TableCell className="py-1 px-2">CUS1003</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 12:40</TableCell>
            <TableCell className="py-1 px-2">4</TableCell>
            <TableCell className="py-1 px-2">5,600.00</TableCell>
          </TableRow>

          {/* Row 4 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV004")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV004",
                    cusName: "Tuskys Supermarket",
                    cusCode: "CUS1004",
                    invDateTime: "08/20/2025 14:10",
                    items: 6,
                    amount: "15,300.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV004</TableCell>
            <TableCell className="py-1 px-2">Tuskys Supermarket</TableCell>
            <TableCell className="py-1 px-2">CUS1004</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 14:10</TableCell>
            <TableCell className="py-1 px-2">6</TableCell>
            <TableCell className="py-1 px-2">15,300.00</TableCell>
          </TableRow>

          {/* Row 5 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV005")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV005",
                    cusName: "Chandarana Foodplus",
                    cusCode: "CUS1005",
                    invDateTime: "08/20/2025 15:25",
                    items: 2,
                    amount: "4,250.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV005</TableCell>
            <TableCell className="py-1 px-2">Chandarana Foodplus</TableCell>
            <TableCell className="py-1 px-2">CUS1005</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 15:25</TableCell>
            <TableCell className="py-1 px-2">2</TableCell>
            <TableCell className="py-1 px-2">4,250.00</TableCell>
          </TableRow>

          {/* Row 6 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV006")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV006",
                    cusName: "Java House",
                    cusCode: "CUS1006",
                    invDateTime: "08/20/2025 16:40",
                    items: 8,
                    amount: "18,900.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV006</TableCell>
            <TableCell className="py-1 px-2">Java House</TableCell>
            <TableCell className="py-1 px-2">CUS1006</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 16:40</TableCell>
            <TableCell className="py-1 px-2">8</TableCell>
            <TableCell className="py-1 px-2">18,900.00</TableCell>
          </TableRow>

          {/* Row 7 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV007")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV007",
                    cusName: "Carrefour Kenya",
                    cusCode: "CUS1007",
                    invDateTime: "08/20/2025 17:50",
                    items: 10,
                    amount: "35,750.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV007</TableCell>
            <TableCell className="py-1 px-2">Carrefour Kenya</TableCell>
            <TableCell className="py-1 px-2">CUS1007</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 17:50</TableCell>
            <TableCell className="py-1 px-2">10</TableCell>
            <TableCell className="py-1 px-2">35,750.00</TableCell>
          </TableRow>

          {/* Row 8 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV008")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV008",
                    cusName: "Healthy U",
                    cusCode: "CUS1008",
                    invDateTime: "08/20/2025 19:05",
                    items: 3,
                    amount: "6,200.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV008</TableCell>
            <TableCell className="py-1 px-2">Healthy U</TableCell>
            <TableCell className="py-1 px-2">CUS1008</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 19:05</TableCell>
            <TableCell className="py-1 px-2">3</TableCell>
            <TableCell className="py-1 px-2">6,200.00</TableCell>
          </TableRow>

          {/* Row 9 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV009")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV009",
                    cusName: "Cleanshelf Supermarket",
                    cusCode: "CUS1009",
                    invDateTime: "08/20/2025 20:15",
                    items: 7,
                    amount: "14,350.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV009</TableCell>
            <TableCell className="py-1 px-2">Cleanshelf Supermarket</TableCell>
            <TableCell className="py-1 px-2">CUS1009</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 20:15</TableCell>
            <TableCell className="py-1 px-2">7</TableCell>
            <TableCell className="py-1 px-2">14,350.00</TableCell>
          </TableRow>

          {/* Row 10 */}
          <TableRow className="text-xs font-medium">
            <TableCell className="py-1 px-2">
              <Checkbox
                className="bg-gray-300"
                checked={isSelected("INV010")}
                onCheckedChange={() =>
                  onToggle({
                    invNo: "INV010",
                    cusName: "Woolworths Kenya",
                    cusCode: "CUS1010",
                    invDateTime: "08/20/2025 21:45",
                    items: 9,
                    amount: "22,100.00",
                  })
                }
              />
            </TableCell>
            <TableCell className="py-1 px-2">INV010</TableCell>
            <TableCell className="py-1 px-2">Woolworths Kenya</TableCell>
            <TableCell className="py-1 px-2">CUS1010</TableCell>
            <TableCell className="py-1 px-2">08/20/2025 21:45</TableCell>
            <TableCell className="py-1 px-2">9</TableCell>
            <TableCell className="py-1 px-2">22,100.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

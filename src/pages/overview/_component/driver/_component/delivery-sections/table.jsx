import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelectDeliveryInvoicesMutation } from "@/features/delivery/deliveryAPI";
import { toast } from "sonner";

export default function DeliveryTable({ data }) {
  const rows = data || [
    {
      invoiceNo: "W1_20022693",
      cusName: "A ONE SUPERMARKET",
      cusCode: "CUS001",
      date: "08/20/2025 23:22",
      items: 2,
      amount: "1,470.00",
    },
    {
      invoiceNo: "W1_20022674",
      cusName: "ALFA CHEMIST LTD",
      cusCode: "CUS002",
      date: "08/20/2025 08:12",
      items: 2,
      amount: "2,230.00",
    },
    {
      invoiceNo: "W1_20022701",
      cusName: "MEGA MART LTD",
      cusCode: "CUS003",
      date: "08/21/2025 15:45",
      items: 5,
      amount: "5,670.00",
    },
    {
      invoiceNo: "W1_20022702",
      cusName: "GREENFIELDS SHOP",
      cusCode: "CUS004",
      date: "08/21/2025 16:20",
      items: 3,
      amount: "3,120.00",
    },
    {
      invoiceNo: "W1_20022703",
      cusName: "SUNRISE PHARMACY",
      cusCode: "CUS005",
      date: "08/21/2025 17:00",
      items: 4,
      amount: "4,890.00",
    },
    {
      invoiceNo: "W1_20022704",
      cusName: "HAPPY MART",
      cusCode: "CUS006",
      date: "08/21/2025 18:10",
      items: 1,
      amount: "980.00",
    },
    {
      invoiceNo: "W1_20022705",
      cusName: "TECH SUPPLIERS LTD",
      cusCode: "CUS007",
      date: "08/21/2025 19:22",
      items: 7,
      amount: "12,340.00",
    },
    {
      invoiceNo: "W1_20022706",
      cusName: "CITY GROCERY",
      cusCode: "CUS008",
      date: "08/21/2025 20:45",
      items: 6,
      amount: "8,210.00",
    },
    {
      invoiceNo: "W1_20022707",
      cusName: "BETA STORES",
      cusCode: "CUS009",
      date: "08/21/2025 21:30",
      items: 8,
      amount: "9,450.00",
    },
    {
      invoiceNo: "W1_20022708",
      cusName: "OMEGA WHOLESALE",
      cusCode: "CUS010",
      date: "08/21/2025 22:10",
      items: 10,
      amount: "15,760.00",
    },
  ];

  const [selectDeliveryInvoices, { data: selecteResData, isLoading, isError }] =
    useSelectDeliveryInvoicesMutation();

  const handleRowSelection = (value, row) => {
    const payload = {
      // deliveryId: row.,
      invoices: [
        {
          invoiceNo: row?.invoiceNo,
          isSelected: value,
        },
      ],
    };
    console.log(value, row);
    // setChecked(!checked);
    handleSelectionApi(payload);
  };

  const handleSelectionApi = (data) => {
    selectDeliveryInvoices(data)
      .unwrap()
      .then((data) => {
        console.log(data);
        toast.success("selection successfully");
        // if (refetchData) refetchData();
      })
      .catch((error) => {
        let description = "Please check your credentials and try again.";
        if (error?.data?.errors) {
          const errorMessages = Object.values(error.data.errors).flat();
          if (errorMessages.length > 0) description = errorMessages.join(" ");
        } else if (error?.data?.message) {
          description = error.data.message;
        }
        toast.error("Store start Failed", { description, duration: 4000 });
      });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableBody>
          {/* Header Row */}
          <TableRow className="bg-gray-100 text-xs font-medium">
            <TableCell className="py-1 px-2">Select</TableCell>
            <TableCell className="py-1 px-2">Invoice No</TableCell>
            <TableCell className="py-1 px-2">CusName</TableCell>
            <TableCell className="py-1 px-2">CusCode</TableCell>
            <TableCell className="py-1 px-2">Invoice Date & Time</TableCell>
            <TableCell className="py-1 px-2">Items</TableCell>
            <TableCell className="py-1 px-2">Amount</TableCell>
          </TableRow>

          {/* Dynamic Rows */}
          {rows.map((row, index) => (
            <TableRow key={index} className="text-xs font-medium">
              <TableCell className="py-1 px-2">
                <Checkbox
                  className="border border-gray-400"
                  // checked={checked}
                  onCheckedChange={(value) => handleRowSelection(value, row)}
                />
              </TableCell>
              {/* <TableCell className="py-1 px-2">{row.invoiceNo}</TableCell>
              <TableCell className="py-1 px-2">{row.cusName}</TableCell>
              <TableCell className="py-1 px-2">{row.cusCode}</TableCell>
              <TableCell className="py-1 px-2">{row.date}</TableCell>
              <TableCell className="py-1 px-2">{row.items}</TableCell>
              <TableCell className="py-1 px-2">{row.amount}</TableCell> */}
              <TableCell className="py-1 px-2">{row?.invoiceNo}</TableCell>
              <TableCell className="py-1 px-2">{row?.customerName}</TableCell>
              <TableCell className="py-1 px-2">{row?.customerCode}</TableCell>
              {/* <TableCell className="py-1 px-2">
                {new Intl.DateTimeFormat("en-GB").format(
                  new Date(row?.invoiceDate)
                )}{" "}
                {row?.invoiceTime}
              </TableCell> */}
              <TableCell className="py-1 px-2">{row?.invoiceDate}</TableCell>
              <TableCell className="py-1 px-2">{row?.items}</TableCell>
              <TableCell className="py-1 px-2">{row?.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import React, { useState, useEffect } from "react";
// import DeliverySearch from "../delivery-sections/search";
import { useGetDispatchDriversQuery } from "@/features/delivery/deliveryAPI";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DriversSetupTable from "../driversSection/table";
import { Button } from "@/components/ui/button";
import { DriverDetails } from "../driversSection/driverDetails";

export default function Drivers({ rowData, onSubmit }) {
  const [selectedRow, setSelectedRow] = useState({});
  const [checkedInvoices, setCheckedInvoices] = useState([]);
  const [mpesaDetails, setMpesaDetails] = useState({
    phonenumber: "",
    amount: 0,
    DISPATCHNUM: "",
    BCODE: "",
    CUS_CODE: "",
    SALEINV_NUM: "",
  });
  const [searchText, setSearchText] = useState("");
  const [isNewDriverModal, setIsNewDriverModal] = useState(false);

  const {
    data: deliveryDrviers,
    isError,
    error,
    isLoading: isLoadingDrivers,
  } = useGetDispatchDriversQuery();

  // let deliveryInvoices = data;

  // const {
  //   data: invoiceDetails,
  //   isError: isDTError,
  //   isLoading: isGettingIvoiceDetails,
  // } = useGetDispatchesForDeliveryDTQuery({
  //   dispatchnum: selectedRow?.DISPATCHNUM || 0,
  //   bcode: selectedRow?.BCODE || 0,
  // });
  // console.log(invoiceDetails);

  const handleParentSelect = (selected) => {
    setCheckedInvoices([]);
    setSelectedRow(selected);
    console.log(selected);
  };

  const handleRowCheck = (value, row) => {
    setSelectedRow({});

    if (value) {
      setCheckedInvoices((prev) => [...prev, row]);
    } else {
      setCheckedInvoices((prev) => prev.filter((r) => r.DocNo !== row.DocNo));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMpesaDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchInput = (data) => {
    setSearchText(data);
  };

  const handleNewDriverModal = () => {
    setIsNewDriverModal(!isNewDriverModal);
  };

  return (
    <div className="overflow-y-auto max-h-[90vh] px-2">
      <div className="flex flex-row-reverse">
        <Button
          variant="default"
          className="mt-1 text-xs font-medium"
          onClick={handleNewDriverModal}
        >
          New Driver
        </Button>
      </div>
      {/* <DeliverySearch
        // value={query}
        isLoading={isLoadingDrivers}
        data={selectedRow}
        placeholder="invoice No..."
        handleSearchInput={handleSearchInput}
      /> */}
      <div className="flex flex-wrap py-2 gap-5">
        <div className="flex-auto">
          <div className="min-h-[300px]">
            <DriversSetupTable
              data={deliveryDrviers}
              handleRowSelection={handleParentSelect}
              handleRowCheck={handleRowCheck}
              checkedInvoices={checkedInvoices}
              isLoading={isLoadingDrivers}
              isError={isError}
            />
          </div>
        </div>
      </div>

      <DriverDetails
        show={isNewDriverModal}
        handleNewDriverModal={handleNewDriverModal}
      />

      {/* <Dialog open={mpesa} onOpenChange={() => setMpesa(!mpesa)}>
        <DialogTrigger onClick={() => setMpesa(!mpesa)} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mpesa Payment</DialogTitle>
            <DialogDescription>
              Please enter the OTP provided.
            </DialogDescription>
          </DialogHeader>

          <form
            autoComplete="off"
            className="space-y-4"
            onSubmit={handleMPesaPayment}
          >
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <PhoneInput
                country={"ke"}
                value={mpesaDetails.phonenumber}
                inputStyle={{
                  width: "100%",
                  fontSize: "12px",
                  lineHeight: "1.5",
                  height: " calc(1.5em + 0.5rem + 2px)",
                }}
                id="phonenumber"
                name="phonenumber"
                masks={{ ke: "... ... ..." }}
                onChange={handlePhone}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Amount</Label>
              <Input
                type="number"
                value={mpesaDetails.amount}
                name="amount"
                onChange={handleChange}
                max={deliveryInvoices?.BALANCE}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isPayingLoading}
              variant="default"
              className="w-full"
            >
              Pay
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

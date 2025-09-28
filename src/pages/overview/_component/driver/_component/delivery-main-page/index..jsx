import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import DeliverySearch from "../delivery-sections/search";
import DeliveryTable from "../delivery-sections/table";
import DeliverySummary from "../delivery-sections/summary";
import DeliveryDetails from "../delivery-sections/details";
import DeliveryMeta from "../delivery-sections/meta";
import DeliveryRemarks from "../delivery-sections/remarks";
import DeliveryFooter from "../delivery-sections/footer";
import DeliveryPagination from "../delivery-sections/pagination";
import {
  useGetDeliveryInvoicesQuery,
  useGetDispatchesForDeliveryHDQuery,
  useDeliveryCompleteMutation,
  useGenerateOTPForDeliveredInvoicesMutation,
  useValidateOTPForDeliveredInvoicesMutation,
  useMakeMpesaSTKPushForDeliveredInvoicesMutation,
} from "@/features/delivery/deliveryAPI";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";

export default function DeliveryInvoice({ rowData, onSubmit }) {
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const [remarks, setRemarks] = useState("");
  const [show, setShow] = useState(false);
  const [mpesa, setMpesa] = useState(false);
  const [otp, setOTP] = useState("");
  const [mpesaDetails, setMpesaDetails] = useState({
    phonenumber: "",
    amount: "",
  });

  const [deliveryComplete, { isLoading }] = useDeliveryCompleteMutation();
  const [
    GenerateOTPForDeliveredInvoices,
    { isLoading: isGeneratingOTPLoading },
  ] = useGenerateOTPForDeliveredInvoicesMutation();
  const [
    ValidateOTPForDeliveredInvoices,
    { isLoading: isvalidatingOTPLoading },
  ] = useValidateOTPForDeliveredInvoicesMutation();
  const [MakeMpesaSTKPushForDeliveredInvoices, { isLoading: isPayingLoading }] =
    useMakeMpesaSTKPushForDeliveredInvoicesMutation();

  // const { data, isError } = useGetDeliveryInvoicesQuery({
  //   pageNumber: 1,
  //   pageSize: 20,
  // });

  // let deliveryInvoices = data?.items;

  const { data } = useGetDispatchesForDeliveryHDQuery();
  let deliveryInvoices = data;

  const handleParentSelect = (selected) => {
    setSelectedRow(selected);
  };

  const handleParentRemarks = (value) => {
    setRemarks(value);
  };

  const handleMPesaPayment = (e) => {
    e.preventDefault();
    const payload = {
      dispatchnum: selectedRow?.DISPATCHNUM,
      bcode: selectedRow?.BCODE,
      cuscode: selectedRow?.CUS_CODE,
      phonenumber: mpesaDetails?.phonenumber,
      amount: mpesaDetails?.amount,
    };
    MakeMpesaSTKPushForDeliveredInvoices(payload)
      .unwrap()
      .then((data) => {
        toast.success("Mpesa payment successful");
        setSelectedRow({});
        setMpesa(false);
        setMpesaDetails({
          phonenumber: "",
          amount: "",
        });
      })
      .catch((error) => {
        toast.error("Mpesa payment Failed", {
          description:
            error?.data?.message ||
            error?.data?.title ||
            "Please check your credentials and try again",
          duration: 4000,
        });
      });
  };

  const handleValidateOTP = (e) => {
    e.preventDefault();
    const payload = {
      dispatchnum: selectedRow?.DISPATCHNUM,
      bcode: selectedRow?.BCODE,
      saleinv_num: selectedRow?.SALEINV_NUM,
      otp,
    };
    ValidateOTPForDeliveredInvoices(payload)
      .unwrap()
      .then((data) => {
        toast.success("OTP Validated successful");
        setSelectedRow({});
        setRemarks("");
        setOTP("");
        setShow(false);
      })
      .catch((error) => {
        toast.error("OTP Failed", {
          description:
            error?.data?.message ||
            error?.data?.title ||
            "Please check your credentials and try again",
          duration: 4000,
        });
      });
  };

  const handleOTPGenerate = () => {
    const payload = {
      dispatchnum: selectedRow?.DISPATCHNUM,
      bcode: selectedRow?.BCODE,
      saleinv_num: selectedRow?.SALEINV_NUM,
    };
    GenerateOTPForDeliveredInvoices(payload)
      .unwrap()
      .then((data) => {
        toast.success("OTP sent successful");
        setSelectedRow({});
        setRemarks("");
        setOTP("");
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
        setOTP("");
        setShow(
          String(error?.data?.message).toLowerCase().includes("generated")
        );
        toast.error("OTP Failed", {
          description:
            error?.data?.message || error?.data?.title || "Please  try again",
          duration: 4000,
        });
      });
  };

  const handleCompleteDelivery = () => {
    const payload = {
      remarks,
      dispatchnum: selectedRow?.DISPATCHNUM,
      bcode: selectedRow?.BCODE,
      invoices: [
        {
          cus_code: selectedRow?.CUS_CODE,
          saleinv_num: selectedRow?.SALEINV_NUM,
        },
      ],
    };
    deliveryComplete(payload)
      .unwrap()
      .then((data) => {
        toast.success("Delivery successful");
        setSelectedRow({});
        setRemarks("");
      })
      .catch((error) => {
        toast.error("Delivery Failed", {
          description:
            error?.data?.message ||
            error?.data?.title ||
            "Please check your credentials and try again",
          duration: 4000,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMpesaDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
  };
  const handlePhone = (value, country, e, formattedValue) => {
    const { name } = e.target;
    setMpesaDetails((prevState) => ({
      ...prevState,
      phonenumber: value,
    }));
    console.log(formattedValue);
  };

  return (
    <div className="overflow-y-auto max-h-[90vh] px-2">
      {/* <DeliverySearch
        value={query}
        onChange={setQuery}
        data={rowData}
        placeholder="invoice No..."
      /> */}
      <div className="flex flex-wrap py-2 gap-5">
        <div className="flex-auto">
          <div className="min-h-[300px]">
            <DeliveryTable
              data={deliveryInvoices}
              handleParentSelect={handleParentSelect}
            />
          </div>
          {/* <DeliverySummary data={rowData} /> */}
          {/* <DeliveryPagination data={rowData} /> */}
        </div>
        <div className="w-32 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedRow?.SALEINV_NUM} | {selectedRow?.CUSNAME}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryDetails data={selectedRow} />

              <div className="flex items-center gap-3 mt-6">
                <Button
                  variant="store"
                  onClick={() => setMpesa(true)}
                  disabled={!selectedRow?.CUS_CODE}
                  className="mt-1  uppercase text-xs font-medium"
                >
                  Pay
                </Button>
              </div>

              {/* <div className="py-1"> */}
              <Separator className="my-2" />
              <DeliveryRemarks handleParentRemarks={handleParentRemarks} />
              {/* </div> */}
            </CardContent>
            <CardFooter>
              <DeliveryFooter
                rowData={selectedRow}
                isLoading={
                  isLoading || !Boolean(Object.keys(selectedRow).length)
                }
                generateOTP={handleOTPGenerate}
                onSubmit={handleCompleteDelivery}
              />
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* <Separator className="my-2" /> */}

      {/* <DeliveryDetails data={rowData} /> */}
      {/* <div className=" py-1">
        <DeliveryRemarks />
      </div> */}

      {/* <DeliveryMeta /> */}
      {/* <DeliveryFooter rowData={rowData} onSubmit={onSubmit} /> */}

      <Dialog open={show} onOpenChange={() => setShow(!show)}>
        <DialogTrigger onClick={() => setShow(!show)} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Validate OTP</DialogTitle>
            <DialogDescription>
              Please enter the OTP provided.
            </DialogDescription>
          </DialogHeader>

          <form
            autoComplete="off"
            className="space-y-4"
            onSubmit={handleValidateOTP}
          >
            <div>
              <Label className="text-sm font-medium">OTP</Label>
              <Input
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <Button
              variant="default"
              type="submit"
              onClick={() => setShow(false)}
              className="w-full"
            >
              Validate
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={mpesa} onOpenChange={() => setMpesa(!mpesa)}>
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
                // value={cellnumber}
                // inputClass="form-control-sm rounded-0 fw-bold fs-6"
                // inputProps={{
                //   id: "phonenumber",
                //   name: "phonenumber",
                //   // required: true,
                //   autoComplete: false,
                // }}
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
              {/* <Input
                value={mpesaDetails.phonenumber}
                name="phonenumber"
                onChange={handleChange}
                required
              /> */}
            </div>
            <div>
              <Label className="text-sm font-medium">Amount</Label>
              <Input
                type="number"
                value={mpesaDetails.amount}
                name="amount"
                onChange={handleChange}
                max={data?.BALANCE}
                required
              />
            </div>
            <Button
              type="submit"
              // onClick={() => setMpesa(false)}
              variant="default"
              className="w-full"
              // className="w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Pay
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

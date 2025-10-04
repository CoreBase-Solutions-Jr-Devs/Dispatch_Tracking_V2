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
import DisputedDetails from "../delivery-sections/disputed";
import DetailAmount from "../delivery-sections/detailAmount";

export default function DeliveryInvoice({ rowData, onSubmit }) {
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const [checkedInvoices, setCheckedInvoices] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [show, setShow] = useState(false);
  const [mpesa, setMpesa] = useState(false);
  const [otp, setOTP] = useState("");
  const [mpesaDetails, setMpesaDetails] = useState({
    phonenumber: selectedRow?.OTPPHONENUMBER || "",
    amount: selectedRow?.BALANCE || 0,
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
  // let deliveryInvoices2 = data?.map((invoice) => {
  //   return convertToNull(invoice);
  // });

  // function convertToNull(obj) {
  //   for (let [key, value] of Object.entries(obj)) {
  //     if (typeof value === "object") {
  //       obj[key] = null;
  //     }
  //   }
  //   return obj;
  // }

  // console.log(deliveryInvoices);

  const handleParentSelect = (selected) => {
    setCheckedInvoices([]);
    setSelectedRow(selected);
  };

  const handleRowCheck = (value, row) => {
    setSelectedRow({});
    // setCheckedInvoices((prev) => [
    //   ...prev,
    //   { ...row, isInvoiceChecked: value },
    // ]);
    if (value) {
      setCheckedInvoices((prev) => [...prev, row]);
    } else {
      setCheckedInvoices((prev) =>
        prev.filter((r) => r.DISPATCHNUMBER !== row.DISPATCHNUMBER)
      );
    }
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
      phonenumber: `0${mpesaDetails?.phonenumber.slice(3)}`,
      amount: mpesaDetails?.amount,
    };
    console.log(payload);
    MakeMpesaSTKPushForDeliveredInvoices(payload)
      .unwrap()
      .then((data) => {
        toast.success("Mpesa payment successful");
        // setSelectedRow({});
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
            "Please try paying again",
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
        // setSelectedRow({});
        setRemarks("");
        // setOTP("");
        setShow(false);
      })
      .catch((error) => {
        toast.error("OTP Failed", {
          description:
            error?.data?.message ||
            error?.data?.title ||
            "Please request anothers and try again",
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
        // setSelectedRow({});
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
            error?.data?.message || error?.data?.title || "Please try again",
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
  };
  const handlePhone = (value, country, e, formattedValue) => {
    const { name } = e.target;
    setMpesaDetails((prevState) => ({
      ...prevState,
      phonenumber: value,
    }));
  };
  const handleMpesaPopup = () => {
    setMpesa(true);
    setMpesaDetails({
      phonenumber:
        selectedRow?.OTPPHONENUMBER[0] === "0"
          ? `254${selectedRow?.OTPPHONENUMBER.slice(1)}`
          : selectedRow?.OTPPHONENUMBER || "",
      amount: selectedRow?.BALANCE || 0,
    });
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
              handleRowSelection={handleParentSelect}
              handleRowCheck={handleRowCheck}
            />
          </div>
          <DeliverySummary data={deliveryInvoices} />
          <Separator className="my-2" />
          <DeliveryDetails
            data={
              checkedInvoices.length > 0 ? checkedInvoices : deliveryInvoices
            }
          />
          {/* <DeliveryPagination data={rowData} /> */}
        </div>

        {Boolean(Object.keys(selectedRow).length) && (
          <div className="w-32 flex-1">
            {typeof selectedRow.ISDISPUTED !== "object" ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedRow?.SALEINV_NUM} | {selectedRow?.CUSNAME}
                  </CardTitle>
                </CardHeader>
                {/* <DisputedDetails data={selectedRow} /> */}
                <CardContent>
                  <DetailAmount data={selectedRow} />
                  {selectedRow?.OTPValidated && (
                    <div className="flex items-center gap-3 mt-6">
                      <Button
                        variant="store"
                        onClick={handleMpesaPopup}
                        disabled={!selectedRow?.CUS_CODE}
                        className="mt-1  uppercase text-xs font-medium"
                      >
                        Pay
                      </Button>
                    </div>
                  )}

                  <Separator className="my-2" />
                  <DeliveryRemarks handleParentRemarks={handleParentRemarks} />
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
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedRow?.SALEINV_NUM} | {selectedRow?.CUSNAME}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DisputedDetails data={selectedRow} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* <Separator className="my-2" /> */}

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

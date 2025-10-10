import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDisputedAmountsInvoicesMutation } from "@/features/delivery/deliveryAPI";
import { useState } from "react";
import { toast } from "sonner";

function DisputedDetails({ data, handleDispute }) {
  const [disputeDetails, setDisputeDetails] = useState({
    dispatchnum: data?.DISPATCHNUM || 0,
    bcode: data?.BCODE || 0,
    disputedamount: data?.DISPUTEDAMT || 0,
    saleinv_num: data?.SALEINV_NUM || 0,
    // comments: data?.DISPUTEDComments || "",
    comments: "",
  });

  const [DisputedAmountsInvoices, { isLoading }] =
    useDisputedAmountsInvoicesMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisputeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !disputeDetails.dispatchnum ||
      !disputeDetails.bcode ||
      !disputeDetails.disputedamount ||
      !disputeDetails.saleinv_num ||
      !disputeDetails.comments
    ) {
      return;
    }

    DisputedAmountsInvoices(disputeDetails)
      .unwrap()
      .then((data) => {
        toast.success("Dispute resolved successful");
        console.log(data);
        handleDispute();
      })
      .catch((error) => {
        toast.error("Dispute resolve Failed", {
          description:
            error?.data?.message || error?.data?.title || "Please try again",
          duration: 4000,
        });
      });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2">
        <Label className="text-xs font-medium ">Dispatch Num:</Label>
        <Input
          type={"number"}
          value={disputeDetails.dispatchnum}
          name="dispatchnum"
          required
          disabled
        />
      </div>
      <div className="flex flex-col mb-2">
        <Label className="text-xs font-medium ">Salesinv Num:</Label>
        <Input
          type={"number"}
          value={disputeDetails.saleinv_num}
          name="saleinv_num"
          required
          disabled
        />
      </div>
      <div className="flex flex-col mb-2">
        <Label className="text-xs font-medium ">Disputed Amount:</Label>
        <Input
          type={"number"}
          // min={0}
          value={disputeDetails.disputedamount}
          onChange={handleChange}
          name="disputedamount"
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <Label className="text-xs font-medium ">Comments:</Label>
        <Textarea
          className="w-full bg-gray-300 text-xs font-medium"
          value={disputeDetails.comments}
          name="comments"
          onChange={handleChange}
        />
      </div>

      <div className="flex mt-1 justify-end gap-3">
        <Button
          type="submit"
          variant="default"
          // onClick={generateOTP}
          disabled={isLoading}
          className="text-xs font-medium"
        >
          Resolve
        </Button>
        <Button
          variant="destructive"
          type="button"
          onClick={handleDispute}
          disabled={isLoading}
          className="text-xs font-medium"
        >
          Cancel
        </Button>
        {/* {!data?.ISDISPUTED && (

        )} */}
      </div>
    </form>
  );
}

export default DisputedDetails;

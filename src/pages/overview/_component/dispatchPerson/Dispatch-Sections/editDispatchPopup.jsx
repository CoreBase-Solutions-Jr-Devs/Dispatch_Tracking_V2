import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/hook";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useGetDeliveryDriverQuery } from "@/features/dispatch/dispatchAPI";
import { setDriverDetails } from "@/features/dispatch/dispatchSlice";

import DispatchSelect from "../dispatch-invoice-table/sections/select";
import DispatchDetails from "../dispatch-invoice-table/sections/details";
import DispatchRemarks from "../dispatch-invoice-table/sections/remarks";
import DispatchMeta from "../dispatch-invoice-table/sections/meta";

const EditDispatchPopup = ({ selectedDispatch, onClose }) => {
  const dispatch = useAppDispatch();

  const [editedDispatch, setEditedDispatch] = useState({
    dispatchPerson: "",
    dispatchRoute: "",
    vehicle: "",
    collectionType: "",
    remarks: "",
    ...selectedDispatch,
  });

  const handleFieldChange = (field, value) => {
    setEditedDispatch((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    data: filterOptions,
    isLoading: filterLoading,
    isError: filterError,
  } = useFilterOptionsQuery();

  const deliveryGuyOptions =
    filterOptions?.find((opt) => opt.key === "deliveryGuy")?.options || [];

  const {
    data: driverDetails,
    isLoading: driverLoading,
    isError: driverError,
    error: driverApiError,
  } = useGetDeliveryDriverQuery(editedDispatch.dispatchPerson, {
    skip:
      editedDispatch.collectionType !== "delivery" ||
      !editedDispatch.dispatchPerson,
  });

  useEffect(() => {
    if (driverDetails) {
      dispatch(setDriverDetails(driverDetails));
    }
  }, [driverDetails, dispatch]);

  return (
    <div className="my-1 max-h-[90vh] px-2 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">
        Edit Dispatch Details
      </h2>

      <Separator className="my-2" />

      <div className="flex justify-center items-start space-x-6">
        <div className="w-3/4">
          <Card className="flex flex-col p-3 h-full">
            <CardContent className="space-y-4">
              <DispatchSelect
                values={editedDispatch}
                onChange={handleFieldChange}
                deliveryGuyOptions={deliveryGuyOptions}
                enabled={true}
              />

              <DispatchDetails
                data={driverDetails}
                collectionType={editedDispatch.collectionType}
                deliveryPerson={editedDispatch.dispatchPerson}
                driverLoading={driverLoading}
                driverError={driverError}
                driverApiError={driverApiError}
                enabled={true}
              />

              <DispatchRemarks
                data={editedDispatch}
                onChange={handleFieldChange}
                enabled={true}
              />

              <DispatchMeta data={editedDispatch} enabled={true} />
            </CardContent>
          </Card>
        </div>

        <div className="w-1/4 flex flex-col justify-start space-y-3">
          {" "}
          <Button
           
            variant="apply"
            className="w-full"
          >
            UPDATE
          </Button>{" "}
          <Button
            
            variant="apply"
            className="w-full"
          >
        PUSH
          </Button>
          <Button variant="destructive" onClick={onClose} className="w-full">
            CLOSE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDispatchPopup;

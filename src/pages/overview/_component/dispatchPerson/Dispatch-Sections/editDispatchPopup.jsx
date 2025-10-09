import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/hook";
import {
  setDispatch,
  resetDispatchData,
  setDriverDetails,
} from "@/features/dispatch/dispatchSlice";
import {
  usePushDispatchProcessMutation,
  useGetDeliveryDriverQuery,
} from "@/features/dispatch/dispatchAPI";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";

import DispatchSelect from "../dispatch-invoice-table/sections/select";
import DispatchDetails from "../dispatch-invoice-table/sections/details";
import DispatchRemarks from "../dispatch-invoice-table/sections/remarks";
import DispatchMeta from "../dispatch-invoice-table/sections/meta";

const EditDispatchPopup = ({ selectedDispatch, onClose }) => {
  const dispatch = useAppDispatch();

  const [pushDispatch, { isLoading: processing }] =
    usePushDispatchProcessMutation();
  const { updatedDispatches, dispatchIds: sliceDispatchIds } = useSelector(
    (state) => state.dispatch
  );

const dispatchIds =
  updatedDispatches?.length > 0
    ? updatedDispatches.map((item) => item.dispatchId)
    : [selectedDispatch?.dispatchId];


  const [editedDispatch, setEditedDispatch] = useState({
    dispatchPerson: "",
    dispatchRoute: "",
    vehicle: "",
    collectionType: "",
    remarks: "",
    ...selectedDispatch,
  });

  const handleFieldChange = (field, value) => {
    setEditedDispatch((prev) => ({ ...prev, [field]: value }));
  };

  const { data: filterOptions } = useFilterOptionsQuery();
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

  const cleanForm = (formData, type) => {
    if (type === "delivery") {
      delete formData.CustomerCourierId;
      delete formData.CustomerCourierName;
      delete formData.CustomerCourierPhone;
    }
    if (["self-collection", "courier"].includes(type)) {
      delete formData.DriverId;
      delete formData.DriverName;
      delete formData.RouteName;
      delete formData.CarMake;
      delete formData.CarPlate;
    }
  };

  const preparePayload = (isPush = false) => {
    const payload = {
      dispatchIds,
      collectionType: editedDispatch.collectionType,
      routeName: editedDispatch.dispatchRoute || null,
      driverName: driverDetails?.driverName || null,
      driverId: driverDetails?.driverId || null,
      carMake: driverDetails?.carMake || null,
      carPlate: driverDetails?.regNo || null,
      dispatchRemarks: editedDispatch.remarks || "",
      isPush: isPush,
    };

    cleanForm(payload, editedDispatch.collectionType);
    return payload;
  };

  const handleAction = async (isPush = false) => {
    const payload = preparePayload(isPush);
    try {
      await pushDispatch(payload).unwrap();
      dispatch(setDispatch(payload));
      toast.success(
        isPush
          ? "Dispatch pushed successfully!"
          : "Dispatch updated successfully!"
      );
      dispatch(resetDispatchData());
      onClose();
    } catch (error) {
      toast.error(
        isPush ? "Failed to push dispatch" : "Failed to update dispatch",
        {
          description: error?.data?.message || "Please try again",
        }
      );
    }
  };

  const isAnyLoading = processing || driverLoading;

  return (
    <div className="my-1 max-h-[90vh] px-2 space-y-4 flex flex-col">
      <h2 className="text-lg font-semibold text-foreground">
        Edit Dispatch Details
      </h2>

      <Separator className="my-2" />

      <Card className="flex flex-col p-3 h-full">
        <CardContent className="space-y-4">
          <DispatchSelect
            values={editedDispatch}
            onChange={handleFieldChange}
            deliveryGuyOptions={deliveryGuyOptions}
            enabled
          />

          <DispatchDetails
            data={driverDetails}
            collectionType={editedDispatch.collectionType}
            deliveryPerson={editedDispatch.dispatchPerson}
            driverLoading={driverLoading}
            driverError={driverError}
            driverApiError={driverApiError}
            enabled
          />

          <DispatchRemarks
            data={editedDispatch}
            onChange={handleFieldChange}
            enabled
          />

          <DispatchMeta data={editedDispatch} enabled />
        </CardContent>
      </Card>

      {/* Buttons at bottom */}
      <div className="flex flex-col md:flex-row justify-end md:space-x-3 mt-4 space-y-2 md:space-y-0">
        <Button
          variant="apply"
          onClick={() => handleAction(false)}
          disabled={isAnyLoading}
        >
          UPDATE
        </Button>

        <Button
          variant="apply"
          onClick={() => handleAction(true)}
          disabled={isAnyLoading}
        >
          PUSH
        </Button>

        <Button variant="destructive" onClick={onClose}>
          CLOSE
        </Button>
      </div>
    </div>
  );
};

export default EditDispatchPopup;

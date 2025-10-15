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

const EditDispatchPopup = ({ selectedDispatch = {}, onClose }) => {
  const dispatch = useAppDispatch();

  const { updatedDispatches } = useSelector((state) => state.dispatch);
  const dispatchIDs = (updatedDispatches || []).map((item) => item.dispatchId);

  const [pushDispatch, { isLoading: processing }] =
    usePushDispatchProcessMutation();

  const { data: filterOptions } = useFilterOptionsQuery();

  const [editedDispatch, setEditedDispatch] = useState(() => ({
    dispatchPerson: "",
    dispatchRoute: "",
    vehicle: "",
    collectionType: "",
    remarks: "",
    ...JSON.parse(JSON.stringify(selectedDispatch || {})),
  }));

  const [localDriverDetails, setLocalDriverDetails] = useState(null);

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

  const collectionTypeOptions = (
    filterOptions?.find((opt) => opt.key === "collectionType")?.options || []
  ).map((opt) => ({
    label: opt.label,
    // value: opt.value,
    value: opt.label,
  }));

  useEffect(() => {
    if (driverDetails) setLocalDriverDetails(driverDetails);
  }, [driverDetails]);

  const handleFieldChange = (field, value) => {
    setEditedDispatch((prev) => ({ ...prev, [field]: value }));
  };

  const deliveryGuyOptions =
    filterOptions?.find((opt) => opt.key === "deliveryGuy")?.options || [];
  const routeOptions =
    filterOptions?.find((opt) => opt.key === "route")?.options || [];

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
      dispatchIds: dispatchIDs,
      collectionType: editedDispatch.collectionType,
      routeName: editedDispatch.dispatchRoute || null,
      driverName: localDriverDetails?.driverName || null,
      driverId: localDriverDetails?.driverId || null,
      carMake: localDriverDetails?.carMake || null,
      carPlate: localDriverDetails?.regNo || null,
      dispatchRemarks: editedDispatch.remarks || "",
      isPush,
    };

    cleanForm(payload, editedDispatch.collectionType);
    return payload;
  };

  const handleAction = async (isPush = false) => {
    const payload = preparePayload(isPush);
    if (!payload) return;

    try {
      await pushDispatch(payload).unwrap();
      dispatch(setDispatch(payload));
      dispatch(setDriverDetails(localDriverDetails));
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
        { description: error?.data?.message || "Please try again" }
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
            collectionTypeOptions={collectionTypeOptions}
            deliveryGuyOptions={deliveryGuyOptions.map((opt) => ({
              label: opt.label,
              value: opt.label,
            }))}
            routeOptions={routeOptions.map((opt) => ({
              label: opt.label,
              value: opt.label,
            }))}
            enabled
          />

          <DispatchDetails
            data={localDriverDetails}
            collectionType={editedDispatch.collectionType}
            deliveryPerson={editedDispatch.dispatchPerson}
            driverLoading={driverLoading}
            driverError={driverError}
            driverApiError={driverApiError}
            enabled
            route={editedDispatch.dispatchRoute}
          />

          <DispatchRemarks
            data={editedDispatch}
            onChange={handleFieldChange}
            enabled
          />

          <DispatchMeta data={editedDispatch} enabled />
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-end md:space-x-3 mt-4 space-y-2 md:space-y-0">
        <Button
          variant="apply"
          onClick={(e) => {
            e.stopPropagation();
            handleAction(false);
          }}
          disabled={isAnyLoading}
        >
          UPDATE
        </Button>

        <Button
          variant="apply"
          onClick={(e) => {
            e.stopPropagation();
            handleAction(true);
          }}
          disabled={isAnyLoading}
        >
          PUSH
        </Button>

        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          CLOSE
        </Button>
      </div>
    </div>
  );
};

export default EditDispatchPopup;

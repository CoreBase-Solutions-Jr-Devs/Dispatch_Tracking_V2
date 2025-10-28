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

const EditDispatchPopup = ({ selectedDispatch = {}, onClose, rowData }) => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state) => state.auth);
  const dispatchIDs = (rowData || []).map((item) => item.dispatchNum);
  console.log(rowData);

  const [pushDispatch, { isLoading: processing }] =
    usePushDispatchProcessMutation();

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

  const [localDriverDetails, setLocalDriverDetails] = useState(null);
  const { data: filterOptions } = useFilterOptionsQuery();

  const {
    data: driverDetails,
    isLoading: driverLoading,
    isError: driverError,
    error: driverApiError,
  } = useGetDeliveryDriverQuery(editedDispatch.dispatchPerson, {
    skip:
      editedDispatch.collectionType !== "OUR DELIVERY" ||
      !editedDispatch.dispatchPerson,
  });

  const collectionTypeOptions = (
    filterOptions?.find((opt) => opt.key === "collectionType")?.options || []
  ).map((opt) => ({
    label: opt.label,
    value: opt.label,
  }));
  const deliveryGuyOptions =
    filterOptions?.find((opt) => opt.key === "deliveryGuy")?.options || [];
  const routeOptions =
    filterOptions?.find((opt) => opt.key === "route")?.options || [];
  const vehicleOptions =
    filterOptions?.find((opt) => opt.key === "transporter")?.options || [];

  // useEffect(() => {
  //   if (driverDetails) {
  //     dispatch(setDriverDetails(driverDetails));
  //   }
  // }, [driverDetails, dispatch]);

  useEffect(() => {
    if (driverDetails) setLocalDriverDetails(driverDetails);
  }, [driverDetails]);

  const cleanForm = (formData, type) => {
    if (type === "delivery" || type === "OUR DELIVERY") {
      delete formData.customerCourierId;
      delete formData.customerCourierName;
      delete formData.customerCourierPhone;
    }

    if (["self-collection", "COURIER", "CUSTOMER"].includes(type)) {
      delete formData.driverId;
      delete formData.driverName;
      delete formData.routeName;
      delete formData.carMake;
      delete formData.carPlate;
    }
  };

  const preparePayload = (isPush = false) => {
    if (!dispatchIDs?.length) {
      toast.error("No dispatch IDs found.");
      return null;
    }

    const payload = {
      dispatchIds: dispatchIDs,
      collectionType:
        editedDispatch.collectionType?.toUpperCase() || "DELIVERY",
      userName: user?.username || "",
      routeName: editedDispatch.dispatchRoute || null,
      driverName: localDriverDetails?.driverName || null,
      driverId: Number(localDriverDetails?.driverId) || 0,
      carMake: localDriverDetails?.carMake || null,
      carPlate: localDriverDetails?.regNo || null,
      dispatchRemarks: editedDispatch.remarks || "",
      isPush,
    };

    console.log("payload", {
      dispatchIds: dispatchIDs,
      collectionType:
        editedDispatch.collectionType?.toUpperCase() || "DELIVERY",
      userName: user?.username || "",
      routeName: editedDispatch.dispatchRoute || null,
      driverName: localDriverDetails?.driverName || null,
      driverId: Number(localDriverDetails?.driverId) || 0,
      carMake: localDriverDetails?.carMake || null,
      carPlate: localDriverDetails?.regNo || null,
      dispatchRemarks: editedDispatch.remarks || "",
      isPush,
    });

    cleanForm(payload, editedDispatch.collectionType);
    return payload;
  };

  // ✅ Handle Save or Push Dispatch (like DispatchFooter)
  const handleDispatchAction = async (isPush = false) => {
    const payload = preparePayload(isPush);
    if (!payload) return;

    try {
      await pushDispatch(payload).unwrap();
      dispatch(setDispatch(payload));

      toast.success(
        isPush
          ? "Dispatch pushed successfully!"
          : "Dispatch saved successfully!"
      );
      onClose();
      // if (isPush) return dispatch(resetDispatchData());
    } catch (error) {
      console.error("❌ Dispatch Action Error:", error);
      toast.error(isPush ? "Dispatch push failed" : "Dispatch save failed", {
        description: error?.data?.message || "Please try again.",
      });
    }
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
      if (isPush) return dispatch(resetDispatchData());
    } catch (error) {
      toast.error(
        isPush ? "Failed to push dispatch" : "Failed to update dispatch",
        { description: error?.data?.message || "Please try again" }
      );
    }
  };

  const isAnyLoading = processing || driverLoading;

  return (
    <div className="my-1 max-h-[90vh] px-2 space-y-4 flex flex-col overflow-auto">
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
            vehicleOptions={vehicleOptions.map((opt) => ({
              label: opt.label,
              value: opt.label,
            }))}
            enabled
          />

          <DispatchDetails
            // data={driverDetails}
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
          // onClick={() => handleDispatchAction(false)}
          onClick={(e) => {
            e.stopPropagation();
            handleAction(false);
          }}
          disabled={isAnyLoading}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          SAVE
        </Button>

        <Button
          // onClick={() => handleDispatchAction(true)}
          onClick={(e) => {
            e.stopPropagation();
            handleAction(true);
          }}
          disabled={isAnyLoading}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          PUSH
        </Button>

        <Button
          variant="outline"
          // onClick={onClose}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-600 border-gray-400"
        >
          CLOSE
        </Button>
      </div>
    </div>
  );
};

export default EditDispatchPopup;

import React, { useState, useEffect } from "react";
import DispatchSelect from "../dispatch-invoice-table/sections/select";
import DispatchDetails from "../dispatch-invoice-table/sections/details";
import DispatchRemarks from "../dispatch-invoice-table/sections/remarks";
import DispatchMeta from "../dispatch-invoice-table/sections/meta";
import { Button } from "@/components/ui/button";
import { useSaveSelectedDispatchesMutation } from "@/features/dispatch/dispatchAPI";
import { toast } from "sonner";
import { useFilterOptionsQuery } from "@/features/invoices/invoicesAPI";
import { useGetDispatchDriverQuery } from "@/features/Dispmain/dispatchAPI";
import { useAppDispatch } from "@/app/hook";
import { setDriverDetails } from "@/features/dispatch/dispatchSlice";

const EditDispatchPopup = ({ selectedDispatch, onClose }) => {
    const [saveDispatch, { isLoading }] = useSaveSelectedDispatchesMutation();
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

    const { data: filterOptions, isLoading: filterLoading } = useFilterOptionsQuery();
    const deliveryGuyOptions = Array.isArray(filterOptions)
        ? filterOptions.find((opt) => opt.key === "deliveryGuy")?.options || []
        : [];

    const { data: driverDetails } = useGetDispatchDriverQuery(
        editedDispatch.dispatchPerson,
        {
            skip: editedDispatch.collectionType !== "delivery" || !editedDispatch.dispatchPerson,
        }
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (driverDetails) dispatch(setDriverDetails(driverDetails));
    }, [driverDetails]);

    const handleUpdate = async () => {
        try {
            await saveDispatch(editedDispatch).unwrap();
            toast.success("Dispatch updated successfully");
            onClose();
        } catch (err) {
            toast.error("Failed to update dispatch");
            console.error(err);
        }
    };

    const handlePush = async () => {
        try {
            await saveDispatch(editedDispatch).unwrap();
            toast.success("Dispatch updated successfully");
            onClose();
        } catch (err) {
            toast.error("Failed to update dispatch");
            console.error(err);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <DispatchSelect
                values={editedDispatch}
                onChange={handleFieldChange}
                deliveryGuyOptions={deliveryGuyOptions}
                enabled={true}
            />
            <DispatchDetails
                data={driverDetails || editedDispatch}
                collectionType={editedDispatch.collectionType}
                enabled={true}
            />
            <DispatchRemarks data={editedDispatch} enabled={true} />
            <DispatchMeta data={editedDispatch} enabled={true} />

            <div className="flex justify-end gap-2 mt-6">
                <Button onClick={handleUpdate} disabled={isLoading} variant="apply">
                    {isLoading ? "UPDATING..." : "UPDATE"}
                </Button>
                <Button onClick={handlePush} disabled={isLoading} variant="apply">
                    {isLoading ? "PUSHING..." : "PUSH"}
                </Button>
                <Button variant="destructive" onClick={onClose}>
                    CANCEL
                </Button>
            </div>
        </div>
    );
};

export default EditDispatchPopup;

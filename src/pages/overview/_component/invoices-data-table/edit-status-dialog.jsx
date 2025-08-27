/* eslint-disable react-refresh/only-export-components */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import VerificationPopup from "./verification-popup";
import DeliveryPopup from "./delivery-popup";

const EditStatusDialog = ({ children, rowData, onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDialogClose = () => {
        setIsOpen(false);
        // Reset form state here if needed
    };

    const handleOpenChange = (open) => {
        if (!open) {
            handleDialogClose();
            return;
        }
        setIsOpen(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl sm:max-h-10/12 overflow-y-auto">

                {/* Form to be inserted here */}
                <VerificationPopup />
                {/* <DeliveryPopup /> */}
            </DialogContent>
        </Dialog>
    );
};

export default EditStatusDialog;

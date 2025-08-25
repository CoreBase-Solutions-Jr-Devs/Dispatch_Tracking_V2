/* eslint-disable react-refresh/only-export-components */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Status</DialogTitle>
                </DialogHeader>

                {/* Form to nbe inserted here */}
                <div className="my-4">
                    <p className="text-muted-foreground text-sm">
                        Pop Up Form
                    </p>
                </div>

                <DialogFooter>
                    <Button
                        onClick={() => {
                            if (onSubmit) onSubmit(rowData);
                            handleDialogClose();
                        }}
                        className="w-full mt-2"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditStatusDialog;

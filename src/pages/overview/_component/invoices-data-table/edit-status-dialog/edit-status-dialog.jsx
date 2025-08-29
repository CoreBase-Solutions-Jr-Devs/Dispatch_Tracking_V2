/* eslint-disable react-refresh/only-export-components */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

// import StoreForm from "./StoreForm";
import VerificationPopup from "./Verification/popup.jsx"
// import DispatchForm from "./DispatchForm";
// import DeliveryForm from "./DeliveryForm";

const EditStatusDialog = ({ children, rowData, view, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpenChange = (open) => setIsOpen(open);

  const getForm = () => {
    switch (view?.toLowerCase()) {
    //   case "store":
    //     return StoreForm;
      case "verification":
        return VerificationPopup;
    //   case "dispatch":
    //     return DispatchForm;
    //   case "delivery":
    //     return DeliveryPopup;
    //     return CollectionPopup;
      default:
        return () => (
          <div className="p-4 text-muted-foreground">
            No form defined for <strong>{view}</strong>
          </div>
        );
    }
  };

  const FormComponent = getForm();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <FormComponent
          rowData={rowData}
          onSubmit={onSubmit}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusDialog;

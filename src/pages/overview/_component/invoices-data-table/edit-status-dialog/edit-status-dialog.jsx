import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

import StorePopup from "./Store/popup.jsx";
import VerificationPopup from "./Verification/popup.jsx";
import DispatchPopup from "./Dispatch/popup.jsx";
import DeliveryPopup from "./Delivery/popup.jsx";
import DispatchMainPopup from "../../dispatchPerson/Dispatch-Sections/mainpopup.jsx";
import StartPopup from "./sharedPopup/startpopup";

const EditStatusDialog = ({ children, rowData, view, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpenChange = (open) => setIsOpen(open);

  const getForm = () => {
    switch (view?.toLowerCase()) {
      case "store":
        return StorePopup;
      case "verification":
        return VerificationPopup;
      case "dispatch":
        return DispatchPopup;
      case "dispatchmain":
        return DispatchMainPopup;
      case "delivery":
        return DeliveryPopup;
      case "storestart":
      case "verificationstart":
      case "storepush":
         case "verificationpush":
        return StartPopup;
      default:
        return () => (
          <div className="p-4 text-muted-foreground">
            No form defined for <strong>{view}</strong>
          </div>
        );
    }
  };

  const FormComponent = getForm();

  let dialogClass = "";
  switch (view?.toLowerCase()) {
    case "storestart":
    case "storepush":
    case "verificationstart":
       case "verificationpush":
      dialogClass = "sm:max-w-sm";
      break;
    case "dispatch":
      dialogClass = "w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl";
      break;
    default:
      dialogClass = "sm:max-w-xl md:max-w-2xl lg:max-w-3xl";
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
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

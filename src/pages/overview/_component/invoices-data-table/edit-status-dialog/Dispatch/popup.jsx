import React, { useState, useEffect } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from "./header";
import DispatchDetails from "./details";
import DispatchSummary from "./summary";
import DispatchRemarks from "./remarks";
import DispatchMeta from "./meta";
import DispatchTable from "./table";
import DispatchFooter from "./footer";
import DispatchSelect from "./select";
import DispatchSearch from "./search";

export default function DispatchPopup({ rowData, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectValues, setSelectValues] = useState({
    deliveryPerson: "",
    deliveryRoute: "",
    vehicle: "",
    collectionType: "",
  });

  useEffect(() => {
    if (rowData) {
      setSelectValues({
        deliveryPerson: rowData.deliveryPerson || "",
        deliveryRoute: rowData.deliveryRoute || "",
        vehicle: rowData.vehicle || "",
        collectionType: rowData.collectionType || "",
      });
    }
  }, [rowData]);

  const handleSelectChange = (field, value) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleDialogClose = () => setIsOpen(false);

  return (
    <>
      <DialogHeader>
        <DispatchHeader />
      </DialogHeader>

      <Separator />

      <DispatchSearch
        value={query}
        onChange={setQuery}
        data={rowData}
        placeholder="invoice No..."
      />
      <Separator />
      <DispatchTable data={rowData} />
      <DispatchSummary data={rowData} />

      <Separator className="my-1" />
      <DispatchSelect values={selectValues} onChange={handleSelectChange} />
      <DispatchDetails data={rowData} />

      <DispatchRemarks />
      <DispatchMeta />

      <DialogFooter>
        <DispatchFooter
          rowData={rowData}
          selectValues={selectValues}
          onSubmit={onSubmit}
          onClose={handleDialogClose}
        />
      </DialogFooter>
    </>
  );
}

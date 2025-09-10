import React, { useState, useEffect, useMemo } from "react";
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

  const [selectedDocs, setSelectedDocs] = useState([]);

  // Handle row toggle
  const handleToggleRow = (doc) => {
    setSelectedDocs((prev) => 
      prev.find((d) => d.docNo === doc.docNo)
        ? prev.filter((d) => d.docNo !== doc.docNo)
        : [...prev, doc]
    );
  }

  // Filter rows based on search query
  const filteredData = useMemo(() => {
    if (!query) return rowData;
    return rowData.filter((row) =>
      row.docNo.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, rowData]);

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
      <div className="my-1 overflow-y-auto max-h-[90vh] px-2">
        <DialogHeader>
          <DispatchHeader />
        </DialogHeader>

        <Separator className="my-2" />

        <DispatchSearch
          value={query}
          onChange={setQuery}
          data={rowData}
          placeholder="invoice No..."
          selectedCount={selectedDocs.length}
        />

        <Separator className="my-2" />

        <div className="space-y-4">
          <DispatchTable data={filteredData} selected={selectedDocs} onToggle={handleToggleRow} />
          <DispatchSummary data={selectedDocs} />
        </div>

        <Separator className="my-2" />
        <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-4 mb-1">
          <DispatchSelect values={selectValues} onChange={handleSelectChange} />

          <div className="flex flex-col gap-3">
            <DispatchDetails data={rowData} />
            <DispatchMeta />
          </div>
        </div>

        <DispatchRemarks />

        <DialogFooter>
          <DispatchFooter
            rowData={rowData}
            selectValues={selectValues}
            onSubmit={onSubmit}
            onClose={handleDialogClose}
          />
        </DialogFooter>
      </div>
    </>
  );
}

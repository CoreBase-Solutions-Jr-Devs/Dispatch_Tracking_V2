import React, { useState, useEffect, useMemo } from "react";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from "./header";
import DispatchDetails from "./details";
import DispatchSummary from "./summary";
import DispatchRemarks from "./remarks";
import DispatchMeta from "./meta";
import DispatchTable from "./table";
import { useGetVerifiedOnDispatchQuery } from "@/features/dispatch/dispatchAPI";
import DispatchFooter from "./footer";
import DispatchSelect from "./select";
import DispatchSearch from "./search";

export default function DispatchPopup({ rowData, onSubmit, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Handle row toggle
  const handleToggleRow = (doc) => {
    setSelectedDocs((prev) => {
      const exists = prev.some((d) => d.dispatchId === doc.dispatchId);
      if (exists) {
        return prev.filter((d) => d.dispatchId !== doc.dispatchId);
      } else {
        return [...prev, doc];
      }
    });
  };


  // Fetch verified dispatch data
  const { data, isLoading, isError } = useGetVerifiedOnDispatchQuery({ pageNumber, pageSize });
  const dispatchData = data?.items || [];

  // Filter rows based on search query
  // const filteredData = useMemo(() => {
  //   if (!query) return dispatchData;
  //   return dispatchData.filter((row) =>
  //     String(row.invoiceNo).toLowerCase().includes(query.toLowerCase())
  //   );
  // }, [query, dispatchData]);

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
      <div className="my-1 overflow-y-auto max-h-[80vh] px-2">
        <DialogHeader>
          <DispatchHeader />
        </DialogHeader>

        <Separator className="my-2" />

        <DispatchSearch
          value={query}
          onChange={setQuery}
          data={rowData}
          placeholder="Inv.No/Cus.Code"
          selectedCount={selectedDocs.length}
        />

        <Separator className="my-2" />

        <div className="space-y-4">
          <DispatchTable 
            data={dispatchData} 
            isLoading={isLoading} 
            isError={isError}
            selected={selectedDocs} 
            onToggle={handleToggleRow} 
            pagination={{
              pageNumber: data?.pageNumber || pageNumber,
              pageSize: data?.pageSize || pageSize,
              totalItems: data?.totalCount || 0,
              totalPages: data?.totalPages || 1,
            }}
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
          />
        </div>

        <Separator className="my-2" />

        
        <DialogFooter>
          <DispatchFooter
            rowData={rowData}
            selectValues={selectValues}
            selectedDocs={selectedDocs}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </DialogFooter>
      </div>
    </>
  );
}

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
import {
  useGetVerifiedOnDispatchQuery,
  useSearchVerifiedOnDispatchQuery,
} from "@/features/dispatch/dispatchAPI";

export default function DispatchPopup({ rowData, onSubmit, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [savedInvoices, setSavedInvoices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRow, setSelectedRow] = useState({});

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

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  const shouldSearch = debounced && debounced.trim().length > 0;

  // Fetch verified dispatch data
  const {
    data: verifiedData,
    isLoading: verifiedLoading,
    isError: verifiedError,
  } = useGetVerifiedOnDispatchQuery({
    pageNumber,
    pageSize,
  });

  // Handle search queries
  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchVerifiedOnDispatchQuery(debounced, {
    skip: !shouldSearch,
  });

  const dispatchData = shouldSearch
    ? searchData?.invoices || []
    : verifiedData?.invoices || [];

  // Return only Pending dispatches
  const filteredDispatchData = useMemo(() => {
    return dispatchData.filter(
      (row) => !savedInvoices.some((d) => d.dispatchId === row.dispatchId)
    );
  }, [dispatchData, savedInvoices]);

  const handleSave = () => {
    setSavedInvoices((prev) => [...prev, ...selectedDocs]);
    onSubmit?.(selectedDocs, selectValues);
    setSelectedDocs([]);
  };

  const [selectValues, setSelectValues] = useState({
    deliveryPerson: "",
    deliveryRoute: "",
    vehicle: "",
    collectionType: "",
  });

  const handleSelectChange = (field, value) => {
    setSelectValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleDialogClose = () => setIsOpen(false);

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

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
          placeholder="Cus.Name/Route"
          selectedCount={selectedDocs.length}
        />

        <Separator className="my-2" />

        <div className="space-y-4">
          <DispatchTable
            data={filteredDispatchData}
            isLoading={verifiedLoading || searchLoading}
            isError={verifiedError || searchError}
            selected={selectedDocs}
            onToggle={handleToggleRow}
            pagination={{
              pageNumber: verifiedData?.pageNumber || pageNumber,
              pageSize: verifiedData?.pageSize || pageSize,
              totalItems:
                verifiedData?.totalCount || 0 || filteredDispatchData.length,
              totalPages:
                verifiedData?.totalPages ||
                1 ||
                Math.ceil(filteredDispatchData.length / pageSize),
            }}
            handleRowSelect={handleRowSelect}
            selectedRow={selectedRow}
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
          />
        </div>

        <Separator className="my-2" />

        <DialogFooter>
          <DispatchFooter
            rowData={rowData}
            selectedRow={selectedRow}
            selectValues={selectValues}
            selectedDocs={selectedDocs}
            onSubmit={handleSave}
            onClose={onClose}
            handleRowSelect={handleRowSelect}
          />
        </DialogFooter>
      </div>
    </>
  );
}

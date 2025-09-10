import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from '../../../invoices-data-table/edit-status-dialog/Dispatch/header';
import DispatchDetails from '../../../invoices-data-table/edit-status-dialog/Dispatch/details';
import DispatchSummary from '../../../invoices-data-table/edit-status-dialog/Dispatch/summary';
import DispatchRemarks from '../../../invoices-data-table/edit-status-dialog/Dispatch/remarks';
import DispatchMeta from '../../../invoices-data-table/edit-status-dialog/Dispatch/meta';
import DispatchTable from '../../../invoices-data-table/edit-status-dialog/Dispatch/table';
import DispatchFooter from '../../../invoices-data-table/edit-status-dialog/Dispatch/footer';
import DispatchSelect from '../../../invoices-data-table/edit-status-dialog/Dispatch/select';
import DispatchSearch from '../../../invoices-data-table/edit-status-dialog/Dispatch/search';

export default function DeliveryInvoice({ rowData, onSubmit }) {
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

    return (
        <div className="my-1 overflow-y-auto max-h-[90vh] px-2">
            {/* Header */}
            <DispatchHeader />

            <Separator className="my-2" />

            {/* Search */}
            <DispatchSearch
                value={query}
                onChange={setQuery}
                data={rowData}
                placeholder="invoice No..."
            />

            <Separator className={"my-2"}/>

            {/* Table + Summary */}
            <div className="space-y-4">
                <DispatchTable data={rowData} />
                <DispatchSummary data={rowData} />
            </div>

            <Separator className="my-2" />

            {/* Select + Details + Meta */}
            <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-4 mb-1">
                <DispatchSelect values={selectValues} onChange={handleSelectChange} />

                <div className="flex flex-col gap-3">
                    <DispatchDetails data={rowData} />
                    <DispatchMeta />
                </div>
            </div>

            {/* Remarks */}
            <DispatchRemarks />

            {/* Footer */}
            <DispatchFooter
                rowData={rowData}
                selectValues={selectValues}
                onSubmit={onSubmit}
            />
        </div>
    );
}

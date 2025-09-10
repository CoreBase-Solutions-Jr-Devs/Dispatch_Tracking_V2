import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import DeliveryHeader from "../delivery-sections/header";
import DeliverySearch from "../delivery-sections/search";
import DeliveryTable from "../delivery-sections/table";
import DeliverySummary from "../delivery-sections/summary";
import DeliverySelect from "../delivery-sections/select";
import DeliveryDetails from "../delivery-sections/details";
import DeliveryMeta from "../delivery-sections/meta";
import DeliveryRemarks from "../delivery-sections/remarks";
import DeliveryFooter from "../delivery-sections/footer";

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
            <DeliveryHeader />

            <Separator className="my-2" />

            {/* Search */}
            <DeliverySearch
                value={query}
                onChange={setQuery}
                data={rowData}
                placeholder="invoice No..."
            />

            <Separator className={"my-2"}/>

            {/* Table + Summary */}
            <div className="space-y-4">
                <DeliveryTable data={rowData} />
                <DeliverySummary data={rowData} />
            </div>

            <Separator className="my-2" />

            {/* Select + Details + Meta */}
            <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-4 mb-1">
                <DeliverySelect values={selectValues} onChange={handleSelectChange} />

                <div className="flex flex-col gap-3">
                    <DeliveryDetails data={rowData} />
                    <DeliveryMeta />
                </div>
            </div>

            {/* Remarks */}
            <DeliveryRemarks />

            {/* Footer */}
            <DeliveryFooter
                rowData={rowData}
                selectValues={selectValues}
                onSubmit={onSubmit}
            />
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from "../sections/header";
import DispatchSearch from "../sections/search";
import DispatchSummary from "../sections/summary";
import DispatchSelect from "../sections/select";
import DispatchDetails from "../sections/details";
import DispatchMeta from "../sections/meta";
import DispatchRemarks from "../sections/remarks";
import DispatchFooter from "../sections/footer";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import { useGetDispatchInvoicesQuery } from "@/features/dispatch/dispatchAPI";

export default function DispatchInvoice({ rowData, onSubmit }) {
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.auth);
    // const { invoices } = useSelector((state) => state.invoice);
    // const { data, isLoading, isError } = useGetDispatchInvoicesQuery({ page: 1, pageSize: 20 });

    // let dispatchInvoices = data?.invoices || [];

    const view = roleToView(user?.userRole || "User");
    const columns = getInvoiceColumns(view);
    
    const [selectValues, setSelectValues] = useState({
        DispatchPerson: "",
        DispatchRoute: "",
        vehicle: "",
        collectionType: "",
    });

    useEffect(() => {
        if (rowData) {
        setSelectValues({
            DispatchPerson: rowData.DispatchPerson || "",
            DispatchRoute: rowData.DispatchRoute || "",
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
                <DataTable
                    data={[]}
                    columns={columns}
                    selection={true}
                    isLoading={false}
                    emptyTitle="No invoices found"
                    isShowPagination={true}
                    pagination={{
                        pageNumber: 1,
                        pageSize: 20,
                        totalItems: 0,
                        totalPages: 0,
                    }}
                />
                <DispatchSummary data={rowData} />
            </div>

            <Separator className="my-2" />

            {/* Details + Select */}
            <div className="flex flex-col w-full md:flex-row md:gap-x-8 gap-y-4 mb-4">
                <DispatchDetails data={rowData} collectionType={selectValues.collectionType}/>
                <DispatchSelect values={selectValues} onChange={handleSelectChange} />
            </div>

            {/* Remarks */}
            <DispatchRemarks />
            <DispatchMeta />

            {/* Footer */}
            <DispatchFooter
                rowData={rowData}
                selectValues={selectValues}
                onSubmit={onSubmit}
            />
        </div>
    );
}

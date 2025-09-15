import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import DispatchHeader from "../dispatch-sections/header";
import DispatchSearch from "../dispatch-sections/search";
import DispatchSummary from "../dispatch-sections/summary";
import DispatchSelect from "../dispatch-sections/select";
import DispatchDetails from "../dispatch-sections/details";
import DispatchMeta from "../dispatch-sections/meta";
import DispatchRemarks from "../dispatch-sections/remarks";
import DispatchFooter from "../dispatch-sections/footer";
import { useSelector } from "react-redux";
import { getInvoiceColumns } from "@/components/invoice-data-table/invoice-columns";
import { roleToView } from "@/lib/utils";
import { DataTable } from "@/components/data-table";
import { useGetDispatchInvoicesQuery } from "@/features/dispatch/dispatchAPI";

export default function DispatchInvoice({ rowData, onSubmit }) {
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.auth);
    const { invoices } = useSelector((state) => state.invoice);

    const view = roleToView(user?.userRole || "User");
    const columns = getInvoiceColumns(view);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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

    const { data, isLoading, isError } = useGetDispatchInvoicesQuery(page, pageSize);

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
                    // data={mockInvoices}
                    data={invoices}
                    columns={columns}
                    selection={true}
                    isLoading={false}
                    emptyTitle="No invoices found"
                    isShowPagination={true}
                    pagination={{
                        pageNumber: 1,
                        pageSize: 10,
                        totalItems: invoices.length,
                        totalPages: Math.ceil(invoices.length / 10),
                    }}
                />
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

import React, { useState, useEffect, useMemo } from "react";
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
import { useGetDispatchInvoicesQuery, useSelectedCusCodeQuery } from "@/features/dispatch/dispatchAPI";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DispatchInvoice({ rowData, onSubmit }) {
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.auth);
    // const { invoices } = useSelector((state) => state.invoice);
    const { data, isLoading, isError } = useSelectedCusCodeQuery({ page: 1, pageSize: 20 });
    let invoicesForDispatch = data?.items || [];
    console.log(invoicesForDispatch);

    const view = roleToView(user?.userRole || "User");
    
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

    // Helper Functions 
    const renderStatus = (status) => {
        let statusClass = "bg-muted text-muted-foreground border-border";
        switch (status) {
            case "Pending": statusClass = "status-store border-status-store/20"; break;
            case "Verified": statusClass = "status-verification border-status-verification/20"; break;
            case "In Dispatch": statusClass = "status-dispatch border-status-dispatch/20"; break;
            case "SAVED FOR DISPATCH": statusClass = "status-delivered border-status-delivered/20"; break;
        }
        return (
            <Badge
                variant="outline"
                className={`${statusClass} w-28 justify-center rounded-md text-xs px-3 py-1 font-medium border`}
            >
                {status}
            </Badge>
        );
    }

    const renderText = (text) => {
        <span className="text-foreground font-medium">{text || "-"}</span>
    }

    const formatDuration = (seconds) => {
        if (!seconds) return "—";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h ? h + "h " : ""}${m}m`;
    };

    const formatUKDateTime = (date) => {
        if (!date) return "—";
        const d = new Date(date);
        if (isNaN(d)) return "—";
        return `${String(d.getDate()).padStart(2, "0")}/${String(
            d.getMonth() + 1
        ).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(
            2,
            "0"
        )}:${String(d.getMinutes()).padStart(2, "0")}`;
    };

    const renderDateTime = (val) => (
        <span className="font-mono text-sm">
            {formatUKDateTime(val)}
        </span>
    );


    const columns = useMemo(() =>{
        return [
            {
                accessorKey: "customerCode",
                header: "CusCode",
                cell: ({ row }) => row.original.customerCode
            
            },
            {
                accessorKey: "dispatchIds",
                header: "DispId(s)",
                cell:({row}) =>{
                    return row.original.dispatchIds ?? '-'
                }
            },
            {
                accessorKey: "invoiceNumbers",
                header: "InvNo(s)",
                cell:({row}) =>{
                    return row.original.invoiceNumbers ?? '-'
                }
            },
            {
                accessorKey: "items",
                header: "InvCount",
                cell:({row}) =>{
                    return row.original.items ?? '-'
                }
            },
            {
                accessorKey: "verifiedDateTime",
                header: "Ver. DateTime",
                cell:({row}) =>{
                    return renderDateTime(row.original.verifiedDateTime ?? '-')
                }
            },
            {
                accessorKey: "dispatchDateTime",
                header: "Disp. DateTime",
                cell:({row}) =>{
                    return renderDateTime(row.original.dispatchDateTime ?? '-')
                }
            },
            {
                accessorKey: "durationMinutes",
                header: "Duration",
                cell:({row}) =>{
                    return formatDuration(row.original.durationMinutes ?? '-')
                }
            },
            {
                accessorKey: "dispatchStatus",
                header: "Status",
                cell:({row}) =>{
                    return renderStatus(row.original.dispatchStatus ?? '-')
                }
            },
            {
                accessorKey: "amount",
                header: "Amount",
                cell:({row}) =>{
                    return row.original.amount ?? '-'
                }
            },
        ];
    }, []);

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
                {isLoading && <Skeleton />}
                {isError && 
                    <span className="text-red-500 text-center text-xs font-semibold">
                        Invoice Table isn't Loading. Try again!
                    </span>
                }
                <DataTable
                    data={invoicesForDispatch}
                    columns={columns}
                    selection={true}
                    isLoading={false}
                    emptyTitle="No invoices found"
                    isShowPagination={true}
                    pagination={{
                        pageNumber: data?.pageNumber,
                        pageSize: data?.pageSize,
                        totalItems: data?.totalCount,
                        totalPages: data?.totalPages,
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

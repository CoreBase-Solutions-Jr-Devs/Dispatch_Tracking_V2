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
import { Card, CardContent } from "@/components/ui/card";

export default function DispatchInvoice({ rowData, onSubmit, onClose }) {
    const [query, setQuery] = useState("");
    const { user } = useSelector((state) => state.auth);
    // const { invoices } = useSelector((state) => state.invoice);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const { data: selectedInvoices, isLoading, isError } = useSelectedCusCodeQuery({ pageNumber, pageSize });
    let invoicesForDispatch = selectedInvoices?.items || [];
    let dispatchID  = invoicesForDispatch.map((item) => item.dispatchId);
    console.log(dispatchID);

    const view = roleToView(user?.userRole || "User");
    
    const [selectValues, setSelectValues] = useState({
        dispatchPerson: "",
        dispatchRoute: "",
        vehicle: "",
        collectionType: "",
    });

    useEffect(() => {
        if (rowData) {
        setSelectValues({
            dispatchPerson: rowData.dispatchPerson || "",
            dispatchRoute: rowData.dispatchRoute || "",
            vehicle: rowData.vehicle || "",
            collectionType: rowData.collectionType || "",
        });
        }
    }, [rowData]);

    const handleSelectChange = (field, value) => {
        setSelectValues((prev) => {
            if (field === "collectionType") {
                return {
                    ...prev,
                    collectionType: value,
                    dispatchPerson: value === "delivery" ? prev.dispatchPerson : "",
                    dispatchRoute: value === "delivery" ? prev.dispatchRoute : "",
                };
            }
            return { ...prev, [field]: value };
        });
    };

    // Helper Functions 
    const renderStatus = (status) => {
        let statusClass = "bg-muted text-muted-foreground border-border";
        switch (status) {
            case "ONGOING": statusClass = "status-store border-status-store/20"; break;
            case "SELECTED": statusClass = "status-verification border-status-verification/20"; break;
            case "IN DISPATCH": statusClass = "status-dispatch border-status-dispatch/20"; break;
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
            // {
            //     accessorKey: "dispatchIds",
            //     header: "DispId(s)",
            //     cell:({row}) =>{
            //         return row.original.dispatchIds ?? '-'
            //     }
            // },
            // {
            //     accessorKey: "invoiceNumbers",
            //     header: "InvNo(s)",
            //     cell:({row}) =>{
            //         return row.original.invoiceNumbers ?? '-'
            //     }
            // },
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
            // {
            //     accessorKey: "dispatchStatus",
            //     header: "Status",
            //     cell:({row}) =>{
            //         return renderStatus(row.original.dispatchStatus ?? '-')
            //     }
            // },
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
                placeholder="CusName/Inv.No/Route"
            />

            <Separator className={"my-2"}/>

            <div className="flex justify-center items-start space-x-8">
                <div className="w-3/4">
                    {/* Table + Summary */}
                    <div className="space-y-4">
                        {/* {isLoading && <Skeleton />}
                        {isError && 
                            <span className="text-red-500 text-center text-xs font-semibold">
                                Invoice Table isn't Loading. Try again!
                            </span>
                        } */}
                        <DataTable
                            data={invoicesForDispatch}
                            columns={columns}
                            selection={true}
                            isLoading={false}
                            emptyTitle="No invoices found"
                            isShowPagination={true}
                            onPageChange={setPageNumber}
                            onPageSizeChange={setPageSize}
                            pagination={{
                                pageNumber: selectedInvoices?.pageNumber || 1,
                                pageSize: selectedInvoices?.pageSize || pageSize,
                                totalItems: selectedInvoices?.totalCount || 0,
                                totalPages: selectedInvoices?.totalPages || 1,
                            }}
                        />
                        <DispatchSummary data={rowData} />
                    </div>
                </div>
                {/* Dispatch Selections*/}
                <div className="w-1/4">
                    <Card className="h-full flex flex-col p-2">
                        <CardContent className="space-y-4">
                            <DispatchSelect
                                values={selectValues}
                                onChange={handleSelectChange}
                            />
                            <DispatchDetails
                                data={rowData}
                                collectionType={selectValues.collectionType}
                                deliveryPerson={selectValues.dispatchPerson}
                            />
                            <DispatchRemarks />
                            <DispatchMeta />
                        </CardContent>
                    </Card>
                </div>
            </div>
            

            <Separator className="my-2" />

            {/* Footer */}
            <DispatchFooter
                dispatchID={dispatchID}
                rowData={rowData}
                selectValues={selectValues}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
}

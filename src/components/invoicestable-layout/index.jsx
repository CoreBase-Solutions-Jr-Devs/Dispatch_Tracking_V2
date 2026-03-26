import { useState } from "react";
import GridView from "./grid-view/grid-view";
import ListView from "./list-view/list-view";
import ToolBar from "./toolbar";
import useDebouncedSearch from "@/hooks/use-debounce-search";
import { LAYOUT_VIEW } from "@/constant";
import { toast } from "sonner";
import {
    useGetAllInvoicesQuery
} from "@/features/invoices/invoicesAPI";

const dummyInvoices = [
    {
        id: "INV-001",
        clientName: "Acme Corp",
        invoiceDate: "2025-08-01",
        dueDate: "2025-08-15",
        status: "Paid",
        amount: 1250.0,
        currency: "USD",
        createdBy: "John Doe",
    },
    {
        id: "INV-002",
        clientName: "Globex Ltd",
        invoiceDate: "2025-08-03",
        dueDate: "2025-08-20",
        status: "Pending",
        amount: 980.5,
        currency: "USD",
        createdBy: "Jane Smith",
    },
    {
        id: "INV-003",
        clientName: "Stark Industries",
        invoiceDate: "2025-08-05",
        dueDate: "2025-08-25",
        status: "Overdue",
        amount: 1500.0,
        currency: "USD",
        createdBy: "Tony Stark",
    },
    {
        id: "INV-004",
        clientName: "Wayne Enterprises",
        invoiceDate: "2025-08-07",
        dueDate: "2025-08-22",
        status: "Paid",
        amount: 2200.0,
        currency: "USD",
        createdBy: "Bruce Wayne",
    },
];

const InvoicesTableLayout = ({ layoutView = LAYOUT_VIEW.GRID, isShowPagination, showToolBar = true, pageSize = 10 }) => {
    const [filter, setFilter] = useState({ pageNumber: 1, pageSize });
    const [_layoutView, setLayoutView] = useState(layoutView);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const { debouncedTerm, searchTerm, setSearchTerm } = useDebouncedSearch("", { delay: 500 });

    const {data, isLoading, isFetching } = 
    useGetAllInvoicesQuery({
        keyword: debouncedTerm,
        pageNumber: filter.pageNumber,
        pageSize: filter.pageSize
    });

    const invoiceData = dummyInvoices;

    const pagination = {
        totalCount: dummyInvoices.length,
        totalPages: Math.ceil( dummyInvoices.length / filter.pageSize),
        pageNumber: filter.pageNumber,
        pageSize: filter.pageSize,
    };

    const handleSearch = (value) => setSearchTerm(value);
    const handleLayoutView = (view) => setLayoutView(view);

    const handleToggleSelected = (invoice) => {
        const isSelected = selectedInvoices.find((i) => i.id === invoice.id);
        if (isSelected) {
            setSelectedInvoices((prev) => prev.filter((i) => i.id !== invoice.id));
        } else {
            setSelectedInvoices((prev) => [...prev, invoice]);
        }
    };

    const handleClear = () => setSelectedInvoices([]);
    const handleCopy = () => {
        const ids = selectedInvoices.map((i) => i.id).join("\n");
        navigator.clipboard.writeText(ids)
            .then(() => {
                setSelectedInvoices([]);
                toast.success(`Copied ${selectedInvoices.length} invoice IDs`);
            })
            .catch(() => toast.error("Failed to copy invoice IDs"));
    };

    const handleDelete = () => {
        const ids = selectedInvoices.map((i) => i.id);
        if (!ids.length) return toast.error("No invoice selected");
        setSelectedInvoices([]);
        toast.success(`Deleted ${ids.length} invoice(s)`);
    };

    const handleDownload = () => {
        const invoicesNos = selectedInvoices?.map((invoice) = invoice.docNumber);
        if (!docNos.length) {
            toast.error("No Invoice Selected");
            return;
        }
    }

    return (
        <div>
            {showToolBar && (
                <ToolBar
                    layoutView={_layoutView}
                    searchTerm={searchTerm}
                    isLoading={false}
                    isSelected={selectedInvoices.length > 0}
                    noOfInvoiceselected={selectedInvoices.length}
                    handleSearch={handleSearch}
                    handleLayoutView={handleLayoutView}
                    onClear={handleClear}
                    onDelete={handleDelete}
                    onCopy={handleCopy}
                    onDownload={handleDownload}
                />
            )}

            <div className="mt-1">
                {_layoutView === LAYOUT_VIEW.LIST ? (
                    <ListView
                        data={invoiceData}
                        isLoading={isLoading || isFetching}
                        selectedFiles={selectedInvoices}
                        setSelectedFiles={setSelectedInvoices}
                        isShowPagination={isShowPagination}
                        pagination={pagination}
                        setPagination={setFilter}
                    />
                ) : (
                    <GridView
                        data={invoiceData}
                        isLoading={isLoading || isFetching}
                        selectedFiles={selectedInvoices}
                        onToggleSelect={handleToggleSelected}
                    />
                )}
            </div>
        </div>
    );
};

export default InvoicesTableLayout;

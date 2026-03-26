import { useMemo } from "react";
import { DataTable } from "../../data-table";
import { invoiceColumns } from "./column";

const ListView = ({
    data = [],
    selectedInvoices = [],
    setSelectedInvoices,
    isShowPagination = false,
    pagination,
    setPagination,
    isLoading = false,
}) => {
    const rowSelection = useMemo(() => {
        const state = {};
        selectedInvoices.forEach((invoice) => {
            state[invoice.id] = true;
        });
        return state;
    }, [selectedInvoices]);

    const handlePageChange = (pageNumber) => {
        setPagination((prev) => ({ ...prev, pageNumber }));
    };

    const handlePageSizeChange = (pageSize) => {
        setPagination((prev) => ({ ...prev, pageSize }));
    };

    const handleRowSelectionChange = (updater) => {
        const nextState =
            typeof updater === "function" ? updater(rowSelection) : updater;
        const selectedIds = Object.keys(nextState).filter((key) => nextState[key]);
        const selectedObjects = data.filter((invoice) =>
            selectedIds.includes(invoice.id)
        );
        setSelectedInvoices(selectedObjects);
    };

    return (
        <div>
            <DataTable
                columns={invoiceColumns}
                data={data}
                isLoading={isLoading}
                showSearch={false}
                selection={true}
                isShowPagination={isShowPagination}
                pagination={pagination}
                rowSelection={rowSelection}
                onRowSelectionChange={handleRowSelectionChange}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
};

export default ListView;

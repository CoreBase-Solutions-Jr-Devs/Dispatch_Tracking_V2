import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import InvoiceCard from "../../invoice-card";
import { InvoiceCardSkeleton } from "@/components/invoice-card/skeleton";

const GridView = ({ data = [], isLoading = false, selectedInvoices = [], onToggleSelect }) => {
    const handleInvoiceSelection = (invoice) => {
        onToggleSelect(invoice);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => <InvoiceCardSkeleton key={i} />)
            ) : data.length > 0 ? (
                data.map((invoice) => {
                    const isSelected = selectedInvoices.some(
                        (selected) => selected.id === invoice.id
                    );
                    return (
                        <InvoiceCard
                            key={invoice.id}
                            invoice={invoice}
                            isSelected={isSelected}
                            toggleInvoiceSelection={handleInvoiceSelection}
                        />
                    );
                })
            ) : (
                <div className="col-span-5">
                    <EmptyState
                        title="No Invoices Found"
                        description="You haven’t any invoices. Create or assign one to get started."
                        icon={FolderOpen}
                    />
                </div>
            )}
        </div>
    );
};

export default GridView;

import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { AssignInvoiceDialog } from "./_component/assigninvoice-dialog";
import InvoiceTableLayout from "@/components/invoicestable-layout";

const Invoices = () => {
    return (
        <PageLayout
            title="Invoices"
            subtitle="These are all of the invoices that have been created or assigned."
            rightAction={
                <AssignInvoiceDialog>
                    <Button className="!pr-7">
                        <UploadCloud />
                        Assign
                    </Button>
                </AssignInvoiceDialog>
            }
        >
            <div className="w-full">
                <InvoiceTableLayout
                    showToolBar
                    isShowSearch={true}
                    isShowBulkActions={true}
                    isShowDownload={true}
                    isShowAssign={true}
                    isShowFilter={true}
                    isShowPagination={true}
                    pageSize={20}
                    layoutView="LIST"
                />
            </div>
        </PageLayout>
    );
};

export default Invoices;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";
import EditStatusDialog from "../../invoices-data-table/edit-status-dialog/edit-status-dialog"; 
import { useState } from "react";

export default function DispatchSearch({
    value,
    onChange,
    placeholder = "Invoice No",
    rowData, 
    onSubmit, 
}) {
    const [startDisabled, setStartDisabled] = useState(false);
    const [deliveryDisabled, setDeliveryDisabled] = useState(true);
    const handleStart = () => {
        setStartDisabled(true);
        setDeliveryDisabled(false);
        if (onClose) onClose();
    };

    return (
        <section className="flex justify-between items-center w-full">
            <div className="relative w-1/2 max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-50 pl-9 pr-3 py-2 bg-gray-100"
                />
            </div>


            <div className="flex flex-row items-center justify-end">
                <Button
                    variant="verification"
                    onClick={handleStart}
                    disabled={startDisabled}
                    className="mr-2 uppercase text-xs font-medium"
                >
                    Start
                </Button>
                <EditStatusDialog rowData={rowData} view="dispatch" onSubmit={onSubmit}>
                    <Button 
                        className="uppercase text-xs font-medium"
                        variant="apply"
                    >
                        Pick Invoice
                    </Button>
                </EditStatusDialog>
            </div>
        </section>
    );
}
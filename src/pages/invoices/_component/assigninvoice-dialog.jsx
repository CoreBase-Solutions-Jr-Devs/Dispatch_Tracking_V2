import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AssignInvoiceDialog = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [formData, setFormData] = useState({
        invoiceNumber: "",
        client: "",
        dueDate: "",
        amount: "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Assigned invoice:", formData);
        // 🚀 Replace console.log with invoicesApi.assignInvoice mutation
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full sm:max-w-[00px] p-6">
                <DialogHeader>
                    <DialogTitle>Assign Invoice</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="invoiceNumber">Invoice Number</Label>
                        <Input
                            id="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
                            placeholder="Enter invoice number"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="client">Client</Label>
                        <Input
                            id="client"
                            value={formData.client}
                            onChange={(e) => handleChange("client", e.target.value)}
                            placeholder="Enter client name"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => handleChange("dueDate", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => handleChange("amount", e.target.value)}
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            className="w-hover:bg-primay/80 cursor-pointer text-white w-full disabled:opacity-80 disabled:cursor-not-allowed"
                            onClick={handleSubmit}
                        >
                            Assign
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

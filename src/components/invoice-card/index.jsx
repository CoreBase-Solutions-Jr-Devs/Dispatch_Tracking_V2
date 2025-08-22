import { Folder, FileText, FileQuestion } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const InvoiceCard = ({ invoice, isSelected, toggleInvoiceSelection }) => {
    return (
        <Card
            className={cn(
                "group relative !p-0 rounded-lg border border-border transition-all duration-200 hover:shadow-md",
                isSelected
                    ? "bg-primary/5 dark:bg-primary/20 ring-2 ring-primary/60 dark:ring-primary/60 border-primary/30"
                    : "hover:border-border/60"
            )}
            onClick={() => toggleInvoiceSelection(invoice)}
        >
            <div className="absolute top-3 left-3 z-10">
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleInvoiceSelection(invoice)}
                    className={cn(
                        "backdrop-blur-sm cursor-pointer border dark:border-gray-300 shadow-sm size-6 bg-white",
                        isSelected && "dark:border-inherit"
                    )}
                />
            </div>

            {/* Main Card Content */}
            <div className="aspect-auto relative !overflow-hidden h-36 rounded-lg flex flex-col justify-center items-center bg-muted/80">
                <FileText className="w-12 h-12 text-muted-foreground mb-2" />
                <h3 className="font-medium text-sm mb-1 truncate text-center">
                    {invoice.invoiceNumber}
                </h3>
                <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <Folder className="w-3 h-3" />
                    <span>{invoice.client}</span>
                </div>
                <div className="flex items-center justify-between w-full px-4 mt-2">
                    <Badge
                        variant="secondary"
                        className="bg-secondary/80 text-secondary-foreground text-xs !py-[0.1px] font-medium"
                    >
                        {invoice.status || "Pending"}
                    </Badge>
                    <span className="text-gray-300 text-xs font-medium">
                        ${invoice.amount?.toFixed(2)}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default InvoiceCard;

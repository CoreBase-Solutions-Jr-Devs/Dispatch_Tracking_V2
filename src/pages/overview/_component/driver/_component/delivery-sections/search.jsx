import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon } from "lucide-react";

export default function DeliverySearch({
    value,
    onChange,
    placeholder = "Invoice No",
    }) {
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

            <div className="flex items-center gap-2 w-1/2 pl-4">
                <Label className="text-xs font-medium">Dispatch No:</Label>
                <Label className="text-xs font-medium text-muted-foreground">2</Label>
            </div>
        </section>
    );
}
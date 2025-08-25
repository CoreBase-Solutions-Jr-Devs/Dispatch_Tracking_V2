import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RoleBasedFilters = ({ filters, selectedFilters, handleFilterChange }) => (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {filters.map((filter) => (
            <section key={filter.key}>
                <Label className="text-xs">{filter.label}</Label>
                <Select value={selectedFilters[filter.key] || ""} onValueChange={(val) => handleFilterChange(filter.key, val)}>
                    <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {filter.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </section>
        ))}
    </section>
);

export default RoleBasedFilters;
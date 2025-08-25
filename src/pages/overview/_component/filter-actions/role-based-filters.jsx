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
                <Select
                    value={selectedFilters[filter.key] || ""}
                    onValueChange={(val) => handleFilterChange(filter.key, val)}
                >
                    <SelectTrigger
                        className="h-8 text-sm bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] rounded-md"
                    >
                        <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent
                        className="bg-gray-100 text-[var(--dropdown-foreground)] border border-[var(--border)] rounded-md shadow-lg"
                    >
                        {filter.options.map((opt) => (
                            <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className="hover:bg-[var(--row-hover)] rounded-sm text-sm"
                            >
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

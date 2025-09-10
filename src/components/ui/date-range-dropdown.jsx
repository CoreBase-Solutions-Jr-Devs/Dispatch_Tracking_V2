import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function DateRangeDropdown({ value, onChange, ranges = [], isLoading = false, isError = false }) {
  const options = Array.isArray(ranges) ? ranges : [];

  return (
    <Select value={value || ""} onValueChange={onChange} disabled={isLoading || isError}>
      <SelectTrigger className="h-8 w-full text-sm bg-[var(--input)] border border-[var(--border)] rounded-md">
        <SelectValue placeholder="Select range" />
      </SelectTrigger>

      <SelectContent className="bg-gray-100 text-[var(--dropdown-foreground)] border border-[var(--border)] rounded-md shadow-lg">
        {isError ? (
          <SelectItem disabled className="text-red-500">
            Failed to load options
          </SelectItem>
        ) : (
          options.map(opt => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="hover:bg-[var(--row-hover)] rounded-sm text-sm"
            >
              {opt.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

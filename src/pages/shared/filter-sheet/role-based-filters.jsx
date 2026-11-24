import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

let stage = {
  Store: 1,
  Verification: 2,
  Dispatch: 3,
  Delivered: 4,
};

const RoleBasedFilters = ({
  filters = [],
  selectedFilters = {},
  onChange,
  role = null,
}) => {
  const safeFilters = Array.isArray(filters) ? filters : [];
  let options = !role
    ? safeFilters[0]?.options
    : safeFilters[0]?.options?.filter((item) => item.stageId === stage[role]);

  return (
    <section className="flex flex-wrap gap-2 items-center">
      {safeFilters.map((filter) => (
        <section key={filter?.key} className="min-w-[120px]">
          <Select
            value={selectedFilters[filter?.key] || ""}
            onValueChange={(val) => {
              onChange(filter?.key, val);
            }}
          >
            <SelectTrigger className="h-8 text-sm bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] rounded-md">
              <SelectValue placeholder={filter?.label} />
            </SelectTrigger>
            <SelectContent className="bg-gray-100 text-[var(--dropdown-foreground)] border border-[var(--border)] rounded-md shadow-lg">
              {[
                ...options,
                // {
                //   label: "All Status",
                //   value: "",
                // },
              ]?.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="hover:bg-[var(--row-hover)] rounded-sm text-sm"
                >
                  {opt.label}
                </SelectItem>
              )) || (
                <SelectItem disabled className="text-red-500">
                  No options
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </section>
      ))}
    </section>
  );
};

export default RoleBasedFilters;

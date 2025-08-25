import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const dateRangeOptions = [
    "Current Date",
    "Last 7 Days",
    "Last 30 Days",
    "Custom Range",
];

export function DateRangeDropdown({ value, onChange }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                >
                    <span>{value || "Select range"}</span>
                    <ChevronDown className="h-4 w-4 ml-2 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="w-[200px] bg-white dark:bg-neutral-900 shadow-lg rounded-lg border"
            >
                {dateRangeOptions.map((option) => (
                    <DropdownMenuItem
                        key={option}
                        onClick={() => onChange(option)}
                        className={`cursor-pointer ${value === option
                                ? "bg-primary text-white"
                                : "hover:bg-muted"
                            }`}
                    >
                        {option}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import React from "react";
import { ChevronDown, Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function SetupsDropdown({ setupOptions = [], selected, setSelected }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="inline-flex items-center gap-2"
                    aria-label="Open Setups"
                    style={{
                        backgroundColor: "oklch(var(--dropdown-background))",
                        color: "oklch(var(--dropdown-foreground))",
                    }}
                >
                    <span className="text-sm">{selected || "Setups"}</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 shadow-lg rounded-lg border"
                style={{
                    backgroundColor: "oklch(var(--dropdown-background))",
                    color: "oklch(var(--dropdown-foreground))",
                    borderColor: "oklch(var(--border))",
                }}
            >
                <DropdownMenuLabel
                    className="text-xs font-semibold tracking-wide"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                >
                    Setups
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {setupOptions.map((option) => (
                    <DropdownMenuItem
                        key={option}
                        asChild
                        onClick={() => setSelected(option)}
                        className="flex items-center w-full px-2 py-1.5 rounded-md cursor-pointer"
                        style={{
                            backgroundColor:
                                selected === option
                                    ? "oklch(var(--primary))"
                                    : "transparent",
                            color:
                                selected === option
                                    ? "oklch(var(--primary-foreground))"
                                    : "oklch(var(--dropdown-foreground))",
                        }}
                    >
                        <a href="#" className="flex items-center w-full">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{option}</span>
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

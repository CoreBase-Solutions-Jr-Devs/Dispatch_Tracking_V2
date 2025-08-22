import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles with updated colors
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        // Background - white in light mode, dark input in dark mode
        "bg-input dark:bg-input/30",
        // Border - gray border matching your palette
        "border-border",
        // Layout and spacing
        "flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs",
        // Transitions and interactions
        "transition-[color,box-shadow] outline-none",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Disabled states
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Responsive text
        "md:text-sm",
        // Focus states - using your orange primary color
        "focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-[3px]",
        // Error states - using destructive color
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // Hover state for better UX
        "hover:border-primary/50 transition-colors duration-200",
        // Dropdown/select specific styling
        "data-[slot=dropdown]:bg-dropdown-background data-[slot=dropdown]:text-dropdown-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
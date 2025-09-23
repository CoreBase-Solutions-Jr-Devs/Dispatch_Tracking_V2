/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Poppins",
          "Inter",
          "Nunito Sans",
          "Open Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 8px)",
      },
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",

        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",

        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",

        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",

        secondary: "oklch(var(--secondary))",
        "secondary-foreground": "oklch(var(--secondary-foreground))",

        destructive: "oklch(var(--destructive))",
        "destructive-foreground": "oklch(var(--destructive-foreground))",

        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",

        // Sidebar
        "sidebar-background": "oklch(var(--sidebar-background))",
        "sidebar-foreground": "oklch(var(--sidebar-foreground))",
        "sidebar-primary": "oklch(var(--sidebar-primary))",
        "sidebar-primary-foreground":
          "oklch(var(--sidebar-primary-foreground))",
        "sidebar-accent": "oklch(var(--sidebar-accent))",
        "sidebar-accent-foreground": "oklch(var(--sidebar-accent-foreground))",
        "sidebar-border": "oklch(var(--sidebar-border))",
        "sidebar-ring": "oklch(var(--sidebar-ring))",

        // Status
        "status-store": "oklch(var(--status-store))",
        "status-store-foreground": "oklch(var(--status-store-foreground))",
        "status-verification": "oklch(var(--status-verification))",
        "status-verification-foreground":
          "oklch(var(--status-verification-foreground))",
        "status-dispatch": "oklch(var(--status-dispatch))",
        "status-dispatch-foreground":
          "oklch(var(--status-dispatch-foreground))",
        "status-delivered": "oklch(var(--status-delivered))",
        "status-delivered-foreground":
          "oklch(var(--status-delivered-foreground))",

        // Hover + dropdown
        "row-hover": "oklch(var(--row-hover))",
        "dropdown-background": "oklch(var(--dropdown-background))",
        "dropdown-foreground": "oklch(var(--dropdown-foreground))",

        // Charts
        "chart-1": "oklch(var(--chart-1))",
        "chart-2": "oklch(var(--chart-2))",
        "chart-3": "oklch(var(--chart-3))",
        "chart-4": "oklch(var(--chart-4))",
        "chart-5": "oklch(var(--chart-5))",

        // Pharmacy extras
        "pharmacy-mint": "oklch(var(--pharmacy-mint))",
        "pharmacy-cream": "oklch(var(--pharmacy-cream))",
        "pharmacy-steel": "oklch(var(--pharmacy-steel))",
        // Grays
        gray: {
          300: "oklch(var(--gray-300))", // #e5e5e5
        },
      },
      boxShadow: {
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

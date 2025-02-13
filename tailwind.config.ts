import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'text-primary': '#FFFFFF',    // White text
        'text-secondary': '#E5E7EB',  // Light gray for secondary text
        'text-muted': '#9CA3AF',      // Muted gray for less important text
        'input-text': '#FFFFFF',      // White text for inputs
      },
    },
  },
  plugins: [],
} satisfies Config;

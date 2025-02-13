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
        'text-primary': '#1F2937',  
        'text-secondary': '#4B5563', 
        'text-muted': '#6B7280',     
        'input-text': '#374151',     
      },
    },
  },
  plugins: [],
} satisfies Config;

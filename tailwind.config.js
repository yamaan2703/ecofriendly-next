/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          cream: "hsl(var(--card-cream))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          lighter: "hsl(var(--primary-lighter))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "Open Sans", "sans-serif"],
        eurotypo: ["var(--font-open-sans)", "Open Sans", "sans-serif"],
        "notulen-serif": ["var(--font-open-sans)", "Open Sans", "sans-serif"],
      },
      backgroundImage: {
        'gradient-eco': 'var(--gradient-eco)',
        'gradient-cream': 'var(--gradient-cream)',
        'gradient-subtle': 'var(--gradient-subtle)',
      },
      boxShadow: {
        'eco': 'var(--shadow-eco)',
        'soft': 'var(--shadow-soft)',
        'glow': 'var(--shadow-glow)',
      },
      transitionProperty: {
        'smooth': 'var(--transition-smooth)',
        'spring': 'var(--transition-spring)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};


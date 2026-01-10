/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic mappings
        primary: "var(--color-primary)",   // Default RED anchor
        secondary: "var(--color-secondary)", // Default ORANGE anchor
        
        // Full DevGlow Palette
        "dev-red": "var(--color-dev-red)",
        "dev-green": "var(--color-dev-green)",
        "dev-blue": "var(--color-dev-blue)",
        "dev-orange": "var(--color-dev-orange)",
        "dev-yellow": "var(--color-dev-yellow)",
        "dev-pink": "var(--color-dev-pink)",

        // Backgrounds
        bg: {
          DEFAULT: "var(--color-bg)",
          secondary: "var(--color-bg-secondary)", // D1/D2
          tertiary: "var(--color-bg-tertiary)",   // D2/D3
        },
        
        // Foreground/Text
        fg: {
          DEFAULT: "var(--color-fg)",
          muted: "var(--color-fg-muted)", // D4
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"JetBrains Mono"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
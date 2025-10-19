/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Required for your App Router files
  ],
  theme: {
    // You'll likely need to add an 'extend' block here 
    // to map your CSS variables (from globals.css) to Tailwind classes.
    extend: {
      colors: {
        // Example: This maps the Tailwind utility 'bg-background' to your CSS variable '--background'
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Add all other custom colors like primary, secondary, etc.
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        // ... (repeat for other colors like secondary, accent, border, etc.)
      },
      // You may also need to configure 'borderRadius' here
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
}
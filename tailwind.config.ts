import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#F5A623',
          orange: '#F97316',
          red: '#E53935',
          teal: '#00BCD4',
          dark: '#0A1628',
        },
      },
    },
  },
  plugins: [],
};

export default config;

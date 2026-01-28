import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas baseadas no design da loja
        primary: {
          DEFAULT: '#FF6B35', // Laranja principal
          dark: '#E55A2B',
        },
        secondary: {
          DEFAULT: '#4ECDC4', // Verde para botões
        },
      },
    },
  },
  plugins: [],
}
export default config

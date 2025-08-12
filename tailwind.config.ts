
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        field: '#0f1115',
        nflBlue: '#1b2a4e',
        nflRed: '#c1121f',
      },
    },
  },
  plugins: [],
}
export default config

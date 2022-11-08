/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/theme/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // See https://tailwindcss.com/docs/preflight
    // Some styles were breaking Chakra components
    preflight: false,
  },
  plugins: [],
}

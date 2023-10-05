/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
      {
        pattern: /bg-/,
        pattern: /to-/,
        pattern: /via-/,
        pattern: /from-/,
      },
      'from-gray-400',
      'from-green-400',
      'from-blue-400',
      'to-gray-700',
      'to-green-700',
      'to-blue-700',
    ]
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
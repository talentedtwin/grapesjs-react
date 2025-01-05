/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
    "./src/styles/editor-tailwind.css",
    // Add your GrapesJS component files here
    "./src/app/components/Editor/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/PageBuilder/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" // Flowbiteのコンテンツを追加
  ],
  darkMode: 'class', // 'media'または'class'を指定
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Flowbiteプラグインを追加
  ],
} 
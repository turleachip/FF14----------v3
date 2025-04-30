import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // プロジェクトの設定をここに記述
  plugins: [tailwindcss()],
});

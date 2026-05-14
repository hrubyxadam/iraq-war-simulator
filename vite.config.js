import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relativní base funguje dobře pro GitHub Pages i bez znalosti názvu repozitáře.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "./",
});

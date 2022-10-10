import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nanostory from "@nanostory/plugin";

// https://vitejs.dev/config/
export default defineConfig((ctx) => ({
    plugins: [react(), nanostory()],
}));

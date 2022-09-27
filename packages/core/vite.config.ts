import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import nanostory from "@nanostory/plugin";

const libPath = resolve(__dirname, "src", "lib.tsx");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: libPath,
            formats: ["cjs", "es"],
        },
    },
    plugins: [svgr(), react(), dts(), mode === "story" && nanostory()],
    resolve: {
        alias: {
            "@nanostory/core": libPath,
        },
    },
}));

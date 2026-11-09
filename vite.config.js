import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" يجعل الموقع يعمل في أي مجلد على الاستضافة
export default defineConfig({ base: "./", plugins: [react()] });

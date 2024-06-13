/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Enable CORS
    cors: true,
    // Uncomment if you need HTTPS support with custom certificates
    /*
    https: {
      key: fs.readFileSync("./vite.key"),
      cert: fs.readFileSync("./vite.crt"),
    },
    */
    // Allow local network access
    host: "0.0.0.0",
    port: 5000, // or any port you prefer
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Router util",
        short_name: "Router",
        description: "",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
});

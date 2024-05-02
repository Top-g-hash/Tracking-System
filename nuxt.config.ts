// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Tracking System",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Generate & scan QR Codes instantly!",
        },
        // add more meta tags here
        { name: "theme-color", content: "#ffffff" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Joshua Sinaga, josua123690707@gmail.com" },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    cssVariables: true,
  },
  supabase: {
    url: import.meta.env.SUPABASE_URL,
    key: import.meta.env.SUPABASE_KEY,
    redirect: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  imports: {
    dirs: ["./stores", "composables/**"],
  },
});
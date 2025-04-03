import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboutUs: resolve(__dirname, "public/aboutUs.html"),
        search: resolve(__dirname, "public/search.html"),
        shoppingList: resolve(__dirname, "public/shoppingList.html"),
      },
    },
  },
};

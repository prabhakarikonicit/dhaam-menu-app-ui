export const mfConfig = {
  name: "dhaam_menu_app_ui",
  filename: "remoteEntry.js",
  exposes: {
    "./CategoryComponent": "./src/localComponents/category/categoryComponent",
    "./ProductComponent": "./src/localComponents/product/productComponent",
    "./AddOnsComponent": "./src/localComponents/addons/addonsComponent",
    "./CombosComponent": "./src/localComponents/combos/combosComponent",
    "./DealsComponent": "./src/localComponents/deals/dealsComponent",
    "./tailwindStyles": "./src/index.css"
  },
  shared: ["react", "react-dom"],
  types: {
    skipEmit: process.env.NODE_ENV === 'development',
  },
};

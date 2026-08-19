/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // NativeWind uses className and tw, while style utilities might use other props
  tailwindAttributes: ["className", "tw", "style"],
};

export default config;

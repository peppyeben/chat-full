/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./public/index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/tw-elements/js/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/plugin.cjs")],
};

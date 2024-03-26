/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",

        "./src/*.{vue,js}",
        "./src/**/*.vue",
        "./node_modules/tw-elements/js/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/plugin.cjs")],
};

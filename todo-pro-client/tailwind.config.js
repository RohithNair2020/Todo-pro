/** @type {import('tailwindcss').Config} */
export default {
    content: ["./**/*.{html,tsx,jsx,ts,js}", "!./node_modules"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["ui-sans-serif", '"Noto Sans"', "sans-serif"],
                serif: ["ui-serif", "Georgia", "serif"],
                mono: ["ui-monospace", "Poppins", "monospace"],
            },
        },
    },
    plugins: [],
};

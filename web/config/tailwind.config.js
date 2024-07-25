/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
			colors: {
				"mauve-1": "#121113",
				"mauve-2": "#1A191B",
				"mauve-3": "#232225",
				"mauve-5": "#323035",
				"mauve-6": "#3C393F",
				"mauve-7": "#49474E",
				"mauve-8": "#625F69",

				"tomato-7": "#853A2D",
				"tomato-9": "#E54D2E",
				"tomato-10": "#EC6142",
				"tomato-11": "#FF977D",

				"accent-9": "#E54D2E",
			},
			fontFamily: {
				sans: ["Nunito", "sans-serif"]
			},
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
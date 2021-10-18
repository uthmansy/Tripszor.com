module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			main: ["manrope"],
		},
		extend: {
			colors: {
				primary: "#0078d7",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

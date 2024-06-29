// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   darkMode: 'class', // Enable dark mode with a class
//   theme: {
//     extend: {
//       colors: {
//         primary: '#D8A7B1', // Light purple
//         secondary: '#AB6C82', // Darker purple
//         darkBg: '#3C2F3D', // Dark mode background (greyish purple)
//         darkText: '#E5E5E5', // Light text for dark mode
//         white: '#FFFFFF', // White
//         lightPurpleText: '#B288C0', // Light purple text
//         black: '#000000', // Black
//         contrastYellow: '#FFC107', // Yellow for contrast
//         contrastBlue: '#1E3A8A', // Dark blue for good contrast with yellow
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      colors: {
        primary: '#E4C3D1', // Slightly darker pinkish-purple for primary background
        secondary: '#C19AB0', // Darker pinkish-purple for secondary elements
        darkBg: '#290014', // Very dark purple for dark mode background
        darkText: '#E8C1E3', // Light pinkish text for dark mode
        white: '#FFFFFF', // White
        lightText: '#5A1238', // Darker purple for text in light mode
        contrastYellow: '#FFC107', // Yellow for contrast
        contrastBlue: '#1E3A8A', // Dark blue for good contrast with yellow
        darkModeButton: '#E8C1E3', // Light pinkish text for dark mode button
        darkModeBackground: '#470A27', // Background for dark mode elements
      },
    },
  },
  plugins: [],
}


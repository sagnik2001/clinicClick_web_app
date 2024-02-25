/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#fff',
        'black': '#000',
        'purple-100': '#c995f8',
        'purple-600': '#b08bbb',
        'grey-600': '#121212',
        'grey-500': '#2f2f2f',
        'grey-400': '#4d4d4d',
        'grey-300': '#a2a2a2',
        'grey-200': '#e7e7e7',
        'grey-100': '#fafafa',
        'primary': '#07f',
        'blue': {
          'light': '#d8eaff',
          'dark': '#2f0182',
        },
        'blue-600': '#00002c',
        'green': '#5cbe79',
        'danger': '#e03131',
      },
      backgroundImage: {
        'landing-gradient':
          'radial-gradient(205.8% 374.81% at -12.22% 266.79%, #6601E8 18.91%, #00002C 74.8%)',
        'dashboard-gradient-1':
          'radial-gradient(50% 50% at 50% 50%, rgba(102, 1, 232, 0.69) 0.17%, rgba(47, 1, 130, 0.00) 100%)',
        'dashboard-gradient-2':
          'radial-gradient(50% 50% at 50% 50%, rgba(102, 1, 232, 0.48) 0%, rgba(47, 1, 130, 0.00) 100%)',
        'org-gradient-1': 'linear-gradient(96deg, #6601E8 6.27%, #044654 95.39%)',
        'org-gradient-2': 'linear-gradient(96deg, #003DED 6.27%, #044654 95.39%)',
      },
    },
  },
  fontFamily: {
    'lato': ['Lato', 'sans-serif'],
    // 'roboto': ['Roboto', 'sans-serif'],
    // 'clashDisplay': ['Clash Display', 'sans-serif'],
  },
  plugins: [],
}


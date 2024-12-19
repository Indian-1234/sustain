module.exports = {
  content: [
    './node_modules/preline/dist/*.js',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        white: '0 4px 6px rgba(255, 255, 255, 0.5)', // Add a soft white shadow
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'my-black': '#080544',
        'my-yellow': '#FFDC76',
        'my-mid-yellow': '#FEF4D6'
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
    boxShadow: ['responsive', 'hover', 'focus', 'active'],

    extend: {}
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-ol-white-2': {
          textShadow:
            '2px 2px 0px #FEFEFE, -2px 2px 0px #FEFEFE, 2px -2px 0px #FEFEFE, -2px -2px 0px #FEFEFE'
        },
        '.text-ol-black-2': {
          textShadow:
            '2px 2px 0px #333333, -2px 2px 0px #333333, 2px -2px 0px #333333, -2px -2px 0px #333333'
        },
        '.text-ol-white-4': {
          textShadow:
            '4px 4px 0px #FEFEFE, -4px 4px 0px #FEFEFE, 4px -4px 0px #FEFEFE, -4px -4px 0px #FEFEFE'
        },
        '.button-shadow': {
          boxShadow: '0px 4px 0px #080544'
        },
        '.button-shadow-none': {
          boxShadow: '0px 0px 0px #080544'
        }
      }

      addUtilities(newUtilities)
    }
  ]
}

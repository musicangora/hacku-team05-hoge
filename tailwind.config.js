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
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(10deg) scale(0.5)' },
          '40%': { transform: 'rotate(-30deg) scale(1.3)' },
          '60%': { transform: 'rotate(-30deg) scale(1.3)' },
          '90%': { transform: 'rotate(10deg) scale(1)' },
          '100%': { transform: 'rotate(0deg) scale(1)' }
        },
        nice: {
          '0%': { opacity: '100' },
          '40%': { transform: 'translateY(-1000%) scaleX(25) scaleY(20)' },
          '75%': { opacity: '100' },
          '85%': {
            transform: 'translateY(-1000%) scaleX(25) scaleY(20)'
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0'
          }
        },
        toplogo: {
          '0%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
          '51%': { transform: 'rotate(0deg) scale(0.6)' },
          '52%': { transform: 'scale(1.2)' },
          '53%': { transform: 'rotate(-15deg) scale(1.2)' },
          '54%': { transform: 'rotate(-15deg)' },
          '56%': { transform: 'rotate(0deg) scale(1)' },
          '57%': { transform: 'rotate(-15deg) scale(1)' },
          '100%': { transform: 'rotate(-15deg)' }
        },
        toptext: {
          '0%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(0)' },
          '52%': { transform: 'rotate(-5deg) scale(1)' },
          '53%': { transform: 'rotate(12deg) scale(1.1)' },
          '54%': { transform: 'rotate(-12deg) scale(1.1)' },
          '55%': { transform: 'rotate(12deg) scale(1.1)' },
          '56%': { transform: 'rotate(-12deg) scale(1.1)' },
          '57%': { transform: 'rotate(5deg) scale(1)' },
          '58%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(0)' }
        },
        topbg: {
          '0%': { transform: 'translateX(-50%)' },
          '49%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(-50%) scale(1)' },
          '52%': { transform: 'translateX(-50%) scale(1.2)' },
          '53%': { transform: 'translateX(-50%) scale(0.8)' },
          '55%': { transform: 'translateX(-50%) scale(1.2)' },
          '57%': { transform: 'translateX(-50%) scale(0.9)' },
          '58%': { transform: 'translateX(-50%) scale(1)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        nice: 'nice 0.5s ease-in-out',
        toplogo: 'toplogo 8s ease-in-out infinite',
        toptext: 'toptext 8s ease-in-out infinite',
        topbg: 'topbg 8s ease-in-out infinite'
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

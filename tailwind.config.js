module.exports = {
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      serif: ['Roboto Slab', 'serif']
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1140px', // 1280px menos 70px de margem
      xxl: '1640px' // fullhd menos 140px de margem
    },
    borderRadius: {
      none: '0',
      default: '4px',
      large: '12px'
    },
    extend: {
      colors: {
        'gray-default': '#8F8C87',
        'cyan-selected': '#00A9A5',
        'title-blue': '#105672'
      }
    }
  },
  variants: {},
  plugins: []
}

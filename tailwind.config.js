/** @type {import('tailwindcss').Config} */
module.exports = {
  // Se escanean también data.json y la config del CMS porque contienen clases
  // (badgeColor, bg_active, icon_bg) que se pintan desde JavaScript.
  content: ['./*.html', './assets/js/**/*.js', './data.json', './admin/config.yml'],
  theme: {
    extend: {
      colors: {
        atelier: {
          cream: '#FCF9F6', sand: '#F5ECE4', blush: '#FCE8EA', blushMid: '#F4C7CD',
          rose: '#C86472', berry: '#8E3746', sage: '#E3F0E8', sageMid: '#BDE0CA',
          eucalyptus: '#3D735B', forest: '#234937', lavender: '#EDE8F8', lavenderMid: '#D5C9F0',
          plum: '#6E5399', amber: '#FDF0DF', amberMid: '#F5D6AC', gold: '#9A6526',
          sky: '#E6F0F7', skyDeep: '#456D8A'
        },
        ink: { DEFAULT: '#231B1D', muted: '#5C5053', soft: '#74676B' }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        editorial: '0 22px 50px -12px rgba(142, 55, 70, 0.14)',
        'card-hover': '0 24px 48px -12px rgba(35, 27, 29, 0.12)',
        glass: '0 8px 32px 0 rgba(35, 27, 29, 0.08)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' }
        },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } }
      },
      animation: {
        'fade-in': 'fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee 32s linear infinite'
      }
    }
  }
};

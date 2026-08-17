import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: [
          'var(--font-heading)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'blur-in': {
          '0%': { filter: 'blur(16px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bubble-float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': {
            transform:
              'translate(var(--bubble-drift, 16px), var(--bubble-rise, -24px))',
          },
        },
        'bubble-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'fade-out': 'fade-out 0.6s ease-out forwards',
        'blur-in': 'blur-in 1.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out both',
        'bubble-float': 'bubble-float 8s ease-in-out infinite',
        'bubble-wiggle': 'bubble-wiggle 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;

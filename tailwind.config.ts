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
        // 画面左寄りの上空から回転しながら落下 → 潰れて大きく跳ね、弾みながら右へ転がり → 定位置でジャンプして着地
        'bunny-drop-roll': {
          '0%': {
            transform: 'translate(-45vw, -110vh) rotate(-540deg) scale(1.6)',
            opacity: '0',
            animationTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
          },
          '8%': { opacity: '1' },
          '30%': {
            transform: 'translate(-45vw, 0) rotate(0deg) scale(1.35, 0.7)',
            animationTimingFunction: 'cubic-bezier(0, 0.55, 0.45, 1)',
          },
          '42%': {
            transform: 'translate(-34vw, -28vh) rotate(240deg) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
          },
          '54%': {
            transform: 'translate(-24vw, 0) rotate(480deg) scale(1.2, 0.8)',
            animationTimingFunction: 'cubic-bezier(0, 0.55, 0.45, 1)',
          },
          '61%': {
            transform: 'translate(-18vw, -9vh) rotate(600deg) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
          },
          '68%': {
            transform: 'translate(-12vw, 0) rotate(720deg) scale(1.1, 0.9)',
            animationTimingFunction: 'cubic-bezier(0.2, 0.6, 0.35, 1)',
          },
          '86%': {
            transform: 'translate(0, 0) rotate(1080deg) scale(1.15, 0.85)',
            animationTimingFunction: 'cubic-bezier(0, 0.55, 0.45, 1)',
          },
          '93%': {
            transform: 'translate(0, -48px) rotate(1080deg) scale(1.2)',
            animationTimingFunction: 'cubic-bezier(0.55, 0, 1, 0.45)',
          },
          '100%': {
            transform: 'translate(0, 0) rotate(1080deg) scale(1)',
            opacity: '1',
          },
        },
        // バニー部メンバーが下からふわっと出てくる
        'bunny-float-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // 着地後、注目を集めるための波紋
        'bunny-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
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
        'bunny-drop-roll': 'bunny-drop-roll 2.8s 1s both',
        'bunny-float-up':
          'bunny-float-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'bunny-ring': 'bunny-ring 1.6s ease-out 3.8s infinite backwards',
      },
    },
  },
  plugins: [],
};
export default config;

// uno.config.ts
import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, (match) => ({ padding: `${match[1] / 4}rem` })]
  ],
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue}']
  },
  // eslint-disable-next-line prettier/prettier
  presets: [presetUno(), presetIcons()]
});

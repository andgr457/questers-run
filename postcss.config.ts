// postcss.config.ts

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { PluginCreator } from 'postcss';

type PostCSSPlugin = PluginCreator<any>;

const config: PostCSSPlugin[] = [
  tailwindcss,
  autoprefixer,
  // Add any other PostCSS plugins here
];

export default config;

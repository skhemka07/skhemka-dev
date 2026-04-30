import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Custom domain: skhemka.dev
// No `base` path needed — content lives at the root.
export default defineConfig({
  site: 'https://skhemka.dev',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});

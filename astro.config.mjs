import { defineConfig } from 'astro/config';

const landingPageMobileStyles = {
  name: 'context-onion-mobile-styles',
  hooks: {
    'astro:config:setup': ({ injectScript }) => {
      injectScript('page-ssr', 'import "/src/styles/home-mobile.css";');
    },
  },
};

export default defineConfig({
  site: 'https://contextonion.dev',
  integrations: [landingPageMobileStyles],
});

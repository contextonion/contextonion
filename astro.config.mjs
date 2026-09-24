import { defineConfig } from 'astro/config';

const landingPageMobileStyles = {
  name: 'context-onion-mobile-styles',
  hooks: {
    'astro:config:setup': ({ injectScript, updateConfig }) => {
      injectScript('page-ssr', 'import "/src/styles/home-mobile.css";');

      updateConfig({
        vite: {
          plugins: [
            {
              name: 'context-onion-hero-copy',
              enforce: 'pre',
              transform(code, id) {
                if (!id.endsWith('/src/pages/index.astro')) return null;

                return code
                  .replace(
                    'Make <code>AGENTS.md</code> your repostiroy context router',
                    'Make <code>AGENTS.md</code> a repostiroy context router',
                  )
                  .replace('Use the Context Onion model', 'Use the Context Onion Model')
                  .replace(
                    'To help coding agents acquire context progressively.',
                    'And help your coding agents acquire context progressively.',
                  );
              },
            },
          ],
        },
      });
    },
  },
};

export default defineConfig({
  site: 'https://contextonion.dev',
  integrations: [landingPageMobileStyles],
});

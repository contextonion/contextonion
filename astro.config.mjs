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
                  )
                  .replace(
                    /<aside class="layers-boundary" aria-label="Knowledge layer boundary">[\s\S]*?<\/aside>/,
                    '<aside class="layers-boundary" aria-label="Knowledge layer boundary"><span>The layers classify knowledge. AGENTS.md, MCPs, search, catalogs, documentation systems, retrieval systems, and verification mechanisms help route, acquire, or evaluate context.</span></aside>',
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

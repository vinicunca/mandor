import type { HtmlTagDescriptor, PluginOption } from 'vite';
import type { FontPluginOptions } from '../typings';

export async function viteFontsPlugin(
  options?: FontPluginOptions,
): Promise<PluginOption> {
  return {
    name: 'vite:google-fonts',

    transformIndexHtml: {
      order: 'post',
      handler: () => {
        if (!options) {
          return;
        }

        const strings = options.families
          .map((fam) => {
            let name = fam.name.replace(/\s+/g, '+');
            name += ':ital,wght@0,100..900;1,100..900';

            return `family=${name}`;
          })
          .join('&');

        const tags: Array<HtmlTagDescriptor> = [
          {
            tag: 'link',
            attrs: {
              rel: 'preconnect',
              href: 'https://fonts.googleapis.com',
            },
          },
          {
            tag: 'link',
            attrs: {
              rel: 'preconnect',
              href: 'https://fonts.gstatic.com',
              crossorigin: '',
            },
          },
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: `https://fonts.googleapis.com/css2?${strings}&display=swap`,
            },
          },
        ];

        return tags;
      },
    },
  };
}

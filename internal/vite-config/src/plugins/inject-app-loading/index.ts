import type { PluginOption } from 'vite';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readPackageJSON } from '@mandor/node-utils';

/**
 * Used to generate and inject loading styles into your project.
 * Provides loading styles for multiple apps, eliminating the need to import them separately in each app's index.html file.
 */
export async function viteInjectAppLoadingPlugin(
  isBuild: boolean,
  env: Record<string, any> = {},
  loadingTemplate = 'loading.html',
): Promise<PluginOption | undefined> {
  const loadingHtml = await getLoadingRawByHtmlTemplate(loadingTemplate);
  const { version } = await readPackageJSON(process.cwd());
  const envRaw = isBuild ? 'prod' : 'dev';
  const cacheName = `'${env.VITE_APP_NAMESPACE}-${version}-${envRaw}-preferences-theme'`;

  // Get the cached theme
  // Ensure the loading is also dark theme when refreshing the page in dark theme
  const injectScript = `
  <script data-app-loading="inject-js">
  var theme = localStorage.getItem(${cacheName});
  document.documentElement.classList.toggle('dark', /dark/.test(theme));
</script>
`;

  if (!loadingHtml) {
    return;
  }

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    transformIndexHtml: {
      handler(html) {
        const re = /<body\s*>/;
        html = html.replace(re, `<body>${injectScript}${loadingHtml}`);
        return html;
      },
      order: 'pre',
    },
  };
}

/**
 * Used to get the loading HTML template
 */
async function getLoadingRawByHtmlTemplate(loadingTemplate: string) {
  // Support custom loading templates within the app, refer to default-loading.html for the template
  let appLoadingPath = join(process.cwd(), loadingTemplate);

  if (!fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    appLoadingPath = join(__dirname, './default-loading.html');
  }

  return await fsp.readFile(appLoadingPath, 'utf8');
}

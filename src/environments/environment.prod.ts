import packageJson from '../../package.json'
export const environment = {
  baseHref: '/',
  production: true,
  apiBaseUrl: 'http://localhost:5372/api',
  tmdbApiKey: '24c4e7a516af276925d44ac5cc90a59f',
  version: packageJson.version,
}

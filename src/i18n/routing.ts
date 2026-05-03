import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sl', 'hr', 'en'],
  defaultLocale: 'sl',
  localePrefix: 'as-needed', // /sl URLs have no prefix, /en/ and /hr/ get their prefix
})

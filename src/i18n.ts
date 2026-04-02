import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['id', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  
  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = 'id';
  }

  const messages = locale === 'en' 
    ? (await import('../messages/en.json')).default
    : (await import('../messages/id.json')).default;

  return {
    locale: locale as string,
    messages
  };
});

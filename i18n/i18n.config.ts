import en from './locales/en.json';
import de from './locales/de.json';

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: navigator?.language?.split('-')[0] || 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
      en,
      de,
    },
  }
})
import { useNuxtApp } from '#app';
import * as v from 'valibot';

// Import for ru-RU translations
import '@valibot/i18n/ru';

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp();

  watch(
    () => $i18n.locale.value,
    lang => v.setGlobalConfig({ lang }),
    {
      immediate: true,
    },
  );
});

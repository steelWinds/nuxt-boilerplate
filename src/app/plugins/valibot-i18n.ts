import { useNuxtApp } from '#app';
import * as v from 'valibot';

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

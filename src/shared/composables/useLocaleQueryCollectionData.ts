import type { CollectionQueryBuilder, Collections } from '@nuxt/content';
import { joinURL } from 'ufo';

type UnprefixKeys<T> = {
  [K in keyof T as K extends `${infer P}_${string}` ? P : never]: T[K]
};

type UnprefixedCollection = UnprefixKeys<Collections>;

type QueryCallback<Collection extends keyof UnprefixedCollection> = (options: {
  builder: CollectionQueryBuilder<UnprefixedCollection[Collection]>
  path: keyof Collections
}) => Promise<UnprefixedCollection[Collection] | null>;

export async function useLocaleQueryCollectionData<Collection extends keyof UnprefixedCollection>(
  collection: Collection,
  query: QueryCallback<Collection>,
  currentLocale: string,
  defaultLocale: string,
) {
  const localePathBuilder = (path: string, locale: string) => `${path}_${locale}` as Collection;

  let content = await query({
    builder: queryCollection(localePathBuilder(collection, currentLocale) as any),
    path: joinURL(collection, currentLocale) as keyof Collections,
  });

  if (!content && currentLocale !== defaultLocale) {
    content = await query({
      builder: queryCollection(localePathBuilder(collection, defaultLocale) as any),
      path: joinURL(collection, defaultLocale) as keyof Collections,
    });
  }

  return content;
}

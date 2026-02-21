/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) {
  allowlist = [/^\/examples\/pwa(\/.*)?$/];
}

registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/examples/pwa'),
  { allowlist },
));

self.skipWaiting();
clientsClaim();

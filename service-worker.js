// service-worker.js


const CACHE_NAME = 'offline-cache-v3';

const BASE_PATH = self.registration.scope;

const urlsToCache = [
    'bored.html',
    'discord.html',
    'extra.css',
    'extra.js',
    'IMG_2379.ico',
    'music.json',
    'rusted-warfare.html',
    'script.js',
    'spaceflight-simulator.html',
    'style.css',
    'super-mechs.html',
    'videos.html',
    'war-thunder.html',
    'youtube.html'
];

const CACHE_URLS = urlsToCache.map(
    file => new URL(file, BASE_PATH).href
);

// INSTALL
self.addEventListener('install', event => {
    console.log('📦 Installing Service Worker...');

    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            const results = await Promise.allSettled(
                CACHE_URLS.map(async url => {
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    await cache.put(url, response);
                    console.log('✅ Cached:', url);
                })
            );

            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    console.warn(
                        '❌ Failed to cache:',
                        CACHE_URLS[index],
                        result.reason
                    );
                }
            });

            await self.skipWaiting();
        })()
    );
});

// FETCH
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Only handle GET requests.
    if (request.method !== 'GET') return;

    // Ignore external services, including YouTube.
    if (url.origin !== self.location.origin) return;

    // Ignore online service endpoints.
    if (
        url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/notification-reply')
    ) {
        return;
    }

    event.respondWith(
        (async () => {
            try {
                // Try getting the latest version from the network.
                const response = await fetch(request);

                // Cache successful responses.
                if (response.ok && response.type === 'basic') {
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(request, response.clone());
                }

                return response;

            } catch (error) {
                // Network unavailable: use cached version.
                const cached = await caches.match(request);

                if (cached) {
                    return cached;
                }

                // No cached version available.
                return new Response('You are offline and this page is not cached.', {
                    status: 503,
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            }
        })()
    );
});

// ACTIVATE
self.addEventListener('activate', event => {
    console.log('🗑️ Activating Service Worker...');

    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );

            await self.clients.claim();

            console.log('✅ Service Worker activated!');
        })()
    );
});

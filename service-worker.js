// service-worker.js

const CACHE_NAME = 'offline-cache-v2'; // increment version for new SW
const urlsToCache = [
    '/bored.html',
    '/discord.html',
    '/extra.css',
    '/extra.js',
    '/index.html',
    '/rusted-warfare.html',
    '/script.js',
    '/spaceflight-simulator.html',
    '/style.css',
    '/super-mechs.html',
    '/videos.html',
    '/war-thunder.html',
    '/youtube.html',
    // add other static resources
];

// Install: cache resources
self.addEventListener('install', (event) => {
    console.log('📦 Installing new Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching resources for offline use');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // force SW to activate immediately
    );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip YouTube embeds/images/videos
    if (['www.youtube.com','youtube.com','i.ytimg.com','s.ytimg.com'].includes(url.hostname)) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// Activate: clear old caches
self.addEventListener('activate', (event) => {
    console.log('🗑️ Activating new Service Worker, clearing old caches...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // take control of all pages
    );
});

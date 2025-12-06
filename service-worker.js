// service-worker.js

const CACHE_NAME = 'offline-cache';
const urlsToCache = [
    '/bored.html', // Adjust to your homepage and other files
    '/discord.html',
    '/extra.css',
    '/extra.js',
    '/index.html',
    '/script.js',
    '/spaceflight-simulator.html',
    '/style.css',
    '/super-mechs.html',
    '/videos.html',
    '/war-thunder.html',
    '/youtube.html',
    // Add other static resources you want to cache
];

// Install event to cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching resources');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event to serve cached resources when offline
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // 🚫 Skip YouTube embed & image/video requests
    if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com" ||
        url.hostname === "i.ytimg.com" ||
        url.hostname === "s.ytimg.com"
    ) {
        return; // Let browser handle it normally — no caching
    }

    // ✅ Normal caching behavior for the rest of the site
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
 
// Activate event to clear old caches if needed
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

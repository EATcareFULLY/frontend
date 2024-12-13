const CACHE_NAME = "eatcareFULLY-cache";
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png'
];

self.addEventListener('install', event => {
    console.log('Service worker installing...');
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }).catch(err => {
            console.error('Failed to cache resources during install', err);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    // console.log('Fetching:', event.request.url);

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (!event.request.url.includes('/test/')) {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }

                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        // console.log("Returning cached response as fallback:", event.request.url);
                    }
                    return cachedResponse || new Response("Offline and no cache available", {
                        status: 503,
                        statusText: "Service Unavailable"
                    });
                });
            })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

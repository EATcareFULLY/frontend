const CACHE_NAME = "my-pwa-cache-v1";
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
            console.log('Opened cache');
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
    console.log('Fetching:', event.request.url);

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Jeśli odpowiedź jest poprawna, zapisujemy ją w cache i zwracamy użytkownikowi
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Jeśli sieć zawiedzie, próbujemy użyć cache
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        console.log("Returning cached response for:", event.request.url);
                        return cachedResponse;
                    }
                    console.warn("No cached response available for:", event.request.url);
                    return new Response("Service unavailable", { status: 503 });
                });
            })
    );
});



self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        const urlToClear = event.data.url;

        caches.open(CACHE_NAME).then(cache => {
            cache.delete(urlToClear).then(success => {
                if (success) {
                    console.log(`Cache for ${urlToClear} was removed`);
                } else {
                    console.log(`Cache for ${urlToClear} was NOT removed.`);
                }
            });
        });
    }
});




self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

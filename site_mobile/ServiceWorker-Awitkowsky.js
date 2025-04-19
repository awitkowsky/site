if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('ServiceWorker-Awitkowsky.js').then(function () {
        console.info('ServiceWorker zainstalowany');
    }).catch(function (err) {
        console.info('ServiceWorker nie zainstalowany, sprawdź błąd:', err)
    });
}

const APP_CACHE = 'appCache';
const MY_FILES = [
        '/index.html',
		'/styles/main.css',
		'/script.js'
		
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(APP_CACHE).then(function(cache) {
      return cache.addAll(MY_FILES);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== APP_CACHE;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
let offlineCache = "app-offline";
let filesToCache = [
        '/',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'index.html',
        'restaurant.html',
        'data/restaurants.json',
        'css/styles.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'

];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(offlineCache)
        .then(function(cache) {
            return cache.addAll(filesToCache)
        })
    )
});

self.addEventListener('active', e => {
    e.waitUntil(caches.keys()
    .then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== filesToCache) {
        console.log("[ServiceWorker] removing cached files from ", cache);
        return caches.delete(cache);
      }
    })))
  )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) return (response);
            return fetch(e.request);
        })
    )
});

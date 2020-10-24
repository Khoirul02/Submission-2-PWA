const CACHE_NAME = "sub-2-pwa";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/tim.html",
  "/pages/about.html",
  "/pages/kelasmen.html",
  "/pages/favorite.html",
  "/pages/jadwal.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/gambar/icon-fa-512x512.png",
  "/gambar/icon-fa-192x192.png",
  "/gambar/epl.png",
  "/gambar/loading.gif",
  "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
  var base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  }  else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch (event.request);
        })
    )
}
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

 self.addEventListener('push', event => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
       body = 'Push message no payload';
     }
     let options = {
       body: body,
       icon: 'gambar/icon-fa-192x192.png',
       vibrate: [100, 50, 100],
       data: {
       dateOfArrival: Date.now(),
       primaryKey: 1
      }
     };
     event.waitUntil(
      self.registration.showNotification('Push Notification', options)
     );
  });
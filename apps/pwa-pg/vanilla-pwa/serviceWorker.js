const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
	"/",
	"/index.html",
	"/styles.css",
	"/app.js",
	"/images/1.jpg",
	"/images/2.jpg",
	"/images/3.jpg",
	"/images/4.jpg",
	"/images/5.jpg",
	"/images/6.jpg",
	"/images/7.jpg",
	"/images/8.jpg",
	"/images/9.jpg",
];

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticDevCoffee).then(cache => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
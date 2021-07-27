self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./logo192.png", "./logo.512.png", "./favicon.ico", "./images"])
        })
    )
});
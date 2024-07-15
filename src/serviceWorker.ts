self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('api.anthropic.com')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response;
        })
        .catch((error) => {
          console.error('Fetch failed; returning offline page instead.', error);
          return new Response('Service Worker fetch error', {
            status: 500,
            statusText: 'Service Worker fetch error',
          });
        })
    );
  }
});

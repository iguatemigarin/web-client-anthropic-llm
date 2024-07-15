export const registerServiceWorker = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register(swUrl)
          .then(function (registration) {
            // Registration was successful
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );

            resolve();
          })
          .catch(function (err) {
            // registration failed :(
            console.log("ServiceWorker registration failed: ", err);
            reject(err);
          });
      }
    });
  });
};

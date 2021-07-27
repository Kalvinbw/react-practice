if("serviceWorker" in Navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log('SW registered');
        console.log(registration);
    }).catch(error => {
        console.log('registration failed');
        console.log(error);
    })
}
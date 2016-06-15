var imgs = document.querySelectorAll('img');
var urls = {};
for (i = 0; i < imgs.length; i++) {

    if (urls[imgs[i].getAttribute('src')]) {
        urls[imgs[i].getAttribute('src')] += 1;
    } else {
        urls[imgs[i].getAttribute('src')] = 1;
    }

}
JSON.stringify(urls)

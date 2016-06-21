var imgs = document.querySelectorAll('img');
var urls = {};
var title = document.querySelector("title").innerHTML;
console.log(imgs.length);
for (i = 0; i < imgs.length; i++) {

    var url = imgs[i].getAttribute('src');
    if (url.match("^http://") || url.match("^https://")) {
    } else {
        url = window.location.protocol + "//" + window.location.hostname + url;
    }

    if (urls[url]) {
        urls[url] += 1;
    } else {
        urls[url] = 1;
    }
    
}
console.log(JSON.stringify(urls));
JSON.stringify(urls);


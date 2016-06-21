var imgs = document.querySelectorAll('img');
var urls = [];
var title = document.querySelector("title").innerHTML;
console.log(imgs.length);
for (i = 0; i < imgs.length; i++) {

    var url = imgs[i].getAttribute('src');

    if (null == url)
        continue;

    if (url.match("^http://") || url.match("^https://")) {
    } else {
        url = window.location.protocol + "//" + window.location.hostname + url;
    }

    urls.push({"url": url, "isDownloadFinished": false, "downloadDir": title});
}
console.log(JSON.stringify(urls));
JSON.stringify(urls);


/*******************************************
 *
 * 获取页面中所有img的src地址
 *
 * *****************************************
 *
 * @type {NodeList}
 */
console.log("use inject-default.js");
var imgs = document.querySelectorAll('img');
var urls = [];
console.log(imgs.length);

for (var i = 0; i < imgs.length; i++) {
    var url = imgs[i].getAttribute('src');
    if (null == url) {
        continue;
    }
    if (null == url.match("^http://") && null == url.match("^https://")) {
        url = window.location.protocol + "//" + window.location.hostname + url;
    }
    urls.push({"url": url});
}
JSON.stringify(urls);

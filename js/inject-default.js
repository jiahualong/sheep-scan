/*******************************************
 *
 * 获取页面中所有img的src地址
 *
 * *****************************************
 *
 * @type {NodeList}
 */
console.log("use inject-default.js");

var urls = "";
var imgs = document.querySelectorAll('img');
console.log("imgs.length:" + imgs.length);

for (var i = 0; i < imgs.length; i++) {
    var url = imgs[i].getAttribute('src');
    if (null != url && url.length > 0) {
        if (null == url.match("^http://") && null == url.match("^https://")) {
            url = window.location.protocol + "//" + window.location.hostname + url;
        }
        urls += url.replace(/ /g, "%20") + ",";
    }

    url = imgs[i].getAttribute('href');
    if (null != url && url.length > 0) {
        if (null == url.match("^http://") && null == url.match("^https://")) {
            url = window.location.protocol + "//" + window.location.hostname + url;
        }
        urls += url.replace(/ /g, "%20") + ",";
    }
}

urls;

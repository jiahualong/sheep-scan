var imgs = document.querySelectorAll('img');
var urls = "";
for (i = 0; i < imgs.length; i++) {
    urls += imgs[i].getAttribute('src') + "<br />";
}
urls

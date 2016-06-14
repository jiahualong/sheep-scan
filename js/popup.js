/** 检测图片 */
function check() {

    // var s = chrome.extension.getBackgroundPage();
    // document.querySelector('#result').innerHTML = s;

    // chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor='red'"});

    // chrome.tabs.executeScript(null,
    //     {code:"document.querySelector('img')"});

    // chrome.tabs.executeScript(null, {code: "var x = 10; x"},
    //     function (results) {
    //         document.querySelector('#result').innerHTML = results;
    // });

    chrome.tabs.executeScript(null, {code: " document.querySelector('img').getAttribute('src')"},
        function (results) {
            document.querySelector('#result').innerHTML = results;
    });


    // document.querySelector('#result').innerHTML = "abc";

    // document.querySelector("img").innerHTML ="123";

    // for (i = 0; i < imgs.length; i++) {
    // document.querySelector('#result').innerHTML += imgs[i].getAttribute('src') + "<br />";
    // document.querySelector('#result').innerHTML += "hello<br />"
    // }

}


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#check').addEventListener('click', check);
    /*
     chrome.browserAction.onClicked.addListener(function (tab) {
     chrome.tabs.executeScript(null,
     {code: "document.body.bgColor='red'"});
     });
     */

});



/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */

/** 检测图片 */
function scanPage() {

    content = document.querySelector(".content > ul");
    copy = document.querySelector(".copy");

    content.innerHTML = "";
    copy.innerHTML = "";

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (array_of_tabs) {
        var tab = array_of_tabs[0];
        url = tab.url;
        injectJS = "js/inject-default.js";

        if (url.match("https?:\/\/www.google.com")) {
            document.querySelector("#result").innerHTML = "math google.com";
            injectJS = "js/inject-google.js";
        }

        chrome.tabs.executeScript(
            null, {file: injectJS},
            function (imgsstr) {
                var imgs = JSON.parse(imgsstr);
                if (!isEmptyObject(imgs)) {
                    for (var i = 0; i < imgs.length; i++) {
                        content.innerHTML +=
                            "<li>"
                            + "<img src='" + imgs[i].url + "' /><span>"
                            + imgs[i].url
                            + "</span></li>";
                        copy.innerHTML += imgs[i].url + "<br />";
                    }
                    showTip(chrome.i18n.getMessage("tipScanFinished"));
                } else {
                    showTip(chrome.i18n.getMessage("tipScanResultEmpty"));
                }
            });
    });
}

/**
 * 拷贝内容
 * @param _copyFrom 拷贝源Div
 * @param tipArea 拷贝提示信息Div
 */
function copyResult() {
    var _copyFrom = "";
    _copyFrom = document.querySelector(".copy");

    if (_copyFrom.innerHTML == '') {
        showTip("没有拷贝的信息");
        return;
    }

    var range = document.createRange();
    range.selectNode(_copyFrom);
    window.getSelection().addRange(range);
    var msg = document.execCommand('copy') ? chrome.i18n.getMessage("tipCopyFinished") : chrome.i18n.getMessage("tipCopyFailt");
    showTip(msg);
}
/**
 * 显示提示
 * @param msg
 */
function showTip(msg) {
    document.querySelector(".tipArea").innerHTML = msg;
}

/**
 * 检测对象是否为空
 * @param e
 * @returns {number}
 */
function isEmptyObject(e) {
    if (undefined == e || null == e || '' == e)
        return true;
    var t;
    for (t in e)
        return false;
    return true;
}

/**
 * 绑定按钮事件
 */
document.addEventListener('DOMContentLoaded', function () {

    //i18n init
    document.querySelector('.title-word').innerHTML = chrome.i18n.getMessage("pluginName");
    // document.querySelector('#scanPage').setAttribute('value', chrome.i18n.getMessage("buttonCheck"));
    document.querySelector('#copyResult').setAttribute('value', chrome.i18n.getMessage("buttonCopyToClip"));

    //bind click
    // document.querySelector('#scanPage').addEventListener('click', scanPage);
    document.querySelector('#copyResult').addEventListener('click', copyResult);

    scanPage();
});

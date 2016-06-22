/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */

/** 检测图片 */
function check() {

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
                            + "<img src='" + imgs[i].url + "' />"
                            + imgs[i].url
                            + "</li>";
                        copy.innerHTML += imgs[i].url + "<br />";
                    }
                    log("扫描完成")
                } else {
                    log("未检测到图片")
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
        log("没有拷贝的信息");
        return;
    }

    var range = document.createRange();
    range.selectNode(_copyFrom);
    window.getSelection().addRange(range);
    var msg = document.execCommand('copy') ? "拷贝完成!" : "拷贝失败";
    log(msg);
}
/**
 * 打印Log
 * @param msg
 */
function log(msg) {
    document.querySelector(".log").innerHTML = msg;
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
    // document.querySelector('#check').innerText = chrome.i18n.getMessage("buttonCheck");
    // document.querySelector('#copyResult').innerText = chrome.i18n.getMessage("buttonCopyToClip");
    document.querySelector('#check').addEventListener('click', check);
    document.querySelector('#copyResult').addEventListener('click', copyResult);
    check();
});





/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */

/** 检测图片 */
function check() {

    _resultArea = document.querySelector("#result");
    _resultImgArea = document.querySelector("#resultImg");

    _resultArea.innerHTML = "";
    _resultImgArea.innerHTML = "";

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

                if (isEmptyObject(imgs)) {
                    setIconOff();
                    log("未检测到图片")
                    _resultArea.innerHTML = "";
                    _resultImgArea.innerHTML = "";

                } else {
                    imagesList = imgs;
                    setIconOn();
                    log("检测完成");

                    for (var i = 0; i < imgs.length; i++) {
                        _resultArea.innerHTML += imgs[i].url + "<br />";
                        _resultImgArea.innerHTML += "<img src='" + imgs[i].url + "' /><br />";
                    }
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
    _copyFrom = document.querySelector("#result");

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


/** 启动时加载项 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#check').addEventListener('click', check);
    document.querySelector('#copyResult').addEventListener('click', copyResult);
    document.querySelector('#downloadPic').addEventListener('click', downloadPic);
    document.querySelector('#clearStorage').addEventListener('click', clearStorage);
    document.querySelector('#readStorage').addEventListener('click', readStorage);
    document.querySelector('#test').addEventListener('click', test);
});

/***********************************************************
 *
 *  公共方法
 *
 ***********************************************************
 */

/**
 * 打印Log
 * @param msg
 */
function log(msg) {
    if (isEmptyObject(msg))
        msg = Math.random();
    document.querySelector("#tip").classList.remove("disable");
    document.querySelector("#tip").innerHTML = msg;
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





/** 设置图标是否高亮*/
function setIcon(flag) {
    if (flag) {
        chrome.browserAction.setIcon({path: "img/32x32.png"});
    } else {
        chrome.browserAction.setIcon({path: "img/32x32-offline.png"});
    }
}
function setIconOn() {
    setIcon(true);
}

function setIconOff() {
    setIcon(false);

}
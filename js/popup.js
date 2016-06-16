/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */
var imagesList = {};
var imagesURL = "";

/** 检测图片 */
function check() {

    _resultArea = document.querySelector("#result");
    _resultImgArea = document.querySelector("#resultImg");

    _resultArea.innerHTML = "";
    _resultImgArea.innerHTML = "";

    log();

    chrome.tabs.executeScript(
        null, {file: "js/getimg.js"},
        function (imagesJSONList) {
            var _imagesJSONList = JSON.parse(imagesJSONList);

            if (isEmptyObject(_imagesJSONList)) {
                setIcon(false);
                log("未检测到图片")
                _resultArea.innerHTML = "";
                _resultImgArea.innerHTML = "";

            } else {
                imagesList = _imagesJSONList;
                setIcon(true);
                log("检测完成");

                for (key in _imagesJSONList) {
                    _resultArea.innerHTML += key + "<br />";
                    _resultImgArea.innerHTML += "<img src='" + key + "' /><br />";
                    imagesURL = key;
                }
            }
        });
}

/**
 * 拷贝内容
 * @param _copyFrom 拷贝源Div
 * @param tipArea 拷贝提示信息Div
 */
function copyResult() {
    _copyFrom = document.querySelector("#result");

    log();

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
 * 下载最后一张图片
 */
function downloadPic() {
    log("下载图片中");
    var url;
    for (url in imagesList) {
        chrome.downloads.download({url: url},
            function (id) {
            });
    }
    log("下载完成");
}

/** 设置图标是否高亮*/
function setIcon(flag) {
    if (flag) {
        chrome.browserAction.setIcon({path: "img/32x32.png"});
    } else {
        chrome.browserAction.setIcon({path: "img/32x32-offline.png"});
    }
}

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


/** 启动时加载项 */
document.addEventListener('DOMContentLoaded', function () {
    check();
    document.querySelector('#check').addEventListener('click', check);
    document.querySelector('#copyResult').addEventListener('click', copyResult);
    document.querySelector('#downloadPic').addEventListener('click', downloadPic);
    //chrome.browserAction.onClicked.addListener(check()); //点击图标时进行检测
});


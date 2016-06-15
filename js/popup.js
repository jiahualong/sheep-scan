/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */
/** 检测图片 */
function check() {

    _tipArea = document.querySelector("#tip");
    _resultArea = document.querySelector("#result");
    _resultImgArea = document.querySelector("#resultImg");

    _tipArea.innerHTML = "";
    _resultArea.innerHTML = "";
    _resultImgArea.innerHTML = "";

    log();

    chrome.tabs.executeScript(
        null, {file: "js/getimg.js"},
        function (imagesJSONList) {
            imagesJSONList = JSON.parse(imagesJSONList);

            if (isEmptyObject(imagesJSONList)) {
                setIcon(false);
                _tipArea.innerHTML = "未检测到图片";
                _tipArea.classList.remove("disable");
                _resultArea.innerHTML = "";
                _resultImgArea.innerHTML = "";

            } else {

                setIcon(true);
                _tipArea.innerHTML = "";
                _tipArea.classList.add("disable");

                for (key in imagesJSONList) {
                    _resultArea.innerHTML += key + "<br />";
                    _resultImgArea.innerHTML += "<img src='" + key + "' /><br />";
                }
            }
        });
}

/**
 * 拷贝内容
 * @param copyFrom 拷贝源Div
 * @param tipArea 拷贝提示信息Div
 */
/*
 function copyResult(copyFrom, _tipArea) {

 // log();
 log("random");
 if (copyFrom.innerHTML == '') {
 _tipArea.innerHTML = "没有拷贝的信息";
 return;
 }

 var range = document.createRange();
 range.selectNode(copyFrom);
 window.getSelection().addRange(range);
 var msg = document.execCommand('copy') ? "拷贝完成!" : "拷贝失败";
 _tipArea.innerHTML = msg;
 _tipArea.classList.remove("disable");
 }
 */


/** 设置图标是否高亮*/
function setIcon(flag) {
    if (flag) {
        chrome.browserAction.setIcon({path: "img/32x32.png"});
    } else {
        chrome.browserAction.setIcon({path: "img/32x32-offline.png"});
    }
}

function log(randomDiv) {
    document.querySelector("#random").innerHTML = randomDiv + Math.random();
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
    document.querySelector('#check').addEventListener('click', check);
});


// document.querySelector('#result'),
//     document.querySelector('#resultImg'),
//     document.querySelector('#tip')

//绑定拷贝按钮事件
// document.querySelector('#copyResult').addEventListener('click',
//     copyResult(document.querySelector('#result'), document.querySelector('#tip')));

//点击图标时进行检测
//chrome.browserAction.onClicked.addListener(check());

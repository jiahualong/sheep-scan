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

var _title = "abaa";
/**
 * 获取页面title
 */
function getTitle() {
    chrome.tabs.executeScript(
        null, {file: "js/getTitle.js"},
        function (title) {
            // log(_title); //有值
            _title = title;
            _title = title;
            // log(_title); //有值
        });

    log(_title); //没有值
    // return _title;
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

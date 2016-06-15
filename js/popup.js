/** 检测图片 */
function check(resultArea, resultImgArea, tipArea) {
    chrome.tabs.executeScript(
        // {code: " document.querySelector('img').getAttribute('src')"},
        null, {file: "js/getimg.js"},
        function (results) {

            if (results == undefined || results == null || results == '') {
                setIcon(false);
                tipArea.innerHTML = "未检测到图片";
                tipArea.classList.remove("disable");
                resultArea.innerHTML = "";
                resultImgArea.innerHTML = "";
            } else {
                setIcon(true);
                tipArea.innerHTML = "";
                tipArea.classList.add("disable");
                for (key in JSON.parse(results)) {

                    resultArea.innerHTML += key + "<br />";
                    resultImgArea.innerHTML += "<img src='" + key + "' /><br />";
                }
            }
        });
}

/**
 * 拷贝内容
 * @param copyFrom 拷贝源Div
 * @param tipArea 拷贝提示信息Div
 */
function copyResult(copyFrom, tipArea) {

    if (copyFrom.innerHTML == '') {
        tipArea.innerHTML = "没有拷贝的信息";
        return;
    }

    var range = document.createRange();
    range.selectNode(copyFrom);
    window.getSelection().addRange(range);
    var msg = document.execCommand('copy') ? "拷贝完成!" : "拷贝失败";
    tipArea.innerHTML = msg;
    tipArea.classList.remove("disable");
}


/** 设置图标是否高亮*/
function setIcon(flag) {
    if (flag) {
        chrome.browserAction.setIcon({path: "img/32x32.png"});
    } else {
        chrome.browserAction.setIcon({path: "img/32x32-offline.png"});
    }
}

/** 启动时加载项 */
document.addEventListener('DOMContentLoaded', function () {

    //绑定检测按钮事件
    document.querySelector('#check').addEventListener('click', check(
        document.querySelector('#result'),
        document.querySelector('#resultImg'),
        document.querySelector('#tip')
    ));

    //绑定拷贝按钮事件
    document.querySelector('#copyResult').addEventListener('click',
        copyResult(document.querySelector('#result'), document.querySelector('#tip')));

    //点击图标时进行检测
    //chrome.browserAction.onClicked.addListener(check());
});

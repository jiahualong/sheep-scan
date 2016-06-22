/***********************************************************************
 *
 *  获取图片popup.js
 *  stane.jia@gmail.com
 *
 ***********************************************************************
 */
var imagesList = {};
var imagesIndex = 0;

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
                setIconOff();
                log("未检测到图片")
                _resultArea.innerHTML = "";
                _resultImgArea.innerHTML = "";

            } else {
                imagesList = _imagesJSONList;
                setIconOn();
                log("检测完成");

                var i;
                for (i = 0; i < _imagesJSONList.length; i++) {
                    if (window.localStorage[_imagesJSONList[i].url]) {
                    } else {
                        window.localStorage[_imagesJSONList[i].url] = JSON.stringify(_imagesJSONList[i]);
                        _resultArea.innerHTML += _imagesJSONList[i].url + "<br />";
                        _resultImgArea.innerHTML += "<img src='" + _imagesJSONList[i].url + "' /><br />";
                    }
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

    imagesIndex++;
    var title = getTitle();
    // log("下载图片中");
    log(title);
    var url;
    for (url in imagesList) {
        chrome.downloads.download({url: url},
            function (id) {
            });
    }
    // log("下载完成");
}

/**
 * 显示DB内容
 */
function showDB() {
    var db = chrome.extension.getBackgroundPage().db;
    var dbinfo = document.querySelector("#dbinfo");
    if (dbinfo.classList.contains("disable")) {
        dbinfo.innerHTML = JSON.stringify(db);
        dbinfo.classList.remove("disable");
    } else {
        dbinfo.classList.add("disable");
    }
}

/**
 * *************************************************
 * window.storage存储
 * *************************************************
 */
function clearStorage() {
    window.localStorage.clear();
}

function readStorage() {
    var content = [];
    for (var i = 0; i < window.localStorage.length; i++) {
        content.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))));
    }
    document.querySelector('#dbinfo').innerHTML = JSON.stringify(content);
    return content;
}

/** 启动时加载项 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#check').addEventListener('click', check);
    document.querySelector('#copyResult').addEventListener('click', copyResult);
    document.querySelector('#downloadPic').addEventListener('click', downloadPic);
    document.querySelector('#clearStorage').addEventListener('click', clearStorage);
    document.querySelector('#readStorage').addEventListener('click', readStorage);
});


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
            null, {
                file: injectJS,
                allFrames: true
                // frameId: 0,
                // runAt: 'document_start'
                // runAt: 'document_end'
                // runAt: 'document_idle'
            },
            function (r) {
                if (undefined != r && null != r && '' != r) {
                    var rList = r.toString().split(",");
                    for (var i = 0; i < rList.length; i++) {
                        if (rList[i].length > 0) {
                            content.innerHTML += "<li>"
                                + "<img src='" + rList[i] + "' "
                                + ("true" == window.localStorage["isShowPic"] ? " class=''" : " class='disable' ")
                                + "/><span>" + rList[i] + "</span></li>";
                            copy.innerHTML += rList[i] + "<br />";
                        }
                    }
                    showTip(chrome.i18n.getMessage("tipScanFinished"));
                } else {
                    showTip(chrome.i18n.getMessage("tipScanResultEmpty"));
                }
            }
        );
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
    document.querySelector(".tipArea").innerHTML = msg + " ";
}

/**
 * 是否显示图片
 */
function isShowPic() {
    if ("true" == window.localStorage["isShowPic"]) {
        window.localStorage["isShowPic"] = false;
        document.querySelector("#isShowPic").classList.remove("button-primary");
        var imgs = document.querySelectorAll(".content img");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].classList.add("disable");
        }
    } else {
        window.localStorage["isShowPic"] = true;
        document.querySelector("#isShowPic").classList.add("button-primary");
        var imgs = document.querySelectorAll(".content img");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].classList.remove("disable");
        }
    }
}

/**
 * 初始化showPic状态
 */
function initInterface() {
    //isShowPic init
    if ("true" == window.localStorage["isShowPic"]) {
        document.querySelector("#isShowPic").classList.add("button-primary");
    }

    //i18n init
    document.querySelector('.title-word').innerHTML = chrome.i18n.getMessage("pluginName");
    // document.querySelector('#scanPage').setAttribute('value', chrome.i18n.getMessage("buttonCheck"));
    document.querySelector('#copyResult').setAttribute('value', chrome.i18n.getMessage("buttonCopyToClip"));
}

/**
 * 绑定按钮事件
 */
document.addEventListener('DOMContentLoaded', function () {

    initInterface();

    //bind click
    // document.querySelector('#scanPage').addEventListener('click', scanPage);
    document.querySelector('#copyResult').addEventListener('click', copyResult);
    document.querySelector('#isShowPic').addEventListener('click', isShowPic);

    scanPage();
});

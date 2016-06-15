/** 检测图片 */
function check() {
    chrome.tabs.executeScript(null,
        // {code: " document.querySelector('img').getAttribute('src')"},
        // 使用file方式
        {file: "js/getimg.js"},
        function (results) {

            resultDiv = document.querySelector('#result');

            if (results == undefined || results == null || results == '') {
                setIcon(false);
                document.querySelector('#tip').innerHTML = "未检测到图片";
                document.querySelector('#tip').classList.remove("disable");

                resultDiv.innerHTML = "";

            } else {
                setIcon(true);
                document.querySelector('#tip').innerHTML = "";
                document.querySelector('#tip').classList.add("disable");

                for (key in JSON.parse(results)) {
                    resultDiv.innerHTML += key + "<br />";
                }
            }
        });
}

/** 拷贝内容 */
function copyResult() {
    var range = document.createRange();
    range.selectNode(document.querySelector('#result'));
    window.getSelection().addRange(range);
    var msg = document.execCommand('copy') ? "拷贝完成!" : "拷贝失败";
    document.querySelector('#tip').innerHTML = msg;
    document.querySelector('#tip').classList.remove("disable");
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
    //加载时检测
    check();

    //绑定再次检测按钮
    document.querySelector('#check').addEventListener('click', check);

    //绑定拷贝按钮
    document.querySelector('#copyResult').addEventListener('click', copyResult);

    //点击图标时进行检测
    //chrome.browserAction.onClicked.addListener(check());
});

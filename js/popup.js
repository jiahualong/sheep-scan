/** 检测图片 */
function check() {
    chrome.tabs.executeScript(null,
        // {code: " document.querySelector('img').getAttribute('src')"},
        // 使用file方式
        {file: "js/getimg.js"},
        function (results) {
            if (results == '') {
                document.querySelector('#result').innerHTML = "未检测到图片";
                document.querySelector('#result').classList.add("tips");
            } else {
                document.querySelector('#result').classList.remove("tips");
                document.querySelector('#result').innerHTML = results;
            }
        });
    // document.querySelector('#result').innerHTML += s;
}

/** 启动时加载项 */
document.addEventListener('DOMContentLoaded', function () {
    //加载时检测
    check();

    //绑定再次检测按钮
    document.querySelector('#check').addEventListener('click', check);

    //点击图标时进行检测
    //chrome.browserAction.onClicked.addListener(check());
});

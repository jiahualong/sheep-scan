/***************************************************************
 *
 * db.json
 * 用来保存db信息
 * db sample
 * ------------------------------------------------------------
 { "data": [
  {"url": "http://www.google.com", "isDownloadFinished": false, "downloadDir": "google/"},
  {"url": "http://www.flickr.com", "isDownloadFinished": false, "downloadDir": "flickr/"}
  ]};
 * ------------------------------------------------------------
 //添加新条目
 var _tmpUrl = "http://www.hello.com";
 var _tmpDir = "hello";
 db = addUrlData(genUrlData(_tmpUrl, false, _tmpDir), db);

 printData(db);
 */

var DBFun = {

    //向DB中添加新的URL
    addUrlData: function (urlData, db) {
        if (null == this.getItemFromDBByUrl(urlData.url, db)) {
            console.log("not get it !");
            db.data.push(urlData);
        }
        console.log("get it!");
        return db;
    },

    //通过url/dir生成URLJSONObject, {{url: *, isDownload: *, downloadDir: string}}
    genUrlData: function (url, isDownloadFinished, dir) {
        return {"url": url, "isDownloadFinished": isDownloadFinished, "downloadDir": dir};
    },

    //从URL中获取参数
    getItemFromDBByUrl: function (url, db) {
        var i;
        for (i = 0; i < db.data.length; i++) {
            if (db.data[i].url == url) {
                return db.data[i];
            }
        }
        return null;
    },

    // 打印JSON
    printData: function (db) {
        var i;
        for (i = 0; i < db.data.length; i++) {
            console.log(db.data[i])
        }
        console.log(db.data.length);
    }
}


var config = require('config.js').config;
var md5 = require('md5.js');

/**
 * GET 请求
 */
function Get(url, data, loadingText) {
    return new Promise((resolve, reject) => {
        // 验证登录
        if (config.isLogin.indexOf(url) != -1 && checkIsLogin()) return;
        wx.showNavigationBarLoading();
        if (config.loading.indexOf(url) != -1 || loadingText != undefined) {
            loading(loadingText || '加载中');
        }
        data = data || {};
        url = config.ApiUrl[url];
        data.token = wx.getStorageSync('token');
        wx.request({
            method: 'GET',
            url: getHost() + url,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                // statusCode表示网络数据
                if (res.statusCode == 200 && res.data.header.code == '000') {
                    resolve(res.data)
                } else {
                    var resultMsg = res.data.header.message;
                    wx.showModal({
                        title: '温馨提示',
                        content: resultMsg,
                        confirmText: '知道了',
                        showCancel: false
                    })
                    reject(res.data)
                }
            },
            fail: err => {
                reject(err)
            },
            complete: (res) => {
                if (res.statusCode == 200 && res.data.header.code == '000') {
                    if (config.Debug) {
                        console.log(res);
                    }
                    if (config.Debug && res.data) {
                        console.log(res);
                    }
                }
                wx.hideNavigationBarLoading();
                wx.hideLoading();
            }
        });
    })
};

/**
 * POST 请求
 */
function Post(url, data, loadingText) {
    return new Promise((resolve, reject) => {
        // 验证登录
        if (config.isLogin.indexOf(url) != -1 && checkIsLogin()) return;
        loading(loadingText);
        url = config.ApiUrl[url];
        wx.showNavigationBarLoading();
        data = data || {};
        data.token = wx.getStorageSync('token');
        wx.request({
            method: 'POST',
            url: getHost() + url,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
                // statusCode表示网络数据
                if (res.statusCode == 200 && res.data.header.code == '000') {
                    resolve(res.data)
                } else {
                    var resultMsg = res.data.header.message;
                    wx.showModal({
                        title: '温馨提示',
                        content: resultMsg,
                        confirmText: '知道了',
                        showCancel: false
                    })
                    reject(res.data)
                }
            },
            fail: err => {
                console.log(err)
                reject(err)
            },
            complete: (res) => {
                if (res.statusCode == 200 && res.data.header.code == '000') {
                    if (config.Debug) {
                        console.log(res);
                    }
                    if (config.Debug && res.data) {
                        console.log(res);
                    }
                }
                wx.hideNavigationBarLoading();
                wx.hideLoading();
            }
        });
    })
};


/**
 * 批量上传
 */
function BatchUpload(url, files, data, cb,fail) {
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = files.length; //总共个数
    var i = 0; //第几个
    var _uploadFileStr = new Array();
    url = config.ApiUrl[url];
    if (files && files.length > 0) {
        SingleUpload(url, files, successUp, failUp, i, length, data, cb,fail,_uploadFileStr);
    } else {
        typeof cb == "function" && cb(files, "");
    }
}

/**
 * 函数描述：作为上传文件时递归上传的函数体；
 * 参数描述：
 *  filePaths是文件路径数组
 *  successUp是成功上传的个数
 *  failUp是上传失败的个数
 *  i是文件路径数组的指标
 *  length是文件路径数组的长度
 *  data 提交参数
 *  cb 回调函数
 */
function SingleUpload(url, filePaths, successUp, failUp, i, length, data, cb, fail, _uploadFileStr) {
    console.log(_uploadFileStr.length)
    wx.uploadFile({
        url: getHost() + url,
        filePath: filePaths[i],
        name: 'wxUploadFile',
        formData: {
            fileData: filePaths[i],
        },
        header: {
            "content-type": "multipart/form-data"
        },
        success: (resp) => {

            if (typeof resp.data == 'string') {
                resp = JSON.parse(resp.data)
            }
            if (resp.header.code == '000') {
                successUp++;
                if (resp.rows != '' && resp.rows != null && resp.rows != undefined && resp.rows.length != 0) {
                    _uploadFileStr.push(resp.rows[0]);
                }
            }
        },
        complete: (res) => {
            if (res.statusCode != 200) {
                failUp++;
                typeof fail == "function" && fail(res, "");
                return
            }
            if (typeof res.data == 'string') {
                res = JSON.parse(res.data)
            }
            if (res.header.code == '000') {
                i++;
                if (i == length) {
                    if (config.Debug) {
                        console.log('总共' + length + '张,' + successUp + '张上传成功,' + failUp + '张上传失败！');
                    }
                    typeof cb == "function" && cb(_uploadFileStr, "");
                } else { //递归调用uploadDIY函数
                    SingleUpload(url, filePaths, successUp, failUp, i, length, data, cb, fail,_uploadFileStr);
                }
            }
        },
    });
}


/**
 * 加载中
 */

function loading(text) {
    wx.showLoading({
        title: text
    })
}


/**
 * 验证登录
 */
function checkIsLogin() {
    if (wx.getStorageSync('token') == '' || wx.getStorageSync('token') == undefined) {
        isLogin()
        return true;
    }
    return false;
}


/**
 * 登录验证通过执行登录
 */

function isLogin() {
    wx.showModal({
        content: '您还未登录，是否立即登录',
        confirmText: '立即登录',
        success: res => {
            if (res.confirm) {
                wx.navigateTo({
                    url: '/pages/login/login',
                })
            }
            if (res.cancel && getCurrentPages().length > 1) {
                wx.navigateBack()
            }
        }
    })
}



/**
 * 获取请求链接
 */
function getHost() {
    // 当前小程序版本号
    let version = __wxConfig.envVersion;
    let platform = __wxConfig.platform;

    switch (version) {
        case 'develop':
            return config.HttpTestRequest; //开发版
            break;
        case 'trial':
            return config.HttpRequest; //体验版
            break;
        case 'release':
            return config.HttpRequest; //正式版
            break;
        default: {
            if (platform == 'devtools') {
                return config.HttpTestRequest; //体验版
            } else {
                return config.HttpRequest; //正式版
            }
            break;
        }
    }
}

module.exports = {
    httpGet: Get,
    httpPost: Post,
    httpBatchUpload: BatchUpload,
};
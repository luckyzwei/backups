// 接口请求JS
// 引用日志输出
var output = require('../tool/output.js')

//不带code msg的接口请求工具
function request_data(url, data, success, fail, complete) {
  output.log("网络请求的地址：" + url);
  output.log("传过来的参数：");
  output.log(data);
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
    },
    method: 'GET',
    data: data,
    //请求成功
    success: function (res) {
      output.log("网络请求返回的数据：");
      output.log(res);
      if (res.data.errCode == 0) {
        output.log("接口请求成功返回的数据:");
        output.log(res.data.data);
        success(res.data.data);
      } else if (res.data.errCode == 10002) {
        //储存token
        try {
          wx.setStorageSync('token', '')
        } catch (e) {

        }
        fail('登录失效请重新登录');
      } else if (res.data.errCode == 606002) {
        fail(606002);
      } else {
        fail(res.data.errMsg ? res.data.errMsg : 1);
      }
    },
    //请求失败
    fail: function (res) {
      output.log("网络请求失败返回的数据：");
      output.log(res);
      fail(1);
    },
    //请求结束
    complete: function (res) {
      complete(res);
    }
  });
};

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
};


//建立调用
module.exports = {
  request_data: request_data,
}
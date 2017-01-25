//app.js
App({
  getUserInfo: function (cb) {
    var that = this

    //var userInfo = wx.getStorage("UserInfo")
    //if (!userInfo) {
    //调用登录接口
    wx.login({
      success: function (data) {
        if (data.code) {
          wx.getUserInfo({
            success: function (res) {
              wx.showToast({
                title: '登录中，请稍后...',
                icon: 'loading',
                duration: 10000
              })

              //请求用户报道接口
              wx.request({
                url: 'https://api.fjhankun.com/api/XSM/UserReport',
                data: {
                  signature: res["signature"],
                  raw_data: res["rawData"],
                  code: data.code
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (userInfo) {
                  if (userInfo.data.result == "1") {
                    var userInfo = JSON.parse(userInfo.data.data)

                    //本地存储UserID
                    wx.setStorage({
                      key: "UserInfo",
                      data: userInfo
                    })
                  }

                  setTimeout(function () {
                    wx.hideToast()
                  }, 2000)

                  that.globalData.userInfo = userInfo
                  typeof cb == "function" && cb(userInfo)
                }
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '无法获取用户信息',
            duration: 2000
          })
        }
      },
      fail: function () {

      }
    })
    //}
    //else{
    //  that.globalData.userInfo=userInfo
    //}
  },
  globalData: {
    userInfo: null
  }
})


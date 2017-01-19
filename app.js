//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this

    var userInfo = wx.getStorageSync("UserInfo")
    if (!userInfo) {
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

                typeof cb == "function" && cb(that.globalData.userInfo)

                //请求用户报道接口
                wx.request({
                  url: 'http://localhost:5454/api/XSM/UserReport',
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
    }

    if (userInfo.Role == 0) {
      //wx.switchTab({
      //  url: '/pages/admin/admin'
      //})
    }
  },
  globalData: {
    userInfo: null
  }
})


//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  
  onLoad: function () {
    var userInfo = wx.getStorageSync("UserInfo")

    this.setData({
        userInfo:userInfo
      })
    console.log('onLoad')
    var that = this
  }
})
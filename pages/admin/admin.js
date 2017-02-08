
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindStore: function() {
    wx.navigateTo({
      url: '../admin/admin_store/admin_store'
    })
  },
  //事件处理函数
  bindUserManage: function() {
    wx.navigateTo({
      url: '../admin/admin_user/admin_user'
    })
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
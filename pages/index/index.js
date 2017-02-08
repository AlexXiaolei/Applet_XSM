//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {}
    },
    bindFill: function (e) {
        wx.navigateTo({
            url: 'fill/fill?userid=' + e.currentTarget.dataset.userid
        })
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (cbUserInfo) {
            //更新数据
            that.setData({
                userInfo: cbUserInfo
            })
        })
    }
})
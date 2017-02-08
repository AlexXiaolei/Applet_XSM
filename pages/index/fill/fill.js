var config = require("../../../config.js")
var app = getApp()
Page({
    data: {
        userInfo: []
    },
    formSubmit: function (e) {
        var formData = e.detail.value

        var userName = formData.UserName
        var userTel = formData.UserTel
        var userID = formData.UserID

        wx.showToast({
            title: '保存信息中...',
            icon: 'loading',
            duration: 10000
        })

        wx.request({
            url: config.domain + '/api/XSM/UserPerfect',
            data: {
                user_id: userID,
                user_name: userName,
                user_tel: userTel
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (cbuserInfo) {
                if (cbuserInfo.data.result == "1") {
                    var userInfo = JSON.parse(cbuserInfo.data.data)

                    //本地存储UserID
                    wx.setStorage({
                        key: "UserInfo",
                        data: userInfo
                    })

                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000)

                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        })
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        var userInfo = wx.getStorageSync("UserInfo")

        this.setData({
            userInfo: userInfo
        })
    },
    onPullDownRefresh: function () {
        var that = this

        GetData(that)

        wx.stopPullDownRefresh()
    },
})
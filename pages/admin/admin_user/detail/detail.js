var config = require("../../../../config.js")

Page({
    data: {
        user_info: [],
        role_list: [
            {
                id: 0,
                name: '普通客户'
            },
            {
                id: 1,
                name: '管理员'
            },
            {
                id: 2,
                name: '超级管理员'
            }
        ]
    },
    formSubmit: function (e) {
        var formData = e.detail.value
        var userID=formData.UserID
        var userName = formData.UserName
        var userTel = formData.UserTel
        var role = formData.SelectRole

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
                user_tel: userTel,
                role:role
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (cbuserInfo) {
                if (cbuserInfo.data.result == "1") {
                    var userInfo = JSON.parse(cbuserInfo.data.data)

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
    onLoad: function (options) {
        var that = this

        wx.showToast({
            title: '查询客户信息中，请稍后...',
            icon: 'loading',
            duration: 10000
        })

        wx.request({
            url: config.domain + '/api/XSM/GetUserInfo',
            data: {
                user_id: options.user_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (cbUserInfo) {
                if (cbUserInfo.data.result == "1") {
                    var userInfo = JSON.parse(cbUserInfo.data.data)

                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000)

                    that.setData({
                        user_info: userInfo
                    })
                }
            }
        })
    }
})
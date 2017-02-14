var config = require("../../../config.js")

Page({
    data: {
        user_list: []
    },
    bindUserManage: function (e) {
        wx.navigateTo({
            url: 'detail/detail?user_id=' + e.currentTarget.dataset.userid
        })
    },
    bindUserItem: function (e) {
        wx.navigateTo({
            url: 'consume/consume?user_id=' + e.currentTarget.dataset.userid
        })
    },
    bindUserLog: function (e) {
        wx.navigateTo({
            url: '../admin_detail/admin_detail?user_id=' + e.currentTarget.dataset.userid
        })
    },
    onLoad: function () {
        var that = this

        wx.showToast({
            title: '查询客户资料中，请稍后...',
            icon: 'loading',
            duration: 10000
        })

        GetData(that)
    },
    onPullDownRefresh: function () {
        var that = this

        GetData(that)

        wx.stopPullDownRefresh()
    },
})

function GetData(that) {
    wx.request({
        url: config.domain + '/api/XSM/GetUserList',
        data: {
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (cbuserInfo) {
            if (cbuserInfo.data.result == "1") {
                var userList = JSON.parse(cbuserInfo.data.data)

                setTimeout(function () {
                    wx.hideToast()
                }, 2000)

                that.setData({
                    user_list: userList
                })
            }
        }
    })
}
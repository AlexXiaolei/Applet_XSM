var config = require("../../../config.js")

Page({
    data: {
        store_list: []
    },
    bindAddStore: function () {
        wx.navigateTo({
            url: 'detail/detail?optype=1'
        })
    },
    bindEditStore: function (e) {
        wx.navigateTo({
            url: 'detail/detail?optype=2&store_id=' + e.currentTarget.dataset.id
        })
    },
    onLoad: function () {
        var that = this
        var userInfo = wx.getStorageSync("UserInfo")

        this.setData({
            userInfo: userInfo
        })

        wx.showToast({
            title: '查询门店中，请稍后...',
            icon: 'loading',
            duration: 10000
        })

        wx.request({
            url: config.domain + '/api/XSM/GetStore',
            data: {
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (storeInfo) {
                if (storeInfo.data.result == "1") {
                    var storeList = JSON.parse(storeInfo.data.data)

                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000)

                    that.setData({
                        store_list: storeList
                    })
                }
            }
        })
    }
})
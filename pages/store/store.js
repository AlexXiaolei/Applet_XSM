var config = require("../../config.js")

//获取应用实例
var app = getApp()
Page({
    data: {
        store_list: []
    },
    onLoad: function () {
        var that = this

        wx.showToast({
            title: '查询门店中，请稍后...',
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
    bindCall: function (e) {
        var tel = e.currentTarget.dataset.tel

        wx.makePhoneCall({
            phoneNumber: tel //仅为示例，并非真实的电话号码
        })
    }
})

function GetData(that) {
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
                    that.setData({
                        hasMore: false
                    })
                }, 2000)

                that.setData({
                    store_list: storeList
                })




            }
        }
    })
}
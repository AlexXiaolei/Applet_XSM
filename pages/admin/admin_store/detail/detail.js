var config = require("../../../../config.js")

Page({
    data: {
        store_info: {}
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    onLoad: function (options) {
        var that = this
        if (options.optype == 2 && options.store_id) {
            wx.showToast({
                title: '获取门店信息中...',
                icon: 'loading',
                duration: 10000
            })
            wx.request({
                url: config.domain + '/api/XSM/GetStore',
                data: {
                    store_id: options.store_id
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

                        if (storeList.length > 0) {
                            that.setData({
                                store_info: storeList[0]
                            })
                        }
                    }
                }
            })
        }
    }
})
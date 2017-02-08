var config = require("../../../../config.js")

Page({
    data: {
        store_info: {}
    },
    formSubmit: function (e) {
        var formData = e.detail.value

        if (!formData.store_name || !formData.store_address || !formData.store_tel) {
            wx.showModal({
                title: '不要偷懒',
                content: '请将信息填写完整！',
                showCancel: false
            })
            return
        }
        var store_id = ""

        if (formData.store_id) {
            store_id = formData.store_id
        }

        var store_name = formData.store_name

        var store_address = formData.store_address

        var store_tel = formData.store_tel

        var store_remark = ""

        if (formData.store_remark) {
            store_remark = formData.store_remark
        }

        wx.showToast({
            title: '保存门店信息中...',
            icon: 'loading',
            duration: 10000
        })

        if (!store_id) {
            wx.request({
                url: config.domain + '/api/XSM/AddStore',
                data: {
                    store_name: store_name,
                    store_address: store_address,
                    store_tel: store_tel,
                    remark: store_remark,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (storeInfo) {
                    if (storeInfo.data.result == "1") {

                        setTimeout(function () {
                            wx.hideToast()
                        }, 2000)

                        wx.navigateBack({
                            delta: 2
                        })
                    }
                }
            })
        }
        else {
            wx.request({
                url: config.domain + '/api/XSM/UpdateStore',
                data: {
                    store_id: store_id,
                    store_name: store_name,
                    store_address: store_address,
                    store_tel: store_tel,
                    remark: store_remark,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (storeInfo) {
                    if (storeInfo.data.result == "1") {

                        setTimeout(function () {
                            wx.hideToast()
                        }, 2000)

                        wx.navigateBack({
                            delta: 2
                        })
                    }
                }
            })
        }
    },
    bindDelete: function (e) {
        var store_id = e.currentTarget.dataset.id

        wx.showToast({
            title: '删除门店信息中...',
            icon: 'loading',
            duration: 10000
        })

        wx.request({
            url: config.domain + '/api/XSM/DeleteStore',
            data: {
                store_id: store_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (storeInfo) {
                if (storeInfo.data.result == "1") {

                    setTimeout(function () {
                        wx.hideToast()
                    }, 2000)

                    wx.navigateBack({
                            delta: 2
                        })
                    
                    
                }
            }
        })
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
var config = require("../../../../config.js")

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2010; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}

Page({
    data: {
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        year: date.getFullYear(),
        time: [7, 0, 0],
        userInfo: {}
    },
    BindSave: function (e) {
        var formData = e.detail.value
        var opType = formData.OpType
        var opCount = formData.OpCount
        var opUnit = formData.OpUnit
        var remark = formData.Remark
        var userId = formData.UserID
        var opTimeArray = formData.OpTime
        var year = 2010 + opTimeArray[0]
        var month = 1 + opTimeArray[1]
        var day = 1 + opTimeArray[2]
        var opTime = year.toString() + "-" + month.toString() + "-" + day.toString() + " 00:00:00"
        var userInfo = wx.getStorageSync("UserInfo")

        wx.showToast({
            title: '添加消费记录中，请稍后...',
            icon: 'loading',
            duration: 10000
        })

        wx.request({
            url: config.domain + '/api/XSM/AddUserItem',
            data: {
                user_id: userInfo.ID,
                customer_id: userId,
                item_name: opType,
                op_count: opCount,
                op_unit: opUnit,
                op_time: opTime,
                remark: remark
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
                        delta: 1
                    })
                }
            }
        })

    },
    onLoad: function (options) {
        var that = this

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
                        userInfo: userInfo
                    })
                }
            }
        })
    },
    bindChange: function (e) {
        const val = e.detail.value
        this.setData({
            time: val
        })
    }

})
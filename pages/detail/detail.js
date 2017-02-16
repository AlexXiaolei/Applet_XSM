var config = require("../../config.js")

Page({
    data: {
        item_list: []
    },
    onLoad: function () {
        var that = this

        var userInfo = wx.getStorageSync("UserInfo")

        var userID = userInfo.ID

        //本地存储UserID
        wx.setStorage({
            key: "Detail-UserId",
            data: userID
        })

        wx.showToast({
            title: '正在查询您的消费记录，请稍后...',
            icon: 'loading',
            duration: 10000
        })

        GetData(that, userID)
    },
    onPullDownRefresh: function (e) {
        var that = this

        GetData(that)

        wx.stopPullDownRefresh()
    },
})

function GetData(that, userID) {
    if(!userID){
        userID = wx.getStorageSync("Detail-UserId")
    }

    wx.request({
        url: config.domain + '/api/XSM/GetUserItemLog',
        data: {
            user_id: userID
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (itemInfo) {
            if (itemInfo.data.result == "1") {
                var itemList = JSON.parse(itemInfo.data.data)

                for (var i = 0; i < itemList.length; i++) {
                    itemList[i].OpTime = itemList[i].OpTime.substring(0, 10)
                }

                setTimeout(function () {
                    wx.hideToast()
                }, 2000)

                that.setData({
                    item_list: itemList
                })
            }
        }
    })
}
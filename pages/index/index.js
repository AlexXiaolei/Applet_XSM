//获取应用实例
var app = getApp()
Page({
    data: {
        userInfo: {},
        hello: ''
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

        var now = new Date()

        var hour = now.getHours()

        var helloValue = ""

        if (hour < 9) { helloValue = "早上好。" }
        else if (hour < 12) { helloValue = "上午好。" }
        else if (hour < 14) { helloValue = "中午好。" }
        else if (hour < 17) { helloValue = "下午好。" }
        else if (hour < 19) { helloValue = "傍晚好。" }
        else if (hour < 22) { helloValue = "晚上好。" }
        else { helloValue = "夜深了，亲请注意休息。" }

        that.setData({
            hello: helloValue
        })
    }
})
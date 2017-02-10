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
    },
    BindSave: function (e) {
        var formData = e.detail.value

    },
    onLoad: function (options) {
        var that = this


    },
    bindChange: function (e) {
        const val = e.detail.value
        this.setData({
            time:val
        })
    }

})
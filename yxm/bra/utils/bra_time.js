Date.prototype.Format = function (n) {
    var i = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "W+": ["日", "一", "二", "三", "四", "五", "六"][this.getDay()],
        "w+": this.getDay() + 1,
        "H+": this.getHours(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        f: this.getMilliseconds(),
        S: this.getMilliseconds()
    }, t;
    /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
    return n
};
Date.prototype.AddDate = function (n) {
    var t = this, i, r;
    return t.setDate(t.getDate() + n), i = t.getMonth() + 1, r = t.getDate(), i < 10 && (i = "0" + i), r < 10 && (r = "0" + r), t
};
Date.prototype.AddDay = function (n) {
    var t = this, i, r;
    return t.setDate(t.getDate() + n), i = t.getMonth() + 1, r = t.getDate(), i < 10 && (i = "0" + i), r < 10 && (r = "0" + r), t.getFullYear() + "-" + i + "-" + r
};
Date.prototype.NextDay = function (n) {
    var t = this;
    return this.setDate(this.getDate() + n), this.getDate()
};


var bra_time = {

    getDateArray: function (endDate, splitTime, count) {
        if (!endDate) {
            endDate = new Date();
        }
        if (!splitTime) {
            splitTime = 5 * 60 * 1000;
        }
        if (!count) {
            count = 12;
        }
        var endTime = endDate.getTime();
        var mod = endTime % splitTime;
        if (mod > 0) {
            endTime -= mod;
        }
        var dateArray = [];
        while (count-- > 0) {
            var d = new Date();
            d.setTime(endTime - count * splitTime);
            dateArray.push(d);
        }
        return dateArray;
    },


    /**
     * 获取酒店入住时间段
     * @param end_time
     * @param minutes
     * @returns {[]}
     */
    get_house_arr: function (start_time, end_time, minutes, start_hour = 14, next_stop_hour = 6) {

        start_time = new Date(start_time);
        let array = [];
        //不是今天
        if (start_time.getDate() != new Date().getDate()) {
            console.log('not today')

        } else {
            var now_hour =  new Date().getHours();
            start_hour = now_hour > start_hour ? start_hour : start_hour;
            console.log(' today', start_time.getDate(), new Date().getDate())
        }

        for (var hour = 1; hour <= 23; hour++) {
            console.log(start_hour < hour);
            if (start_hour <= hour) {
                array.push({
                    hour: hour,
                    text: hour + ':00'
                });
            }

        }

        for (var hour = 0; hour <= next_stop_hour; hour++) {
            array.push({
                hour: '+' + hour,
                text: '次日 0' + hour + ':00'
            });
        }
        return array;
    }

};


export default bra_time;

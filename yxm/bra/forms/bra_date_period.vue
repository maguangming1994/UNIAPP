<template>
    <div class="calendar-tz" id="calendarTz">
        <!-- week -->
        <div class="calendar-header has-text-centered" style="background-color:#f0f8ff">
            <div class="columns is-mobile is-marginless padded">
                <div class="column">请选择入驻离店日期</div>
                <div class="column is-narrow">
                    <div class="bra-btn mini orange" @click="emitFuc">完成</div>
                </div>
            </div>
            <slot name="top"></slot>
            <div class="week-number columns is-mobile is-marginless">
				<span :key="item" class="column" v-for="(item,index) in language=='cn' ? weekList : weekListEn">
					<p :style="{color:(index==0||index==weekList.length-1)?getThemeColor:''}">{{item}}</p>
				</span>
            </div>
        </div>

        <!-- data -->
        <div :style="{paddingTop:paddindTop+'px',height:height}" class="ti" id="ti">
            <div :key="index" class="calendar-wrapper" v-for="(item,index) in calendar">

                <!--current month-->
                <div :style="{color:getThemeColor}" class="calendar-title flex" v-if="language=='cn'">

                    <div class="flex-1">{{item.year}} 年 {{item.month}} 月</div>
                </div>
                <div :style="{color:getThemeColor}" class="calendar-title flex" v-else>
                    <div class="flex-1">{{monthEn[item.month-1]}} {{item.year}}</div>
                </div>

                <!-- 日期渲染 -->
                <div class="each-month">
                    <div :class="[getClassName(day, item.month, item.year),{'clicktime': isCurrent(day, item.month,
                    item.year)}]" :key="idx" :style="{background:getStyle(day, item.month, item.year)}"
                        @click="chooseDate($event,day, item.month, item.year)"
                        class="each-day"
                        v-for="(day,idx) in item.dayList">
                        <div :data-date="item.year + '-' + item.month + '-'+ day" class="recent date-tips">
                            <span>
                                {{setTip(day, item.month, item.year)}}
                            </span>
                        </div>
                        <div class="date-no" :class="{'active' : isCurrent(day, item.month, item.year)}">
                            {{!!day?day:''}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>

</template>

<script>
    let {
        keys,
        values,
        entries
    } = Object;
    export default {
        props: {

            startDate: { //开始日期
                type: [String, Object],
                default: ''
            },
            endDate: { //结束日期
                type: [String, Object, Date],
                default: ''
            },
            disabledList: { //设定不允许点击的日期
                type: [Array, Object],
                default: function () {
                    return []
                }
            },
            initMonthCount: { //初始化月的个数
                type: [String, Number],
                default: 6
            },
            initPreMonthCount: { //初始化date或者startDate之前几个月的日历数据
                type: [String, Number],
                default: 0
            },
            mode: { //模式（默认1），1酒店，2飞机往返
                type: [String, Number],
                default: 1
            },
            switchMonth: { //是否开始切换月份模式
                type: [String, Boolean],
                default: false
            },
            preDisabled: { //小于初始的日期的全部disabled置灰
                type: Boolean,
                default: false
            },
            allAbled: { //全部日期都可选
                type: [String, Boolean],
                default: false
            },
            lang: {
                type: [String],
                default: 'cn'
            },
            getThemeColor: {
                type: [String, Object, Date],
                default: '#415FFB'
            },
            getBetweenColor: {
                type: [String, Object, Date],
                default: '#afd5fb'
            }
        },
        data() {
            return {
                paddindTop: '86',
                height: '100vh',
                picked_end_date: '',
                picked_start_date: '',
                month_count: '',
                dates: '',
                cur_month_idx: 0, //当前月的索引，switchMonth=true时使用
                selectPrice: [], //保存选择的日期所在的价格
                language: this.lang.toLocaleLowerCase(),
                weekList: ['日', '一', '二', '三', '四', '五', '六'],
                weekListEn: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthEn: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                    'November'
                ],
                calendar: [],
                festival: {
                    '2019': {
                        "2019/6/1": "儿童节",
                        "2019/6/7": "端午",
                        "2019/7/1": "建党节",
                        "2019/8/1": "建军节",
                        "2019/8/7": "七夕",
                        "2019/9/10": "教师节",
                        "2019/9/13": "中秋",
                        "2019/10/1": "国庆",
                        "2019/10/28": "重阳",
                        "2019/10/22": "感恩节",
                        "2019/12/24": "平安夜",
                        "2019/12/25": "圣诞",
                        "2020/1/1": "元旦"
                    },
                    '2020': {
                        "2020/1/1": "元旦",
                        "2020/1/17": "小年",
                        "2020/1/24": "除夕",
                        "2020/1/25": "春节",
                        "2020/2/8": "元宵",
                        "2020/2/14": "情人节",
                        "2020/3/8": "妇女节",
                        "2020/3/12": "植树节",
                        "2020/4/1": "愚人节",
                        "2020/4/4": "清明节",
                        "2020/5/1": "劳动节",
                        "2020/5/10": "母亲节",
                        "2020/6/1": "儿童节",
                        "2020/6/21": "父亲节",
                        "2020/6/25": "端午节",
                        "2020/7/1": "建党节",
                        "2020/8/1": "建军节",
                        "2020/8/25": "七夕",
                        "2020/9/10": "教师节",
                        "2020/10/1": "国庆中秋",
                        "2020/10/25": "重阳节",
                        "2020/11/26": "感恩节",
                        "2020/12/24": "平安夜",
                        "2020/12/25": "圣诞节",
                        "2021/1/1": "元旦"
                    }
                },
                picked: {
                    startDateTime: "",
                    endDateTime: '',
                    startDate: '',
                    endDate: '',
                    startDateStr: '',
                    endDateStr: '',
                    startRecent: '',
                    endRecent: '',
                    countDays: ''
                }
            }
        },

        watch : {
            picked : function (new_picked) {
                console.log(new_picked)
            }
        },
        methods: {
            create_calendar(flag = null) {

                if (parseInt(this.initPreMonthCount) > 0) {
                    this.initPreMonth() //如果初始化startDate之前月份数据
                }

                for (let i = 0; i < this.month_count; i++) {

                    let month = this.month + i + this.cur_month_idx,
                        year = this.year,
                        _monthData = {
                            dayList: [],
                            month: '',
                            year: ''
                        };

                    var m = Math.ceil(month / 12);
                    if (m > 0) {
                        year += m - 1
                    } else {
                        year += m - 1
                    }
                    if (month > 12) {
                        month = month % 12 == 0 ? 12 : month % 12;
                    }

                    if (month <= 0) {
                        month = 12 + month % 12
                    }

                    _monthData.year = year;
                    _monthData.month = month;
                    _monthData.dayList = this.create_month_days(month, year);
                    if (this.switchMonth) {
                        this.calendar = []
                    }
                    this.calendar.push(_monthData)
                }
            },
            //初始化date或者startDate之前几个月的日历数据
            initPreMonth() {
                let year = this.year;
                let month = this.month - this.initPreMonthCount;
                var m = Math.ceil(month / 12);
                this.month_count = parseInt(this.monthCount) + parseInt(this.initPreMonthCount);

                if (m > 0) {
                    year += m - 1
                } else {
                    year += m - 1
                }
                if (month > 12) {
                    month = month % 12 == 0 ? 12 : month % 12;
                }

                if (month <= 0) {
                    month = 12 + month % 12
                }
                this.year = year;
                this.month = month
            },
            //创建每个月日历数据，传入月份1号前面用null填充
            create_month_days(month, year) {
                const count = this.get_days_for_month(month, year),
                    _week = new Date(year + '/' + month + '/1').getDay();
                let list = [];
                for (let i = 1; i <= count; i++) {
                    list.push(i)
                }
                for (let i = 0; i < _week; i++) {
                    list.unshift(null)
                }
                return list;
            },
            //计算传入月份有多少天
            get_days_for_month(month, year) {
                let dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                if ((year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)) {
                    dayNum[1] = 29;
                }
                return dayNum[month - 1]
            },
            //获取周末的样式
            getWeekColor(day, month, year) {
                const _date = new Date(year + '/' + month + '/' + day);
                //设置周末的字体样式
                if (_date.getDay() === 0 || _date.getDay() === 6) {
                    return this.getThemeColor
                }
            },
            //添加日历样式
            getClassName(day, month, year) {
                if (!day) {
                    return;
                }
                const _date = new Date(year + '/' + month + '/' + day) * 1;
                let className = [];
                if (_date * 1 === this.today) {
                    className.push('today');
                }
                if (!this.allAbled) {
                    if (this.initPreMonthCount > 0) {
                        var tempDate = new Date(this.year + '/' + this.month + '/01') * 1;
                        if (_date * 1 < tempDate || _date * 1 > this.maxDate) { //当天之前和180天之后不可选
                            className.push('disabled')
                        }
                    } else {
                        if (_date * 1 < this.today || _date * 1 > this.maxDate) { //当天之前和180天之后不可选
                            className.push('disabled')
                        }
                    }
                }
                //设置不允许操作的日期
                if (this.disabledList.length > 0) {
                    var notTemp = this.disabledList.map(item => {
                        return new Date(item) * 1
                    });
                    if ((notTemp).includes(new Date(_date) * 1)) {
                        className.push(' disabled')
                    }
                }

                if (_date * 1 === this.dates * 1) {
                    className.push(' clicktime');
                }
                //preDisabled==true时设置小于disableDate的都disable

                if (this.preDisabled && _date * 1 < this.disableStartDate * 1) {
                    className.push('disabled')
                }

                return className.join(' ');
            },
            getStyle(day, month, year) {
                if (!day || this.date) {
                    return;
                }
                const _date = new Date(year + '/' + month + '/' + day) * 1;
                if (_date >= this.picked_start_date * 1 && _date <= this.picked_end_date * 1) {
                    return this.getBetweenColor
                }
            },
            //设置今天，明天，后天
            setTip(day, month, year) {
                if (!day) {
                    return;
                }
                const _date = new Date(year + '/' + month + '/' + day) * 1;
                const language = this.language.toLocaleLowerCase();

                let tip;

                //设置节假日
                if (!!this.festivalNew && language == "cn") {
                    tip = this.festivalNew[1][year + "/" + month + "/" + day]
                }

                if (_date == this.today) {
                    tip = language == 'cn' ? '今天' : 'Today'
                } else if (_date - this.today === 24 * 3600 * 1000) {
                    tip = language == 'cn' ? '明天' : 'Tmr'
                } else if (_date - this.today === 2 * 24 * 3600 * 1000) {
                    tip = language == 'cn' ? '后天' : ''
                }

                if (this.startDate || this.endDate) {
                    if (_date === this.picked_start_date * 1) {
                        tip = language == 'cn' ? '入住' : 'Into'
                    } else if (_date === this.picked_end_date * 1) {
                        tip = language == 'cn' ? '离开' : 'Leave'
                    }
                }

                return tip;
            },
            isCurrent(day, month, year) {
                if (!day) {
                    return false;
                }

                const _date = new Date(year + '/' + month + '/' + day) * 1;
                //设置开始和结束
                if (_date === this.picked_start_date * 1 || (_date === this.picked_end_date * 1)) {
                    return true
                }
            },
            dateFormat(times) {
                let date = new Date(times);
                return {
                    year: date.getFullYear(),
                    month: parseInt(date.getMonth() + 1) > 9 ? parseInt(date.getMonth() + 1) : '0' + parseInt(date.getMonth() + 1),
                    day: date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
                    week: this.weekList[date.getDay()]
                }
            },
            chooseDate(e, day, month, year) {
                if (!day) {
                    return;
                }

                const _date_time = new Date(year + '/' + month + '/' + day) * 1;
                if (!this.allAbled) {
                    if (this.initPreMonthCount > 0) {
                        var tempDate = new Date(this.year + '/' + this.month + '/01') * 1;
                        if (_date_time < tempDate || _date_time > this.maxDate) { //当天之前和180天之后不可选
                            return
                        }
                    } else {
                        //超出范围之前和之后disable灰色的区域不可点击
                        if (_date_time < this.today || _date_time > this.maxDate) {
                            return;
                        }
                    }
                }

                if (this.preDisabled && _date_time < this.disableStartDate * 1) {
                    return;
                }

                //设置不允许操作的日期
                if (this.disabledList.length > 0) {
                    var notTemp = this.disabledList.map(item => {
                        return new Date(item) * 1
                    });
                    if (notTemp.includes(_date_time)) {
                        return;
                    }
                }


                if (this.picked_end_date * 1 && _date_time > this.picked_end_date * 1) {
                    this.picked_start_date = _date_time;
                    this.picked_end_date = "";
                } else if (this.picked_end_date * 1 && _date_time > this.picked_end_date * 1) {
                    this.picked_end_date = _date_time;
                } else if (_date_time >= this.picked_start_date * 1 && _date_time <= this.picked_end_date * 1) {
                    this.picked_start_date = _date_time;
                    this.picked_end_date = '';
                } else if (_date_time < this.picked_start_date * 1) {
                    this.picked_start_date = _date_time;
                    this.picked_end_date = '';
                } else if (_date_time > this.picked_start_date * 1) {
                    this.picked_end_date = _date_time;
                }

            },
            //返回recent
            setRecent(_date, choose, recent) {
                if (_date == this.today) {
                    choose[recent] = '今天'
                } else if (_date - this.today == 24 * 3600 * 1000) {
                    choose[recent] = '明天'
                } else if (_date - this.today == 2 * 24 * 3600 * 1000) {
                    choose[recent] = '后天'
                }
            },
            //
            emitFuc( ) {
                if(this.picked_start_date && this.picked_end_date){
                    this.setRecent(this.picked_start_date, this.picked, 'startRecent');
                    this.setRecent(this.picked_end_date, this.picked, 'endRecent')

                    const startDateChoose = this.dateFormat(this.picked_start_date);
                    const endDateChoose = this.dateFormat(this.picked_end_date);
                    const startDateStr = startDateChoose.year + "-" + startDateChoose.month + "-" + startDateChoose.day;
                    const endDateStr = endDateChoose.year + "-" + endDateChoose.month + "-" + endDateChoose.day;
                    this.picked = {
                        startDateTime: this.picked_start_date,
                        endDateTime: this.picked_end_date,
                        startDate: startDateChoose,
                        endDate: endDateChoose,
                        startDateStr: startDateStr,
                        endDateStr: endDateStr,
                        startRecent: '',
                        endRecent: '',
                        countDays: (this.picked_end_date * 1 - this.picked_start_date * 1) / 86400 / 1000
                    };
                    this.$emit("callback", this.picked);
                }
                this.$set(this , 'calendar' , this.calendar);
            }
        },

        created: function () {
            //初始化月的个数
            this.month_count = this.initMonthCount;

            if (this.startDate) {
                this.picked_start_date = this.disableStartDate = new Date(this.startDate.replace(/-/g, '/'))
            }
            if (this.endDate) {
                this.picked_end_date = new Date(this.endDate.replace(/-/g, '/'))
            }

            this.today = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' +
                new Date().getDate()) * 1;


            //最后可以选择的日期范围
            this.maxDate = this.today + this.month_count * 30 * 24 * 3600 * 1000;

            if (this.startDate) {
                this.year = new Date(this.dates * 1 || this.picked_start_date * 1).getFullYear();
                this.month = new Date(this.dates * 1 || this.picked_start_date * 1).getMonth() + 1;
            } else {
                this.year = new Date().getFullYear();
                this.month = new Date().getMonth() + 1;
            }

            this.festivalNew = entries(this.festival).find((item, index) => {
                return item[index] == this.year
            });

            this.create_calendar(); //创建日历数据
            this.emitFuc();
        }
    }
</script>

<style scoped>
    div,
    ul,
    li,
    p,
    span,
    i,
    b,
    a{
        font-size:14px;
    }
    .flex{
        justify-content:space-between;
        display:-webkit-box;
        display:flex;
        box-sizing:border-box;
    }
    .flex-1{
        width:100%;
        -webkit-box-flex:1;
        flex:1;
    }
    .calendar-tz{
        width:100%;
        height:100%;
        background:#fff;
        position:relative;
        overflow-y:scroll;
        z-index:9;
    }
    .calendar-tz:-webkit-scrollbar{
        display:none
    }
    .calendar-tz .ti{
        font-size:16px;
        padding-top:44px;
        overflow-y:auto;
    }
    .calendar-tz .ti:-webkit-scrollbar{
        display:none
    }
    .calendar-header{
        position:fixed;
        width:100%;
        left:0;
        z-index:9;
        box-shadow:0 2px 15px rgba(100, 100, 100, 0.1);
    }
    .calendar-header .week-number{
        background:#fff;
        width:100%;display:flex;
    }
    .calendar-header .week-number span{
        display:inline-block;
        text-align:center;
        height:40px;
        line-height:40px;
        width:14.28%;
        font-size:16px;
        color:#333;
    }
    .calendar-wrapper .calendar-title{
        text-align:center;
        line-height:50px;
        height:50px;
        margin:10px 0 0;
    }
    .calendar-wrapper .calendar-title span{
        font-size:12px;
        padding:0 20px;
    }
    .calendar-wrapper .calendar-title div{
        color:#333;
        font-size:16px;
        font-weight:400;
    }
    .calendar-wrapper .each-month{
        display:inline-block;
        width:98%;
        margin-left:1%;
        padding-bottom:10px;
        font-size:0;
        border-bottom:1px solid #F4F4F4;
    }
    .calendar-wrapper .each-month .each-day{
        position:relative;
        display:inline-block;
        text-align:center;
        vertical-align:bottom;
        padding:2px 0;
        width:14.28%;
        font-size:16px;
        height:55px;
        color:#333;
    }
    .calendar-wrapper .each-month .each-day .date-no{
        border-radius:4px;
        vertical-align:8px;
        display:inline-block;
        height:32px;
        width:32px;
        line-height:32px;
    }
    .calendar-wrapper .each-month .each-day .recent{
        font-size:12px;
        color:#415FFB;
        height:18px;
        line-height:18px;
        text-align:center;
        width:100%;
    }
    .calendar-wrapper .each-month .each-day.clicktime .date-tips{
        color:#fff;
    }
    .calendar-wrapper .each-month .each-day.clicktime .date-no{
        color:#fff;
        border-radius:4px;
    }

    .calendar-wrapper .each-month .each-day .price{
        margin-top:-2px;
        height:18px;
        line-height:18px;
        display:block;
        color:#666;
        font-size:12px;
        text-align:center;
    }
    .calendar-wrapper .each-month .each-day.today div{

    }
    .calendar-wrapper .each-month .each-day.disabled .price,
    .calendar-wrapper .each-month .each-day.disabled{
        color:#ccc !important;
    }

    .calendar-wrapper .each-month .each-day .active, .calendar-wrapper .each-month .each-day.today .active{}
    .calendar-wrapper .each-month .each-day.clicktime{border-radius:5px}
    .calendar-wrapper .each-month .each-day.clicktime{background:#007aff!important;}
</style>

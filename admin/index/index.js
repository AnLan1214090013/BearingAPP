var util = require('../utils/util.js')
import * as echarts from '../../ec-canvas/echarts';
var initChart = null
var app = getApp()

function setOption(chart, ylist) {
  var options = {
    title: {
      left: 'center'
    },
    color: ["#37A2DA"],
    grid: {
      top: 20,
      right: 20,
      bottom: 10
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6s前', '5s前', '4s前', '3s前', '2s前', '1s前']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: ylist
    }]
  }
  chart.setOption(options);
}

Page({
  data: {
    allParams: [{
        text: '径向力',
        value: 'force'
      },
      {
        text: '第一相电流',
        value: 'phase_current_1'
      },
      {
        text: '第二相电流',
        value: 'phase_current_2'
      },
      {
        text: '旋转速率',
        value: 'speed'
      },
      {
        text: '负荷扭矩',
        value: 'torque'
      },
      {
        text: '振动信号',
        value: 'vibration_1'
      }
      
    ],
    time: '',
    fjnum: ['1_M01_F10', '2_M01_F10','3_M01_F10','4_M01_F10'],
    array: ['1号M01_F10轴承', '2号M01_F10轴承','3号M01_F10轴承','4号M01_F10轴承'],
    allConditionName: ['径向力', '第一相电流', '第二相电流', '旋转速率', '负荷扭矩', '振动信号'],
    index: 0,
    index2: 0,
    labels: [],
    result: [],
    series: [],
    aar:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      lazyLoad: true
    }
  },
  onLoad: function () {
    this.getLabel('bearing')
    this.getAllParamsDatas('1_M01_F10')
    this.getAllParamsDatas2('1_M01_F10')
    this.getAllParamsDatas3('1_M01_F10')
    this.getAllParamsDatas4('1_M01_F10')
    this.getAllParamsDatas5('1_M01_F10')
    this.getAllParamsDatas6('1_M01_F10')
    // this.getSingParamData('1_M01_F10','force',res=>{
    //   this.getChartdata(res.data.data.force)
    // })
    this.setData({
      time: util.formatTime(new Date()),
    })
    this.oneComponent = this.selectComponent('#mychart-dom-line')
    
  },
  //获取单个工况原始数据
  getSingParamData: function (bearingId, attr, callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        device_id: bearingId,

        attribute: attr
      },
      success: function (res) {
        callback(res)
      }
    })
  },
  //获取所有工况数据
  getAllParamsDatas: function (bearingId) {
    const allParamsName = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName.length; i++) {
      let paramsKey = allParamsName[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.force
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },
  getAllParamsDatas2: function (bearingId) {
    const allParamsName2 = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName2.length; i++) {
      let paramsKey = allParamsName2[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.phase_current_1
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName2[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    // Promise.all(promises).then(res => {
    //   this.startTimer();
    //   this.setDate()
    // })
  },
  getAllParamsDatas3: function (bearingId) {
    const allParamsName3 = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName3.length; i++) {
      let paramsKey = allParamsName3[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.phase_current_2
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName3[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    // Promise.all(promises).then(res => {
    //   this.startTimer();
    //   this.setDate()
    // })
  },
  getAllParamsDatas4: function (bearingId) {
    const allParamsName4 = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName4.length; i++) {
      let paramsKey = allParamsName4[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.speed
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName4[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    // Promise.all(promises).then(res => {
    //   this.startTimer();
    //   this.setDate()
    // })
  },
  getAllParamsDatas5: function (bearingId) {
    const allParamsName5 = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName5.length; i++) {
      let paramsKey = allParamsName5[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.torque
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName5[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    // Promise.all(promises).then(res => {
    //   this.startTimer();
    //   this.setDate()
    // })
  },
  getAllParamsDatas6: function (bearingId) {
    const allParamsName6 = this.data.allParams;
    let promises = []
    for (let i = 0; i < allParamsName6.length; i++) {
      let paramsKey = allParamsName6[i].value
      if(i === 0){
        this.getSingParamData(bearingId,paramsKey,res=>{
          // this.getChartdata(res.data.data)
          // this.getChartdata([2,2,2,2,2,2,2])
        })
      }
      promises.push(this.getSingParamData(bearingId, paramsKey, res => {
        // const yu=force
        const data = res.data.data.vibration_1
        this.setData({
          [`result[${i}]`]: {
            key: allParamsName6[i].text,
            max: util.getMaxValue(data),
            min: util.getMinValue(data),
            arr: util.getDataArray(data)
          }
        })
      }))
    }
    // Promise.all(promises).then(res => {
    //   this.startTimer();
    //   this.setDate()
    // })
  },
  // //获取折线图数据
  // getChartdata: function (array) {
  //   wx.showLoading({
  //     title: '折线图加载中',
  //   })
  //   if (this.data.chartTimer) {
  //     this.closeTimer(this.data.chartTimer)
  //   }
  //   let index = 0
  //   this.setData({
  //     chartTimer: setInterval(() => {
  //       if (index <= 3000) {
  //         this.setData({
  //           ylist: array.slice(index, index + 6)
  //         })
  //         index++
  //       } else {
  //         this.closeTimer(this.data.chartTimer)
  //         this.setData({
  //           ylist: array.slice(array.length - 7, array.length - 1)
  //         })
  //       }
  //       this.oneComponent.init((canvas, width, height) => {
  //         const chart = echarts.init(canvas, null, {
  //           width: width,
  //           height: height
  //         });
  //         setOption(chart, this.data.ylist) //赋值给echart图表
  //         this.chart = chart;
  //         wx.hideLoading()
  //         return chart;
  //       });
  //     }, 2000)
  //   })
  // },
  //开启刷新时间定时器
  setDate: function () {
    this.setData({
      timer2: setInterval(() => {
        this.setData({
          time: util.formatTime(new Date())
        })
      }, 1000)
    })
  },
  //开启刷新数据定时器
  startTimer: function () {
    this.setData({
      i: 0
    })
    this.setData({
      timer: setInterval(() => {
        if (this.data.i <= 3000) {
          this.setData({
            i: this.data.i + 1
          })
        } else {
          this.setData({
            i: 0
          })
          this.closeTimer(this.data.timer)
          this.closeTimer(this.data.timer2)
        }
      }, 1000)
    })
  },
  //关闭定时器
  closeTimer: function (time) {
    clearInterval(time)
  },
  //切换设备picker
  bindPickerChange: function (e) {
    let arr = ['1_M01_F10', '2_M01_F10','3_M01_F10','4_M01_F10']
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    this.setData({
      index: e.detail.value
    })
    let j = this.data.index
    let bearingId = this.data.fjnum[j]
    this.getLabel(bearingId)
    this.getAllParamsDatas(arr[j])
  },
  //切换工况picker
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
    let index = e.detail.value
    let arr = this.data.result[index].arr
    this.getChartdata(arr)
  },
  //调用云函数，获取风机结冰故障预测结果
  getLabel: function (bearingId) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      name: 'fns',
      data: {
        id: bearingId
      }
    }).then(res => {
      this.setData({
        labels: res.result.data
      })
    })
  },
  //页面卸载时清空定时器
  onUnload: function () {
    if (this.data.timer) {
      this.closeTimer(this.data.timer)
    }
    if (this.data.timer2) {
      this.closeTimer(this.data.timer2)
    }
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
  }
})
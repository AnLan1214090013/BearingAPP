var util = require('../../utils/util.js');
const app = getApp()
var username =  app.globalData.userInfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 2,
      id:"",
      time:'',
      condition:'',
      blank: "",
      allParams: [{
        text: '1号M01_F10轴承'
      },
      {
        text: '2号M01_F10轴承'
      },
      {
        text: '3号M01_F10轴承'
      },
      {
        text: '4号M01_F10轴承'
      }

      
    ],
    index2: 0,
    array: ['点击选择','1号M01_F10轴承', '2号M01_F10轴承','3号M01_F10轴承','4号M01_F10轴承'],
    array2: ['点击选择','健康', '外环损坏1级','外环损坏2级','内环损坏1级','内环损坏2级'],
    index: 0,
    index3: 0
  },
  bindPickerChange: function (e) {
    let arr = ['1_M01_F10', '2_M01_F10','3_M01_F10','4_M01_F10']
    var index2 = e.detail.value
    var device = this.data.array[index2]
    this.setData({
      index2: e.detail.value,
      device: this.data.array[index2],
    })
    console.log('device:'+device)
  },
  bindPickerChange3: function (e) {
    let arr = ['健康', '外环损坏1级','外环损坏2级','内环损坏1级','内环损坏2级']
    var index3 = e.detail.value
    var condition = this.data.array2[index3]
    this.setData({
      condition: this.data.array2[index3],
      index3: e.detail.value
      
    })
    console.log('condition:'+condition)
  },
  bindPickerChange2: function (e) {
    let arr = ['1_M01_F10', '2_M01_F10','3_M01_F10','4_M01_F10']
    var index2 = e.detail.value
    var device = this.data.array[index2]
    this.setData({
      index2: e.detail.value
    })
    console.log('设备:'+device)
    this.getChartdata(arr)
  },
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },

  idinput:function(e){  
   this.setData({
     id:e.detail.value  //获取输入框数据
   })
   
  },
  timeinput:function(e){  
    this.setData({
      time:e.detail.value
    })
    
   },
   conditioninput:function(e){  
    this.setData({
      condition:e.detail.value
    })
    
   },
  confirm(){
    const db = wx.cloud.database()
    const _ = db.command
    if(this.data.condition==='健康'){
    db.collection('condition').doc('28ee4e3e608270be117ff83465c17d41').update({
    data: {
    fine: _.inc(1)  //正常次数加一
    },
  success: function(res) {
  }
    })}else{
      db.collection('condition').doc('28ee4e3e608270be117ff83465c17d41').update({
        data: {
        wrong: _.inc(1)
        },
      success: function(res) {
      }
        })
    }
    db.collection('log').add({
      data: {
        condition:this.data.condition,  //将数据添加至云数据库log集合
        gonghao:this.data.id ,
        time:this.data.time,
        device:this.data.device
      },
      success: function(res) {
        // console.log(res)
      }
    })
 },

 toreport(){
  wx.navigateTo({
    url: '/admin/detail/detail',
  })
  wx.showToast({
    title: '查看报告'
  })
 },
  onHide: function () {
  this.setData({
    id:"",
    time:'',
    condition:'',
    blank:''
  })
  },
})
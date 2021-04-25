import * as echarts from '../../ec-canvas/echarts';
 var app = getApp()
 var finenum = 2
 
  var option = {
    tooltip: {
      trigger: 'item'
  },
  legend: {
      top: '0%',
      left: 'center'
  },
  series: [
      {
          name: '详细信息',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value:1, name: '健康'},
              {value:1, name: '外环损坏1级'},
              {value:1, name: '外环损坏2级'},
              {value:1, name: '内环损坏1级'},
              {value:1, name: '内环损坏2级'},
          ]
      }
  ]
};

let chartLine;

Page({

   

  data: {
    record:[],
    interval:"",
    selected:2,
      finenum:1,
      wrongnum:1,
      wrongnum2:1,
      wrongnum3:1,
      wrongnum4:1,
      ecLine: {
          onInit: function (canvas, width, height){
              // 初始化echarts元素，绑定到全局变量，方便更改数据
              chartLine = echarts.init(canvas, null, {
                  width: width,
                  height: height
              });
              canvas.setChart(chartLine);
              chartLine.setOption(option);
              return chartLine;
          }
      }
  },
  

onShow:function (){
    var that = this;
    that.getNum();
    that.getRecord();
    that.init(that);
    var interval = setInterval(function (){
      option.series[0].data[0].value=that.data.finenum;
      option.series[0].data[1].value=that.data.wrongnum;
      option.series[0].data[2].value=that.data.wrongnum2;
      option.series[0].data[3].value=that.data.wrongnum3;
      option.series[0].data[4].value=that.data.wrongnum4;
      chartLine.setOption(option);
    }, 2100);
    that.setData({
      interval:interval
   })
   
   },

   init: function (that) {
    var interval = ""
    that.clearTimeInterval(that)
    that.setData({
       interval: interval,
      })
  },
  
  clearTimeInterval: function (that) {
    var interval = that.data.interval;
    clearInterval(interval)
  },
    
getNum:function(){
  var that=this;
  const db = wx.cloud.database();
  db.collection('condition').doc('28ee4e3e608270be117ff83465c17d41').get({
    success: function(res) {
       that.setData({
         finenum:res.data.fine,   //获取正常次数
         wrongnum:res.data.wrong,
         wrongnum2:res.data.wrong2,
         wrongnum3:res.data.wrong3,
         wrongnum4:res.data.wrong4  //获取故障次数
       })
   console.log('finenum为'+finenum)
    }
  });
  // console.log(that.data.finenum)
},

getRecord:function(){
  var that=this;
  const db = wx.cloud.database(); //获取最近5条数据
  db.collection('log').skip(1).limit(5).get({ 
    success: function(res) {
      console.log(res.data);
      that.setData({
        record:res.data
      })
    }
  })
},

test(){
  console.log(this.data.record)
},

onUnload:function () {
  var that = this;
  that.clearTimeInterval(that)
  // that.setData({
  //   data:[],
  //   i:0
  // })
},

onHide:function () {
  var that = this;
  that.clearTimeInterval(that)
},

})


import * as echarts from '../../ec-canvas/echarts';
// var util = require('../../util/util.js');


var chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    // devicePixelRatio: dpr
  });
  canvas.setChart(chart);
  var option = {
    color: ['#f76708', '#eeff00','#00ffea'],
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product','RandomForest'],
            ['acc', 1],
            ['rec',1],
            ['pre', 1],
            ['fMe', 1]
            
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
        {type: 'bar'}
    ]
  };
  chart.setOption(option);
  return chart;
}

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultArray1: [0,0,0,0],
    selected: 1,
    ec: {
      onInit: initChart
    },
    },

  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://phmlearn.com/component/upload/ML/model/215/462',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token:'2222e7dbda4f479d9952f7f456664c73.32b68324aa01b36441a9098bd5ab74c8',
        file_name:'data_409717408105430263.csv'
      },
      success: function (res) {
        that.setData({
          resultArray1 : [res.data.data.accuracy, 
            res.data.data.recall, 
            res.data.data.precision, 
            res.data.data.fMeasure]
        })
        console.log(res.data.data)
        that.getChartdata()
      }
    })
 
  
  },

  onShow: function () {
  },

  getChartdata: function () {
    var a=this.data.resultArray1;
    var options = {
      color: ['#f76708', '#eeff00','#00ffea'],
      legend: {},
      tooltip: {},
      dataset: {
          source: [
              ['product','RandomForest'],
              ['acc', a[0]],
              ['rec',a[1]],
              ['pre', a[2]],
              ['fMe', a[3]]
              
          ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      series: [
          {type: 'bar'},
      ]
    };
      setTimeout(()=>{
        chart.clear()
        chart.setOption(options);
      },1500)
  },
  
})
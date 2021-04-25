//index.js
//获取应用实例
const app = getApp()
var username =  app.globalData.userInfo
Page({
  data: {
    
    userInfo: "",
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') 
  },
  inputname:function(){
    var that = this;
    var username = that.data.userInfo
},
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindconfirm() {
    
    wx.cloud.database().collection('user').where({
      username: username
    }).get({
  success(res){
    if(res.data[0].job == '管理员'){
    wx.navigateTo({
      url: '/admin/index/index',
    })
    wx.showToast({
      title: '你是'+res.data[0].job,res
    })
  }
  if(res.data[0].job == '工作人员'){
    wx.navigateTo({
      url: '/worker/index/index',
    })
    wx.showToast({
      title: '你是'+res.data[0].job,res
    })
  }
  },
  fail(res3){
    console.log('查询失败',res3)
  }
})


  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        
      }
      
    })
  },

  onLoad() {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.cloud.database().collection('user').add({
      data:{
        username: username,
        job: "工作人员"
      }
    })
    wx.cloud.database().collection('user').where({
          username: username
    }).get({
      success(res2){
        console.log('查询到你的身份为'+res2.data[0].job,res2)
      },
      fail(res3){
        console.log('查询失败',res3)
      }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onTabBar() {
    wx.redirectTo({
      url: '/shoping/index/index',
    })
  }
})

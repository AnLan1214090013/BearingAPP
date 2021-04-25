Page({
 
  data: {
    zhanghao: '',

    mima: ''
  },
  //获取输入的账号
  onLoad:function(){
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: "c044c28615084342aeeee23a2f4705cb.b03f4e3ee941501ebfc669eb6bcb706d",
        device_id: '1_M01_F10',
        // group_id: '1',
        attribute: 'force'
      },
      success: function (res) {
        console.log(res.data.data.force)
      }})
  },
  getZhanghao(event) {
    //console.log('账号', event.detail.value)
    this.setData({
      zhanghao: event.detail.value
    })

  },
  //获取输入的密码
  getMima(event) {
    // console.log('密码', event.detail.value)
    this.setData({
      mima: event.detail.value
    })
  },
  inputFocus: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  },
  //点击登陆
  login() {
    let zhanghao = this.data.zhanghao
    let mima = this.data.mima
    console.log('账号', zhanghao, '密码', mima)
    if (zhanghao.length != 10) {
      wx.showToast({
        icon: 'none',
        title: '工号为10位',
      })
      return
    }
    if (mima.length < 6) {
      wx.showToast({
        icon: 'none',
        title: '密码至少6位',
      })
      return
    }


    //登陆
    wx.cloud.database().collection('login').where({
      zhanghao: zhanghao
    }).get({
      success(res) {
        console.log("获取数据成功", res)
        let user = res.data[0]
        console.log("user", user)
        if (mima == user.mima) {
          console.log('登陆成功')
          
          if (user.job == "管理员"){
            wx.navigateTo({
              url: '/admin/index/index',
            })
            wx.showToast({
              title: '你是管理员',
            })
          }
          if (user.job == "工作人员"){
            wx.navigateTo({
              url: '/worker/index/index',
            })
            wx.showToast({
              title: '你是工作人员',
            })
          }
          //保存用户登陆状态
          wx.setStorageSync('user', user)
        } else {
          console.log('登陆失败')
          wx.showToast({
            icon: 'none',
            title: '账号或密码不正确',
          })
        }
      },
      fail(res) {
        console.log("获取数据失败", res)
      }
    })

  }
})
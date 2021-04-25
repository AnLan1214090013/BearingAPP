// components/shoping-tabbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      default:0
    }
  },  

  /**
   * 组件的初始数据
   */
  data: {
    color: "#888888",
    selectedColor: "#FEDD08",
    borderStyle: "black",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "/admin/index/index",
        text: "轴承工况",
        iconPath: "/images/more2.png",
        selectedIconPath: "/images/more2_b.png"
      },
      {
        pagePath: "/admin/api/api",
        text: "工况预测",
        iconPath: "/images/pre-b.png",
        selectedIconPath: "/images/pre-y.png"
      },
      {
        pagePath: "/admin/detail/detail",
        text: "员工报告",
        iconPath: "/images/paper.png",
        selectedIconPath: "/images/paper2.png"
      }
    ]
  },


  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      let data = e.currentTarget.dataset
      let url = data.path
      wx.redirectTo({
        url
      })
    }
  }
})

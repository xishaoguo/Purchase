//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    productInformation:'产品信息',
    personalCenter:'个人中心',
    switchType:false,
    selectData:[
      "分类1",
      "分类2"
    ]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("获取信息")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    }),
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: 'http://192.168.1.90:8080/HuiYi/servlet/WeiXinLogin',
              data: {
                code: res.code
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    this.dialog.hideDialog();
  },
  selectTab1: function () {
    this.setData({
      switchType: false
    })
  },
  selectTab2: function () {
    this.setData({
      switchType: true
    })
  }
})

const BASE_URL = 'https://api.zbztb.cn'

export default function request (options) {
  return new Promise((resolve, reject) => {
    let token = ''
    if (options.isAuth) {
      token = wx.getStorageSync('token')
      // 未登录跳转登录
      if (!token) {
        wx.navigateTo({ url: '/pages/login/main' })
        reject(new Error('未登录'))
        return
      }
    }

    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      header: {
        'Authorization': token
      },
      data: options.data || '',
      // dataType: 'json',
      success: res => {
        let { meta, message } = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: `[${meta.status}] ${meta.msg}`
          })
          reject(new Error(meta.msg))
        }
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: `网络环境差，请重试`
        })
        reject(new Error(`网络错误`))
      },
      complete () {
        if (!options.noLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}

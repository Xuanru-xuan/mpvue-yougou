const BASE_URL = 'https://api.zbztb.cn'

export default function request (options) {
  return new Promise((resolve, reject) => {
    if (!options.noLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
    }
    wx.request({
      url: BASE_URL + options.url,
      methods: options.method || 'GET',
      data: options.data || '',
      dataType: 'json',
      success: res => {
        let { meta, message } = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {

        }
      },
      fail: err => {
        reject(err)
      },
      complete () {
        if (!options.noLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}

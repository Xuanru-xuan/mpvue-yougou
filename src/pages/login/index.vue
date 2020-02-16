<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">点我登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo (userInfo) {
      wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1ODE1NzkzNDgsImV4cCI6MTAwMTU4MTU3OTM0N30.RTOTD8sOHoIGnzleXmR7MWrmlUn_FlKcxFAVz-JswZ0')
      let detail = userInfo.mp.detail
      wx.setStorageSync('userInfo', detail.userInfo)
      wx.navigateTo({
        url: '/pages/me/main'
      })
      wx.navigateBack()

      // console.log(detail)
      // wx.login({
      //   success: async loginRes => {
      //     let code = loginRes.code
      // 调用后端接口拿到token
      // let data = await this.$request({
      //   url: '/api/public/v1/users/wxlogin',
      //   data: {
      //     code,
      //     encryptedData: detail.encryptedData,
      //     iv: detail.iv,
      //     rawData: detail.rawData,
      //     signature: detail.signature
      //   },
      //   method: 'post'
      // })
      // 存储token并back
      // console.log(data)
      // wx.setStorageSync('token', data.token)
      // wx.setStorageSync('userInfo', detail.userInfo)
      // wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1ODE1NzkzNDgsImV4cCI6MTAwMTU4MTU3OTM0N30.RTOTD8sOHoIGnzleXmR7MWrmlUn_FlKcxFAVz-JswZ0')
      // wx.navigateBack()
      // }
      // })
    }
  }
}
</script>

<style>
</style>
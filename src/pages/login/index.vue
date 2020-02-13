<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo (userInfo) {
      // console.log(userInfo)
      let detail = userInfo.mp.detail
      console.log(detail)
      wx.login({
        success: async loginRes => {
          let code = loginRes.code
          // 调用后端接口拿到token
          let data = await this.$request({
            url: '/api/public/v1/users/wxlogin',
            data: {
              code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            },
            method: 'post'
          })
          // 存储token并back
          wx.setStorageSync('token', data.token)
          wx.navigateBack()
        }
      })
    }
  }
}
</script>

<style></style>

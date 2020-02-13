<template>
  <div>
    <div class="address-wrapper" @click="getAddr">
      <div class="address" v-if="address.userName">
        <div class="receiver">
          <p class="name">收货人：{{ address.userName }}</p>
          <p class="phone-num">电话: {{ address.telNumber }}</p>
          <span class="iconfont icon-arrow-right"></span>
           <p class="address-txt">收货地址：{{ detailAddr }}</p>
        </div>
        <!-- <p class="address-txt">收货地址：{{ detailAddr }}</p> -->
      </div>
      <!-- 选择地址 -->
      <div class="choose-address" v-else>
        <p>请选择地址</p>
        <span class="iconfont icon-arrow-right"></span>
      </div>
      <div class="flower">
        <img src="../../../static/images/cart_border@2x.png" />
      </div>
    </div>

    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item" v-for="(item, index) in goodsList" :key="index">
        <img :src="item.goods_small_logo" alt="" />
        <div class="right">
          <p class="text-line2">{{ item.goods_name }}</p>
          <div class="btm">
            <span class="price"
              >￥<span>{{ item.goods_price }}</span
              >.00</span
            >
            <div class="goods-num">
              <span>{{ item.num }}件</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="bottom-fixed" @click="toPay">
      微信支付 ({{ totalPrice }}.00元)
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: wx.getStorageSync('address') || {},
      goodsList: []
    }
  },
  onLoad () {
    this.getGoodsList()
  },
  computed: {
    detailAddr () {
      let {provinceName, cityName, countyName, detailInfo} = this.address
      return provinceName + cityName + countyName + detailInfo
    },
    totalPrice () {
      // 商品数量*价格之和
      return this.goodsList.reduce((sum, v) => {
        return sum + v.num * v.goods_price
      }, 0)
    }
  },
  methods: {
    toPay () {
      // 如果收货地址为空，提示
      if (!this.address.userName) {
        wx.showToast({
          title: '请选择收货地址!',
          icon: 'none'
        })
        return
      }
      // 如果商品数量为0,提示
      if (!this.totalPrice) {
        wx.showToast({
          title: '请选择商品进行支付!',
          icon: 'none'
        })
        return
      }
      // 创建订单
      this.createOrder()
    },
    async createOrder () {
      this.token = wx.getStorageSync('token')
      let data = await this.$request({
        url: '/api/public/v1/my/orders/create',
        method: 'POST',
        header: {
          'Authorization': this.token
        },
        data: {
          order_price: this.totalPrice,
          consignee_addr: this.detailAddr,
          goods: this.filterGoodsList()
        }
      })

      this.orderNumber = data.order_number
      // 支付
      this.toPaying()
      // 把已经支付商品从购物车中去掉
      this.arrangeCart()
    },
    filterGoodsList () {
      let _arr = []
      this.goodsList.forEach(v => {
        _arr.push({
          goods_id: v.goods_id,
          goods_price: v.goods_price,
          goods_number: v.num
        })
      })
      return _arr
    },

    async toPaying () {
      let data = await this.$request({
        url: '/api/public/v1/my/orders/req_unifiedorder',
        method: 'POST',
        header: {
          'Authorization': this.token
        },
        data: {
          order_number: this.orderNumber
        }
      })
      console.log(data)
      // 发起微信支付
      wx.requestPayment({
        ...data.pay,
        success (res) {
          wx.showToast({
            title: '成功'
          })
        },
        fail (res) {
          wx.showToast({
            title: '失败'
          })
        }
      })
    },

    // 去掉购物车中选中的商品
    arrangeCart () {
      // 从storage中取出cart
      let cart = wx.getStorageSync('cart') || {}
      // 更新cart
      for (let key in cart) {
        // 如果商品选择就删除
        if (cart[key].checked) {
          delete cart[key]
        }
      }
      // 存cart到storage
      wx.setStorageSync('cart', cart)
    },

    async getGoodsList () {
      let cart = wx.getStorageSync('cart') || {}
      // 过滤掉购物车中未选中的商品
      let ids = this.filterCartIds(cart)

      // 如果ids不为空的话，就请求购物车列表
      if (ids) {
        let goodsList = await this.$request({
          url: '/api/public/v1/goods/goodslist',
          data: {
            goods_ids: ids
          }
        })
        // 合并购物车数据和购物商品列表数据
        goodsList.forEach(v => {
          v.num = cart[v.goods_id].num
        })

        // 对data的改变，尽量一步到位
        this.goodsList = goodsList
      }
    },
    filterCartIds (cart) {
      let idsArr = []
      for (let key in cart) {
        // 如果商品选中，就添加
        if (cart[key].checked) {
          idsArr.push(key)
        }
      }
      return idsArr.join(',')
    },
    getAddr () {
      // 同步微信的通讯地址
      wx.getSetting({ success: settingRes => {
        console.log(settingRes)
        if (settingRes.authSetting['scope.address'] === false) {
          // 拒绝的
          // 提示打开设置
          wx.showModal({
            title: '提示',
            content: '请在打开的设置里面允许通讯地址',
            success: res => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        } else {
          // 弹出授权窗口
          wx.authorize({
            scope:
          'scope.address',
            success: res => {
              wx.chooseAddress({
                success: (addrRes) => {
                  this.address = addrRes
                  wx.setStorageSync('address', this.address)
                }
              })
            }
          })
        }
      } })
    }
  }
}
</script>

<style lang="less">
.address-wrapper {
  background-color: #fff;
}

.address {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx 48rpx 20rpx;
  .receiver {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 30rpx;
    position: relative;
    .phone-num {
      // margin-right: 40rpx;
      margin-top: 20rpx;
    }
    .name, .phone-num {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20rpx;
    }
    .address-txt {
      padding-top: 20rpx;
    }
    .icon-arrow-right {
      position: absolute;
      top: 8rpx;
      right: 0;
      color: #999;
    }
  }
}

.choose-address {
  display: flex;
  padding: 30rpx 30rpx 48rpx 20rpx;
  justify-content: space-between;
  .icon-arrow-right {
    color: #999;
  }
}

.flower {
  img {
    height: 16rpx;
    width: 100%;
    display: block;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 20rpx;
  margin-top: 30rpx;
  img {
    width: 160rpx;
    height: 160rpx;
    margin-left: 30rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .text-line2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
      padding-top: 10rpx;
    }
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 243rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.bottom-fixed {
  position: absolute;
  height: 98rpx;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1aad19;
  color: #fff;
  line-height: 98rpx;
  text-align: center;
}
</style>

<template>
  <div class="content">
    <div class="title">
      <span class="iconfont icon-shangpu"></span>
      <span>优购生活馆</span>
      <span class="iconfont icon-dayuhao"></span>
      <span class="tikect">领券</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item" v-for="(item, index) in cartGoodsList" :key="index">
        <span class="iconfont icon-yuanquandagou"></span>
        <img :src="item.goods_small_logo" alt="" />
        <div class="right">
          <p class="line2">{{ item.goods_name }}</p>
          <div class="btm">
            <span class="price"
              >￥<span>{{ item.goods_price }}</span
              >.00</span
            >
            <div class="goods-num">
              <span @click="cart[item.goods_id].num--">-</span>
              <span>{{cart[item.goods_id].num}}</span>
              <span @click="cart[item.goods_id].num++">+</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all">
        <span class="iconfont icon-checked"></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>合计:<span class="num">￥1000.00</span></p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn" @click="toPay">结算(1000)</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      cartGoodsList: []
    }
  },
  // 页面显示时候的钩子函数
  onShow () {
    this.cart = wx.getStorageSync('cart') || {}
    this.getCartGoodsList()
  },
  methods: {
    toPay () {
      wx.navigateTo({
        url: '/pages/pay/main'
      })
    },
    async getCartGoodsList () {
      let goodsId = Object.keys(this.cart).join(',')
      console.log(goodsId)
      this.cartGoodsList = await this.$request({
        url: '/api/public/v1/goods/goodslist?goods_ids=' + goodsId
      })
    }
  }
}
</script>

<style lang="less">
@import url("../../css/iconfont2.css");
.title {
  height: 88rpx;
  // display: flex;
  // align-items: center;
  line-height: 88rpx;
  padding: 0 20rpx;
  background-color: #ececec;
  .tikect {
    float: right;
  }
  .iconfont {
    color: #999;
    margin:  0 20rpx;
  }
    .icon-dayuhao {
    margin-left: 10rpx;
    font-size: 22rpx;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  // margin-top: 20rpx;
  border-radius: 14rpx;
  margin: 16rpx;
  &:first-child {
    margin-top: 0;
  }
  .iconfont {
    margin-left: 10rpx;
  }
  .icon-shangpu {
    color: #eb4450;
    margin: 0 30rpx;
  }
  img {
    width: 160rpx;
    height: 160rpx;
    margin-left: 10rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .line2 {
       overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
      font-size: 28rpx;
    }
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 34rpx;
        }
      }
      .goods-num {
        width: 200rpx;
        display: flex;
        align-items: center;
        // button {
        //   width: 50rpx;
        //   height: 46rpx;
        //   // box-sizing: border-box;
        //   display: flex;
        //   justify-content: center;
        //   // align-items: center;
        //   line-height: 46rpx;
        //   border: 1rpx solid #000;
        //   background-color: #fff;
        //   border-radius: 0;
        // }
        span {
          // margin: 0 30rpx;
          border: 1px solid #000;
          border-left: 0;
          border-right: 0;
          flex: 1;
          text-align: center;
          &:nth-child(2) {
            border-left: 1px solid #000;
            border-right: 1px solid #000;
          }
          &:nth-child(3) {
            border-right: 1px solid #000;
          }
          &:first-child {
            border-left: 1px solid #000;
          }
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 88rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}

.account {
  height: 98rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  .account-btn {
    width: 230rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #eb4450;
  }
  .select-all {
    flex: 1;
  }
  .price {
    margin-right: 20rpx;
    .num {
      color: #eb4450;
    }
    .info {
      color: #999;
    }
  }
}
</style>

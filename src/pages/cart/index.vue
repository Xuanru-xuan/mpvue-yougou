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
        <span class="iconfont" :class="item.checked? 'icon-yuanquandagou': 'icon-un-check'" @click="item.checked=!item.checked"></span>
        <img :src="item.goods_small_logo" alt="" />
        <div class="right">
          <p class="line2">{{ item.goods_name }}</p>
          <div class="btm">
            <span class="price"
              >￥<span>{{ item.goods_price }}</span
              >.00</span
            >
            <div class="goods-num">
              <button @click="sub(item)" :disabled="item.num===1">-</button>
              <button class="btn">{{item.num}}</button>
              <button @click="add(item)">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all" @click="isAll =!isAll">
        <span class="iconfont" :class="isAll? 'icon-yuanquandagou':'icon-un-check'"></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>合计:<span class="num">￥{{ totalPrice }}.00</span></p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn" @click="toPay">结算({{ totalNum }})</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // cart: {},
      cartGoodsList: []
    }
  },
  // 页面显示时候的钩子函数
  onShow () {
  // created () {
    // 每次请求数据前，清空goodsList
    this.cartGoodsList = []
    this.getCartGoodsList()

    // 设置tab栏的徽标
    wx.setTabBarBadge({
      index: 2,
      // text是string类型
      text: Object.keys(wx.getStorageSync('cart')).length + ''
    })
  },
  // 页面隐藏时执行
  onHide () {
    // 把goodsList的数据存到storage里面去
    let cart = {}
    this.cartGoodsList.forEach(v => {
      cart[v.goods_id] = {
        num: v.num,
        checked: v.checked
      }
    })
    wx.setStorageSync('cart', cart)
  },
  computed: {
    isAll: {
      get () {
        // 所有商品都选中(every)，返回true
        return this.cartGoodsList.every(v => {
          return v.checked
        })
      },
      set (status) {
        // 如果想真正改变计算属性，需要改变计算属性的依赖
        this.cartGoodsList.forEach(v => {
          v.checked = status
        })
      }
    },
    totalNum () {
    // 选中的商品数量之和
      return this.cartGoodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num : 0)
      }, 0)
    },
    totalPrice () {
      // 选中的商品数量*价格之和   sum对应0 为初始值
      return this.cartGoodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num * v.goods_price : 0)
      }, 0)
    }
  },
  methods: {
    sub (item) {
      item.num--
      this.$store.commit('updateItem', item)
    },
    add (item) {
      item.num++
      this.$store.commit('updateItem', item)
    },
    toPay () {
      // 如果商品数量为0，提示
      if (!this.totalNum) {
        wx.showToast({
          title: '请选择需要支付的商品！',
          icon: 'none'
        })
        return
      }
      // 如果未登陆，跳转登录
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({ url: '/pages/login/main' })
        // TODO 这里是否需要return
        return
      }
      // 跳转支付
      wx.navigateTo({ url: '/pages/pay/main' })
    },

    async getCartGoodsList () {
      // let cart = wx.getStorageSync('cart') || {}
      let cart = this.$store.getters.getCart || {}
      let goodsId = Object.keys(cart).join(',')
      // console.log(goodsId)
      if (goodsId) {
        let cartGoodsList = await this.$request({
          url: '/api/public/v1/goods/goodslist?goods_ids=' + goodsId
        })
        // 合并购物车数据和购物商品列表数据
        cartGoodsList.forEach(v => {
          v.num = cart[v.goods_id].num
          v.checked = cart[v.goods_id].checked
        })
        // 对data的改变，尽量一步到位
        this.cartGoodsList = cartGoodsList
      }
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
  .icon-yuanquandagou {
    color: #eb4450;
    // margin: 0 30rpx;
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
        button {
          width: 50rpx;
          height: 48rpxrpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 46rpx;
          border: 0;
          border: 1rpx solid #000;
          background-color: #fff;
          border-radius: 0;
        }
        button::after{
           border: none;
           border-radius: 0;
           border: 1px solid #000;
         }
         .btn {
           flex: 1;
           border-left: 0;
           border-right: 0;
         }
        span {
          // margin: 0 30rpx;
          border: 1px solid #000;
          border-left: 0;
          border-right: 0;
          flex: 1;
          text-align: center;
          display: inline-block;
          height: 46rpx;
          // &:nth-child(2) {
          //   border-top: 1px solid #000;
          //   border-bottom: 1px solid #000;
          // }
          // &:nth-child(3) {
          //   border-right: 1px solid #000;
          // }
          // &:first-child {
          //   border-left: 1px solid #000;
          // }
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

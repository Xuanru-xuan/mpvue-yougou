<template>
  <div class="container">
    <div class="header">
      <ul>
        <li
          @click="activeIndex = i"
          :class="{ active: activeIndex === i }"
          v-for="(item, i) in tabList"
          :key="i"
        >
          {{ item.title }}
        </li>
        <!-- <li class="active">待付款</li>
        <li class="active">待收货</li>
        <li class="active">退款/退货</li> -->
      </ul>
    </div>

    <div class="content">
      <ul>
        <li v-for="(order, index) in orderList" :key="index">

          <div class="goods-info" v-for="(item, i) in order.goods" :key="i">
            <img :src="item.goods_small_logo" alt="" />
            <div class="right">
              <p>{{ item.goods_name }}</p>
              <div class="price-num">
                <span class="price">￥{{ item.goods_total_price }}</span>
                <span class="num">x{{ item.goods_number }}</span>
              </div>
            </div>
          </div>

          <p class="total-price">
            共{{ order.total_count }}件商品 总计：&yen;{{
              order.total_price
            }}(含运费0.00)
          </p>
          <div class="btn">
            <div class="ul">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button>查看物流</button>
            <button>卖了换钱</button>
            <button>追加评价</button>
          </div>
          <div class="order">
            <span>{{ order.order_number }}</span>
            <button type="primary">
              支付
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabList: [
        { title: '全部订单' },
        { title: '待付款' },
        { title: '待收货' },
        { title: '退款/退货' }
      ],
      activeIndex: 0,
      orderList: {}
    }
  },
  onLoad (options) {
    this.activeIndex = parseInt(options.activeIndex) || 0
    this.orderGoodsList()
  },
  methods: {
    async orderGoodsList () {
      this.orderList = await this.$request({
        url: '/api/public/v1/my/orders/all?type=2',
        isAuth: true
      })
      this.orderList = this.orderList.orders
    }
  }
}
</script>

<style lang="less">
.container {
  background-color: #f4f4f4;
}
.header {
  background-color: #ececec;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -20rpx;
    li {
      flex: 1;
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;
      &.active {
        border-bottom: 12rpx solid #eb4450;
        color: red;
      }
    }
  }
}
.content {
  margin: 0 20rpx 20rpx 20rpx;
  li {
    background-color: #fff;
    margin-top: 20rpx;
    padding: 0 20rpx;
    border-radius: 20rpx;
    .goods-info {
      height: 260rpx;
      margin-bottom: 10rpx;
      display: flex;
      align-items: center;

      img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 26rpx;
        flex-shrink: 0;
      }
      .right {
        p {
          margin-top: -65rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 控制多行的行数
          -webkit-box-orient: vertical;
          font-size: 28rpx;
        }
        .price-num {
          margin-top: 20rpx;
          display: flex;
          justify-content: space-between;
          .price {
            color: #eb4450;
          }
        }
      }
    }
    .total-price {
      // height: 40rpx;
      // line-height: 40rpx;
      margin-top: -68rpx;
      // border-bottom: 1rpx solid #ddd;
      text-align: right;
      color: #000;
      font-size: 26rpx;
    }
    .btn {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
      .ul {
      display: flex;
      align-items: center;
      margin-left: 20rpx;  
      margin-right: 40rpx;    
      span {
        display: block;
        width: 10rpx;
        height: 10rpx;
        border-radius: 10rpx;
        background-color: #999;
        margin-right: 10rpx;
      }
      }
      button::after {
        border: none;
        border-radius: 60rpx;
        border: 1px solid #ccc;
      }
      button {
        height: 50rpx;
        width: 150rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        background-color: #fff;
      }
    }
    .order {
      height: 88rpx;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20rpx;
      span {
        flex: 1;
        font-size: 14px;
      }
      button {
        width: 130rpx;
        height: 50rpx;
        line-height: 50rpx;
        font-size: 26rpx;
      }
    }
  }
}
</style>

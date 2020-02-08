<template>
  <div>
      <!-- 头部 -->
      <div class="header">
        <icon type="search"
              size="16"
              color="#bbb">
        </icon>
        <input type="text" value="小米">
      </div>

      <!-- 过滤菜单 -->
      <ul class="filter-menu">
        <li :class="{active:activeIndex===index}"
            @click="activeIndex=index"
            v-for="(item, index) in tabList"
            :key="index">{{item}}</li>
      </ul>

    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods" v-for="(item, index) in goodsList" :key="index">
        <img :src="item.goods_small_logo"
             alt="">
        <div class="right">
          <p class="goods-name text-line2">{{item.goods_name}}</p>
          <p class="price">￥<span>{{item.goods_price}}</span>.00</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabList: [
        '销量',
        '综合',
        '价格'
      ],
      keywords: '',
      activeIndex: 0,
      goodsList: [],
      pageNum: 1
    }
  },
  onLoad (options) {
    this.keywords = options.name
    console.log(this.keywords)
    this.GoodsList()
  },

  onPullDownRefresh () {
    this.goodsList = []
    this.pageNum = 1
    this.GoodsList()
  },

  onReachBottom () {
    this.GoodsList()
    this.pageNum++
  },

  methods: {
    async GoodsList () {
      const data = await this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keywords,
          pagesize: 6,
          pagenum: this.pageNum
        }
      })
      wx.stopPullDownRefresh()
      // this.goodsList = data.goods
      // console.log(this.goodsList)
      setTimeout(() => {
        this.goodsList = [...this.goodsList, ...data.goods]
      }, 100)
    }
  }
}
</script>

<style lang="less">
.header {
  height: 120rpx;
  padding: 30rpx 16rpx;
  box-sizing: border-box;
  background-color: #eee;
  position: relative;
  icon {
    position: absolute;
    top: 48rpx;
    left: 44rpx;
  }
  input {
    height: 60rpx;
    width: 100%;
    border-radius: 4rpx;
    background-color: #fff;
    padding-left: 80rpx;
    box-sizing: border-box;
  }
}

.filter-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100rpx;
  li.active {
    color: #eb4450;
  }
}
.goods {
  border-top: 1rpx solid #ddd;
  height: 260rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  img {
    width: 200rpx;
    height: 200rpx;
  }
  .right {
    flex: 1;
    margin-left: 26rpx;
    .price {
      color: #eb4450;
      font-size: 24rpx;
      margin-top: 80rpx;
      span {
        font-size: 36rpx;
      }
    }
  }
}
.btm-line {
  text-align: center;
}

.text-line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

}
</style>
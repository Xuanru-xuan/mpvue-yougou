<template>
  <div>
      <!-- 头部 -->
      <div class="header">
        <icon type="search"
              size="16"
              color="#bbb">
        </icon>
        <input type="text" v-model="keywords" @confirm="reload" confirm-type="search">
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
       <p class="btm-line" v-show="isLastPage">--我是有底线的--</p>
  </div>
</template>
<script>
const PAGE_SIZE = 6
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
      pageNum: 1,
      // 是否在请求中
      isRequest: false,
      // 默认不是最后一页
      isLastPage: false
    }
  },
  onLoad (options) {
    this.keywords = options.name
    // console.log(this.keywords)
    // 搜索请求
    this.GoodsList()
  },

  // 退出当前搜索页面时清空商品列表数组和页数
  onUnload: function () {
    this.goodsList = []
    this.pageNum = ''
  },

  // 下拉刷新
  onPullDownRefresh () {
    this.isLastPage = false
    this.reload()
  },

  // 上拉加载
  onReachBottom () {
    this.GoodsList()
    // 加载下一页的数据
    // 页码+1，再发请求
    this.pageNum++
  },

  methods: {
    reload () {
      // 搜索列表清空
      this.goodsList = []
      this.pageNum = 1
      this.GoodsList()
    },

    async GoodsList () {
      // 如果请求中就不再发请求，或者是最后一页时
      if (this.isRequest || this.isLastPage) {
        return
      }

      // 在请求前，设置标志为请求中
      this.isRequest = true
      const data = await this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.keywords,
          pagesize: PAGE_SIZE,
          pagenum: this.pageNum
        },
        // 不显示加载样式
        noLoading: true
      })
      // 请求后，设置标志为请求完成，也就是不在请求中
      this.isRequest = false
      // 下一页的数据要追加
      wx.stopPullDownRefresh()

      // 上拉加载下一页时追加下一页数据
      this.goodsList = [...this.goodsList, ...data.goods]
      // 商品列表长度等于total时，已经到了最后一页 此时不在发送请求
      if (data.total <= this.goodsList.length) {
        this.isLastPage = true
      }
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
  // border-top: 1rpx solid #ddd;
  height: 260rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  img {
    width: 200rpx;
    height: 200rpx;
    border: 1px solid #ccc;
    border-radius: 8rpx;
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
  background-color: #ccc;
  color: red;
}

.text-line2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 26rpx;
}
</style>
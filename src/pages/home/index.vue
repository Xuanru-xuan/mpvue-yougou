<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="inner">
        <icon type="search" size="16"></icon>
        <span>搜索</span>
      </div>
    </div>

    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <block v-for="item in 3" :key="item">
        <swiper-item>
          <img src="https://api.zbztb.cn/pyg/banner1.png" alt="" />
        </swiper-item>
      </block>
    </swiper>

    <!-- 导航 -->
    <div class="nav">
      <img src="https://api.zbztb.cn/pyg/icon_index_nav_4@2x.png" v-for="item in 4" :key="item" alt="">
    </div>

    <!-- 楼层 -->
    <div class="floor" v-for="(item,i) in 3" :key="i">
      <img src="https://api.zbztb.cn/pyg/pic_floor01_title.png" alt="">
      <div class="productList">
        <img src="https://api.zbztb.cn/pyg/pic_floor01_1@2x.png" alt="">
        <div class="right">
          <img src="https://api.zbztb.cn/pyg/pic_floor01_2@2x.png" v-for="(items, index) in 4" :key="index" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.header {
  height: 100rpx;
  background-color: #eb4450;
  padding: 20rpx 16rpx;
  box-sizing: border-box;

  .inner {
    background-color: #fff;
    height: 60rpx;
    border-radius: 4rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbb;

    icon {
      margin-right: 10rpx;
      margin-top: 6rpx;
    }
  }
}

swiper {
  height: 340rpx;
  img {
    width: 100%;
    height: 340rpx;
  }
}

.nav {
  height: 194rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    height: 140rpx;
    width: 128rpx;
  }
}

.floor {
  padding: 0 17rpx 0 17rpx;
  margin-bottom: 28rpx;
  background-color: #fff;
  img {
    height: 88rpx;
    width: 100%;
    background-color: #ccc;
  }
  .productList {
    display: flex;
    img {
      width: 232rpx;
      height: 386rpx;
    }
    .right {
      flex: 1;
      font-size: 0;
      img {
        width: 232rpx;
        height: 188rpx;
        margin: 0 0 10rpx 10rpx;
      }
    }
  }
}
</style>

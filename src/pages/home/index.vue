<template>
  <div>
    <!-- 头部 -->
    <searchLink/>

    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
      <block v-for="item in swiperdata" :key="item">
        <swiper-item>
          <img :src="item.image_src" alt="" />
        </swiper-item>
      </block>
    </swiper>

    <!-- 导航 -->
    <div class="nav">
      <img
        v-for="item in catitems"
        :src="item.image_src"
        :key="item"
        alt=""
      />
    </div>

    <!-- 楼层 -->
    <div class="floor" v-for="(floor, i) in floordata" :key="i">
      <img :src="floor.floor_title.image_src" alt="" />
      <div class="productList">
        <img :src="floor.product_list[0].image_src" alt="" />
        <div class="right">
          <block v-for="(item, index) in floor.product_list" :key="index">
          <img
            v-if="index"
            :src="item.image_src"
            alt=""
          />
          </block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchLink from '../../components/searchLink'
export default {
  components: {
    searchLink
  },
  data () {
    return {
      swiperdata: [],
      catitems: [],
      floordata: []
    }
  },

  onLoad () {
    this.getSwiperdata()
    this.getCatitems()
    this.getFloordata()
  },

  methods: {
    async getSwiperdata () {
      this.swiperdata = await this.$request({
        url: '/api/public/v1/home/swiperdata'
      })
    },
    getCatitems () {
      this.$request({
        url: '/api/public/v1/home/catitems'
      }).then(data => {
        this.catitems = data
      })
    },

    getFloordata () {
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        success: res => {
          if (res.data.meta.status === 200) {
            this.floordata = res.data.message
          }
        }
      })
    }
  }
}
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
    // background-color: #ccc;
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

<template>
  <div class="wrapper">
    <swiper
      class="swiper"
      indicator-dots
      autoplay
      circular
      indicator-color="#ccc"
      indicator-active-color="#fff"
    >
      <block v-for="(item, index) in goods.pics" :key="index">
        <swiper-item @click="prevImg(index)">
          <image class="swiper-img" :src="item.pics_big"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="goods-info">
      <p class="price">￥{{ goods.goods_price }}</p>
      <div class="name-favo">
        <p class="name">{{ goods.goods_name }}</p>
        <div class="favo">
          <span class="iconfont icon-share"></span>
          <button class="btn" open-type="share">分享</button>
        </div>
      </div>
      <div class="goods_title">
        <p class="express"><i class="iconfont icon-tuijian"></i>{{ goods.cat_three_id }}人推荐</p>
        <p class="express"><i class="iconfont icon-liwu"></i>送给TA</p>
        <p class="express"><i class="iconfont icon-renqun"></i>帮我选</p>
      </div>
    </div>
    <div class="promote">
      <ul>
        <li>
          <span class="name">促销</span>
          <span class="detail">满<span>{{str2}}</span>减<span>{{str}}</span>元</span>
        </li>
        <li class="brother">
          <span class="name">已选</span>
          <span class="detail gray">黑色/S/<span>{{str4}}</span>件</span>
        </li>
      </ul>
    </div>

    <div class="promote promote2">
      <div class="box1">
        <span class="send">发货</span>
        <p><i class="iconfont icon-location"></i>广东深圳</p>
        <p><span class="geli">|</span>快递:免运费</p>
      </div>
      <div class="box2">
        <span>月销{{ str3 }}</span>
      </div>

    </div>

    <!-- 图文介绍 -->
    <div class="goods-detail">
      <div class="tabs">
        <span :class="{ active: !activeIndex }" @click="activeIndex = 0"
          >图文介绍</span
        >
        <span :class="{ active: activeIndex }" @click="activeIndex = 1"
          >规格参数</span
        >
      </div>
      <div class="main">
        <div v-show="!activeIndex" v-html="goods.goods_introduce"></div>
        <div v-show="activeIndex" v-html="goods.goods_introduce">商品参数</div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="icon-text">
        <span class="iconfont icon-kefu"></span>
        <span>联系客服</span>
      </div>
      <div class="icon-text" @click="toCart">
        <span class="iconfont icon-cart"></span>
        <span>购物车</span>
      </div>
      <div class="btn add-cart-btn" @click="addCart">加入购物车</div>
      <div class="btn buy-btn">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: {},
      activeIndex: 0,
      str: '',
      str2: '',
      str3: '',
      str4: ''
    }
  },
  onLoad (options) {
    let goodsId = options.goodsId
    // console.log(options.goodsid)
    // 发送请求
    this.goodsDetail(goodsId)
  },

  // 转发功能
  onShareAppMessage () {
    return {
      title: this.goods.goods_name,
      imageUrl: this.goods.pics[0].pics_big
    }
  },
  methods: {
    // 商品详情请求
    async goodsDetail (goodsId) {
      this.goods = await this.$request({
        url: '/api/public/v1/goods/detail?goods_id=' + goodsId
      })
      // console.log(this.goods)
      this.str = this.goods.upd_time
      this.str2 = this.goods.upd_time
      this.str3 = this.goods.upd_time
      this.str4 = this.goods.upd_time
      this.str = this.str.toString().substr(7, 2)
      this.str2 = this.str2.toString().substr(0, 4)
      // str = str.toString().substr(4, Math.random() * 5)
      this.str3 = this.str3.toString().substr(6, Math.random() * 100000)
      this.str4 = this.str4.toString().substr(9, Math.random() * 10)
      // console.log(this.str)
      // console.log(this.str2)
      console.log(this.str4)
    },

    // 图片预览
    prevImg (index) {
      let urls = []
      this.goods.pics.forEach(v => {
        urls.push(v.pics_big)
      })
      // 在新页面中全屏预览图片
      wx.previewImage({
        current: urls[index], // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    },
    // 跳转购物车页面
    toCart () {
      wx.switchTab({ url: '/pages/cart/main' })
    },
    addCart () {
      // 得到当前商品的id
      let goodsId = this.goods.goods_id
      // 从storage里面取购物车数据   去不到给个空对象
      let cart = wx.getStorageSync('cart') || {}
      // 更改
      // 后续添加 num++, checked:true
      // 第一次添加，num:0,checked:true
      // 看cart里面有没有这个商品
      cart[goodsId] = {
        num: cart[goodsId] ? cart[goodsId].num + 1 : 1,
        checked: true
      }
      // 存回去
      wx.setStorageSync('cart', cart)
      wx.showToast({
        title: '添加成功!',
        icon: 'success'
      })
    }
  }
}
</script>
<style lang="less">
@import url('../../css/iconfont2.css');
@import url("../../css/iconfont.css");
.promote2 {
  height: 80rpx;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  padding: 0 20rpx;
  .box1, .box2 {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #999;
    .send, i {
      margin-right: 20rpx;
    }
    .geli {
      margin: 0 10rpx;
    }
  }
  p {
    display: flex;
    align-items: center;
  }
}
.wrapper {
  background-color: #f4f4f4;
  padding-bottom: 98rpx;
}

.swiper {
  height: 720rpx;
}

.swiper-img {
  width: 100%;
  height: 720rpx;
}

.goods-info {
  padding: 40rpx 0 30rpx 20rpx;
  background-color: #fff;

  .price {
    color: #eb4450;
    font-size: 40rpx;
  }

  .name-favo {
    display: flex;
    height: 78rpx;
    margin-top: 14rpx;

    .name {
      color: #333;
      flex: 1;
      font-size: 28rpx;
      padding-right: 78rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 控制多行的行数
      -webkit-box-orient: vertical;
    }

    .favo {
      // border-left: 1px solid #ddd;
      background-color: #ccc;
      width: 154rpx;
      color: #999;
      font-size: 24rpx;
      display: flex;
      // flex-direction: column;
      align-items: center;
      position: relative;
      justify-content: space-between;
      border-top-left-radius: 40rpx;
      border-bottom-left-radius: 40rpx;
      .btn {
        position: absolute;
        right: 0rpx;
        // opacity: 0.5;
        font-size: 30rpx;
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
        background-color: #ccc;
        border: none;
        padding: 0 20rpx;
      }
      button::after {
        border: none;
      }
      .icon-share {
        margin-left: 20rpx;
        margin-right: 10rpx;
      }
    }
  }

  .goods_title {
    display: flex;
    align-items: center;
    margin: 10rpx 10rpx 0 10rpx;
  }
  .iconfont {
      display: inline-block;
      margin-right: 10rpx;
  }
  .express {
    display: inline-block;
    flex: 1;
    color: #999;
    font-size: 24rpx;
    margin-top: 20rpx;
    text-align: center;
  }
}

.promote {
  margin-top: 20rpx;

  li {
    background-color: #fff;
    height: 96rpx;
    line-height: 96rpx;
    font-size: 28rpx;
    margin-top: 20rpx;
    padding-left: 20rpx;

    &.brother {
      margin-top: 0;
    }

    .name {
      color: #404040;
    }

    .detail {
      color: #ff4055;
      margin-left: 40rpx;

      &.gray {
        color: #ccc;
      }
    }
  }
}

.goods-detail {
  margin-top: 20rpx;
  background-color: #fff;

  .tabs {
    display: flex;

    span {
      flex: 1;
      text-align: center;
      color: #404040;
      font-size: 22rpx;
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;

      &.active {
        color: #ff4055;
        border-bottom: 10rpx solid #ff2644;
      }
    }
  }
}

.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  background-color: #fff;

  .icon-text {
    flex: 2;
    font-size: 20rpx;
    color: #404040;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .btn {
    flex: 3;
    color: #fff;
    text-align: center;
    line-height: 98rpx;

    &.add-cart-btn {
      background-color: #ffb400;
    }

    &.buy-btn {
      background-color: #ff2d4a;
    }
  }
}
</style>

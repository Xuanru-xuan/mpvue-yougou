<template>
  <div>
    <searchLink />
    <div class="content" v-if="categories.length">
      <ul class="left">
        <li
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
          v-for="(item, index) in categories"
          :key="index"
        >
          {{ item.cat_name }}
        </li>
      </ul>
      
      <div class="right">
        <img src="../../../static/images/22.jpg" alt="" srcset="" />
        <ul>
          <li class="cate2" v-for="(cate2, index2) in categories[activeIndex].children" :key="index2">
            <p class="title">/<span>{{ cate2.cat_name }}</span>/</p>
            <ul>
              <li class="cate3" v-for="(cate3, index3) in cate2.children" :key="index3">
                <img
                  :src="cate3.cat_icon"
                  alt=""
                />
                <p>{{ cate3.cat_name }}</p>
              </li>
            </ul>
          </li>
        </ul>
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
      activeIndex: 0,
      categories: []
    }
  },
  onLoad () {
    this.getCategories()
  },
  methods: {
    async getCategories () {
      this.categories = await this.$request({
        url: '/api/public/v1/categories'
      })
    }
  }
}
</script>

<style lang="less">
.content {
  display: flex;
  position: absolute;
  top: 100rpx;
  // left:0;
  // right:0;
  width: 100%;
  bottom: 0;
  .left {
    width: 198rpx;
    overflow: scroll;
    li {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border: 1rpx solid #ccc;
      box-sizing: border-box;
      background-color: #f4f4f4;
      font-size: 24rpx;
      &.active {
        color: #eb4450;
        background-color: #fff;
        position: relative;
        &::before {
          position: absolute;
          content: "";
          width: 8rpx;
          height: 60rpx;
          background-color: #eb4450;
          left: 0;
          top: 20rpx;
        }
      }
    }
  }
  .right {
    flex: 1;
  }
}
.right {
  padding: 20rpx 16rpx 0;
  overflow: scroll;
  background-color: #ececec;
  img {
    width: 520rpx;
    height: 180rpx;
  }
  .title {
    height: 110rpx;
    line-height: 110rpx;
    color: #e0e0e0e0;
    text-align: center;
    span {
      margin: 0 30px;
      color: #333;
    }
  }
}
.cate2 {
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}

.cate3 {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20rpx;
  img {
    width: 160rpx;
    height: 120rp;;
  }
  p {
    margin-top: 10rpx;
    font-size: 24rpx;
  }
}
</style>

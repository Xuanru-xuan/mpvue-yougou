<template>
  <div class="wrapper">
    <!-- 接收之组件返回来的关键字并定义方法 -->
    <SearchBar @fnSendFather="toSearchList" :sendSonKeyWorld="keywords"/>
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18" @click="clearKeywordList">
        </icon>
      </div>
      <ul>
          <li @click="toSearchList(item)" v-for="(item, index) in keywordList" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from '../../components/search'
const KEYWORD_LIST = 'KEYWORD_LIST'
export default {
  components: {
    SearchBar
  },
  data () {
    return {
      keywordList: [],
      keywords: ''
    }
  },
  onShow () {
    this.keywords = ''
    // 第一次和从搜索列表返回，都同步storage的数据
    this.keywordList = wx.getStorageSync(KEYWORD_LIST)
  },
  methods: {
    toSearchList (data) {
      // 拓展运算符,定义一个变量存储搜索关键字
      let _keywordList = [...this.keywordList]
      // 关键字增加到头部
      _keywordList.unshift(data)
      // 去重
      _keywordList = [...new Set(_keywordList)]
      // 同步存储到本地storage
      wx.setStorageSync(KEYWORD_LIST, _keywordList)
      // 跳转页面携带搜索参数
      wx.navigateTo({ url: '/pages/search_list/main?name=' + data })
    },
    // 清空历史搜索
    clearKeywordList () {
      wx.showModal({
        title: '提示', // 提示的标题,
        content: '你确定要清空历史搜索吗？', // 提示的内容,
        success: res => {
          // console.log(res)
          if (res.confirm) {
            this.keywordList = []
            //  清除storage
            wx.removeStorageSync(KEYWORD_LIST)
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>
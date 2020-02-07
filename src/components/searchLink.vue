<template>
    <!-- 头部 -->
    <div class="header">
      <div class="inner">
        <input type="search" placeholder="搜索">
        <!-- <icon type="search" size="16"></icon> -->
        <!-- <span>搜索</span> -->
      </div>
    </div>
</template>

<script>
export default {

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
    input {
      width: 100%;
      color: #000;
      text-indent: 340rpx;
    }
    icon {
      margin-right: 10rpx;
      margin-top: 6rpx;
      position: absolute;
      left: 52%;
    }
  }
}
</style>
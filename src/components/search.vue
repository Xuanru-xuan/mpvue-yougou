<template>
  <div class="header">
    <input type="text" v-model.trim="keywords" confirm-type="search" @confirm="confirmHandler">
    <icon class="search-icon"
          type="search"
          size="16">
    </icon>
    <icon class="clear-icon"
          type="clear"
          size="16"
          color="#ccc" v-show="keywords" @click="keywords=''">
    </icon>
  </div>
</template>

<script>
export default {
  props: ['sendSonKeyWorld'],
  data () {
    return {
      keywords: this.sendSonKeyWorld
    }
  },
  methods: {
    confirmHandler () {
      // 如果keyword不为空，把事件暴露出去
      if (this.keywords) {
        // 子传父
        this.$emit('fnSendFather', this.keywords)
      }
    }
  },

  // 监听keyworld变化动态改变搜索列表
  watch: {
    // 监听父传过来的props
    sendSonKeyWorld (newValue) {
      this.keywords = newValue
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: #fff;
    height: 60rpx;
    width: 720rpx;
    padding-left: 74rpx;
    box-sizing: border-box;
  }
  .search-icon {
    position: absolute;
    left: 44rpx;
  }

  .clear-icon {
    position: absolute;
    right: 44rpx;
    z-index: 100;
    left: auto;
  }
}
</style>
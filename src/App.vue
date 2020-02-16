

<script>
export default {
  // 小程序关闭时，同步state.cart到storage里面
  onHide () {
    this.$store.commit('storeCart')
  }
}
</script>

<style>

</style>
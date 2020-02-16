import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    // 小程序启动时，同步storage.cart
    cart: wx.getStorageSync('cart') || {}
  },

  getters: {
    getCart (state) {
      return state.cart
    }
  },

  mutations: {
    // 把cart存到storage里面
    storeCart: (state) => {
      wx.setStorageSync('cart', state.cart)
    },

    // 添加购物车
    addCart (state, goodsId) {
      let cart = state.cart
      // 更改
      // 后续添加 num++, checked:true
      // 第一次添加，num:0,checked:true
      // 看cart里面有没有这个商品
      cart[goodsId] = {
        num: cart[goodsId] ? cart[goodsId].num + 1 : 1,
        checked: true
      }
      wx.showToast({
        title: '添加成功!',
        icon: 'success'
      })
    },

    // 更新购物车某一个商品
    updateItem (state, item) {
      state.cart[item.goods_id] = {
        num: item.num,
        checked: item.checked
      }
    }
  },

  plugins: [createLogger()]
})

export default store

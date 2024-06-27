/**
 * Created by Administrator on 2017/9/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products  from './modules/products'
import login  from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    getters,
    modules: {
        cart,
        products,
        login
    },
})

export {store}
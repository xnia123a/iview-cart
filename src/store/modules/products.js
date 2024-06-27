/**
 * Created by Administrator on 2017/9/18.
 */
import * as shop from '../../api/shop'
import * as types from '../types'

const state = {
    _production: []
}

const getters = {
    allProducts: function(state) {
        if(state._production.length == 0) {
            state._production = shop._products;
        }
        return state._production
    }
}

const actions = {
    removeFromProduction (state, product) {
        if (product.inventory > 0) {
            state.commit(types.REMOVE_FROM_PRODUCTION, product);
        }
    },
}

const mutations = {
    [types.REMOVE_FROM_PRODUCTION]: (state, product) => {
        let record = state._production.find(p => p.id === product.id)
        record.inventory = record.inventory-product.quantity
    },

    [types.ADD_TO_PRODUCTION]: (state, product) => {
        let record = state._production.find(p => p.id === product.id)
        if (record) {
            record.inventory++
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
/**
 * Created by Administrator on 2017/9/18.
 */
import * as types from '../types'

const state = {
    added: [],
    getTotal: 0
}

const getters = {
    getTotal: function(state) {
        let getTotal = 0;
        for(let i = 0; i<state.added.length; i++){
            getTotal = getTotal+state.added[i].quantity;
        }
        return getTotal;
    },

    getAdded: function(state) {
        return state.added;
    }
}

const actions = {

}

const mutations = {
    [types.ADD_TO_CART] (state,  product) {
        let record = state.added.find(p => p.id === product.id)
        if (!record) {
            state.added.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                inventory: product.inventory - product.quantity,
            })
        } else {
            record.quantity = record.quantity+product.quantity
            record.inventory = record.inventory-product.quantity
        }
    },
    [types.REMOVE_FROM_CART] (state,  product) {
        let record = state.added.find(p => p.id === product.id)
        if (record) {
            record.quantity--
            record.inventory++
            if(record.quantity == 0){
                for(let i = 0; i<state.added.length; i++){
                    if(state.added[i].id == product.id){
                        state.added.splice(i, 1)
                    }
                }
            }
        }
        state.getTotal--
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}

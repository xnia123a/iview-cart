/**
 * Created by Administrator on 2017/9/16.
 */
import * as types from './types'

export const addToCart = (state, product) => {
    if (product.inventory > 0) {
        state.commit(types.ADD_TO_CART,
            product
        )
        state.commit(types.REMOVE_FROM_PRODUCTION,
            product
        )
    }
}

export const cacelCart = (state, product) => {
    state.commit(types.REMOVE_FROM_CART,
        product
    )
    state.commit(types.ADD_TO_PRODUCTION,
        product
    )
}


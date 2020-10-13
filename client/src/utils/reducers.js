import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_MULTIPLE_TO_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";
import { useReducer } from 'react'

export function reducer(state,action) {
    switch(action.type) {
        case UPDATE_PRODUCTS:
            return {...state, products: [...action.products]}
        case UPDATE_CATEGORIES:
            return {...state, categories:[...action.categories]}
        case UPDATE_CURRENT_CATEGORY:
            return {...state, currentCategory: action.currentCategory}
        case TOGGLE_CART:
            return {...state, cartOpen: !state.cartOpen}
        case CLEAR_CART:
            return {...state, cart:[], cartOpen: false}
        case ADD_TO_CART: 
            return {...state, cart:[...state.cart, action.cart], cartOpen: true}
        case ADD_MULTIPLE_TO_CART:
            return {...state, cart:[...state.cart, ...action.cart]}
        case REMOVE_FROM_CART:
            let newCart = state.cart.filter(item => item._id !== action._id)
            return {...state, cart: newCart, cartOpen: newCart.length > 0}
        case UPDATE_CART_QUANTITY:
            return {...state, cart: state.cart.map(item => {
                let newItem = {...item}
                if (newItem._id === action._id) {
                    newItem.purchaseQuantity = action.purchaseQuantity
                }
                return newItem
            })}
        default:
            return state
    }
}

export const useProductReducer = initialState => useReducer(reducer,initialState)
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useLazyQuery } from '@apollo/react-hooks'
import CartItem from './CartItem'
import Auth from '../../utils/auth'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_MULTIPLE_TO_CART, TOGGLE_CART } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'
import { QUERY_CHECKOUT } from '../../utils/queries'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
function Cart() {
    
    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart)
    const cartOpen = useSelector( state => state.cartOpen)
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)
    useEffect(() => {
        async function getCart() {
            const indexedCart = await idbPromise('cart','get')
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: indexedCart })
        }
        if (!cart.length) {
            getCart()
        }
    }, [cart.length, dispatch])
    useEffect(() => {
        if (data) {
            stripePromise.then( res => {
                res.redirectToCheckout({
                    sessionId: data.checkout.session
                })
            })
            
        }
    }, [data])
    function toggleCart() {
        dispatch({type: TOGGLE_CART})
    }
    function calculateTotal() {
        let sum = 0
        for (const item of cart) {
            sum += item.price * item.purchaseQuantity
        }
        return sum.toFixed(2)
    }
    function submitCheckout() {
        const productIds = []

        for (const item of cart) {
            let quantity = item.purchaseQuantity
            while (quantity > 0) {
                productIds.push(item._id)
                quantity--
            }
        }
        getCheckout({
            variables: { products: productIds }
        })
    }
    if (!cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
              <span
                role="img"
                aria-label="trash">🛒</span>
            </div>
          )
    }
    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {cart.length ? (
                <div>
                {cart.map(item => (
                    <CartItem key={item._id} item={item} />
                ))}
                <div className="flex-row space-between">
                    <strong>Total: ${calculateTotal()}</strong>
                    {
                    Auth.loggedIn() ?
                        <button onClick={submitCheckout}>
                        Checkout
                        </button>
                        :
                        <span>(log in to check out)</span>
                    }
                </div>
                </div>
            ) : (
                <h3>
                <span role="img" aria-label="shocked">
                    😱
                </span>
                You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
      );
}

export default Cart
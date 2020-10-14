import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers';

function CartItem({ item }) {
    const [state, dispatch] = useStoreContext()
    const { _id } = item
    function removeFromCart() {
        dispatch({ type: REMOVE_FROM_CART, _id })
        idbPromise('cart', 'delete', item)
    }
    function quantityChange(event) {
        const purchaseQuantity = parseInt(event.target.value)
        if (purchaseQuantity < 1) {
            removeFromCart()
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id,
                purchaseQuantity
            })
            idbPromise('cart','put',{...item, purchaseQuantity})
        }
    }
    return (
    <div className="flex-row">
        <div>
        <img
            src={`/images/${item.image}`}
            alt=""
        />
        </div>
        <div>
        <div>{item.name}, ${item.price}</div>
        <div>
            <span>Qty:</span>
            <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={quantityChange}
            />
            <span
            role="img"
            aria-label="trash"
            onClick={removeFromCart}
            >
            🗑️
            </span>
        </div>
        </div>
    </div>
    );
}

export default CartItem;
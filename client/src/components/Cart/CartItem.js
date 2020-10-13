import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions'

function CartItem({ item }) {
    const [state, dispatch] = useStoreContext()
    function removeFromCart() {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        })
    }
    function quantityChange(event) {
        const value = parseInt(event.target.value)
        if (value < 1) {
            removeFromCart()
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: value
            })
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
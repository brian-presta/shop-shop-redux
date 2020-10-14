import React from "react";
import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise, pluralize } from "../../utils/helpers"

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;
  const [state, dispatch] = useStoreContext()
  const { cart } = state
  const addToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find( cartItem => cartItem._id === _id);
    let purchaseQuantity = 1
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      purchaseQuantity = parseInt(itemInCart.purchaseQuantity) + 1
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id,
        purchaseQuantity
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: {...item, purchaseQuantity}
      });
    }
    idbPromise('cart', 'put', {...item, purchaseQuantity})
  };
  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;

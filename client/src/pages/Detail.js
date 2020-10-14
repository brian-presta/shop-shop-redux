import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_PRODUCTS, ADD_TO_CART, UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from '../utils/actions'
import { useStoreContext } from '../utils/GlobalState'

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'
import Cart from "../components/Cart";
import { idbPromise } from "../utils/helpers";

function Detail() {
  const { id } = useParams();
  const [state, dispatch] = useStoreContext()
  const { products, cart } = state
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      })
      data.products.forEach( product => {
        idbPromise('products', 'put', product)
      })
    } else if (!loading) {
      idbPromise('products','get').then( products => {
        dispatch({type: UPDATE_PRODUCTS, products})
      })
    }
  }, [data,dispatch,loading])

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
  }, [products, id]);
  function addToCart() {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
    }
  }
  function removeFromCart() {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    })
  }
  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart></Cart>
    </>
  );
};

export default Detail;

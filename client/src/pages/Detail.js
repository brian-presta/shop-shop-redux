import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_PRODUCTS } from '../utils/actions'
import { useStoreContext } from '../utils/GlobalState'

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

function Detail() {
  const { id } = useParams();
  const [state, dispatch] = useStoreContext()
  const { products } = state
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      })
    }
  }, [data,dispatch])

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
  }, [products, id]);

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
            <button>
              Add to Cart
            </button>
            <button>
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
    </>
  );
};

export default Detail;
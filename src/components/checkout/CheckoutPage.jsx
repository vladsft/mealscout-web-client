import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import CartItem from "./CartItem";

import Cookies from "universal-cookie";
import { SessionContext } from "../../navigation/SessionProvider";
import { render } from "@testing-library/react";

export default function CheckoutPage() {
  const [error, setError] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [myCart, setCart] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const { cart, fetchCart, addRecipeToCart, removeRecipeFromCart } =
    useContext(SessionContext);
  const history = useHistory();
  const routeChangeToPayment = () => {
    history.push("/payment");
  };

  async function updateCart() {
    await fetchCart();
    setLoaded(true);
    setUpdated(true);
  }

  function addRecipe(recipeID) {
    addRecipeToCart(recipeID);
    setUpdated(false);
  }

  function removeRecipe(recipeID) {
    removeRecipeFromCart(recipeID);
    setUpdated(false);
  }

  useEffect(() => {
    updateCart();
  }, [updated]);

  useEffect(() => {
    setOrderTotal(
      cart
        .reduce((total, item) => total + item.price * item.count, 0)
        .toFixed(2)
    );
  }, [cart]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="page-content">Loading...</div>;
  } else {
    return (
      <div>
        <div className="page-heading row">
          <h2 className="header col-6 mt-auto">Shopping Basket</h2>
          <h6 className="col-2 align-right mt-auto">Order Total:</h6>
          <h4 className="col-2 checkout-price mt-auto">£{orderTotal}</h4>
          <button
            type="button"
            className="checkout-btn orange-btn col-2 mt-auto"
            onClick={routeChangeToPayment}
          >
            Checkout
          </button>
        </div>
        <div className="cartItem-list page-content">
          <div className="row cartItem-header">
            <h5 className="col-8">Item</h5>
            <h5 className="col-2 align-center">Quantity</h5>
            <h5 className="col-2 align-center">Price</h5>
          </div>
          <div className="row list-group cart-list">
            {cart.map((props) => (
              <CartItem
                key={props.key}
                id={props.id}
                image={props.image}
                name={props.title}
                quantity={props.count}
                price={props.price}
                add={addRecipe}
                remove={removeRecipe}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

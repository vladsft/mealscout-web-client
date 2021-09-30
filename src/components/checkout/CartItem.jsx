import React from "react";

function CartItem(props) {
  const reduce = () => {
    props.remove(props.id);
  };
  const increase = () => {
    props.add(props.id);
  };
  
  return (
    <div className="cartItem list-group-item">
      <div className="row">
        <div className="col-4">
          <img
            className="cartItem-image"
            src={props.image}
            alt="cart item image"
          ></img>
        </div>
        <h5 className="col-4 my-auto">{props.name}</h5>
        <div className="col-2 my-auto align-center">
          <button type="button" className="btn btn-light" onClick={reduce}>
            -
          </button>
          <span className="badge cartItem-quantity">{props.quantity}</span>
          <button type="button" className="btn btn-light" onClick={increase}>
            +
          </button>
        </div>
        <p className="col-2  my-auto align-center">£{props.price}</p>
      </div>
    </div>
  );
}

export default CartItem;

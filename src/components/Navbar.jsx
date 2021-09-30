import React from "react";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand mr-auto" href="/">
        MEALSCOUT
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/recipes">
              Recipes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/checkout">
              Checkout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

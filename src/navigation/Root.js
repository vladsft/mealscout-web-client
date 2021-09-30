import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import RecipesPage from "../components/recipes/RecipesPage";
import CheckoutPage from "../components/checkout/CheckoutPage";
import RecipeDetailPage from "../components/RecipeDetailPage";
import PaymentPage from "../components/PaymentPage";

import Cookies from "universal-cookie";
import { SessionContext } from "./SessionProvider";

const cookies = new Cookies();

export default function Root() {
  const { session, setSession, startSession, fetchCart, cart } =
    useContext(SessionContext);

  useEffect(() => {
    if (session) {
      return;
    }
    const sessionID = cookies.get("sessionID");
    if (!sessionID) {
      startSession();
    } else {
      setSession(sessionID);
    }
  fetchCart();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/recipes" component={RecipesPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/recipe/:recipeId" component={RecipeDetailPage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

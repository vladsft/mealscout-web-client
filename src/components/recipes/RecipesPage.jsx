import React, { useState, useEffect, useContext } from "react";
import Recipe from "./Recipe";
import Planner from "../planner/Planner";
import { SessionContext } from "../../navigation/SessionProvider";

export default function RecipesPage() {
  const [error, setError] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [planner, setPlanner] = useState();
  const {
    cart,
    fetchRecipes,
    fetchCart,
    fetchPlanner,
    updatePlannerMeal,
    addRecipeToCart,
    lastError,
  } = useContext(SessionContext);
  const [cartCount, setCartCount] = useState({});

  async function getRecipes() {
    const recipes = await fetchRecipes();
    const planner = await fetchPlanner();
    let tempCount = {};
    cart.forEach((item) => {
      tempCount[item.id] = item.count;
    });
    setCartCount(tempCount);
    setPlanner(planner);
    if (recipes) {
      setRecipes(recipes);
      setLoaded(true);
    } else {
      setError(lastError);
    }
  }

  async function updateCart() {
    await fetchCart();
    setUpdated(true);
  }

  async function addRecipe(id) {
    await addRecipeToCart(id);
    setUpdated(false);
  }

  useEffect(() => {
    getRecipes();
  }, [cart]);

  useEffect(() => {
    updateCart();
  }, [updated]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="page-content">Loading...</div>;
  } else {
    return (
      <div className="page recipes-page">
        <div className="page-heading">
          <h2 className="header">Recipes</h2>
          <p className="">Discover new recipes here!</p>
        </div>
        <Planner planner={planner} update={updatePlannerMeal} />
        <div className="row recipes-list">
          {recipes.map((props) => (
            <Recipe
              key={props.id}
              id={props.id}
              image={props.image}
              name={props.title}
              price={props.price}
              add={addRecipe}
              count={cartCount[props.id]}
              setUpdated={setUpdated}
              difficulty={props.difficulty}
            />
          ))}
        </div>
      </div>
    );
  }
}

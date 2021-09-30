import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../navigation/SessionProvider";

function RecipeDetailPage(props) {
  const id = props.match.params.recipeId;
  const [recipe, setRecipe] = useState({
    recipe: { ingredients: [] },
  });
  const { addRecipeToCart } = useContext(SessionContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, []);

  async function addToCart() {
    await addRecipeToCart(id);
  }

  return (
    <div className="page">
      <div className="page-heading row">
        <div className="col-4"></div>
        <h2 className="col-3 recipe-header mt-auto">{recipe.recipe.title}</h2>
        <h6 className="col-1 mt-auto">{recipe.recipe.prep_time} min</h6>
        <h4 className="col-2 mt-auto">£{recipe.recipe.price} </h4>
        <button
          type="button"
          className="addToCart-btn orange-btn mt-auto col-2"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
      <div className="page-content row">
        <img
          className="col-4"
          src={process.env.REACT_APP_API_URL + "/recipes/images/" + id}
        ></img>

        <div className="col-2">
          <h5>Ingredients</h5>
          <div>
            {recipe.recipe.ingredients.map((ingredient) => (
              <span>
                {ingredient.units} {ingredient.unit_measure} of{" "}
                {ingredient.title} <br /> <br />
              </span>
            ))}{" "}
          </div>
        </div>
        <div className="col-6">
          <h5>How to Cook?</h5>
          {/* <ol>
            <li>
              Combine the cream, water, shredded cheddar, mozzarella and
              parmesan cheese, and stir well.
            </li>
            <li>
              Put the spaghetti and bacon in the inner pot of rice cooker, then
              add in the cheese mixture.
            </li>
            <li>
              Close the lid, switch on the power, select the “Bake” function,
              set the cooking time for “5 minutes” and press “Start” to cook.
            </li>
            <li>
              When finished, open the lid, stir the content, then repeat step 3
              method.
            </li>
            <li>
              When finished, add in the egg yolk, stir well, and repeat step 3
              method again.
            </li>
            <li>When the cooking is done, season with salt to serve.</li>
          </ol> */}
          <p>{recipe.recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;

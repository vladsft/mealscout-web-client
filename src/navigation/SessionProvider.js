import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const SessionContext = createContext({});

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState();
  const [cart, setCart] = useState([]);
  const [lastError, setError] = useState(null);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
        cart,
        setCart,
        startSession: async () => {
          setError(null);
          await fetch(process.env.REACT_APP_API_URL + "/session", {
            method: "POST",
          })
            .then((res) => res.json())
            .then(
              (response) => {
                console.log(response);
                cookies.set("sessionID", response.session, "/");
                setSession(response.session);
              },
              (error) => {
                setError(error);
              }
            );
        },
        addRecipeToCart: async (recipeID) => {
          setError(null);
          const resp = await fetch(
            process.env.REACT_APP_API_URL + "/cart/add",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session: session,
                recipe: recipeID,
              }),
            }
          );
        },
        removeRecipeFromCart: async (recipeID) => {
          setError(null);
          await fetch(process.env.REACT_APP_API_URL + "/cart/del", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session: session,
              recipe: recipeID,
            }),
          });
        },
        fetchCart: async () => {
          const requestOptions = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session: session }),
          };
          const resp = await fetch(
            process.env.REACT_APP_API_URL + "/cart",
            requestOptions
          );
          const body = await resp.json();
          const newCart = body.map((cartItem, key) => ({
            key: key,
            id: cartItem.recipe_id,
            image:
              process.env.REACT_APP_API_URL +
              "/recipes/images/" +
              cartItem.recipe_id,
            count: cartItem.count,
            price: (cartItem.price * cartItem.count).toFixed(2),
            title: cartItem.title,
          }));
          setCart(newCart);
          return;
        },
        fetchRecipes: async () => {
          setError(null);
          const resp = await fetch(process.env.REACT_APP_API_URL + "/recipes");
          const body = await resp.json();
          const recipes = body.recipes;
          recipes.forEach((item, index) => {
            recipes[index].image =
              process.env.REACT_APP_API_URL + "/recipes/images/" + item.id;
          });
          return recipes;
        },
        fetchPlanner: async () => {
          setError(null);
          const resp = await fetch(process.env.REACT_APP_API_URL + "/planner", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session: session,
            }),
          });
          const body = await resp.json();
          const planner = body.planner;
          return planner;
        },
        updatePlannerMeal: async (recipeID, weekday, meal) => {
          setError(null);
          const resp = await fetch(
            process.env.REACT_APP_API_URL + "/planner/add",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session: session,
                recipe: recipeID,
                weekday: weekday,
                meal: meal,
                count: 1,
              }),
            }
          );
        },
        addPlannerToCart: async () => {
          setError(null);
          const resp = await fetch(
            process.env.REACT_APP_API_URL + "/planner/addToCart",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                session: session,
              }),
            }
          );
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

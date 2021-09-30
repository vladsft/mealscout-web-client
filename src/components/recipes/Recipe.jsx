import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../../navigation/SessionProvider";
import { ProgressBar } from "react-bootstrap";

const MAX_DIFFICULTY = 5;
const DIFFICULTY_NAMES = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

function Recipe(props) {
  const [counterText, setCounterText] = useState("");
  const [showCalendartTooltip, setShowCalendarTooltip] = useState(false);
  const [showCartTooltip, setShowCartTooltip] = useState(false);
  const [showAddToPlanner, setShowAddToPlanner] = useState(false);
  const [day, setDay] = useState();
  const [meal, setMeal] = useState();
  const { updatePlannerMeal } = useContext(SessionContext);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const history = useHistory();

  const routeChangeToRecipeDetail = () => {
    let path = `/recipe/${props.id}`;
    history.push(path);
  };

  const addToCart = () => {
    props.add(props.id);
  };

  const addToPlanner = () => {
    if (!meal || !day) {
      return;
    }
    updatePlannerMeal(props.id, day, meal);
    props.setUpdated(false);
  };

  return (
    <div className="col-sm-2 col">
      <div
        className="card recipe-card"
        onMouseEnter={() => setCounterText(" in cart!")}
        onMouseLeave={() => setCounterText("")}
      >
        <div className="recipe-diff">
          {DIFFICULTY_NAMES[props.difficulty]}
          <ProgressBar
            style={{ color: "green", textAlign: "center" }}
            now={((props.difficulty + 1) / MAX_DIFFICULTY) * 100}
            variant={
              props.difficulty <= 2
                ? props.difficulty == 2
                  ? "warning"
                  : "success"
                : "danger"
            }
          />
        </div>

        {props.count && (
          <span className="badge counter-badge">
            {props.count} {counterText}
          </span>
        )}
        <button
          className="circle-btn add-calendar-btn"
          onClick={() => setShowAddToPlanner(true)}
          onMouseEnter={() => setShowCalendarTooltip(true)}
          onMouseLeave={() => setShowCalendarTooltip(false)}
        >
          <i className="fa fa-calendar-plus-o" />
        </button>
        {showCalendartTooltip && (
          <span className="tooltip-text tooltip-calendar">
            add to meal planner
          </span>
        )}
        {showAddToPlanner && (
          <div className="add-to-planner-form">
            <button
              className="btn badge close-badge"
              onClick={() => setShowAddToPlanner(false)}
            >
              <i className="fa fa-close" />
            </button>
            <div className="input">
              <label className="" for="date">
                Choose Date:
              </label>
              <select
                className="custom-select"
                id="date"
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              >
                <option selected>Choose Date</option>
                {days.map((day) => (
                  <option value={day.toLowerCase()}>{day}</option>
                ))}
              </select>
            </div>
            <div className="input">
              <label className="" for="meal">
                Choose Meal:
              </label>
              <select
                className="custom-select"
                id="meal"
                onChange={(e) => {
                  setMeal(e.target.value);
                }}
              >
                <option selected>Choose Meal</option>
                {meals.map((meal) => (
                  <option value={meal.toLowerCase()}>{meal}</option>
                ))}
              </select>
            </div>
            <button className="orange-btn mx-auto" onClick={addToPlanner}>
              Add <i className="fa fa-calendar-plus-o" />
            </button>
          </div>
        )}
        <button
          className="circle-btn add-cart-btn"
          onClick={addToCart}
          onMouseEnter={() => setShowCartTooltip(true)}
          onMouseLeave={() => setShowCartTooltip(false)}
        >
          <i className="fa fa-cart-plus" />
        </button>
        {showCartTooltip && (
          <span className="tooltip-text tooltip-cart">add to cart</span>
        )}
        <img
          className="card-image"
          src={props.image}
          onClick={routeChangeToRecipeDetail}
        ></img>
        <div className="card-body">
          <p className="recipe-name">{props.name}</p>
          <p className="recipe-price">£{props.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

function interpolatedProgress(progress) {
  const red = [255, 0, 0];
  const green = [0, 255, 0];
  const colour = [255 * progress, 255 * (1 - progress), 0];
  return "rgb(" + colour[0] + "," + colour[1] + "," + colour[2] + ")";
}

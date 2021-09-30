import React, { useState, useContext } from "react";
import Day from "./Day";
import Week from "./Week";
import { SessionContext } from "../../navigation/SessionProvider";

function Planner(props) {
  const { addPlannerToCart, fetchCart, fetchPlanner } =
    useContext(SessionContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const addToCart = async () => {
    await addPlannerToCart();
    await fetchCart();
    await fetchPlanner();
  };

  return (
    <div className="page-content">
      <button
        className="orange-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Show" : "Hide"} Meal Planner
        <span className="toggle-icon">
          {isCollapsed ? (
            <i className="fa fa-toggle-down" />
          ) : (
            <i className="fa fa-toggle-up" />
          )}
        </span>
      </button>
      <div
        className={`collapse-content ${
          isCollapsed ? "collapsed" : "expanded"
        } card card-body`}
        aria-expanded={isCollapsed}
      >
        <Week planner={props.planner} />
        <button className="orange-btn mx-auto pt-2" onClick={addToCart}>
          Add to Cart
          <i className="toggle-icon fa fa-cart-plus" />
        </button>
      </div>
    </div>
  );
}
export default Planner;

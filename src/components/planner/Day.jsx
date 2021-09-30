import React from "react";

function Day(props) {
  function getBreakfast() {
    if (props.breakfast) {
      return props.breakfast.title;
    } else {
      return "Pick Your Breakfast!";
    }
  }

  function getLunch() {
    if (props.lunch) {
      return props.lunch.title;
    } else {
      return "Pick Your Lunch!";
    }
  }

  function getDinner() {
    if (props.dinner) {
      return props.dinner.title;
    } else {
      return "Pick Your Dinner!";
    }
  }

  return (
    <div className="card">
      <div className="card-header">{props.day}</div>
      <ul className="list-group list-group-flush day-list">
        <li
          className="list-group-item"
          style={props.breakfast ? { color: "black" } : {}}
        >
          {getBreakfast()}
        </li>
        <li
          className="list-group-item"
          style={props.lunch ? { color: "black" } : {}}
        >
          {getLunch()}
        </li>
        <li
          className="list-group-item"
          style={props.dinner ? { color: "black" } : {}}
        >
          {getDinner()}
        </li>
      </ul>
    </div>
  );
}
export default Day;

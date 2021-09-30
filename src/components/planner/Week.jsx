import React from "react";
import Day from "./Day";

function Week(props) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysName = [
    "sunday",
    "monday",
    "tuesday",
    "wednsday",
    "thursday",
    "friday",
    "saturday",
  ];

  return (
    <div className="card-group planner">
      <div className="card">
        <div className="card-header">Date</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Breakfast</li>
          <li className="list-group-item">Lunch</li>
          <li className="list-group-item">Dinner</li>
        </ul>
      </div>
      {days.map((day, index) => (
        <Day
          {...props.planner[daysName[index]]}
          key={index}
          day={day}
        />
      ))}
    </div>
  );
}
export default Week;

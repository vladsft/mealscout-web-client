import React from "react";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/recipes`;
    history.push(path);
  };
  return (
    <div>
      <div className="homepage-heading row">
        {/* <h2 className="header col-6">Don't know <br /> what to cook?</h2> */}
        <div className="col-4 my-auto">
          <h2 className="header">Make Meals with your Friends!</h2>
          <p>
            Choose what you wish to cook and the accommodation team will deliver
            the ingredients to your flat kitchen!
          </p>
          <button
            type="button"
            className="orange-btn homepage-btn"
            onClick={routeChange}
          >
            Discover Our Recipes
          </button>
        </div>
        {/* <div className="col-1"></div> */}
        {/* <div class="col-8 image_preview_container">
          <img
            className="homepage-image"
            src={process.env.PUBLIC_URL + "/images/friends-cooking-and-having-fun.jpg"}
          ></img>
        </div> */}
      </div>
      <div className="page-content">
        {/* <h2 className="header align-center pb-5">Why?</h2> */}

        <div className="row pt-3">
          <div className="col-4">
          <img
              className="homepage-icon"
              src={process.env.PUBLIC_URL + "/images/struggle.png"}
            ></img>
            <h5>Struggling what to eat?</h5>
            <p>
              Cooking with others is a great opportunity to improve social life
              and explore new food! Discover new recipes that are perfect for
              group cooking here.
            </p>
          </div>
          <div className="col-4">
            <img
              className="homepage-icon"
              src={process.env.PUBLIC_URL + "/images/grocery.png"}
            ></img>
            <h5>Too busy to shop for groceries?</h5>
            <p>
              Have you had enough of doing grocery lists and standing in long
              queues at the supermarket? MealScout will give you all the
              aliments that you need, so you can save your energy for cooking.
            </p>
          </div>
          <div className="col-4">
          <img
              className="homepage-icon"
              src={process.env.PUBLIC_URL + "/images/calendar.png"}
            ></img>
            <h5>Want to plan your meals ahead?</h5>
            <p>
              We provide a meal planner for you to plan your meals ahead with
              your hall mates. Ingredients will be delivered to you by the
              accommodation team daily, measured perfectly for the number of
              servings that you need.
            </p>
          </div>
        </div>
      </div>
      <div className="homepage-user">
        <div className="row">
          
          <div className="col-8">
            <div className="quote-box mx-auto my-auto">
              <i className="fa fa-quote-left quote align-left" />
              <p className="align-center p-3">
                My mum has been taking care of all my meals. I found cooking
                very awkward when I first moved into student hall.
              </p>
              <p className="align-center p-3">
                Now, with MealScout, I can enjoy cooking with my hall mates!
              </p>
              <div className="align-right">
                <i className="fa fa-quote-right quote" />
              </div>
              <h5 className="align-center">Bogdan</h5>
              <h6 className="align-center">Computing fresher at Imperial​, <br/>Living in semi-catered accomodation</h6>
            </div>
          </div>
          
            <img
              className="col-4 user-img"
              src={process.env.PUBLIC_URL + "/images/student.png"}
            ></img>

        </div>
      </div>
    </div>
  );
}

export default HomePage;

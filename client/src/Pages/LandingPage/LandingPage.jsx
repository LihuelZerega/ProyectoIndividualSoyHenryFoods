import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="LandingPageContainer">
        <span className="LandingPageTitle1">WELCOME TO MY</span>
        <span className="LandingPageTitle2">FOODS | PI</span>
        <Link to="/HomePage">
          <button className="btn">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

import React from "react";
import HeartIcon from "../../Images/corazon (2).png"
import DietIcon from "../../Images/ensalada.png"
import "./Card.css";

const Card = ({ name, diets, healthscore, image }) => {
  return (
    <div className="card">

      <div className="card-image">
        <img className="image" src={image} alt="" />
      </div>

      <div className="card-content">
        <h3 className="title">{name}</h3>
        <div className="details">
        <p className="diet"> <b> <img className="DietIcon" src={DietIcon} alt="" /> Diet type:  </b> {diets.join(", ")}</p>
        <p className="health"> <img className="HeartIcon" src={HeartIcon} alt="" /> <b> Health Score: </b> {healthscore}</p>
        </div>

      </div>
    </div>
  );
};

export default Card;
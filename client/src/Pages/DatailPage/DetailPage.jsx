import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardDetails, limpiarEstadoDetail } from "../../Redux/actions";
import Loader from "../../Components/Loader/Loader";
import BackArrowICon from "../../Images/flecha-pequena-izquierda.png"
import HeartIcon from "../../Images/corazon (2).png"
import DietIcon from "../../Images/ensalada.png"
import "./Detail.css"

function Detail() {
    const dispatch = useDispatch()
    const card = useSelector(state => state.cardDetails)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getCardDetails(id))
        return () => dispatch(limpiarEstadoDetail())
    }, [dispatch, id])


    return (
        <div className="">
            {card.length > 0 ?

                <div className="DetailPageContainer">

                    <div className="Back">
                        <Link to="/HomePage">
                            <button className="BackArrowButton">
                                <img
                                    className="BackArrowIcon"
                                    src={BackArrowICon}
                                    alt=""
                                />
                            </button>
                        </Link>
                    </div>

                    <div className="DetailCard">

                        <div className="DetailCardImage">
                            <img className="DetailCardImageContent" src={card[0].image} alt="" />
                        </div>

                        <div className="DetailCardContent">
                            <div className="DetailCardTitle">
                                <h2 className="">{card[0].name}</h2>
                            </div>

                            <hr/>

                            <div className="DetailCardHealthScoreContent">
                                <h2 className="HealthScoreTitle">Health Score:</h2>
                                <p className="HealthScoreParagraph">
                                <img className="Icon" src={HeartIcon} alt="" />
                                    {card[0].healthscore}</p>
                            </div>

                            <div className="DetailCardDietsContent">
                                <h2 className="DietTitle">Tipo de dieta:</h2>
                                <p className="DietParagraph">
                                <img className="Icon" src={DietIcon} alt="" />    
                                {card[0].diets.join(", ")}</p>
                            </div>

                        </div>
                    </div>

                    <div className="">
                        <div className="DetailCardSummary">
                            <h4>Resumen:</h4>
                            <p>{card[0].summary}</p>
                        </div>

                        <div className="DetailCardSteps">
                            <h4 className="">Paso a paso:</h4>
                            <ol>
                                {Array.isArray(card[0].steps) ? card[0].steps.map(e => {
                                    return (
                                        <li>{e}</li>
                                    )
                                }) : <p>No se informaron pasos a seguir para esta receta</p>}
                            </ol>
                        </div>
                    </div>
                </div>
                : <Loader />}
        </div>
    )
}

export default Detail
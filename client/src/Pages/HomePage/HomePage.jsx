import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getALLRecipes,
    filterByTypeDiets,
    orderByName,
    orderByHS,
    getDiets,
} from "../../Redux/actions";
import Paginado from "../../Components/Paginado/Paginado";
import Card from "../../Components/RecipeCard/Card";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Loader from "../../Components/Loader/Loader";
import "./Home.css";
import BackArrowIcon from "../../Images/flecha-pequena-izquierda.png";
import RefreshIcon from "../../Images/actualizar.png";

function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets);
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getALLRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getALLRecipes());
        setCurrentPage(1);
    }

    function handleFilterDiets(e) {
        dispatch(filterByTypeDiets(e.target.value));
    }

    function handleOrderName(e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderHS(e) {
        dispatch(orderByHS(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className="background_home">
            <div className="NavBar">
                <div className="FunctionButtons">
                    <Link to="/">
                        <button className="BackArrowButton">
                            <img
                                className="BackArrowIcon"
                                src={BackArrowIcon}
                                alt=""
                            />
                        </button>
                    </Link>

                    <button
                        className="RefreshButton"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        <img className="RefreshIcon" src={RefreshIcon} alt="" />
                    </button>
                </div>

                <div className="Filter">
                    <select
                        className="OptionFilters"
                        onChange={(e) => handleFilterDiets(e)}
                    >
                        <option value="all">All types of diets</option>
                        {diets?.map((diet) => (
                            <option value={diet.name} key={diet.id}>
                                {diet.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="OptionFilters"
                        onChange={(e) => handleOrderName(e)}
                    >
                        <option value="">Order alphabetically</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>

                    <select
                        className="OptionFilters"
                        onChange={(e) => handleOrderHS(e)}
                    >
                        <option value="">Sort by Health Score</option>
                        <option value="hmax">Health Score Maximum</option>
                        <option value="hmin">Health Score Minimum</option>
                    </select>

                    <SearchBar />
                </div>

                <div className="CreateRecipe">
                    <Link to="/FormPage">
                        <button className="CreateRecipeButton">Create recipe</button>
                    </Link>
                </div>
            </div>

            {allRecipes.length > 0 ? (
                <div className="cards">
                    {currentRecipes?.map((recipe) => (
                        <div key={recipe.id}>
                            <Link to={"/Recipes/" + recipe.id} style={{ textDecoration: "none" }}>
                                <Card
                                    key={recipe.id}
                                    name={recipe.name}
                                    image={recipe.image}
                                    diets={recipe.diets}
                                    healthscore={recipe.healthscore}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}

            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
            />
        </div>
    );
}

export default Home;

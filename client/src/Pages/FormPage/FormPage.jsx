import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import BackArrowICon from "../../Images/flecha-pequena-izquierda.png";
import "./FormPage.css";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [infoSteps, setInfoSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthscore: "",
    diets: [],
    steps: [],
    image: "",
  });

  useEffect(() => {
    setErrors(validateForm(input));
  }, [input]);

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "El campo nombre es requerido";
    }
    if (!input.summary) {
      errors.summary = "El campo resumen es requerido";
    }
    if (input.healthscore !== "" && (input.healthscore > 100 || input.healthscore < 0)) {
      errors.healthscore = "El health score debe ser entre 0 y 100";
    }
    return errors;
  }

  function handleCheckbox(e) {
    const { value, checked } = e.target;
    setInput((prevInput) => {
      if (checked) {
        return {
          ...prevInput,
          diets: [...prevInput.diets, value],
        };
      } else {
        return {
          ...prevInput,
          diets: prevInput.diets.filter((diet) => diet !== value),
        };
      }
    });
  }

  function handleAddSteps(e) {
    e.preventDefault();
    setInput({
      ...input,
      steps: [...input.steps, infoSteps],
    });

    setInfoSteps("");
  }

  function handleDeleteLast(e) {
    e.preventDefault();
    setInput((prevInput) => {
      const newSteps = [...prevInput.steps];
      newSteps.pop();
      return {
        ...prevInput,
        steps: newSteps,
      };
    });
    setInfoSteps("");
  }

  function handleDeleteAll(e) {
    e.preventDefault();
    setInput({
      ...input,
      steps: [],
    });
    setInfoSteps("");
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput({
          ...input,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setInput({
        ...input,
        image: "",
      });
    }
  }

  function handleRemoveImage() {
    setInput({
      ...input,
      image: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (input.image === "") {
      setInput({
        ...input,
        image: "https://www.clarin.com/img/2022/05/27/0HXb0UR0v_2000x1500__1.jpg",
      });
    }

    try {
      await dispatch(postRecipe(input));
      alert("La receta fue creada exitosamente");
      setInput({
        name: "",
        summary: "",
        image: "",
        healthscore: "",
        steps: [],
        diets: [],
      });
      navigate("/HomePage");
    } catch (error) {
      alert("Hubo un error al crear la receta. Por favor, intenta nuevamente.");
      console.error(error);
    }
  }

  return (
    <div className="recipecontainer">
      <div className="Back">
        <Link to="/HomePage">
          <button className="BackArrowButton">
            <img className="BackArrowIcon" src={BackArrowICon} alt="" />
          </button>
        </Link>
      </div>

      <div className="form-container">
        <h1 className="titleform">Create your own recipe</h1>

        <form onSubmit={handleSubmit}>
          <section className="inputsycheck">
            <div className="inputstexto">
              <div className="inputscontainer">
                <label>Name: </label>
                <input
                  className="inputdata"
                  placeholder="Enter the name of the recipe..."
                  type="text"
                  value={input.name}
                  name="name"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="inputscontainer">
                <div className="imagecontainer">
                  <div className="inputimagecontainer">
                    <label>Image: </label>
                    <input
                      ref={fileInputRef}
                      className="inputimage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  {input.image && (
                    <div className="preview-image">
                      <img src={input.image} alt="Preview" />
                      <button
                        className="stepsbutton"
                        type="button"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="inputscontainer">
                <label>Summary: </label>
                <textarea
                  className="inputdata"
                  value={input.summary}
                  placeholder="Enter a short summary of the recipe..."
                  name="summary"
                  rows="5"
                  cols="50"
                  onChange={handleInputChange}
                />
                {errors.summary && <p className="error">{errors.summary}</p>}
              </div>

              <div className="inputscontainer">
                <label>Health Score: </label>
                <input
                  className="inputdata"
                  placeholder="Enter the health score of the recipe..."
                  type="number"
                  value={input.healthscore}
                  name="healthscore"
                  onChange={handleInputChange}
                />
                {errors.healthscore && (
                  <p className="error">{errors.healthscore}</p>
                )}
              </div>

              <section className="stepyrender">
                <div className="stepbystep">
                  <legend>Preparation steps: </legend>
                  <textarea
                    value={infoSteps}
                    placeholder="Enter the steps of the recipe..."
                    name="name"
                    onChange={(e) => setInfoSteps(e.target.value)}
                    rows="5"
                    cols="45"
                  />
                  <div className="divstepsbuttons">
                    <input
                      className="stepsbutton"
                      type="submit"
                      name="agregar"
                      value="Add Step"
                      onClick={handleAddSteps}
                    />
                    <input
                      className="stepsbutton"
                      type="submit"
                      name="borrar"
                      value="Delete Last Step"
                      onClick={handleDeleteLast}
                    />
                    <input
                      className="stepsbutton"
                      type="submit"
                      name="borrartodo"
                      value="Delete All Steps"
                      onClick={handleDeleteAll}
                    />
                  </div>
                </div>

                <div className="renderstepbystep">
                  <ol>
                    {input.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </section>

              <div className="mandareceta">
                <button type="submit">Create Recipe!</button>
              </div>
            </div>

            <div className="containercheck">
              <fieldset className="orgcontcheck">
                <legend>Choose at least one or more types of diets</legend>
                {diets.map((diet) => (
                  <div className="organizadorcheck" key={diet.id}>
                    <p>{diet.name}</p>
                    <input
                      type="checkbox"
                      name={diet.name}
                      value={diet.name}
                      onChange={handleCheckbox}
                      checked={input.diets.includes(diet.name)}
                    />
                  </div>
                ))}
              </fieldset>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;

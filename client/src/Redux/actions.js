import axios from "axios";

export const POST_RECIPE = "POST_RECIPE";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_NAME = "FILTER_BY_NAME";
export const ORDER_BY_HS = "ORDER_BY_HS";
export const GET_RECIPE_BY_QUERY = "GET_RECIPE_BY_QUERY";
export const GET_DETAILS_BY_ID = "GET_DETAILS_BY_ID";
export const LIMPIAR_ESTADO_DETAIL = "LIMPIAR_ESTADO_DETAIL";

export function getALLRecipes() {
  return async function (dispatch) {
    const json = await axios("http://localhost:3001/recipes");
    const recipes = json.data;
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: recipes,
    });
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByHS(payload) {
  return {
    type: ORDER_BY_HS,
    payload,
  };
}

export function getRecipeByQuery(name) {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/recipes?name=" + name);
      return dispatch({
        type: GET_RECIPE_BY_QUERY,
        payload: json.data,
      });
    } catch (error) {
      alert("Receta no encontrada!");
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function filterByTypeDiets(payload) {
  console.log(payload);
  return {
    type: FILTER_BY_DIETS,
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const result = await axios.post("http://localhost:3001/recipes", payload);
    dispatch({
      type: POST_RECIPE,
      payload: result.data,
    });
    return result;
  };
}

export function getCardDetails(id) {
    return async function (dispatch) {
      var json = await axios("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: GET_DETAILS_BY_ID,
        payload: json.data,
      });
    };
  }
  

export function limpiarEstadoDetail() {
  return {
    type: LIMPIAR_ESTADO_DETAIL,
  };
}

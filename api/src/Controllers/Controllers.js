const { Recipe, Diet } = require('../db')
const axios = require("axios")
const { API_KEY } = process.env

const getApiRecipes = async () => {
    try {

        const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`) 

        const apiRecipes = await apiData.data.results.map(e => {
            return {
                id: e.id,
                name: e.title,
                summary: e.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthscore: e.healthScore,
                image: e.image,
                diets: e.diets,
                steps: e.analyzedInstructions[0]?.steps.map(e => {
                    return e.step
                })
            }
        })
        return apiRecipes
    } catch (error) {
        return error
    }
}

const getDBrecipes = async () => {
    try {
        const dbRecipes = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return await dbRecipes.map(e => {
            return {
                id: e.id,
                name: e.name,
                summary: e.summary,
                image: e.image,
                healthscore: e.healthscore,
                diets: e.diets.map(e => e.name),
                steps: e.steps
            }
        })

    } catch (error) {
        return error
    }
}

const getALLRecipes = async () => {
    const apiInfo = await getApiRecipes()
    const dbInfo = await getDBrecipes()
    const allRecipes = [...dbInfo, ...apiInfo]  //
    return allRecipes
}

module.exports = {
    getApiRecipes,
    getDBrecipes,
    getALLRecipes
}
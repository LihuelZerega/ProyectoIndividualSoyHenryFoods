const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const postRecipeRoute = require('./RecipesRoutes/postRecipes');
const getRecipeRoute = require('./RecipesRoutes/getRecipes');
const getDietRoute = require('./DietsRoutes/getDiets');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/diets", getDietRoute);
router.use("/recipes", getRecipeRoute);
router.use("/recipes", postRecipeRoute);


module.exports = router;
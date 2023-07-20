const { Router } = require("express");
const { Recipe, Diet } = require('../../db')
const router = Router()

router.post("/", async (req, res) => {
    const { name, summary, healthscore, diets, image, steps } = req.body;
    try {
      let createRecipe = await Recipe.create({
        name,
        summary,
        healthscore,
        image: image
          ? image
          : "https://cdn.pixabay.com/photo/2018/03/05/06/26/board-3200054_960_720.jpg",
        steps,
      });
  
      let dietDb = await Diet.findAll({
        where: { name: diets },
      });
  
      await createRecipe.addDiets(dietDb);
      const recipeWithDiets = await Recipe.findOne({
        where: { id: createRecipe.id },
        include: Diet,
      });
  
      return res.status(200).send(recipeWithDiets);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  });

module.exports = router;
const express = require('express');
const router = express.Router();

const {
  getAllRecipes,
  getRecipeById,
  getCategories,
  createRecipe,
  deleteRecipe,
  updateRecipe
} = require('../controllers/recipeController');


// 🔹 Get all recipes (this is what your Angular calls)
router.get('/recipes', getAllRecipes);          // 👈 missing


// 🔹 Get single recipe by ID
router.get('/recipes/:id', getRecipeById);      // -> /api/recipes/:id


// 🔹 Get list of all categories
router.get('/categories', getCategories);


// 🔹 Create new recipe
router.post('/recipes', createRecipe);


// 🔹 Delete recipe (you should consider /recipes/:id)
router.delete('/recipes', deleteRecipe);        // or /recipes/:id


// 🔹 Update recipe
router.put('/recipes/:id', updateRecipe);


module.exports = router;

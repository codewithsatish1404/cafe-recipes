const Recipe = require('../models/recipe');

// ---------------- GET ALL ----------------
exports.getAllRecipes = async (req, res, next) => {
  try {
    const category = req.query.category || '';
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const fetchAll = req.query.all === 'true';

    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    let recipes, total;

    if (fetchAll) {
      recipes = await Recipe.find(filter).sort({ createdAt: -1 }).lean();
      total = recipes.length;

      return res.json({
        success: true,
        data: recipes,
        total
      });
    }

    const skip = (page - 1) * limit;

    [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Recipe.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: recipes,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('❌ getAllRecipes error:', error);
    next(error);
  }
};

// ---------------- GET BY ID ----------------
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).lean();

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({ success: true, data: recipe });

  } catch (error) {
    console.error('❌ getRecipeById error:', error);
    next(error);
  }
};

// ---------------- CATEGORIES ----------------
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Recipe.distinct('category');

    res.json({
      success: true,
      data: ['All', ...categories.sort()]
    });

  } catch (error) {
    console.error('❌ getCategories error:', error);
    next(error);
  }
};

// ---------------- CREATE ----------------
exports.createRecipe = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      description,
      price,
      prepTime,
      cookTime,
      serving,
      ingredients,
      sources,
      preparation,
      note,
      isVeg
    } = req.body;

    // ✅ Basic validation
    if (!name || !image || !category || !description || !price?.regular) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing'
      });
    }

    // ✅ Create recipe
    const recipe = new Recipe({
      name,
      image, // base64 string
      category,
      description,
      price: {
        regular: price.regular
      },
      prepTime,
      cookTime,
      serving,
      ingredients: ingredients || [],
      sources: {
        sauce: sources?.sauce || '',
        filling: sources?.filling || ''
      },
      preparation: preparation || [],
      note,
      isVeg
    });

    await recipe.save();

    // ✅ Response
    res.status(201).json({
      success: true,
      data: recipe
    });

  } catch (error) {
    console.error('❌ createRecipe error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create recipe',
      error: error.message
    });
  }
};

// ---------------- DELETE ----------------
exports.deleteRecipe = async (req, res, next) => {
  try {
    const { id, name } = req.query;

    let deleted;

    if (id) {
      deleted = await Recipe.findByIdAndDelete(id);
    } else if (name) {
      deleted = await Recipe.findOneAndDelete({ name });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Provide id or name to delete'
      });
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      message: 'Recipe deleted successfully'
    });

  } catch (error) {
    console.error('❌ deleteRecipe error:', error);
    next(error);
  }
};

// ---------------- UPDATE ----------------
exports.updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.json({
      success: true,
      data: updatedRecipe
    });

  } catch (error) {
    console.error('❌ updateRecipe error:', error);
    next(error);
  }
};


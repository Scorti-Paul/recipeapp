import { RecipeModel } from "../DB/models/recipes.js";
import { UserModel } from "../DB/models/users.js";

const getRecipes = async (req, res) => {
  try {
    const recipe = await RecipeModel.find();
    res.json(recipe);
  } catch (err) {
    res.json(err);
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    res.json(recipe);
  } catch (err) {
    res.json(err);
  }
};

const createRecipe = async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);

    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

const savedRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

const savedUserRecipes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

export {
  getRecipe,
  getRecipes,
  createRecipe,
  updateRecipe,
  savedRecipes,
  savedUserRecipes,
};

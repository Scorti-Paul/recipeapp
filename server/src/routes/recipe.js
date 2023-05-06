import express from "express";
const router = express.Router();
import { verifyToken } from "./../middleware/verifyAccessToken.js";
import {
  createRecipe,
  getRecipe,
  getRecipes,
  savedRecipes,
  savedUserRecipes,
  updateRecipe,
} from "../controllers/recipe.js";

router.get("/", getRecipes);

router.get("/:id", getRecipe);

router
  .route("/")
  .post(verifyToken, createRecipe)
  .put(verifyToken, updateRecipe);

router.get("/savedRecipes/ids/:userID", savedRecipes);

router.get("/savedRecipes/:userID", savedUserRecipes);

export { router as recipeRouter };

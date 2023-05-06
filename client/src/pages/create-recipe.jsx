import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    ingredients: [],
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    try {
      e?.preventDefault();
      await axios.post(
        "http://localhost:3001/recipes",
        {
          ...recipe,
        },
        { headers: { authorization: cookies.access_token } }
      );

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="w-1/2 mx-auto mt-9">
      <form
        onSubmit={onSubmit}
        className="bg-slate-50 p-6 shadow-md rounded-md"
      >
        <div className="w-full">
          <h2 className="text-center text-3xl mb-3 font-bold text-blue-950">
            Create Recipe
          </h2>

          <div className="mb-4">
            <label className="block" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="name"
              value={recipe["name"] || ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={recipe["description"] || ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300"
            />
          </div>

          <div className="mb-2">
            <label className="block" htmlFor="ingredients">
              Ingredients
            </label>
            {recipe.ingredients.map((ingredient, idx) => (
              <input
                key={idx}
                id="ingredients"
                name="ingredients"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, idx)}
                className="w-full rounded-sm border border-gray-300 mt-1 mb-2 p-2"
              />
            ))}
          </div>

          <button
            onClick={addIngredients}
            type="button"
            className="w-40 bg-green-600 text-white rounded-md py-2 inline-flex items-center justify-center hover:bg-green-700 transition-all duration-200 ease-in mb-4"
          >
            Add ingredients
          </button>

          <div className="mb-4">
            <label className="block" htmlFor="instructions">
              Instructions
            </label>
            <textarea
              type="text"
              id="instructions"
              name="instructions"
              value={recipe["instructions"] || ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="imageUrl">
              Image Url
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipe["imageUrl"] || ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block" htmlFor="cookingTime">
              Cooking Time
            </label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipe["cookingTime"] || ""}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white rounded-md py-2 inline-flex items-center justify-center hover:bg-blue-600 transition-all duration-200 ease-in"
          >
            Create recipe
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRecipe;

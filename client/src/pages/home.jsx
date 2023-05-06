import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  const getRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      const data = response?.data;
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSavedRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
      );

      const data = response?.data.savedRecipes;

      setSavedRecipes(data);
    } catch (err) {
      console.error(err);
    }
  }, [userID]);
  const savedRecipe = async (recipeID) => {
    try {
      await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRecipes();
    if (cookies.access_token) getSavedRecipes();
  }, [cookies.access_token, getSavedRecipes]);

  return (
    <section className="w-1/2 mx-auto mt-9">
      <div className=" ">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border border-blue-50 shadow-sm rounded-lg pb-6 mb-14"
          >
            <div>
              <img
                className="rounded-tl-lg rounded-tr-lg"
                src={recipe.imageUrl}
                alt=""
              />
            </div>
            <div className="flex gap-2 justify-between mt-4 items-center px-4">
              <p className="text-2xl capitalize font-bold">{recipe.name}</p>
              {savedRecipes.includes(recipe._id) ? (
                <button
                  type="button"
                  className="bg-gray-400 w-28 h-8 text-gray-200 capitalize rounded-xl px-2 py-1 inline-flex text-sm items-center justify-center hover:cursor-default mb-4"
                >
                  recipe saved
                </button>
              ) : (
                <button
                  onClick={() => savedRecipe(recipe._id)}
                  type="button"
                  className="bg-gray-700 w-24 h-8 text-gray-200 capitalize rounded-xl px-2 py-1 inline-flex text-sm items-center justify-center hover:bg-gray-700 transition-all duration-200 ease-in mb-4"
                >
                  save recipe
                </button>
              )}
            </div>
            <div className="mt-4 px-4">
              <h3 className="text-lg font-semibold mt-2">Description</h3>
              <p className="text-gray-500">{recipe.description}</p>
            </div>
            <div className="mt-4 px-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <p className="text-gray-500">{recipe.instructions}</p>
            </div>
            <div className="mt-4 px-4">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              {recipe.ingredients.map((ingredient, idx) => (
                <span key={idx} className="mr-2 italic">
                  #{ingredient}{" "}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;

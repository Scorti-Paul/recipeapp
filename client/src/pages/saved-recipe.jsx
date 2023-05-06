import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  const getSavedRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes/savedRecipes/${userID}`
      );

      const data = response?.data.savedRecipes;

      setSavedRecipes(data);
    } catch (err) {
      console.error(err);
    }
  }, [userID]);

  useEffect(() => {
    getSavedRecipes();
  }, [getSavedRecipes]);

  return (
    <section className="w-1/2 mx-auto mt-9">
      <h2>Saved Recipes</h2>
      <div className="grid grid-cols-2 gap-6">
        {savedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border border-blue-200 p-6 rounded-lg"
          >
            <div>
              <img src={recipe.imageUrl} alt="" />
            </div>
            <div className="flex gap-2 justify-between mt-4 items-center">
              <p className="text-2xl capitalize font-bold">{recipe.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mt-2">Description</h3>
              <p className="text-gray-500">{recipe.description}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <p className="text-gray-500">{recipe.instructions}</p>
            </div>
            <div className="mt-4">
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

export default SavedRecipes;

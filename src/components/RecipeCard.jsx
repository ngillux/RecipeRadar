import { useState, useEffect } from "react";

export default function RecipeCard({ recipeType, recipeInfo }) {
  return (
    <>
      <h1>dkdk</h1>
      <br />

      {recipeType === "s" ? (
        <h1>{recipeInfo[0].strMeal}</h1>
      ) : (
        <h1>Meal with this main ingredient: {recipeInfo[0].strMeal}</h1>
      )}
    </>
  );
}

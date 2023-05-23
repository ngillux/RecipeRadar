import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import RecipeCard from "./components/RecipeCard";

function App() {
  const [data, setData] = useState([]);
  const [recipeType, setRecipeType] = useState("i");
  const [changedType, setChangedType] = useState(false);
  const [recipeInput, setRecipeInput] = useState("lemon");
  const [userInput, setUserInput] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [searchOrFilter, setSearchOrFilter] = useState("filter");
  const [searched, setSearched] = useState(false);
  const options = ["meal", "ingredient", "random"];
  const [url, setUrl] = useState(
    `https://www.themealdb.com/api/json/v1/1/${searchOrFilter}.php?${recipeType}=${recipeInput}`
  );

  const [newRecipe, setNewRecipe] = useState(false);
  const onOptionChangeHandler = (data) => {
    setChangedType(true);
    if (data === "meal" || data === "random") {
      setRecipeType((prevType) => "s");
      // setRecipeInput("curry");
      setSearchOrFilter("search");
      // console.log("MEAL SEARCH URL ===" + url);
      // setRecipeInput("lamb");
    } else {
      setRecipeType((prev) => "i");
      setSearchOrFilter((prev) => "filter");
    }

    console.log(recipeType);
  };

  const handleInput = (input) => {
    setUserInput(true);

    setRecipeInput(input);
  };

  const handleSearch = (e) => {
    setSearched(true);
    setNewRecipe(true);
    e.preventDefault();
    setUrl(
      `https://www.themealdb.com/api/json/v1/1/${searchOrFilter}.php?${recipeType}=${recipeInput}`
    );
  };

  const handleNewRecipe = (e) => {
    e.preventDefault();
    setNewRecipe(false);
  };

  useEffect(() => {
    //`https://www.themealdb.com/api/json/v1/1/search.php?${recipeType}=${recipeInput}`
    const fetchData = async () => {
      const res = await axios.get(url);
      setData((prevData) => res.data.meals);
      console.log("RES DATA ====", res.data.meals);
    };
    // console.log(data);
    fetchData();
    return () => {};
  }, [
    recipeType,
    searchOrFilter,
    recipeInput,
    url,
    searched,
    newRecipe,
    userInput,
  ]);

  return (
    <>
      <div className="app-container">
        <h1 id="app-logo">RecipeRadar</h1>
        {newRecipe === false ? (
          <>
            <select
              id="recipe-select"
              onChange={(e) => onOptionChangeHandler(e.target.value)}
            >
              <option>search by</option>
              {options.map((o, index) => {
                return <option key={index}>{o}</option>;
              })}
            </select>
            {changedType ? (
              <input
                placeholder="try searching ... "
                id="recipe-input"
                onChange={(e) => handleInput(e.target.value)}
              />
            ) : (
              ""
            )}
            {userInput ? (
              <>
                {" "}
                <button id="app-button" onClick={(e) => handleSearch(e)}>
                  search
                </button>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {
              data != null && searched ? (
                <RecipeCard recipeType={recipeType} recipeInfo={data} />
              ) : (
                "...nada"
              ) /* loading state maybe ? */
            }
            <button id="new-recipe" onClick={(e) => handleNewRecipe(e)}>
              new recipe
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;

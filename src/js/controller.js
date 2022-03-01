import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
// Enables support for old browsers (Polyfilling)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // Entire URL
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    //1. Loading Recipe
    await model.loadRecipe(id);

    //2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

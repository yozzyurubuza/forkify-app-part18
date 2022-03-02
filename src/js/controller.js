import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
// Enables support for old browsers (Polyfilling)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
    recipeView.renderError();
  }
};

//Subscriber
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();

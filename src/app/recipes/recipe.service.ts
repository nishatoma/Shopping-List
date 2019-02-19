import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

    // List of recipes
  private recipes: Recipe[] = [
    new Recipe('Pizza', 'Delicio', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'),
    new Recipe('Bizza', 'Digiorno', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg')
  ];

  getRecipes(): Recipe[] {
    // Create a copy array for return
    let copyRecipe: Recipe[] = [];
    // Iterate through the original array
    // and copy each element to the copy array.
    this.recipes.forEach((recipe) => {
        copyRecipe.push(recipe);
    })
    return copyRecipe;
  }

  // Centralized emitter for when an item gets selected.
  recipeSelected = new EventEmitter<Recipe>();


}
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  constructor(private shopService: ShoppingListService) {}

    // List of recipes
  private recipes: Recipe[] = [
    new Recipe('Pizza',
    'Delicio',
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    [new Ingredient('toto', 3)]),
    new Recipe('Bizza',
    'Digiorno',
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    [new Ingredient('jojo', 100)])
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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }

  getRecipeDetail(id: number) {
    if (id >= 0 && id < this.getRecipes().length) {
      return this.getRecipes()[id];
    }
  }


}
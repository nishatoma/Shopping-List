import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../common/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscriber, Subject } from 'rxjs';

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

  recipeChanges: Subject<any> = new Subject<any>();

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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shopService.addIngredients(ingredients);
  }

  getRecipeDetail(id: number) {
    if (id >= 0 && id < this.getRecipes().length) {
      return this.getRecipes()[id];
    }
  }

  addRecipe(recipe: Recipe) {
    if (recipe) {
      this.recipes.push(recipe);
    }
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }
}
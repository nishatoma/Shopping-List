import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    static readonly URL = 'https://ng-recipe-book-ca723.firebaseio.com/recipes.json';
    static readonly recipesJson = 'recipes.json';
    static readonly queryToken = '?auth='

    constructor (private httpService: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken()
        return this.httpService.put(DataStorageService.URL + DataStorageService.queryToken + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken()
        // With the http client, we can tell the get method what kind of response we want.
        // In this case we assume we got Recipe array.
        this.httpService.get<Recipe[]>(DataStorageService.URL + DataStorageService.queryToken + token).pipe(
            map(
                (recipes) => {
                    recipes.forEach((recipe) => {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }
                    });
                    return recipes;
                }
            )
        ).subscribe(
            (recipes: Recipe[]) => {
              // recipes is an array of recipes.
              this.recipeService.setRecipes(recipes);
            }
          );;
    }
}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    static readonly URL = 'https://ng-recipe-book-ca723.firebaseio.com/recipes.json';
    static readonly recipesJson = 'recipes.json';
    static readonly queryToken = '?auth='

    constructor (private httpService: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken()
        return this.httpService.put(DataStorageService.URL + DataStorageService.queryToken + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken()
            
        this.httpService.get(DataStorageService.URL + DataStorageService.queryToken + token).pipe(
            map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
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
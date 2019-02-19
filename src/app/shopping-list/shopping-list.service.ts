import { Ingredient } from '../common/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5), 
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        // We have to inform our component that new data is available, 
        // This alone will not return the array we want when we add
        // a new element.
        let copyArray: Ingredient[] = []
        this.ingredients.forEach((ing) => {
            copyArray.push(ing);
        })
        return copyArray;
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        // The spread operator ... allows to add 
        // an array as a list of elements.
        this.ingredients.push(...ingredients);
    }
}
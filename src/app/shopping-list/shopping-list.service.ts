import { Ingredient } from '../common/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
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

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        // The spread operator ... allows to add 
        // an array as a list of elements.
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.getIngredients());
    }

    // Update existing ingredient.
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // Remove ingredient
    removeIngredient(index: number) {
        this.ingredients.splice(index, 1);  
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
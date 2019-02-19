import { Ingredient } from '../common/ingredient.model';

export class Recipe {
    private name: string;
    private description: string;
    private imagePath: string;
    private _ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getImagePath() {
        return this.imagePath;
    }

    public get ingredients(): Ingredient[] {
        return this._ingredients;
    }
    public set ingredients(value: Ingredient[]) {
        this._ingredients = value;
    }
}
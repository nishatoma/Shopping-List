import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeFromListComponent = new EventEmitter<Recipe>();

  // List of recipes
  recipes: Recipe[] = [
    new Recipe('Pizza', 'Delicio', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'),
    new Recipe('Bizza', 'Digiorno', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(res: Recipe) {
    this.recipeFromListComponent.emit(res);
  }

}

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  detailedRecipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.detailedRecipe = this.recipeService.getRecipeDetail(this.id);
      }
    );
  }

  goToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.detailedRecipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}

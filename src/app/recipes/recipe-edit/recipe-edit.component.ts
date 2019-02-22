import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  editedRecipe: Recipe;
  recipeIngredients: FormArray = new FormArray([]);
  recipeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = (params['id'] != null) ? true : false;
        this.initForm();
      }
    );
  }

  private initForm() {

    if (this.editMode) {
      this.editedRecipe = this.getEditedRecipe(this.id);
      this.recipeForm = this.createForm(this.editedRecipe.name,
      this.editedRecipe.imagePath, this.editedRecipe.description,
      this.getRecipeIngredients());
    } else {
      this.recipeForm = this.createForm('', '', '', new FormArray([]));
    }
    
  }

  private getEditedRecipe(id: number) {
    if (this.editMode) {
      return this.recipeService.getRecipeDetail(id);
    }
    return null;
  }

  private getRecipeIngredients() {
    if (this.editMode) {
      if (this.editedRecipe.ingredients) {
        for (let ingredient of this.editedRecipe.ingredients) {
          this.recipeIngredients.push(this.getNewFormGroup(ingredient.name, ingredient.amount));
        }
      }
    }
    return this.recipeIngredients;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.getNewFormGroup(null, null));
  }

  deleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  submitForm() {
    const newRecipe = this.getRecipeFromForm();
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.cancelEditing();
  }

  private getNewFormGroup(name: string, amount: number) {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  }

  private getRecipeFromForm() {
    return new Recipe (this.recipeForm.value['name'],
     this.recipeForm.value['description'],
     this.recipeForm.value['imagePath'],
     this.recipeForm.value['ingredients'])
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  createForm(name: string, imagePath: string, desc: string, ing: FormArray) {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'ingredients': ing
    });
  }

  cancelEditing() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
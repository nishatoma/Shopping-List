  import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shopService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shopService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shopService.getIngredient(id);
        this.myForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  addIngredient(form: NgForm) {
    let ingredient: Ingredient = this.getFormIngredient(form);
    if (this.editMode) {
      this.shopService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shopService.addIngredient(ingredient);
    }
    this.reset();
  }

  deleteIngredient(index: number) {
    if (this.editMode) {
      this.shopService.removeIngredient(index);
    }
    this.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reset() {
    this.myForm.reset();
    this.editMode = false;
  }

  getFormIngredient(form: NgForm): Ingredient {
    let name: string = form.value.name;
    let amount: number = Math.abs(+form.value.amount);
    return new Ingredient(name, amount);
  }
}
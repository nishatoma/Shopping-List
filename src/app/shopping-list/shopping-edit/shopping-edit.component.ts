import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/common/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientQuantity: ElementRef;
  @Output() ingredientEmitter = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addIngredient() {
    this.ingredientEmitter.emit(new Ingredient(this.ingredientName.nativeElement.value,
    this.ingredientQuantity.nativeElement.valueAsNumber));
    // console.log(this.ingredientQuantity);
  }

}

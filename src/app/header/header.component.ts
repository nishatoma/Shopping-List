import { Component } from '@angular/core';
import { DataStorageService } from '../common/data-storage..service';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private storageService: DataStorageService,
    private authService: AuthService) {}

  storeRecipes() {
    this.storageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  getRecipes() {
    this.storageService.getRecipes();
  }

  logOut() {
    this.authService.logout();
  }
}

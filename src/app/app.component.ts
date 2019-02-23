import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-list';

  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyD9f1JAxCujD2y-Oo9cCcq3iEo9oINP_6Q",
      authDomain: "ng-recipe-book-ca723.firebaseapp.com"
    });
  }

  navigate(feature: string) {
    this.loadedFeature = feature;
  }
}

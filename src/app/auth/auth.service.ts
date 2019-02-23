import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    token: string;

    constructor (private router: Router) {}

    // We need to send tokens for auth.
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            (error) => {
                console.log(error);
            }
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response) => {
                this.setToken();
                this.router.navigate(['/']);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
    
    getToken() {
        // This is an asynchronous action.
        this.setToken();
        return this.token;
    }

    setToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token) => {
                this.token = token;
            }
        );
    }

    isAuthenticated() {
        return (this.token != null);
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}
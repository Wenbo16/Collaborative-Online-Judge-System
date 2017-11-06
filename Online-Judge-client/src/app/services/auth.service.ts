// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {Router} from '@angular/router'

// Avoid name not found warnings
declare var Auth0Lock: any;  // any type

@Injectable()
export class AuthService {
  // Configure Auth0
	clientId: string = 'LErSSceM1WizVEjDcMtqTNYguxLKJkNQ';
	domain: string = 'cdfwb1992.auth0.com';

	// You will need an Auth0Lock instance to receive your Auth0 credentials and an options object
	lock = new Auth0Lock(this.clientId, this.domain, {});

	constructor(private router: Router) {
	// Your app will need to listen for Lock's authenticated event and have a callback registered to handle authentication. 
	// this.lock.on("authenticated", (authResult) => {
	//   localStorage.setItem('id_token', authResult.idToken);
	// });
	}

	public login() {
	// Call the show method to display the widget.
	// this.lock.show();
		return new Promise((resolve, reject) => {
			this.lock.show((error: string, profile: Object, id_token: string) => {
		        if (error) {
		        	reject(error);
		        } else {
		        	// There is a property on the object that gets returned by Auth0 called idToken 
		        	// which is a JSON Web Token identifying the user. It is this token that 
		        	// can be used to give an indication in your Angular 2 application that the user is authenticated.
					localStorage.setItem('profile', JSON.stringify(profile));
					localStorage.setItem('id_token', id_token);
					resolve(profile);
		        }
		    })
		})
	}

	public authenticated() {
	// Check if there's an unexpired JWT
	// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired('id_token');
	}

	public logout() {
	// Remove token from localStorage
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		this.router.navigate['/'];
	}

	public getProfile(): Object {
		return JSON.parse(localStorage.getItem('profile'));
	}
}
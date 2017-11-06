import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(@Inject('auth') private authService,
	        	private router: Router) { }

	canActivate(): boolean {
		if (this.authService.authenticated()) {
			return true;
		} else {
			alert('please sign in')
			// this.router.navigate(['/problems']);
		}
	}

	isAdmin(): boolean {
		if (this.authService.authenticated() && this.authService.getProfile().roles.includes('Admin')) {
		  return true;
		}
		return false;
	}
}
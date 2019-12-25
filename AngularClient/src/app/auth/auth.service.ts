import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface IUserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLoggedIn = false;

  user: IUserLogin = null;

  login(user: IUserLogin) {
    if (user.username && user.password) {
      this.user = user;
      this.isLoggedIn = true;
      this.router.navigate(['app/account']);
    }
  }

  logOut() {
    this.user = null;
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
}

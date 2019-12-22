import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public loader: LoadingBarService,
    private router: Router,
    private authService: AuthService,
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loader.complete();
      }
    });

  }

  isAdmin() {
    return true;
    // return this.authService.isAdmin();
  }
  isLoggedIn() {
    return true;
    // return this.authService.isLoggedIn();
  }
  getName(): string {
    return 'Admin';
    // return this.authService.loggedInAs();
  }

  login() {
    // if (this.isLoggedIn()) {
    //   this.authService.logout();
    // } else {
    //   this.router.navigate(['auth/login']);
    // }
  }
}

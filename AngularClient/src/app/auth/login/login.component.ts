import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private fb: FormBuilder) { }

  hidePass = true;
  loginFG: FormGroup;

  ngOnInit() {
    this.loginFG = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogInClick() {
    if (this.loginFG.valid) {
      this.authService.login(this.loginFG.value);
    }
  }



}

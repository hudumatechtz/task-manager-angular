import { Component, OnInit } from '@angular/core';
import {Auth, AuthService} from '../services/auth.service';
import {UiService} from '../services/ui.service';

@Component({
  selector: 'app-register',
  template: `
    <section class="user-signup-form background-theme" fxLayout fxLayoutAlign="center center">
      <form fxLayout="column" fxLayoutAlign="justify center" #userForm="ngForm"
            (ngSubmit)="registerUser(userForm)">
        <h4 class="title color-theme">REGISTER WITH TASK MANAGER</h4>
        <mat-form-field appearance="outline">
          <mat-label>Enter Your Username</mat-label>
          <label for="userName"></label>
          <input id="userName" type="text" matInput placeholder="Username"
                 ngModel name="username"
                 required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Choose Your Password</mat-label>
          <label for="password"></label>
          <input id="password" [type]="hide ? 'password' : 'text'"
                 matInput placeholder="Password"
                 ngModel name="password"
                 required>
          <button type="button" class="mat-icon-button background-theme" matSuffix (click)="hide = !hide"
                  [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
        </mat-form-field>
        <mat-spinner *ngIf="loadingState" color="primary"></mat-spinner>
        <button mat-raised-button
                *ngIf="!loadingState" class="background-theme">
          Register with Task Manager
        </button>
        <div class="quick-link" *ngIf="!loadingState">
          <a class="log-links color-theme" routerLink="/">Task Manager</a>
          <a class="log-links color-theme" routerLink="/login">Login</a>
        </div>
      </form>
    </section>
  `,
  styles: [`
    .user-signup-form {
      min-height: 100vh;
      box-sizing: border-box;
      font-size: 16px;
      padding: 30px 0;
    }
    form {
      max-height: 450px !important;
      padding: 10px 0;
      width: 400px;
      border-radius: 10px;
      box-sizing: border-box;
      background: white;
    }
    @media (min-width: 425px) {
      form {
        width: 400px !important;
      }
    }
    mat-form-field {
      width: 95%;
      box-sizing: border-box;
    }
    input {
      width: 100%;
    }
    button {
      margin-top: 10px;
      width: 95%;
      height: 50px;
      box-sizing: border-box;
      font-size: 18px;
      color: white;
    }
    button a{
      color: white;
      text-decoration: none;
    }
    a{
      text-decoration: none;
    }
    a:hover{
      text-decoration: none;
      color: #000000;
    }
    .quick-link{
      box-sizing: border-box;
      padding: 10px;
    }
    .log-links{
      box-sizing: border-box;
      padding: 10px;
    }
    @media(max-width:600px) {
      form {
        width: 90%;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  loadingState = false;
  hide = true;

  constructor(
    private uiService: UiService,
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
  }
  registerUser(userForm): void {
    const {username, password} = userForm.value;
    if (userForm.invalid){
      return this.uiService.showSnackbar('FORM HAS ERRORS, CHECK AND REFILL');
    }
    const authData: Auth = {
      username,
      password
    };
    this.authService.register(authData);
  }
}

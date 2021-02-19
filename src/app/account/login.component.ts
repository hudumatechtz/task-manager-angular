import { Component, OnInit } from '@angular/core';
import {UiService} from '../services/ui.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <section class="login-wrapper background-theme" fxLayout="column" fxLayoutAlign="center center">
      <form fxLayout="column" fxLayoutAlign="justify center" #logForm="ngForm"
            (ngSubmit)="login(logForm)">
        <h4 class="color-theme">LOGIN TO TASK MANAGER</h4>
        <mat-form-field appearance="outline">
          <mat-label>Your Username</mat-label>
          <label for="username"></label>
          <input id="username" type="text" matInput placeholder="username"
                 ngModel name="username"
                 required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Your Password</mat-label>
          <label for="password"></label>
          <input id="password" [type]="hide ? 'password' : 'text'"
                 matInput placeholder="Password"
                 ngModel name="password"
                 required>
          <button class="mat-icon-button background-theme" matSuffix (click)="hide = !hide"
                  [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
            <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </button>
        </mat-form-field>
        <mat-spinner color="primary" *ngIf="loadingState"></mat-spinner>
        <button class="background-theme" type="submit" mat-raised-button *ngIf="!loadingState">
          Login To Task Manager
        </button>
        <div class="quick-link" *ngIf="!loadingState">
          <a class="log-links color-theme" routerLink="/">Task Manager</a>
          <a class="log-links color-theme" routerLink="/register">Register</a>
        </div>
      </form>
    </section>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      box-sizing: border-box;
      font-size: 16px;
      padding: 30px 0;
    }
    form {
      max-height: 400px !important;
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
    @media(max-width:768px) {
      form {
        width: 90%;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  hide = true;
  loadingState = false;
  constructor(
    private uiService: UiService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
  }
  login(logForm): void {
    if (logForm.invalid){
      return this.uiService.showSnackbar('FORM HAS ERRORS, CHECK AND REFILL');
    }
    this.authService.login({
      username: logForm.value.username,
      password: logForm.value.password
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UiService} from '../services/ui.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-account',
  template: `
    <section style="padding: 10px" fxLayout="column">
      <h3 style="margin-bottom: 10px">Change Your User Name</h3>
      <form fxLayout="column" style="width: 100%" (ngSubmit)="submitChanges(editUser)" #editUser="ngForm">
        <mat-form-field appearance="outline">
<!--          <mat-label>Your Username</mat-label>-->
          <label for="username"></label>
          <input id="username" type="text" matInput placeholder="Enter your new Username" name="name"
               required [(ngModel)]="username">
        </mat-form-field>
        <div *ngIf="loadingState" fxLayoutAlign="center">
          <mat-spinner color="primary"></mat-spinner>
        </div>
        <button class="background-theme" style="color: var(--light-theme)" type="submit"
                *ngIf="!loadingState"
                mat-raised-button>
          Update User Name
        </button>
      </form>
    </section>
  `,
  styles: [``]
})
export class AccountComponent implements OnInit{
  username = '';
  loadingState = false;
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
    let user: any = {};
    user = JSON.parse(localStorage.getItem('userData'));
    if (user){
      this.username = user.username;
    }
  }
  submitChanges(editUser: NgForm): void {
    if (editUser.invalid) {
      return this.uiService.showSnackbar('Your form has error, refill');
    }
    // console.log(editUser.value.name);
    this.authService.updateUser(editUser.value.name);
  }
}

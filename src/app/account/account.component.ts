import {Component} from '@angular/core';

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
        <button class="background-theme" style="color: var(--light-theme)" type="submit" mat-raised-button>
          Update User Name
        </button>
      </form>
    </section>
  `,
  styles: [``]
})
export class AccountComponent {
  username = 'Corama';
  constructor() {
  }
  submitChanges(editUser): void {
  }
}

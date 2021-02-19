import {Component} from '@angular/core';

@Component({
  selector: 'app-task-manager',
  template: `
    <section class="wrapper" fxLayout="column" fxLayoutAlign="center center">
      <div fxLayout="column" fxLayoutAlign="center center" style="padding: 10px; position: relative">
        <div class="background" style="background: white; width: 400px !important; max-height: 400px !important; opacity: 0.7;
         position: absolute; right: 0; left: 0; bottom: 0; top: 0"></div>
        <h3 style="margin-bottom: 20px !important; text-align: center; z-index: 999">WELCOME TO TASK MANAGEMENT SYSTEM</h3>
        <div fxLayout="row" style="width: 100%">
          <button mat-raised-button routerLink="/login" color="primary" style="width: 50%; margin-right: 20px">Log In</button>
          <button mat-raised-button routerLink="/register" color="primary" style="width: 50%">Register</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrapper {
      min-height: 100vh;
      box-sizing: border-box;
      background: url("../../../assets/images/task-manager-background.jpg");
      background-size: cover;
      font-size: 16px;
      padding: 30px 0;
    }
    .wrapper > div {
      max-height: 400px !important;
      padding: 10px 0;
      width: 400px;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid #D3D3D3;
    }
    @media (min-width: 425px) {
      .wrapper > div, .background {
        width: 400px !important;
      }
    }
    @media(max-width:768px) {
      .wrapper > div, .background {
        width: 90%;
      }
    }
  `]
})
export class TaskManagerComponent {
  constructor() {
  }
}

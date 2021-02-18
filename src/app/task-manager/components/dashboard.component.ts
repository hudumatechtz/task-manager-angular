import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <section style="overflow: hidden; padding: 10px; min-height: 100vh" fxFlex fxLayout="row">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <mat-card routerLink="/total-tasks" fxLayout="column" fxLayoutAlign="center center">
              <h3>40</h3>
              <div>
                <mat-icon>article</mat-icon>
                Total Tasks
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/queued-task" fxLayout="column" fxLayoutAlign="center center">
              <h3>40</h3>
              <div>
                <mat-icon style="">queue</mat-icon>
                <span style="">Task on Queue</span>
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/ongoing-tasks" fxLayout="column" fxLayoutAlign="center center">
              <h3>40</h3>
              <div>
                <mat-icon>pending_actions</mat-icon>
                On Going Tasks
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/completed-tasks" fxLayout="column" fxLayoutAlign="center center">
              <h3>40</h3>
              <div>
                <mat-icon>task</mat-icon>
                Completed Tasks
              </div>
            </mat-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    mat-card {
      margin-right: 10px;
      background: #ffffff;
      margin-bottom: 10px;
      height: 190px;
      cursor: pointer;
      /*width: 100px;*/
    }
    mat-card:hover, mat-card:focus {
      background: #fafafa;
      border: none;
    }
    mat-card:last-child {
      margin-right: 0;
    }
    h3 {
      font-size: 100px;
    }
  `]
})
export class DashboardComponent implements OnInit{
  constructor() {
  }
  ngOnInit(): void {
  }
}

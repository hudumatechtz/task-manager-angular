import {Component, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <section style="overflow: hidden; padding: 10px; min-height: 100vh" fxFlex fxLayout="row">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <mat-card routerLink="/user/tasks" fxLayout="column" fxLayoutAlign="center center">
              <h3>{{ totalTasks }}</h3>
              <div>
                <mat-icon>article</mat-icon>
                All Tasks
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/user/tasks/queued-tasks" fxLayout="column" fxLayoutAlign="center center">
              <mat-spinner color="primary" *ngIf="loadingState"></mat-spinner>
              <h3 *ngIf="!loadingState">
                {{ newTasks }}
              </h3>
              <div *ngIf="!loadingState">
                <mat-icon style="">queue</mat-icon>
                <span style="">Queued Tasks</span>
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/user/tasks/ongoing-tasks" fxLayout="column" fxLayoutAlign="center center">
              <mat-spinner color="primary" *ngIf="loadingState"></mat-spinner>
              <h3 *ngIf="!loadingState">
                {{ onGoing }}
              </h3>
              <div *ngIf="!loadingState">
                <mat-icon>pending_actions</mat-icon>
                On Going Tasks
              </div>
            </mat-card>
          </div>
          <div class="col-md-6">
            <mat-card routerLink="/user/tasks/completed-tasks" fxLayout="column" fxLayoutAlign="center center">
              <mat-spinner color="primary" *ngIf="loadingState"></mat-spinner>
              <h3 *ngIf="!loadingState">
                {{ completed }}
              </h3>
              <div *ngIf="!loadingState">
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
  loadingState = false;
  completed = 0;
  newTasks = 0;
  onGoing = 0;
  totalTasks = 0;
  constructor(
    private uiService: UiService,
    private taskService: TaskService,
  ) {
  }
  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
    this.taskService.getDashboardTasks();
    this.taskService.dashBoardTasks.subscribe(
      (tasks: any) => {
        this.completed = tasks.completed;
        this.newTasks = tasks.newTasks;
        this.onGoing = tasks.onGoing;
        this.totalTasks = tasks.totalTasks;
      }
    );
  }
}

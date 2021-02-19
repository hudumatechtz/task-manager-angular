import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-completed-tasks',
  template: `
    <section style="padding: 10px">
      <div style="display: flex; margin-bottom: 10px">
        <h3>Completed Tasks</h3>
        <div class="tasks-button" style="margin-left: auto">
          <button routerLink="/user/tasks" mat-raised-button>All</button>
          <button routerLink="/user/tasks/queued-tasks" mat-raised-button>Queue</button>
          <button routerLink="/user/tasks/ongoing-tasks" mat-raised-button>On Going</button>
          <button routerLink="/user/tasks/completed-tasks" mat-raised-button>Completed</button>
        </div>
      </div>
      <div *ngIf="loadingState" fxLayoutAlign="center">
        <mat-spinner color="primary"></mat-spinner>
      </div>
      <table class="table table-bordered" style="width: 100%" *ngIf="!loadingState">
        <thead>
        <tr>
          <th style="width: 10%">S/N</th>
          <th style="width: 80%">Tasks</th>
          <th style="width: 10%">Action</th>
        </tr>
        </thead>
        <tbody *ngFor="let completedTask of completedTasks">
        <tr>
          <td>{{completedTask.sn}}</td>
          <td routerLink="/user/tasks/task" class="task" style="cursor: pointer">
            <span>{{completedTask.task}}</span>
          </td>
          <td class="edit-buttons" style="position: relative">
            <div fxLayout="row" style="position: absolute; top: 50%; transform: translateY(-50%)">
              <div style="background: var(--color-theme); border-radius: 4px; color: var(--light-theme); margin-right: 10px">
                <a mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </a>
              </div>
              <div style="background: var(--danger-theme); border-radius: 4px; color: var(--light-theme)">
                <a mat-icon-button (click)="delete(taskId)">
                  <mat-icon>delete</mat-icon>
                </a>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div *ngIf="!loadingState && completedTasks.length <= 0" fxLayoutAlign="center">
        <p>No Task Completed</p>
      </div>
    </section>
  `,
  styles: [`
    th {
      font-size: 20px;
    }
    td {
      height: auto;
    }
    .task:hover {
      background: #ffffff;
    }
    .mat-icon-button:hover {
      color: var(--light-theme);
    }
  `]
})
export class CompletedTasksComponent implements OnInit{
  completedTasks = [];
  loadingState = false;
  constructor(
    private taskService: TaskService,
    private uiService: UiService
  ) {
  }
  ngOnInit(): void{
    this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
    this.taskService.getCompleted();
    this.taskService.onCompletedSubject.subscribe(
      (tasks: any) => {
        this.completedTasks = tasks;
        console.log(this.completedTasks);
      }
    );
}
  delete(taskId: any): void {
    const value = 3;
    this.taskService.delete(taskId, value);
  }
}

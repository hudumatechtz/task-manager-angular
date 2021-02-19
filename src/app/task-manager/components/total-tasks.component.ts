import {Component, OnInit} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-total-tasks',
  template: `
    <section style="padding: 10px">
      <div style="display: flex; margin-bottom: 10px">
        <h3>All Tasks</h3>
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
          <th style="width: 65%">Task</th>
          <th style="width: 15%">Status</th>
          <th style="width: 10%">Actions</th>
        </tr>
        </thead>
        <tbody *ngFor="let task of tasks; let i = index">
        <tr>
          <td>{{1+i}}</td>
          <td class="task" style="cursor: pointer">
            <span>{{task.task.task}}</span>
          </td>
          <td class="task" style="cursor: pointer">
            <span>{{task.status}}</span>
          <td class="edit-buttons" style="position: relative">
            <div fxLayout="row" style="position: absolute; top: 50%; transform: translateY(-50%)">
              <div style="background: var(--color-theme); border-radius: 4px; color: var(--light-theme); margin-right: 10px">
                <a routerLink="/user/tasks/edit-task" mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </a>
              </div>
              <div style="background: var(--danger-theme); border-radius: 4px; color: var(--light-theme)">
                <a mat-icon-button (click)="delete(task.task.id)">
                  <mat-icon>delete</mat-icon>
                </a>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div *ngIf="!loadingState && tasks.length <= 0" fxLayoutAlign="center"
           style="border: 1px solid #D3D3D3; border-top: none; padding: 10px">
        <p>No Tasks Was Found</p>
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
export class TotalTasksComponent implements OnInit{
  tasks: any = [{task : {task : ''},  status: ''}];
  loadingState = false;
  id = 0;
  constructor(
    private uiService: UiService,
    private taskService: TaskService,
  ) {}
  ngOnInit(): void{
    this.taskService.getTasks();
    this.uiService.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
    }
    );
    this.taskService.tasksSubject.subscribe(
      (tasks: any) => {
        this.tasks = tasks;
      }
    );
  }
  delete(taskId: any): void {
    const value = 4;
    this.id = taskId;
    this.taskService.delete(taskId, value);
    // console.log(taskId);
  }
}

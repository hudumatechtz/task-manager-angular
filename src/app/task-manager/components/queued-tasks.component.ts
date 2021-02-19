import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-queued-tasks',
  template: `
    <section style="padding: 10px">
      <div style="display: flex; margin-bottom: 10px">
        <h3>Queued Tasks</h3>
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
        <tbody *ngFor="let queuedTask of queuedTasks; let i = index">
        <tr [ngClass]="{'hide': id === queuedTask.id}">
          <td>{{ 1+i}}</td>
          <td class="task" style="cursor: pointer">
            <div fxLayout="column">
              <div style="margin-bottom: 10px">
                {{queuedTask.task}}
              </div>
              <div fxLayout="row">
                <mat-checkbox [(ngModel)]="checked" (click)="markOnGoing(queuedTask.id)"
                >Mark On Going</mat-checkbox>
              </div>
            </div>
          </td>
          <td class="edit-buttons" style="position: relative">
            <div fxLayout="row" style="position: absolute; top: 50%; transform: translateY(-50%)">
              <div style="background: var(--color-theme); border-radius: 4px; color: var(--light-theme); margin-right: 10px">
                <a routerLink="/user/tasks/edit-task" mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </a>
              </div>
              <div style="background: var(--danger-theme); border-radius: 4px; color: var(--light-theme)">
                <a mat-icon-button (click)="delete(queuedTask.id)">
                  <mat-icon>delete</mat-icon>
                </a>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div *ngIf="!loadingState && queuedTasks.length <= 0" fxLayoutAlign="center"
           style="border: 1px solid #D3D3D3; border-top: none; padding: 10px">
        <p>No Task on Queue</p>
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
export class QueuedTasksComponent implements OnInit{
  checked = false;
  queuedTasks: any = [];
  loadingState = false;
  display = true;
  id = 0;
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
      this.taskService.getQueue();
      this.taskService.onQueueSubject.subscribe(
        (tasks: any) => {
          this.queuedTasks = tasks;
        }
      );
    }

  delete(id: any): void{
    const value = 1;
    this.taskService.delete(id, value);
  }
  markOnGoing(id: any): void{
      this.id = id;
      this.taskService.markOnGoing(id);
  }
}

import {Component} from '@angular/core';

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
      <table class="table table-bordered" style="width: 100%">
        <thead>
        <tr>
          <th style="width: 10%">S/N</th>
          <th style="width: 80%">Tasks</th>
          <th style="width: 10%">Edit</th>
        </tr>
        </thead>
        <tbody *ngFor="let queuedTask of queuedTasks">
        <tr>
          <td>{{queuedTask.sn}}</td>
          <td routerLink="/user/tasks/task" class="task" style="cursor: pointer">
            <div fxLayout="column">
              <div style="margin-bottom: 10px">
                {{queuedTask.task}}
              </div>
              <div fxLayout="row">
                <mat-checkbox [(ngModel)]="checked">Mark On Going</mat-checkbox>
              </div>
            </div>
          </td>
          <td class="edit-buttons" style="position: relative">
            <div fxLayout="row" style="position: absolute; top: 50%; transform: translateY(-50%)">
              <div style="background: var(--color-theme); border-radius: 4px; color: var(--light-theme); margin-right: 10px">
                <a mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </a>
              </div>
              <div style="background: var(--danger-theme); border-radius: 4px; color: var(--light-theme)">
                <a mat-icon-button>
                  <mat-icon>delete</mat-icon>
                </a>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
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
export class QueuedTasksComponent {
  queuedTask = '';
  checked = false;
  queuedTasks = [
    {
      sn: 1,
      task: 'I will do programming',
    }
  ];
  constructor() {
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'app-total-tasks',
  template: `
    <section style="padding: 10px">
      <h3>All Tasks</h3>
      <table class="table table-bordered" style="width: 100%">
        <thead>
        <tr>
          <th style="width: 10%">S/N</th>
          <th style="width: 80%">Tasks</th>
          <th style="width: 10%">Edit</th>
        </tr>
        </thead>
        <tbody *ngFor="let task of tasks">
        <tr>
          <td>{{task.sn}}</td>
          <td class="task" style="cursor: pointer">
            <span>{{task.task}}</span>
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
export class TotalTasksComponent {
  task = '';
  tasks = [
    {
      sn: 1,
      task: 'I will do programming',
    }
  ];
  constructor() {
  }
}

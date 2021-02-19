import {Component} from '@angular/core';

@Component({
  selector: 'app-task',
  template: `
    <section style="padding: 10px">
      <div fxLayout="column" style="padding: 10px">
        <div fxLayout="row" style="margin-bottom: 10px">
          <span class="text-muted" style="margin-right: 10px">
            Created At: {{task.createdAt}}
          </span>
          <span class="text-muted" style="margin-left: auto">
            Updated At: {{task.UpdatedAt}}
          </span>
        </div>
        <div style="border: 1px solid #D3D3D3; padding: 10px; margin-bottom: 10px; min-height: 100px"
             fxLayout="row" >
          <p style="margin-bottom: 0; text-align: center">{{task.task}}</p>
        </div>
        <div fxLayout="row">
          <button routerLink="/user/tasks/edit-task" mat-raised-button style="margin-right: 10px; width: 50%; background: var(--color-theme);">
            <mat-icon style="font-size: 20px">edit</mat-icon>
            Edit
          </button>
          <button mat-raised-button style="margin-left: auto; width: 50%; background: var(--danger-theme)">
            <mat-icon style="font-size: 20px">delete</mat-icon>
            Delete
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    button {
      color: var(--light-theme);
    }
  `]
})
export class TaskComponent {
  task = {
    createdAt: '22-12-2021',
    UpdatedAt: '22-12-2021',
    task: 'I will do programming For the whole day tomorrow',
  };
  constructor() {
  }
}

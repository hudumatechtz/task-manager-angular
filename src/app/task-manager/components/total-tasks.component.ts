import {Component} from '@angular/core';

@Component({
  selector: 'app-total-tasks',
  template: `
    <section style="padding: 10px">
      <h3>Total Tasks</h3>
      <table class="table table-bordered" style="width: 100%">
        <thead>
        <tr>
          <th style="width: 10%">S/N</th>
          <th style="width: 80%">Tasks</th>
          <th style="width: 10%">Edit</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td class="task" style="cursor: pointer">
            <span>
              I will program Tomorrow at Night, I will program Tomorrow at Night, I will program Tomorrow at Night, I will program Tomorrow at Night, I will program Tomorrow at Night, I will program Tomorrow at Night
            </span>
          </td>
          <td class="edit-buttons" fxLayout="row">
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
    .task:hover {
      background: #ffffff;
    }
    .mat-icon-button:hover {
      color: var(--light-theme);
    }
  `]
})
export class TotalTasksComponent {
  constructor() {
  }
}

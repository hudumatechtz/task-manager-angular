import {Component} from '@angular/core';

@Component({
  selector: 'app-task-form',
  template: `
    <section style="padding: 10px">
      <mat-form-field appearance="outline" color="primary">
        <textarea matInput placeholder="New Task" rows="6" #task></textarea>
      </mat-form-field>
    </section>
  `,
  styles: [``]
})
export class TaskFormComponent {
  constructor() {
  }
}

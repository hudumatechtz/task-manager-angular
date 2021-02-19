import {Component} from '@angular/core';

@Component({
  selector: 'app-edit-task',
  template: `
    <section style="padding: 10px" fxLayout="column">
      <h3>Edit Task</h3>
      <mat-form-field appearance="outline" color="primary">
        <textarea matInput placeholder="New Task" rows="6" #task required value="{{taskContent}}"></textarea>
      </mat-form-field>
      <button
        mat-raised-button color="primary">
        Update Task
      </button>
      <div fxLayoutAlign="center">
      </div>
    </section>
  `,
  styles: [``]
})
export class EditTaskComponent {
  taskContent = 'I will do programming For the whole day tomorrow';
  constructor() {
  }
}

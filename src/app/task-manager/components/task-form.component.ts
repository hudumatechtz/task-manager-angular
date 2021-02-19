import {Component, OnInit} from '@angular/core';
import {UiService} from '../../services/ui.service';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  template: `
    <section style="padding: 10px;" fxLayout="column">
      <mat-form-field appearance="outline" color="primary">
        <textarea matInput placeholder="New Task" rows="6" #task required></textarea>
      </mat-form-field>
      <button
        *ngIf="!loadingState"
        (click)="addTask(task)"
        mat-raised-button color="primary">
        Add New Task
      </button>
      <div fxLayoutAlign="center">
        <mat-spinner color="primary" *ngIf="loadingState"></mat-spinner>
      </div>
    </section>
  `,
  styles: [``]
})
export class TaskFormComponent implements OnInit{
  loadingState = false;
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
  }
  addTask(task: HTMLTextAreaElement): void{
    if (!task.value){
      return this.uiService.showSnackbar('YOUR TASK CAN NOT BE EMPTY, PLEASE ADD ONE');
    }
    this.taskService.addTask(task.value);
  }
}

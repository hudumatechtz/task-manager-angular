import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-ongoing-tasks',
  template: `
    <section style="padding: 10px">
      <div style="display: flex; margin-bottom: 10px">
        <h3>On Going Tasks</h3>
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
        <tbody *ngFor="let onGoingTask of onGoingTasks">
        <tr>
          <td style="position: relative">
            <div fxLayout="row" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              {{onGoingTask.sn}}
            </div>
          </td>
          <td routerLink="/user/tasks/task" class="task" style="cursor: pointer">
            <div fxLayout="column">
              <div style="margin-bottom: 10px">
                {{onGoingTask.task}}
              </div>
              <div fxLayout="row">
                <mat-checkbox [(ngModel)]="checked">Mark Complete</mat-checkbox>
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
      <div *ngIf="!loadingState && onGoingTasks.length <= 0" fxLayoutAlign="center">
        <p>No Task is OnGoing</p>
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
    a:hover {
      color: var(--color-theme);
    }
  `]
})
export class OngoingTasksComponent implements OnInit{
  checked = false;
  onGoingTasks = [
    {
      sn: 1,
      task: 'I will do programming',
    }
  ];
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
    this.taskService.getOnGoing();
    this.taskService.onGoingSubject.subscribe(
      (tasks: any) => {
        this.onGoingTasks = tasks;
      }
    );
  }
}

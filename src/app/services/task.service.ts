import {BehaviorSubject, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UiService} from './ui.service';
@Injectable(
  {providedIn: 'root'}
)
export class TaskService {
  constructor(private http: HttpClient, private uiService: UiService) {
  }
  dashBoardTasks = new Subject();
  serverMessage = 'Internal server error, 500';
  onGoingSubject = new Subject();
  onQueueSubject = new Subject();
  onCompletedSubject = new Subject();
  url = 'http://localhost:5000';
  tasksSubject = new BehaviorSubject<any>(null);
  getOptions(): object{
    const {token}  = JSON.parse(localStorage.getItem('userData')) ?
      JSON.parse(localStorage.getItem('userData')) : '';
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  getDashboardTasks(): void{
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.get(this.url + '/dashboard', options).subscribe(
      (result: any) => {
        this.uiService.loadingStateChanged.next(false);
        if (!result){
          return this.uiService.showSnackbar(result.message);
        }
        this.dashBoardTasks.next(result);
      }
      ,
      error => {
        console.log(error);
        this.uiService.loadingStateChanged.next(false);
        error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
      }
    );
  }

  addTask(task: string): void {
    const options = this.getOptions();
    this.uiService.loadingStateChanged.next(true);
    this.http.post(this.url + '/create-task', {
      task
    }, options)
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!result){
            return this.uiService.showSnackbar(result.message);
          }
          this.uiService.showSnackbar(result.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  getTasks(): void{
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.get(this.url + '/tasks', options)
      .subscribe(
        (result: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!result){
            return this.uiService.showSnackbar(result.message);
          }
          this.uiService.showSnackbar(result.message);
          const userTasks = [];
          let status = '';
          result.tasks.forEach((task: any) => {
            if (task.onGoing){
              status = 'OnGoing';
            }else if (task.completed){
              status = 'Completed';
            }else if (task.newTask){
              status = 'On Queue';
            }
            const modifiedTask = {task, status};
            userTasks.push(modifiedTask);
          });
          this.tasksSubject.next(userTasks);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  getOnGoing(): void{
    const options = this.getOptions();
    this.uiService.loadingStateChanged.next(true);
    this.http.get(this.url + '/ongoing', options)
      .subscribe(
        (response: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!response){
            return this.uiService.showSnackbar(response.message);
          }
          this.onGoingSubject.next(response.onGoing);
          this.uiService.showSnackbar(response.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  getQueue(): void{
    const options = this.getOptions();
    this.uiService.loadingStateChanged.next(true);
    this.http.get(this.url + '/new-task', options)
      .subscribe(
        (response: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!response){
            return this.uiService.showSnackbar(response.message);
          }
          this.onQueueSubject.next(response.taskNew);
          this.uiService.showSnackbar(response.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  getCompleted(): void{
    this.uiService.loadingStateChanged.next(true);
    const options = this.getOptions();
    this.http.get(this.url + '/completed', options)
      .subscribe(
        (response: any) => {
          this.uiService.loadingStateChanged.next(false);
          if (!response){
            return this.uiService.showSnackbar(response.message);
          }
          this.onCompletedSubject.next(response.completed);
          this.uiService.showSnackbar(response.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }

  delete(taskId: any, value?): void {
    const options = this.getOptions();
    console.log(taskId);
    this.http.delete(this.url + `/delete/${taskId}`, options)
      .subscribe(
        (response: any) => {
          this.getQueue();
          // tslint:disable-next-line:triple-equals
          if (value == 1){
            this.getQueue();
          }
          // tslint:disable-next-line:triple-equals
          if (value == 2){
            this.getOnGoing();
          }
          // tslint:disable-next-line:triple-equals
          if (value == 3){
            this.getCompleted();
          }
          return this.uiService.showSnackbar(response.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  markOnGoing(id: any): void{
    const options = this.getOptions();
    this.http.post(this.url + '/mark-going', {
      id
  }, options)
      .subscribe(
        (response: any) => {
          this.uiService.showSnackbar(response.message);
        },
          error => {
            console.log(error);
            this.uiService.loadingStateChanged.next(false);
            error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
  markCompleted(id: any): void{
    const options = this.getOptions();
    this.http.post(this.url + '/mark-complete', {
      id
    }, options)
      .subscribe(
        (response: any) => {
          this.uiService.showSnackbar(response.message);
        },
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          error.error.message ? this.uiService.showSnackbar(error.error.message) : this.uiService.showSnackbar(this.serverMessage);
        }
      );
  }
}
